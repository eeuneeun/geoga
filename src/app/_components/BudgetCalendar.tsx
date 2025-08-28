"use client";

import React, { useMemo, useState } from "react";
import {
  addMonths,
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from "date-fns";
import { ko } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Wallet,
  Trash2,
  Pencil,
  Filter,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// --- Types ---

type TxType = "expense" | "income";

type Transaction = {
  id: string;
  date: string; // ISO date string (yyyy-MM-dd)
  type: TxType;
  amount: number; // positive number
  category: string;
  note?: string;
};

// --- Demo seed data ---
const seed: Transaction[] = [
  {
    id: "t1",
    date: "2025-08-01",
    type: "income",
    amount: 2500000,
    category: "월급",
    note: "8월 급여",
  },
  {
    id: "t2",
    date: "2025-08-02",
    type: "expense",
    amount: 18000,
    category: "커피",
    note: "스타벅스",
  },
  {
    id: "t3",
    date: "2025-08-02",
    type: "expense",
    amount: 42000,
    category: "식비",
    note: "점심",
  },
  {
    id: "t4",
    date: "2025-08-05",
    type: "expense",
    amount: 65000,
    category: "교통",
    note: "KTX",
  },
  {
    id: "t5",
    date: "2025-08-11",
    type: "expense",
    amount: 120000,
    category: "쇼핑",
  },
  {
    id: "t6",
    date: "2025-08-15",
    type: "income",
    amount: 150000,
    category: "용돈",
  },
  {
    id: "t7",
    date: "2025-08-15",
    type: "expense",
    amount: 33000,
    category: "식비",
  },
  {
    id: "t8",
    date: "2025-08-21",
    type: "expense",
    amount: 52000,
    category: "문화",
  },
  {
    id: "t9",
    date: "2025-08-23",
    type: "expense",
    amount: 27000,
    category: "식비",
  },
  {
    id: "t10",
    date: "2025-08-25",
    type: "expense",
    amount: 98000,
    category: "여가",
  },
];

// Utility: format currency KRW
const w = (n: number) => n.toLocaleString("ko-KR");

// Color palette for categories (Tailwind-neutral; cells override fill)
const COLORS = [
  "#4f46e5",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#eab308",
  "#f97316",
];

// --- Main Component ---
export default function CalendarBudgetApp() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today));
  const [transactions, setTransactions] = useState<Transaction[]>(seed);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [filterType, setFilterType] = useState<"all" | TxType>("all");

  // Derived month range
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { locale: ko });
  const gridEnd = endOfWeek(monthEnd, { locale: ko });

  const monthTx = useMemo(
    () =>
      transactions.filter((t) =>
        t.date.startsWith(format(monthStart, "yyyy-MM"))
      ),
    [transactions, monthStart]
  );

  const filteredTx = useMemo(
    () =>
      monthTx.filter((t) =>
        filterType === "all" ? true : t.type === filterType
      ),
    [monthTx, filterType]
  );

  const totals = useMemo(() => {
    const income = filteredTx
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = filteredTx
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [filteredTx]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    filteredTx.forEach((t) => {
      const sign = t.type === "expense" ? 1 : -1; // emphasize expense share; income shown as negative slice
      map[t.category] = (map[t.category] || 0) + sign * t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.abs(value) }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTx]);

  const days: Date[] = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) days.push(d);

  const dayTotals = useMemo(() => {
    const map: Record<
      string,
      { income: number; expense: number; items: Transaction[] }
    > = {};
    filteredTx.forEach((t) => {
      map[t.date] = map[t.date] || { income: 0, expense: 0, items: [] };
      if (t.type === "income") map[t.date].income += t.amount;
      else map[t.date].expense += t.amount;
      map[t.date].items.push(t);
    });
    return map;
  }, [filteredTx]);

  function addTx(dateISO: string, tx: Omit<Transaction, "id" | "date">) {
    setTransactions((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), date: dateISO, ...tx },
    ]);
  }

  function updateTx(next: Transaction) {
    setTransactions((prev) => prev.map((t) => (t.id === next.id ? next : t)));
  }

  function deleteTx(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function openAdd(date: Date) {
    setSelectedDate(date);
    setEditing({
      id: "",
      date: format(date, "yyyy-MM-dd"),
      type: "expense",
      amount: 0,
      category: "기타",
      note: "",
    });
  }

  const monthLabel = format(currentMonth, "yyyy년 MM월", { locale: ko });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Calendar */}
        <Card className="xl:col-span-2 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">캘린더</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium w-36 text-center">
                  {monthLabel}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Select
                  value={filterType}
                  onValueChange={(v: any) => setFilterType(v)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        전체
                      </div>
                    </SelectItem>
                    <SelectItem value="expense">지출</SelectItem>
                    <SelectItem value="income">수입</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Weekday header */}
            <div className="mt-4 grid grid-cols-7 text-center text-xs text-slate-500">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const iso = format(day, "yyyy-MM-dd");
                const inMonth = isSameMonth(day, monthStart);
                const data = dayTotals[iso];
                const isToday = isSameDay(day, new Date());
                const income = data?.income || 0;
                const expense = data?.expense || 0;

                return (
                  <motion.button
                    key={iso}
                    onClick={() => openAdd(day)}
                    whileHover={{ scale: 1.01 }}
                    className={[
                      "relative min-h-[96px] rounded-2xl border p-2 text-left transition shadow-sm",
                      inMonth ? "bg-white" : "bg-slate-50 opacity-70",
                      isToday ? "ring-2 ring-indigo-500" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">
                        {format(day, "d", { locale: ko })}
                      </span>
                      <Badge
                        variant={income ? "secondary" : "outline"}
                        className="text-[10px]"
                      >
                        {income ? "+" + w(income) : ""}
                      </Badge>
                    </div>
                    <div className="mt-2 text-[11px] text-red-500 font-semibold">
                      {expense ? "-" + w(expense) : ""}
                    </div>

                    {/* Chips preview of categories */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {data?.items.slice(0, 3).map((t, i) => (
                        <span
                          key={t.id}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
                        >
                          {t.category}
                        </span>
                      ))}
                      {data && data.items.length > 3 && (
                        <span className="text-[10px] text-slate-400">
                          +{data.items.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right: Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <h2 className="text-xl font-semibold">이달 요약</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <SummaryTile
                  label="수입"
                  value={`+${w(totals.income)}원`}
                  subtle="text-emerald-600"
                />
                <SummaryTile
                  label="지출"
                  value={`-${w(totals.expense)}원`}
                  subtle="text-rose-600"
                />
                <SummaryTile
                  label="잔액"
                  value={`${w(totals.balance)}원`}
                  subtle={
                    totals.balance >= 0 ? "text-emerald-700" : "text-rose-700"
                  }
                />
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byCategory}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {byCategory.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => `${w(Number(v))}원`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2">
                {byCategory.map((c, i) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    {c.name}
                    <span className="font-medium">{w(c.value)}원</span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent list */}
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-600">
                최근 항목
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
                {[...filteredTx]
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  .slice(0, 12)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border p-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {t.category} {t.note ? `· ${t.note}` : ""}
                        </span>
                        <span className="text-xs text-slate-500">{t.date}</span>
                      </div>
                      <div
                        className={
                          "text-sm font-semibold " +
                          (t.type === "expense"
                            ? "text-rose-600"
                            : "text-emerald-600")
                        }
                      >
                        {t.type === "expense" ? "-" : "+"}
                        {w(t.amount)}원
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AnimatePresence>
        {editing && selectedDate && (
          <Dialog
            open
            onOpenChange={(o) => {
              if (!o) setEditing(null);
            }}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editing.id ? "항목 수정" : "새 항목"} –{" "}
                  {format(selectedDate, "yyyy.MM.dd")}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                <Select
                  value={editing.type}
                  onValueChange={(v: any) =>
                    setEditing({ ...editing, type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">지출</SelectItem>
                    <SelectItem value="income">수입</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="금액"
                  value={editing.amount || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, amount: Number(e.target.value) })
                  }
                />
                <Input
                  placeholder="카테고리 (예: 식비)"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                />
                <Input
                  placeholder="메모"
                  value={editing.note || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, note: e.target.value })
                  }
                />
              </div>

              <DialogFooter className="justify-between">
                {editing.id ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteTx(editing.id);
                      setEditing(null);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(null)}>
                    <X className="mr-2 h-4 w-4" />
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      if (editing.id) {
                        updateTx(editing);
                      } else {
                        addTx(format(selectedDate, "yyyy-MM-dd"), {
                          type: editing.type,
                          amount: editing.amount,
                          category: editing.category || "기타",
                          note: editing.note,
                        });
                      }
                      setEditing(null);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    저장
                  </Button>
                </div>
              </DialogFooter>

              {/* Existing list for that day */}
              <div className="mt-4 space-y-2">
                {dayTotals[format(selectedDate, "yyyy-MM-dd")]?.items.map(
                  (t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border p-2"
                    >
                      <div className="text-sm">
                        {t.category} {t.note ? `· ${t.note}` : ""}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            "text-sm font-semibold " +
                            (t.type === "expense"
                              ? "text-rose-600"
                              : "text-emerald-600")
                          }
                        >
                          {t.type === "expense" ? "-" : "+"}
                          {w(t.amount)}원
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditing(t)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  subtle,
}: {
  label: string;
  value: string;
  subtle?: string;
}) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${subtle || ""}`}>
        {value}
      </div>
    </div>
  );
}

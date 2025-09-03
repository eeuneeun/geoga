"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDialogStore } from "../_store/DialogStore";

type Props = {
  selectDate: {
    start: Date | null;
    end: Date | null;
  };
  getExpense: () => void;
};

type FormValues = {
  category: string;
  memo: string;
  price: number;
  isIncome: boolean;
};
export default function AddDialog({ selectDate, getExpense }: Props) {
  const { isOpen, closeDialog } = useDialogStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log("폼 데이터:", data);
    await addExpense(data);
    getExpense();
    closeDialog();
  };

  async function addExpense(data: FormValues) {
    console.log(Boolean(data.isIncome));
    const res = await fetch(`/api/ledger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: data.category,
        memo: data.memo,
        price: Number(data.price),
        start: new Date(selectDate.start),
        end: new Date(selectDate.end),
        isIncome: Boolean(data.isIncome),
      }),
    });
    const result = await res.json();
    console.log("data", result);
  }

  return (
    <div className={`dialog-wrap ${isOpen ? "open" : ""}`}>
      <div className="dialog">
        <div className="dialog-box">
          <header>수입 & 지출을 입력해주세요.</header>
          <button className="close-btn" onClick={closeDialog}>
            X
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              name="isIncome"
              id="isIncome"
              {...register("isIncome", {
                required: "수입일 경우 선택해주세요!",
              })}
            >
              <option value="0">지출</option>
              <option value="1">수입</option>
            </select>
            <select
              name="category"
              id="category"
              {...register("category", {
                required: "카테고리 선택은 필수입니다",
              })}
            >
              <option value="식비">식비</option>
              <option value="여가비">여가비</option>
              <option value="교통비">교통비</option>
              <option value="통신비">통신비</option>
              <option value="보험">보험</option>
              <option value="공과금">공과금</option>
              <option value="주거비">주거비</option>
              <option value="월급">월급</option>
              <option value="기타">기타</option>
            </select>
            <input
              type="text"
              name="memo"
              id="memo"
              {...register("memo", { required: "사용처는 필수입니다" })}
              placeholder="출처"
            />
            <input
              type="number"
              name="price"
              id="price"
              {...register("price", { required: "금액 필수입니다" })}
              placeholder="금액"
            />

            <div className="error-msg">
              {errors.category && <p>{errors.category.message}</p>}
              {errors.memo && <p>{errors.memo.message}</p>}
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            <button type="submit">등록</button>
          </form>
        </div>
        <div className="bg" onClick={closeDialog}></div>
      </div>
    </div>
  );
}

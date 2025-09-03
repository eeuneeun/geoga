"use client";

import React, { useEffect, useState } from "react";
import { useLedgerStore } from "src/app/_store/LedgerStore";
import { Flower } from "lucide-react";
import DoughnutChart from "src/app/_components/DoughnutChart";

type Props = {};

export default function Summary({}: Props) {
  const { startOfMonth, recentList, setRecentList } = useLedgerStore();
  const [minusPrice, setMinusPrice] = useState(0);
  const [plusPrice, setPlusPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  async function getPlusPrice() {
    let tmpPrice = 0;
    await recentList.map((item, idx) => {
      if (item.isIncome === true) {
        tmpPrice = tmpPrice + item?.price;
      }
    });
    setPlusPrice(tmpPrice);
  }
  async function getMinusPrice() {
    let tmpPrice = 0;
    await recentList.map((item, idx) => {
      if (item.isIncome === false) {
        tmpPrice = tmpPrice + item?.price;
      }
    });
    setMinusPrice(tmpPrice);
  }

  useEffect(() => {
    getMinusPrice();
    getPlusPrice();
  }, [recentList]);

  useEffect(() => {
    setTotalPrice(plusPrice - minusPrice);
  }, [minusPrice]);

  useEffect(() => {
    setRecentList();
  }, []);

  return (
    <div className="summary">
      <h2>
        <Flower />
        이달 요약
      </h2>

      <div className="panel">
        <dl className="plus">
          <dt>수입</dt>
          <dd>+ {plusPrice}</dd>
        </dl>

        <dl className="minus">
          <dt>지출</dt>
          <dd>- {minusPrice}</dd>
        </dl>

        <dl className="total">
          <dt>잔액</dt>
          <dd>{totalPrice}</dd>
        </dl>
      </div>

      <div className="chart">
        <DoughnutChart />
      </div>
    </div>
  );
}

"use client";

import { Flower } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLedgerStore } from "src/app/_store/LedgerStore";

type Props = {};

export default function Summary({}: Props) {
  const { startOfMonth, recentList } = useLedgerStore();
  const [minusPrice, setMinusPrice] = useState(0);

  async function getMinusPrice() {
    let tmpPrice = 0;
    await recentList.map((item, idx) => {
      tmpPrice = tmpPrice + item?.price;
    });
    setMinusPrice(tmpPrice);
  }
  useEffect(() => {
    getMinusPrice();
  }, [recentList]);

  return (
    <div className="summary">
      <h2>
        <Flower />
        이달 요약
      </h2>

      <div className="panel">
        <dl className="plus">
          <dt>수입</dt>
          <dd>+26500</dd>
        </dl>

        <dl className="minus">
          <dt>지출</dt>
          <dd>-{minusPrice}</dd>
        </dl>

        <dl className="total">
          <dt>잔액</dt>
          <dd>+26500</dd>
        </dl>
      </div>

      <div className="chart"></div>
    </div>
  );
}

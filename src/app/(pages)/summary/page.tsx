"use client";

import { Flower } from "lucide-react";
import React from "react";
import { useLedgerStore } from "src/app/_store/LedgerStore";

type Props = {};

export default function Summary({}: Props) {
  const { recentList } = useLedgerStore();

  let tmpPrice = 0;
  recentList.map((item, idx) => {
    tmpPrice = tmpPrice + item.price;
  });
  console.log(tmpPrice);
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
          <dd>-{tmpPrice}</dd>
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

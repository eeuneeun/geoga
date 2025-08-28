import { Flower } from "lucide-react";
import React from "react";

type Props = {};

export default function Summary({}: Props) {
  return (
    <div className="summary">
      <h2>
        <Flower />
        이달 요약
      </h2>

      <div className="panel">
        <dl>
          <dt>수입</dt>
          <dd>+26500</dd>
        </dl>

        <dl>
          <dt>지출</dt>
          <dd>-26500</dd>
        </dl>

        <dl>
          <dt>잔액</dt>
          <dd>+26500</dd>
        </dl>
      </div>

      <div className="chart"></div>
    </div>
  );
}

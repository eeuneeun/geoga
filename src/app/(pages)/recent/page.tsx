import { Lightbulb } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export default function Recent({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="recent">
      <h2>
        <Lightbulb />
        최근 항목
      </h2>
      <ul className="list">
        {list.map((item, idx) => (
          <li className="flex-between">
            <dl>
              <dt>여가</dt>
              <dd>2025-08-25</dd>
            </dl>
            <span className="minus">- 15,000원</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

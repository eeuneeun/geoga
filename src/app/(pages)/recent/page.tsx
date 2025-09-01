import { Lightbulb } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLedgerStore } from "src/app/_store/LedgerStore";

type Props = {};

export default function Recent({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const { recentList, setRecentList } = useLedgerStore();

  useEffect(() => {
    setRecentList();
  }, []);
  return (
    <div className="recent">
      <h2>
        <Lightbulb />
        최근 항목
      </h2>
      <ul className="list">
        {recentList.map((item, idx) => (
          <li className="flex-between" key={item.memo + idx}>
            <dl>
              <dt>{item.memo}</dt>
              <dd>{item.start.split("T")[0]}</dd>
            </dl>
            <span className="minus">- {item.price}원</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

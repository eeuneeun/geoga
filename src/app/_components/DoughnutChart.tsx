"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useLedgerStore } from "../_store/LedgerStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "식비",
    "여가비",
    "교통비",
    "통신비",
    "주거비",
    "보험",
    "공과금",
    "기타",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 9, 10],
      backgroundColor: [
        "#ff638433",
        "#ff9f4033",
        "#ffce5633",
        "#4bc0c033",
        "#36a2eb33",
        "#2929fc33",
        "#9c40ff33",
        "#9e0cca33",
      ],
      borderColor: [
        "#ff6384ff",
        "#ff9f40ff",
        "#ffce56ff",
        "#4bc0c0ff",
        "#36a2ebff",
        "#2d41c3ff",
        "#9966ffff",
        "#500ed5ff",
      ],
      borderWidth: 1,
    },
  ],
};

export default function DoughnutChart() {
  const { startOfMonth, recentList, setRecentList } = useLedgerStore();

  recentList.map((item, idx) => {
    if (item.category == "식비") {
    }
  });

  return <Pie data={data} />;
}

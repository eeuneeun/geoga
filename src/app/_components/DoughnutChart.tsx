"use client";

import React, { useEffect, useState } from "react";
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

  let food = 0;
  let entertain = 0;
  let fare = 0;
  let telecom = 0;
  let housing = 0;
  let insurance = 0;
  let utilities = 0;
  let etc = 0;

  const [chartData, setChartData] = useState({
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
        data: [
          food,
          entertain,
          fare,
          telecom,
          housing,
          insurance,
          utilities,
          etc,
        ],
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
  });

  async function getChartDataArr() {
    await recentList.map((item, idx) => {
      if (item.category == "식비") {
        food = food + 1;
      } else if (item.category == "여가비") {
        entertain = entertain + 1;
      } else if (item.category == "교통비") {
        fare = fare + 1;
      } else if (item.category == "통신비") {
        telecom = telecom + 1;
      } else if (item.category == "주거비") {
        housing = housing + 1;
      } else if (item.category == "보험") {
        insurance = insurance + 1;
      } else if (item.category == "공과금") {
        utilities = utilities + 1;
      } else if (item.category == "기타") {
        etc = etc + 1;
      }
    });

    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0], // 기존 dataset 속성 유지
          data: [
            food,
            entertain,
            fare,
            telecom,
            housing,
            insurance,
            utilities,
            etc,
          ],
        },
      ],
    }));
  }

  useEffect(() => {
    getChartDataArr();
  }, [recentList]);

  return <Pie data={chartData} />;
}

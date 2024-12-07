import { useState, useEffect } from "react";
import { Chart, ChartEvent, ActiveElement } from "chart.js/auto";
import DefaultLayout from "@/layouts/default";

type CalorieData = {
  day: string;
  totalCalories: number;
};

type MealData = {
  meal: string;
  calories: number;
};

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Sun.");
  const [currentWeek, setCurrentWeek] = useState(0);

  const weeklyCalories: CalorieData[][] = [
    [
      { day: "Sun.", totalCalories: 1500 },
      { day: "Mon.", totalCalories: 2200 },
      { day: "Tue.", totalCalories: 1800 },
      { day: "Wed.", totalCalories: 2000 },
      { day: "Thr.", totalCalories: 1700 },
      { day: "Fri.", totalCalories: 2500 },
      { day: "Sat.", totalCalories: 2300 },
    ],
    [
      { day: "Sun.", totalCalories: 1600 },
      { day: "Mon.", totalCalories: 2100 },
      { day: "Tue.", totalCalories: 1900 },
      { day: "Wed.", totalCalories: 1800 },
      { day: "Thr.", totalCalories: 2400 },
      { day: "Fri.", totalCalories: 2600 },
      { day: "Sat.", totalCalories: 2200 },
    ],
  ];

  const calorieData = weeklyCalories[currentWeek];
  const BMR = 2000;

  const meals: MealData[] = [
    { meal: "Breakfast", calories: 350 },
    { meal: "Lunch", calories: 850 },
    { meal: "Dinner", calories: 750 },
  ];

  useEffect(() => {
    if (Chart.getChart("calories")) {
      Chart.getChart("calories")?.destroy();
    }

    const ctx = document.getElementById("calories") as HTMLCanvasElement | null;

    if (ctx) {
      const maxCalories = Math.max(
        ...calorieData.map((row) => row.totalCalories)
      );

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: calorieData.map((row) => row.day),
          datasets: [
            {
              type: "bar",
              label: "Total Calories",
              data: calorieData.map((row) => row.totalCalories),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              type: "line",
              label: "BMR",
              data: calorieData.map(() => BMR),
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: maxCalories + 200,
            },
          },
          onClick: (event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
              const index = elements[0].index as number;
              setSelectedDay(calorieData[index].day);
            }
          },
        },
      });
    }
  }, [currentWeek, calorieData]);

  return <DefaultLayout>{/* Your JSX Code */}</DefaultLayout>;
}

import { useState, useEffect } from "react";
import { Chart, ChartEvent } from "chart.js/auto";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import DefaultLayout from "@/layouts/default";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Sun."); // Default selected day
  const [currentWeek, setCurrentWeek] = useState(0); // Default week index

  // Weekly calorie data
  const weeklyCalories = [
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

  const calorieData = weeklyCalories[currentWeek]; // Get data for the current week
  const maxCalories = 2500; // Maximum calorie value (for scaling the chart)
  const BMR = 2000; // Basal Metabolic Rate (BMR)

  const data = [
    { weekDay: "Mon", count: 1000 },
    { weekDay: "Tue", count: 800 },
    { weekDay: "Wed", count: 2310 },
    { weekDay: "Thu", count: 1583 },
    { weekDay: "Fri", count: 2233 },
    { weekDay: "Sat", count: 1832 },
    { weekDay: "Sun", count: 1693 },
  ];

  const calorieData = weeklyCalories[currentWeek];
  const BMR = 2000;

  const meals = [
    { meal: "Breakfast", calories: 350 },
    { meal: "Lunch", calories: 850 },
    { meal: "Dinner", calories: 750 },
  ];

  const handleBarClick = (data: any) => {
    setSelectedDay(data.weekDay);
  };

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
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              setSelectedDay(calorieData[index].day);
            }
          },
        },
      });
    }
  }, [currentWeek]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* 周切換 */}
        <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center justify-between">
            {/* Previous Week */}
            <button
              onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              aria-label="Previous Week"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <h2 className="text-lg font-semibold">
              Week of {7 + currentWeek * 7}-{13 + currentWeek * 7}
            </h2>

            {/* Next Week */}
            <button
              onClick={() =>
                setCurrentWeek((prev) =>
                  Math.min(prev + 1, weeklyCalories.length - 1)
                )
              }
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              aria-label="Next Week"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 圖表 */}
        <div className="w-full max-w-lg">
          <canvas id="calories" />
        </div>

        {/* 詳細熱量信息 */}
        <div className="w-full max-w-lg p-4 bg-gray-200 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{selectedDay}</h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Total Calories</span>
            <span className="text-lg font-bold">
              {calorieData.find(({ day }) => day === selectedDay)
                ?.totalCalories ?? 0}
            </span>
          </div>
          <hr className="border-gray-400 mb-4" />
          {meals.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">{item.meal}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.calories}</span>
                <button className="w-6 h-6 bg-blue-300 rounded-full text-white flex items-center justify-center">
                  ...
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Add
            </button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

import { useState, useEffect } from "react";
import { Chart, ChartEvent, ActiveElement } from "chart.js/auto";
import DefaultLayout from "@/layouts/default";

type CalorieData = {
  day: string;
  totalCalories: number;
};

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Sun.");
  const [currentWeek, setCurrentWeek] = useState(0);

  // Weekly calorie data
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
          onClick: (_: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
              const index = elements[0].index as number;
              setSelectedDay(calorieData[index].day);
            }
          },
        },
      });
    }
  }, [currentWeek, calorieData]);

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => Math.max(prev - 1, 0));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => Math.min(prev + 1, weeklyCalories.length - 1));
  };

  return (
    <DefaultLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Weekly Calorie Dashboard</h1>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousWeek}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Previous Week
          </button>
          <span className="text-lg font-medium">
            Week {currentWeek + 1} of {weeklyCalories.length}
          </span>
          <button
            onClick={handleNextWeek}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Next Week
          </button>
        </div>

        {/* Calorie Chart */}
        <div className="mb-6">
          <canvas id="calories"></canvas>
        </div>

        {/* Selected Day Details */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Details for {selectedDay}
          </h2>
          <p>
            Total Calories:{" "}
            <span className="font-bold">
              {calorieData.find((item) => item.day === selectedDay)
                ?.totalCalories || 0}
            </span>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}

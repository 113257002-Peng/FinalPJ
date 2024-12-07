import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";

type FoodEntry = {
  name: string;
  weight: string;
  calories: string;
};

export default function FoodRecordPage() {
  const [meal, setMeal] = useState<string>("Dinner");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    { name: "", weight: "", calories: "" },
  ]);
  const [recommendation, setRecommendation] = useState<string>("");

  // 自動設定時間和日期
  useEffect(() => {
    const now = new Date();

    // 格式化時間 (HH:mm)
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);

    // 格式化日期 (e.g., 2024 Oct 11)
    const formattedDate = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    setDate(formattedDate);
  }, []);

  const handleAddEntry = () => {
    setFoodEntries((prev) => [...prev, { name: "", weight: "", calories: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof FoodEntry,
    value: string
  ) => {
    setFoodEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleDeleteEntry = (index: number) => {
    setFoodEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateRecommendation = async () => {
    try {
      const response = await fetch("/api/generate-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meal, foodEntries }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const data = await response.json();
      setRecommendation(data.recommendation || "無法產生建議");
    } catch (error) {
      console.error("Error generating recommendation:", error);
      setRecommendation("發生錯誤，無法生成建議");
    }
  };

  const handleSubmitResults = () => {
    // 處理提交邏輯（可擴展）
    alert("紀錄成功！");
  };

  return (
    <DefaultLayout>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">What did you eat?</h1>
        <div className="flex items-center gap-4 mb-4">
          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="bg-gray-200 text-gray-600 py-1 px-3 rounded"
          >
            <option value="Breakfast">早餐</option>
            <option value="Lunch">午餐</option>
            <option value="Dinner">晚餐</option>
            <option value="Other">其他</option>
          </select>
          <span className="text-gray-600">{time}</span>
          <span className="text-gray-600 ml-auto">{date}</span>
        </div>

        {/* 固定大小的紀錄框 */}
        <div className="border p-4 rounded-lg shadow h-64 flex flex-col justify-between">
          {/* 滾動列表區域 */}
          <div className="overflow-y-auto flex-grow">
            <div className="space-y-2">
              {foodEntries.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* 刪除按鈕 */}
                  <button
                    onClick={() => handleDeleteEntry(index)}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                  >
                    ✕
                  </button>
                  {/* 輸入框：寬度相同 */}
                  <input
                    type="text"
                    placeholder="食物內容"
                    value={entry.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="border p-2 rounded text-sm flex-1 min-w-[100px]"
                  />
                  <input
                    type="text"
                    placeholder="克數 (選填)"
                    value={entry.weight}
                    onChange={(e) =>
                      handleInputChange(index, "weight", e.target.value)
                    }
                    className="border p-2 rounded text-sm flex-1 min-w-[100px]"
                  />
                  <input
                    type="text"
                    placeholder="卡路里 (選填)"
                    value={entry.calories}
                    onChange={(e) =>
                      handleInputChange(index, "calories", e.target.value)
                    }
                    className="border p-2 rounded text-sm flex-1 min-w-[100px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* + 按鈕固定在框內底部 */}
          <button
            onClick={handleAddEntry}
            className="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 w-full"
          >
            +
          </button>
        </div>

        <button
          onClick={handleGenerateRecommendation}
          className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 hover:bg-purple-600"
        >
          飲食建議生成
        </button>

        <h2 className="text-xl font-bold mt-6">飲食建議</h2>
        <div className="border p-4 rounded-lg bg-gray-100 mt-2">
          {recommendation || ""}
        </div>

        <button
          onClick={handleSubmitResults}
          className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 hover:bg-purple-600"
        >
          紀錄結果
        </button>
      </div>
    </DefaultLayout>
  );
}

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";

type FoodEntry = {
  name: string;
  weight: string;
  calories: string;
};

export default function FoodRecordPage() {
  const [mealType, setMealType] = useState<string>("Dinner");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    { name: "", weight: "", calories: "" },
  ]);
  const [recommendation, setRecommendation] = useState<string>("");

  // 自動設定時間和日期
  useEffect(() => {
    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    setCurrentTime(formattedTime);
    setCurrentDate(formattedDate);
  }, []);

  // 新增食物條目
  const handleAddEntry = () => {
    setFoodEntries((prev) => [...prev, { name: "", weight: "", calories: "" }]);
  };

  // 更新條目內容
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

  // 刪除指定條目
  const handleDeleteEntry = (index: number) => {
    setFoodEntries((prev) => prev.filter((_, i) => i !== index));
  };

  // 生成飲食建議
  const handleGenerateRecommendation = async () => {
    try {
      const response = await fetch("/api/generate-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mealType, foodEntries }),
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

  // 提交結果
  const handleSubmitResults = () => {
    if (foodEntries.some((entry) => !entry.name.trim())) {
      alert("請確認所有食物條目已填寫名稱！");
      return;
    }

    alert("紀錄成功！");
  };

  return (
    <DefaultLayout>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">What did you eat?</h1>
        {/* 餐類型與時間顯示 */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="bg-gray-200 text-gray-600 py-2 px-4 rounded"
          >
            <option value="Breakfast">早餐</option>
            <option value="Lunch">午餐</option>
            <option value="Dinner">晚餐</option>
            <option value="Other">其他</option>
          </select>
          <span className="text-gray-600">{currentTime}</span>
          <span className="text-gray-600 ml-auto">{currentDate}</span>
        </div>

        {/* 食物紀錄區域 */}
        <div className="border p-4 rounded-lg shadow h-64 flex flex-col justify-between">
          <div className="overflow-y-auto flex-grow space-y-4">
            {foodEntries.map((entry, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* 刪除按鈕 */}
                <button
                  onClick={() => handleDeleteEntry(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  aria-label="刪除條目"
                >
                  ✕
                </button>
                {/* 食物名稱輸入框 */}
                <input
                  type="text"
                  placeholder="食物名稱"
                  value={entry.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="border p-2 rounded text-sm flex-1"
                />
                {/* 重量輸入框 */}
                <input
                  type="text"
                  placeholder="重量 (克)"
                  value={entry.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                  className="border p-2 rounded text-sm flex-1"
                />
                {/* 卡路里輸入框 */}
                <input
                  type="text"
                  placeholder="卡路里"
                  value={entry.calories}
                  onChange={(e) =>
                    handleInputChange(index, "calories", e.target.value)
                  }
                  className="border p-2 rounded text-sm flex-1"
                />
              </div>
            ))}
          </div>

          {/* 新增條目按鈕 */}
          <button
            onClick={handleAddEntry}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 w-full mt-4"
          >
            新增條目 +
          </button>
        </div>

        {/* 生成建議按鈕 */}
        <button
          onClick={handleGenerateRecommendation}
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600"
        >
          生成飲食建議
        </button>

        {/* 顯示建議區域 */}
        <h2 className="text-xl font-bold mt-6">飲食建議</h2>
        <div className="border p-4 rounded-lg bg-gray-100 mt-2">
          {recommendation || "目前無建議"}
        </div>

        {/* 提交按鈕 */}
        <button
          onClick={handleSubmitResults}
          className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 hover:bg-purple-600"
        >
          提交紀錄
        </button>
      </div>
    </DefaultLayout>
  );
}

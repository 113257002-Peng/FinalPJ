import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";

type FoodEntry = {
  name: string;
  weight?: string; // 克數是選填
  calories?: string; // 熱量是選填
};

export default function MealDetailPage() {
  const [mealDetails] = useState({
    meal: "Lunch",
    timestamp: "Oct 11 at 10:20 pm",
    estimatedCalories: "890",
  });

  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [suggestions, setSuggestions] = useState<string>("");

  useEffect(() => {
    // 模擬從 API 獲取數據
    const fetchData = async () => {
      try {
        // 模擬 API 獲取今日飲食
        const fetchedFoodEntries: FoodEntry[] = [
          { name: "Grilled Chicken", weight: "150", calories: "300" },
          { name: "Salad", weight: "100" },
          { name: "Orange Juice" },
        ];

        // 模擬 API 獲取飲食建議
        const fetchedSuggestions = "建議多攝取蔬菜和水果，避免高熱量飲食。";

        // 設置數據
        setFoodEntries(fetchedFoodEntries);
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    console.log("Back button clicked"); // 模擬返回功能
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Header with Back Button */}
        <div className="w-full max-w-lg flex items-center mb-4">
          <button
            onClick={handleBack}
            className="text-2xl font-bold text-gray-600 hover:text-gray-900"
            aria-label="返回"
          >
            &lt;
          </button>
          <h1 className="text-2xl font-bold ml-4">{mealDetails.meal}</h1>
        </div>

        {/* Timestamp */}
        <p className="w-full max-w-lg text-sm text-gray-500">
          {mealDetails.timestamp}
        </p>

        {/* Food Entries */}
        <div className="w-full max-w-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">今日飲食</h2>
          <div className="border p-4 rounded-lg shadow space-y-4 bg-gray-50">
            {foodEntries.length > 0 ? (
              foodEntries.map((entry, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-sm font-medium">
                    食物名稱: <span className="font-normal">{entry.name}</span>
                  </p>
                  {entry.weight && (
                    <p className="text-sm font-medium">
                      克數:{" "}
                      <span className="font-normal">{entry.weight} 克</span>
                    </p>
                  )}
                  {entry.calories && (
                    <p className="text-sm font-medium">
                      熱量:{" "}
                      <span className="font-normal">{entry.calories} kcal</span>
                    </p>
                  )}
                  <hr className="my-2 border-gray-300" />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">目前沒有紀錄</p>
            )}
          </div>
        </div>

        {/* Estimated Calories */}
        <div className="text-center mt-6">
          <h2 className="text-lg font-semibold">熱量</h2>
          <p className="text-4xl font-bold mt-2">
            {mealDetails.estimatedCalories}
            <span className="text-xl font-light text-gray-500"> Kcal</span>
          </p>
        </div>

        {/* Suggestions */}
        <div className="w-full max-w-lg mt-6">
          <h2 className="text-lg font-semibold mb-2">飲食建議</h2>
          <div className="border p-4 rounded-lg shadow bg-gray-50">
            {suggestions ? (
              <p className="text-sm text-gray-700">{suggestions}</p>
            ) : (
              <p className="text-sm text-gray-500">目前沒有建議</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => console.log("Chat with AI")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Chat with AI
          </button>
          <button
            onClick={() => console.log("Edit meal details")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => console.log("Delete meal details")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

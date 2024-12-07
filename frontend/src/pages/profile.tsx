import { useState } from "react";
import DefaultLayout from "@/layouts/default";
// import { Navbar } from "@/components/navbar"; // 確保路徑正確

export default function ProfilePage() {
  const [userInfo] = useState({
    name: "User",
    email: "XXXXXXX@nccu.edu.tw",
    age: 24,
    height: 168,
    weight: 74,
    exerciseFrequency: 5,
  });

  const calculateBMR = () => {
    return Math.round(
      10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age + 5
    );
  };

  return (
    <div>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-gray-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
            {/* 用戶資訊 */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM21 20.25a8.25 8.25 0 10-18 0"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mt-4">{userInfo.name}</h2>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
              <button className="px-4 py-1 mt-2 bg-gray-200 text-gray-600 rounded-full text-sm hover:bg-gray-300">
                Edit Profile
              </button>
            </div>
            <hr className="border-gray-300 mb-6" />
            {/* 用戶詳細資訊 */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Age</span>
                <span>
                  {userInfo.age}{" "}
                  <span className="text-gray-500">years old</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Height</span>
                <span>
                  {userInfo.height} <span className="text-gray-500">cm</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>
                  {userInfo.weight} <span className="text-gray-500">kg</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Exercise Frequency</span>
                <span>
                  {userInfo.exerciseFrequency}{" "}
                  <span className="text-gray-500">per week</span>
                </span>
              </div>
            </div>
            <hr className="border-gray-300 mt-6 mb-4" />
            {/* BMR 計算結果 */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Estimated BMR</h3>
              <p className="text-4xl font-bold">{calculateBMR()}</p>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </div>
  );
}

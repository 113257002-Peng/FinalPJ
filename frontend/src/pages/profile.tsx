import { useState, useRef } from "react";
import DefaultLayout from "@/layouts/default";

// 定義 UserInfo 的型別，讓 avatar 支援 string | null
type UserInfo = {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  exerciseFrequency: number;
  avatar: string | null;
};

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "User",
    email: "XXXXXXX@nccu.edu.tw",
    age: 24,
    height: 168,
    weight: 74,
    exerciseFrequency: 5,
    avatar: null, // 頭像初始值
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState<UserInfo>({ ...userInfo });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 計算 BMR
  const calculateBMR = () => {
    return Math.round(
      10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age + 5
    );
  };

  // 處理輸入變更
  const handleInputChange = (field: keyof UserInfo, value: string | number) => {
    setEditInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 處理頭像變更
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditInfo((prev) => ({
          ...prev,
          avatar: reader.result as string, // 將圖片以 Base64 格式存入
        }));
      };
      reader.readAsDataURL(file); // 讀取檔案
    }
  };

  // 保存變更
  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false); // 結束編輯模式
  };

  // 取消編輯
  const handleCancel = () => {
    setEditInfo({ ...userInfo }); // 恢復原本的資料
    setIsEditing(false); // 結束編輯模式
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // 模擬點擊檔案上傳按鈕
  };

  return (
    <div>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-gray-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
            {/* 用戶資訊 */}
            <div className="flex flex-col items-center mb-6">
              {/* 點擊頭像觸發檔案上傳 */}
              <div
                className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden cursor-pointer relative group"
                onClick={handleAvatarClick}
              >
                {editInfo.avatar ? (
                  <img
                    src={editInfo.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-600"
                  >
                    <circle cx="12" cy="7" r="4" stroke="currentColor" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18a6 6 0 0112 0"
                    />
                  </svg>
                )}
                {/* 顯示提示文字 */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm text-center">
                    Change Avatar
                  </span>
                </div>
              </div>
              {/* 隱藏的檔案上傳 input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-semibold mt-4">
                    {userInfo.name}
                  </h2>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                  <button
                    className="px-4 py-1 mt-2 bg-gray-200 text-gray-600 rounded-full text-sm hover:bg-gray-300"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <input
                    className="mt-4 p-2 border rounded w-full"
                    value={editInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  <input
                    className="mt-2 p-2 border rounded w-full"
                    value={editInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 bg-gray-200 text-gray-600 rounded-full text-sm hover:bg-gray-300"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <hr className="border-gray-300 mb-6" />
            {/* 用戶詳細資訊 */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Age</span>
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      value={editInfo.age}
                      onChange={(e) =>
                        handleInputChange("age", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Height</span>
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      value={editInfo.height}
                      onChange={(e) =>
                        handleInputChange("height", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Weight</span>
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      value={editInfo.weight}
                      onChange={(e) =>
                        handleInputChange("weight", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exercise Frequency</span>
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      value={editInfo.exerciseFrequency}
                      onChange={(e) =>
                        handleInputChange(
                          "exerciseFrequency",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </>
              ) : (
                <>
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
                      {userInfo.height}{" "}
                      <span className="text-gray-500">cm</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Weight</span>
                    <span>
                      {userInfo.weight}{" "}
                      <span className="text-gray-500">kg</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exercise Frequency</span>
                    <span>
                      {userInfo.exerciseFrequency}{" "}
                      <span className="text-gray-500">per week</span>
                    </span>
                  </div>
                </>
              )}
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

import { Route, Routes } from "react-router-dom";

// 導入各個頁面
import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import DashboardPage from "@/pages/dashboard";
import InfoFormPage from "@/pages/info-form";
import ProfilePage from "@/pages/profile";
import ChatboxPage from "@/pages/chatbox";
import FoodRecordPage from "@/pages/FoodRecord";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<InfoFormPage />} path="/info-form" />
      <Route element={<ProfilePage />} path="/profile" />
      <Route element={<ChatboxPage />} path="/chatbox" />
      <Route element={<FoodRecordPage />} path="/FoodRecord" />
    </Routes>
  );
}

export default App;

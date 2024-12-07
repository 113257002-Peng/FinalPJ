import { useState, useRef, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default";

export default function ChatboxPage() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "歡迎使用 Chatbot！有什麼我可以幫助您的？" },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null); // 參考 Chat Window

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // 添加用戶訊息
    const newMessages = [
      ...messages,
      { type: "user", text: userInput },
      { type: "bot", text: `您剛剛說了：「${userInput}」` }, // 模擬 Chatbot 回應
    ];
    setMessages(newMessages);
    setUserInput("");
  };

  const quickReplies = ["問題一", "問題二", "問題三"]; // 可以設定問題(? 但不確定要不要留這個功能

  const handleQuickReply = (text: string) => {
    setMessages([
      ...messages,
      { type: "user", text },
      { type: "bot", text: `回應於：${text}` },
    ]);
  };

  // 滾動到最新訊息
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // 當 messages 更新時觸發

  return (
    <DefaultLayout>
      <section className="flex flex-col h-screen">
        {/* Chat Window */}
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{ paddingBottom: "120px" }} // 確保聊天內容不被下方元素遮住
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                message.type === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.type === "bot"
                    ? "bg-gray-300 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* 滾動到此處 */}
          <div ref={chatWindowRef} />
        </div>

        {/* Quick Replies + Input Box */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
          {/* Quick Replies */}
          <div className="flex gap-2 bg-gray-100 p-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                size="sm"
                className="bg-purple-500 text-white"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center p-4">
            <Input
              size="lg"
              placeholder="Message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform"
              onClick={handleSendMessage}
            >
              ➤
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

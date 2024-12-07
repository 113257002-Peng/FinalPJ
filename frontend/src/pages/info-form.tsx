import { useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function InfoFormPage() {
  const [biologicalSex, setBiologicalSex] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full max-w-lg justify-center">
          {/* 標題 */}
          <div className="inline-block max-w-lg mb-8 text-center">
            <h1 className={title({ size: "sm" })}>我們需要您的一些資訊...</h1>
          </div>
          {/* 表單內容 */}
          <div className="grid gap-6 max-w-lg w-full">
            {/* 日期選擇器 */}
            <div>
              <DatePicker showMonthAndYearPickers label="Date" />
            </div>
            {/* 身高和體重 */}
            <Input label="Height" placeholder="cm" size="lg" type="number" />
            <Input label="Weight" placeholder="kg" size="lg" type="number" />
            {/* 性別選擇 */}
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                生理性別
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="biologicalSex"
                    value="男性"
                    checked={biologicalSex === "男性"}
                    onChange={(e) => setBiologicalSex(e.target.value)}
                  />
                  <span>男性</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="biologicalSex"
                    value="女性"
                    checked={biologicalSex === "女性"}
                    onChange={(e) => setBiologicalSex(e.target.value)}
                  />
                  <span>女性</span>
                </label>
              </div>
            </div>
            {/* 運動頻率 */}
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                每周訓練頻率?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="exerciseFrequency"
                    value="Never"
                    checked={exerciseFrequency === "Never"}
                    onChange={(e) => setExerciseFrequency(e.target.value)}
                  />
                  <span>Never</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="exerciseFrequency"
                    value="1~3"
                    checked={exerciseFrequency === "1~3"}
                    onChange={(e) => setExerciseFrequency(e.target.value)}
                  />
                  <span>1~3</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="exerciseFrequency"
                    value="4~5"
                    checked={exerciseFrequency === "4~5"}
                    onChange={(e) => setExerciseFrequency(e.target.value)}
                  />
                  <span>4~5</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="exerciseFrequency"
                    value="6~7"
                    checked={exerciseFrequency === "6~7"}
                    onChange={(e) => setExerciseFrequency(e.target.value)}
                  />
                  <span>6~7</span>
                </label>
              </div>
            </div>
            {/* 提交按鈕 */}
            <div className="text-center">
              <Button size="lg" className="bg-gray-500 text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

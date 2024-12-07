import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  FacebookLogo,
  GoogleLogo,
} from "@/components/icons";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg mb-4">
          <h1 className={title()}>使用者登入</h1>
        </div>
        <div className="grid gap-4 max-w-lg w-full">
          <Input label="Email" size="lg" type="email" />
          <div>
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="w-7 fill-white text-2xl pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="w-7 fill-white text-2xl pointer-events-none" />
                  )}
                </button>
              }
              label="Password"
              size="lg"
              type={isVisible ? "text" : "password"}
            />
            <div className="mt-2 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forget Password?
              </a>
            </div>
          </div>
          <Button size="lg">登入</Button>
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              startContent={<GoogleLogo className="w-6 shrink-0" />}
            >
              Google 登入
            </Button>
            <Button
              size="lg"
              startContent={<FacebookLogo className="w-6 shrink-0" />}
            >
              Facebook 登入
            </Button>
          </div>
          {/* 新增註冊文字 */}
          <div className="mt-4 text-center">
            <span className="text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Register here.
              </a>
            </span>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

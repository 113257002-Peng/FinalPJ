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

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg mb-4">
          <h1 className={title()}>成為新用戶</h1>
        </div>
        <div className="grid gap-4 max-w-lg w-full">
          <Input label="Name" size="lg" />
          <Input label="Email" size="lg" type="email" />
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
          <Button size="lg">註冊</Button>
          <div className="grid grid-cols-2 gap-4">
            <Button size="lg" startContent={<GoogleLogo className="w-6" />}>
              Google 註冊
            </Button>
            <Button size="lg" startContent={<FacebookLogo className="w-6" />}>
              Facebook 註冊
            </Button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm">
              Already have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Log in here.
              </a>
            </span>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

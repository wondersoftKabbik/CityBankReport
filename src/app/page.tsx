"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home: FC = () => {
  // const reportData: any = await getDailyReportsList();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userType") === "admin") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  });
  return <></>;
};
export default Home;

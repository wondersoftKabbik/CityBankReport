"use client";
import { FC, useEffect } from "react";
import DailyReportPage from "@/components/daily-report/dailyReport";
import getDailyReportsList from "@/libs/getDailyReportsList";
import { useRouter } from "next/navigation";

const Dashboard: FC = () => {
  // const reportData: any = await getDailyReportsList();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userType") !== "admin") {
      router.replace("/login");
    }
  });
  return <DailyReportPage />;
};
export default Dashboard;

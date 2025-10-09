"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import moment from "moment";
import { Endpoint } from "@/utils/constants";
import { getDataApi } from "@/services/api.service";
import Swal from "sweetalert2";

const DailyReportPage: FC = () => {
  const { push } = useRouter();
  const [showData, setShowData] = useState([]);
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const dateHandler = async (event: any) => {
    event.preventDefault();

    if (
      moment(endDate).format("YYYY-MM-DD") <
      moment(startDate).format("YYYY-MM-DD")
    ) {
      Swal.fire({
        icon: "warning",
        text: "End date should be greater than Start date",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
      return;
    }

    const url = `${Endpoint.dailyReportData}?fromDate=${moment(
      startDate
    ).format("YYYY-MM-DD")}&toDate=${moment(endDate).format("YYYY-MM-DD")}`;
    try {
      const response = await getDataApi(url);
      setShowData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setSelectedUserId("");
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-[#FD0002] font-medium">
          Daily Report List
        </h1>

        <div className="my-4 flex space-x-4 items-center justify-between">
          <div className="flex space-x-4 items-center w-full">
            <input
              type="date"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#f16522]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#f16522]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {/* <select
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User</option>
              {Array.from(
                new Map(
                  attendenceList?.map((entry) => [entry.userId, entry])
                ).values()
              ).map((entry) => (
                <option key={entry.userId} value={entry.userId}>
                  {entry.user.name}
                </option>
              ))}
            </select> */}
          </div>
          <button
            onClick={dateHandler}
            className="bg-[#FD0002] w-1/3 text-white p-3 rounded-lg hover:bg-[#FD0002]/90"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table">
            <thead className="table-header-group">
              <tr className="border border-none table-row">
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Date
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  DAU Count
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  MAU Count
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  New User
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Old User
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Return User
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Total Hit
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Revenue
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  App Average Session (min)
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Streamming Average Session (min)
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Total Streamming Hour
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Streamming Unique MSISDN
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Session Unique MSISDN
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {showData?.map((entry: any, index: any) => (
                <tr
                  key={entry.create_at}
                  className="bg-white border border-none table-row"
                >
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {moment(entry.date).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.dau_count}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.mau_count}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.new_user}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.old_user}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.return_user}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.total_hit}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.revenue}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {Math.round((entry.average_session / 60) * 100) / 100}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {Math.round((entry.streaming_average_session / 60) * 100) /
                      100}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {Math.round((entry.total_streaming / 3600) * 100) / 100}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.streaming_unique_msisdn}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.session_unique_msisdn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DailyReportPage;

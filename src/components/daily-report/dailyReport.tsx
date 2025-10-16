"use client";

import { FC, RefObject, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import moment from "moment";
import { Endpoint } from "@/utils/constants";
import { getDataApi } from "@/services/api.service";
import Swal from "sweetalert2";
import { DownloadTableExcel } from 'react-export-table-to-excel';


const DailyReportPage: FC = () => {
  const { push } = useRouter();
  const [showData, setShowData] = useState([]);
  const tableRef=useRef<HTMLTableElement>(null);
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

  const calculateTotal=(field:string)=>{
     let result = showData.reduce((a,c)=>{
      console.log(a)
      return a+(Number(c[field])??0)
    },0)
     return result
  }

  return (
    <>
      <div className="p-4">
       <div className="flex justify-between">
          <h1 className="text-2xl text-[#FD0002] font-medium">
            Daily Report List
          </h1>
          <div className="px-3 py-1 border-1 border-gray-500 rounded-[4px] cursor-pointer">
            <DownloadTableExcel
              filename={`${startDate}TO${endDate}Payment Report`}
              
              sheet="users"
              
              currentTableRef={tableRef.current}
            >
              <button>Export to Excel</button>
            </DownloadTableExcel>
          </div>
       </div>

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
          <table ref={tableRef} className="min-w-full border-collapse table">
            <thead className="table-header-group">
              <tr className="border border-none table-row">
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  SL NO.
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Transaction Date
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Kabbik Audio Ref. id
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  City Bank Ref. id
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Tran Amount
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Bank Commission
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Settlement Amount
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Status
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Type
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Merchant Name
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Type of Transaction
                </th>
              
              </tr>
              <tr className="border border-none table-row">
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  Total
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  {calculateTotal('amount')}
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  {calculateTotal('bank_commission')}
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                 {calculateTotal('settlement_amount')}
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                  
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300 text-left table-cell">
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
                    {index}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {moment(entry.created_at).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.subscriptionReferenceId}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.city_transection_id}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.amount}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.bank_commission}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.settlement_amount}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.payment_status??"Failed"}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.refund?"REFUND":"PAY"}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {entry.marchant}
                  </td>
                  <td className="p-2 border border-gray-500 text-gray-600 text-left table-cell">
                    {"Account"}
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

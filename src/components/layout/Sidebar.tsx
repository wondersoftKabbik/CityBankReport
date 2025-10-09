import { BiSolidDashboard } from "react-icons/bi";
import {
  FaClipboardUser,
  FaFileInvoiceDollar,
  FaHouseChimneyMedical,
  FaPeopleGroup,
  FaUnity,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaUsersGear,
  FaWarehouse,
} from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";

import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CgCommunity, CgOrganisation, CgPathUnite } from "react-icons/cg";
import { GoOrganization } from "react-icons/go";
import {
  GiEvilTower,
  GiFloorHatch,
  GiNotebook,
  GiOrganigram,
} from "react-icons/gi";
import {
  LiaBroadcastTowerSolid,
  LiaFileInvoiceSolid,
  LiaHeadingSolid,
} from "react-icons/lia";
import {
  PiComputerTowerDuotone,
  PiDesktopTowerThin,
  PiHeadlightsDuotone,
  PiWall,
} from "react-icons/pi";
import { MdAcUnit } from "react-icons/md";
import {
  TbBrandHeadlessui,
  TbFileInvoice,
  TbMessageReport,
} from "react-icons/tb";
import { FaHouseDamage, FaUserCog } from "react-icons/fa";
import { ImShift } from "react-icons/im";
import { HiClipboardDocumentList, HiMiniUserPlus } from "react-icons/hi2";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUser, GrNotes, GrOrganization } from "react-icons/gr";
import { TfiFacebook } from "react-icons/tfi";
import { SiCoderwall } from "react-icons/si";

export default function Sidebar() {
  const pathname = usePathname();
  const { push } = useRouter();
  return (
    <div className="drawer-side h-full z-40 overflow-hidden">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="w-[300px] bg-fm-gray-100 h-screen overflow-hidden">
        <div className="flex px-4 pb-2 pt-4 items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <picture>
                <img src="/images/logo.png" alt="" />
              </picture>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-[#f16522]">City Touch CRM</h1>
        </div>
        <div className="overflow-y-auto h-[calc(100%_-_72px)] p-4">
          <ul className="menu text-base-content flex flex-col gap-1 !p-0">
            <li onClick={() => push("/")}>
              <summary
                className={`group text-fm-body-p4 font-semibold bg-fm-white-100 
                        ${pathname === "/" && "!bg-[#f16522] !text-fm-white-100"}`}
              >
                <span className="bg-gray-100 rounded-lg p-1">
                  {/* <Dashboard color={pathname === "/" && "#fff"} /> */}
                  <BiSolidReport
                    className={`${pathname === "/" && "text-[#FD0002]"} text-xl`}
                  />
                </span>
                Daily Report
              </summary>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

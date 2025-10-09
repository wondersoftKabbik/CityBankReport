"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoBell } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { Menu } from "@/components/icon";
import NextNProgress from "nextjs-progressbar";
import { destroyCookie, parseCookies } from "nookies";
import { getCookie } from "cookies-next";
import { role } from "@/utils/globalfunction";
import Sidebar from "@/components/layout/Sidebar";
import { Endpoint } from "@/utils/constants";
import { getDataApi } from "@/services/api.service";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cookies = parseCookies();
  const token = getCookie("token");
  const { push } = useRouter();
  const userId = getCookie("user_id");
  const [imageError, setImageError] = useState(false);
  const [locallyStoredUserItem, setLocallyStoredUserItem] = useState<
    null | string
  >("");

  const handleImageError = () => {
    setImageError(true);
  };
  const logout = () => {
    localStorage.clear();
    push("/login");
  };
  useEffect(() => {
    const getUserDetails = async () => {
      const url = Endpoint.exampleData;

      try {
        const data = await getDataApi(url);
        if (data.status === 200 || data.status === 201) {
          // setRoles(data.data.roles);
          // setUserInfo(data.data.user);
          // setPermissions(data.data.permissions);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      const intervalId = setInterval(getUserDetails, 10000);
      return () => clearInterval(intervalId);
    }
  }, [token]);

  useEffect(() => {
    setLocallyStoredUserItem(localStorage.getItem("user"));
  }, []);

  return (
    <>
      <NextNProgress
        color="#588EEB"
        startPosition={0}
        height={2}
        showOnShallow={true}
      />
      {pathname === "/login" ? (
        <div className="min-h-screen w-full">{children}</div>
      ) : (
        <div className="drawer !fixed inset-0">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center overflow-y-auto">
            <div className="w-full navbar bg-rb-white-100 shadow-rb-shadow-1 border-b-1 border-b-rb-gray-50 sticky top-0 z-30">
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost outline-0"
                >
                  <Menu />
                </label>
              </div>
              <div className="">
                <ul className="menu menu-horizontal py-0">
                  <li>
                    <details>
                      <summary className="!p-0 hover:bg-transparent">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <picture>
                              <img
                                src={"/images/user-placeholder.jpg"}
                                alt="Profile"
                              />
                            </picture>
                          </div>
                        </div>
                        <div className="">
                          <h3 className="text-rb-body-p3-hi">
                            {locallyStoredUserItem}
                          </h3>
                          <p className="text-rb-body-p5">Admin</p>
                        </div>
                      </summary>
                      <ul className="p-2 bg-base-100 rounded-t-none !mt-0 min-w-full">
                        {/* <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                        <li>
                          <a>Settings</a>
                        </li> */}
                        <li onClick={() => logout()}>
                          <a>Logout</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
              {/* <div className="navbar-end justify-start ps-4">
                <button className="btn btn-ghost btn-circle outline-0">
                  <AiOutlineMail size={20} />
                </button>
                <button className="btn btn-ghost btn-circle outline-0">
                  <div className="indicator">
                    <GoBell size={20} />
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
                <button className="btn btn-ghost btn-circle outline-0">
                  <CiSquarePlus size={28} />
                </button>
              </div> */}
            </div>
            <div className="main-body">{children}</div>
          </div>
          <Sidebar />
        </div>
      )}
    </>
  );
}

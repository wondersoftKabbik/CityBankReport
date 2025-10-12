"use client";
import React, { FC, useContext, useState } from "react";
import Swal from "sweetalert2";
import { Endpoint } from "@/utils/constants";
import { postApiWithoutToken } from "@/services/api.service";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading";
import { userData, LoginLogic } from "@/utils/userData";

const Login: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const { setUserInfo, setUserType, setRoles, setPermissions } =
  //   useContext(Context);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!userName || !password) {
      setIsLoading(false);
      await Swal.fire({
        title: "Warning",
        icon: "warning",
        text: `Username or Password cant't be empty. Please try again!`,
        showConfirmButton: true,
        timer: 4000,
      })
      return;
    }
    // const url = Endpoint.adminLogin;
    // const option = {
    //   password: password,
    //   username: userName,
    // };
    try {
      // const res = await postApiWithoutToken(url, option);
      // if (res.status === 201 || res.status === 200) {
      //   setIsLoading(false);
      // setCookie("token", res.data.token, {
      //   maxAge: 60 * 60 * 24,
      // });
      // setUserInfo(res.data.data.user);
      // setUserType(res.data.data.userType);
      // setRoles(res.data.data.roles);
      // setPermissions(res.data.data.permissions);
      //   localStorage.setItem("user", JSON.stringify(res.data.data.user));
      //   localStorage.setItem(
      //     "userType",
      //     JSON.stringify(res.data.data.userType)
      //   );
      // localStorage.setItem("roles", JSON.stringify(res.data.data.roles));
      // localStorage.setItem(
      //   "permissions",
      //   JSON.stringify(res.data.data.permissions)
      // );
      //   router.push("/");
      // } else {
      //   setIsLoading(false);
      //   await Swal.fire({
      //     title: "Warning",
      //     icon: "warning",
      //     text: `${res.message}. Please try again!`,
      //     showConfirmButton: true,
      //     timer: 4000,
      //   });
      //   return false;
      // }

      // ========== Temporary Login Logic ===========
      const res = LoginLogic(userName, password);
      setIsLoading(false);
      if (res) {
        localStorage.setItem("user", res.username);
        localStorage.setItem("userType", res.userType);
        router.push("/");
      } else {
        setUserName("");
        setPassword("");
        await Swal.fire({
          title: "Warning",
          icon: "warning",
          text: `Username or Password didn't match. Please try again!`,
          showConfirmButton: true,
          timer: 4000,
        });
      }

    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <main className="min-h-screen flex justify-center items-center p-4">
        <div className="card w-[550px] bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="flex p-4 items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <picture>
                      <img src="/images/logo.png" alt="" />
                    </picture>
                  </div>
                </div>
                <h1 className="text-3xl font-semibold text-[#FD0002]">
                  City Touch CRM
                </h1>
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text">Username</span>
                </div>
                <input
                  type="text"
                  placeholder="Type username here"
                  className="input input-bordered w-full"
                  required
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder="Type password here"
                  className="input input-bordered w-full"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="card-actions justify-end pt-4">
                <button type="submit" className="btn text-white bg-[#FD0002]" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
export default Login;

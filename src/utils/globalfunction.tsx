import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { postDataApi } from "@/services/api.service";
import Swal from "sweetalert2";

export function role(): any {
  try {
    const token: any = getCookie("token");
    const decoded: any = jwtDecode(token);
    return decoded.role;
  } catch (e) {
    return null;
  }
}

export function userId(): any {
  try {
    const token: any = getCookie("token");
    const decoded: any = jwtDecode(token);
    return decoded.id;
  } catch (e) {
    return null;
  }
}

export async function Delete(url: string, id: string, router: any) {
  const payload = {
    id: id,
    isDeleted: true,
  };
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await postDataApi(url, payload);
        if (res.status === 201 || res.status === 200) {
          await Swal.fire({
            title: "Delete!",
            text: "Delete successfully",
            icon: "success",
          });
          router.refresh();
        } else {
          await Swal.fire({
            title: "Warning",
            icon: "warning",
            text: "Something Went Wrong",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}

export function checkMsisdn(msisdn: string | undefined) {
  // const msisdn: string | undefined = getCookie("user_msisdn");
  // return (
  //   msisdn?.substring(0, 5) === "88018" || msisdn?.substring(0, 5) === "88016"
  // );
  const regex = /(\+88|88)?(01)[68](\d){8}/g;
  return regex.test(msisdn as string);
}

const numberMap: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export const convertEnglishToBanglaNumber = (input: string): string => {
  return input.replace(/\d/g, (match) => numberMap[match]);
};
export const calculateAge = (dob: string) => {
  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

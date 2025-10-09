import { Endpoint } from "@/utils/constants";
import { cookies } from "next/headers";

export default async function getComplaintsList() {
  const cookieStore = cookies();
  const userToken = cookieStore.get("token")?.value;
  const response = await fetch(Endpoint.exampleData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    return false;
  }
  return await response.json();
}

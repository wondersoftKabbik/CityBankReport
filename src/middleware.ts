import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/",
  // "/attendances",
  // "/complaints/complaints-list",
  // "/user/create-user",
  // "/user/user-list",
  // "/usertype/create-usertype",
  // "/usertype/usertype-list",
  // "/roles/create-role",
  // "/roles/role-list",
  // "/permission/create-permission",
  // "/permission/permission-list",
  // "/role-permission/create",
  // "/role-permission/create-bulk",
  // "/role-permission/list",
  // "/usertype-role/create",
  // "/usertype-role/list",
  // "/organization/create-organization",
  // "/organization/organization-list",
  // "/facility/create-facility",
  // "/facility/facility-list",
  // "/user-facility/create-userfacility",
  // "/user-facility/userfacility-list",
  // "/Org-facility/create-orgfacility",
  // "/Org-facility/orgfacility-list",
  // "/towers/create-tower",
  // "/towers/tower-list",
  // "/facility-tower/create-facility-tower",
  // "/facility-tower/facility-tower-list",
  // "/unit-type/create-unittype",
  // "/unit-type/unittype-list",
  // "/units/create-unit",
  // "/units/unit-list",
  // "/unit-residents/create-unit-resident",
  // "/unit-residents/unit-resident-list",
  // "/unit-rents/create-unit-rent",
  // "/unit-rents/unit-rent-list",
  // "/floor-type/create-floortype",
  // "/floor-type/floortype-list",
  // "/floors/create-floor",
  // "/floors/floor-list",
  // "/head-type/create-headtype",
  // "/head-type/headtype-list",
  // "/heads/create-head",
  // "/heads/head-list",
  // "/rent-type/create-renttype",
  // "/rent-type/renttype-list",
  // "/roster-shifts/create-roster-shift",
  // "/roster-shifts/roster-shift-list",
  // "/roster/create-roster",
  // "/roster/roster-list",
  // "/invoices/create-invoice",
  // "/invoices/invoice-list",
  // "/invoice-details/create-invoice-detail",
  // "/invoice-details/invoice-detail-list",
];
export default function middleware(req: any) {
  // const cookieStore = cookies();
  // const userToken = cookieStore.get("token")?.value;
  // if (!userToken && protectedRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/login", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}

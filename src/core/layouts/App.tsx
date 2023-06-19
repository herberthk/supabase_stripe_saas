import React, { FC } from "react";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { SITE_URL } from "../utils";
type Props = {
  children: React.ReactNode;
};
const hideNavbarPages = ["/success"];
const AppLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const hideNavbar = hideNavbarPages.includes(router.asPath);
  console.log("curent url", SITE_URL);
  return (
    <>
      <Meta />
      {hideNavbar ? null : <Navbar />}
      {children}
    </>
  );
};

export default AppLayout;

import React, { FC } from "react";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactNode;
};
const hideNavbarPages = ["/success"];
const AppLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const hideNavbar = hideNavbarPages.includes(router.asPath);
  return (
    <>
      <Meta />
      {hideNavbar ? null : <Navbar />}
      {children}
    </>
  );
};

export default AppLayout;

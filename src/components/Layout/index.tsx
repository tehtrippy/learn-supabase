import React from "react";
import User from "../User";
import Link from "next/link";

type LayoutType = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutType> = ({ children }) => {
  return (
    <>
      <nav className="flex items-center px-4 py-6 bg-amber-500 justify-between">
        <Link className="text-3xl font-bold text-white" href="/">
          TODO LIST
        </Link>
        <User />
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;

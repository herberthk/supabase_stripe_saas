import Link from "next/link";
import Logo from "./Logo";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { SITE_URL } from "../utils";

const Navbar = () => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  // console.log("session", session);
  const logOut = () => {
    supabaseClient.auth.signOut();
  };
  const manageBilling = async () => {
    const res = await fetch(`${SITE_URL}/api/manage-billing`);
    const data = await res.json();
    console.log(data);
    if (data) {
      window.location.href = data.url;
    }
  };
  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/">
        <Logo />
      </Link>
      {session ? (
        <div className="nav-menu">
          <Link href="/products" className="nav-link white">
            <div>Products</div>
          </Link>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            onClick={manageBilling}
            className="nav-link border-left white"
          >
            <div>Billing</div>
          </div>
          <div
            className="nav-link black"
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            onClick={logOut}
          >
            <div>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="nav-menu">
          <Link href="/login" className="nav-link white">
            <div>Login</div>
          </Link>
          <Link href="/pricing" className="nav-link black">
            <div>Pricing</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

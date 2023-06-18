import Link from "next/link";
import Logo from "../core/components/Logo";
import LoginForm from "../login/components/LoginForm";
import loginImage from "@/public/assets/login.png";
import Image from "next/image";
import { useState } from "react";
import LoginSubmitted from "../login/components/LoginSubmitted";

export default function LoginPage() {
  const [submited, setSubmited] = useState("");
  return (
    <div className="grid-halves h-screen">
      <div className="border-right bg-offwhite">
        <div className="column-padding">
          <div className="tablet-centered">
            <Link href="/" className="logo-container">
              <Logo style={{ width: 150 }} />
            </Link>
            {submited ? (
              <LoginSubmitted submited={submited} />
            ) : (
              <LoginForm setSubmited={setSubmited} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-navy border-right">
        <Image src={loginImage} alt="" className="callout-image" />
      </div>
    </div>
  );
}

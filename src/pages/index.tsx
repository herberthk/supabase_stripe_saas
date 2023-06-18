import Link from "next/link";
import React from "react";
import Image from "next/image";
import HeroImage from "@/public/assets/hero.png";

export default function HomePage() {
  return (
    <div className="grid-halves h-screen-navbar">
      <div className="bg-teal border-right">
        <div className="column-padding">
          <div className="tablet-centered">
            <div className="content-grid home-hero">
              <h1>
                The most <br /> epic products
              </h1>
              <p className="section-subtitle">
                All most important products on the internet in one place
              </p>
              <Link href="/products" className="large-button">
                <div className="large-button-text">Explore our products</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-salmon">
        <div className="column-padding centered">
          <div className="callout-wrap">
            <Image src={HeroImage} alt="Image" className="callout-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

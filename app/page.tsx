import HeroSection from "./mainPageComponents/HeroSection";
import Navbar from "./mainPageComponents/Navbar";
import Image from "next/image";
import { useCallback } from "react";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="flex w-full justify-center mt-20">
        <Image
          src={"/app.jpg"}
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-xl aspect-auto sm:w-full w-[398px]  rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    </div>
  );
}

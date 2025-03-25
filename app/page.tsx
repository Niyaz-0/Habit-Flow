import HeroSection from "./mainPageComponents/HeroSection";
import Navbar from "./mainPageComponents/Navbar";
import Image from "next/image";
import {Footer} from "./mainPageComponents/Footer"; // Update path as needed

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="flex w-full justify-center mt-20 mb-24">
          <Image
            src={"/app.png"}
            alt="dashboard"
            width={900}
            height={400}
            className="shadow-xl aspect-auto sm:w-full w-[398px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
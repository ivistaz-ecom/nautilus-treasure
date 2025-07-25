"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import Game from "./Game";
import Link from "next/link";

export default function Page4() {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation to the next page
  const handleStart = () => {
    router.push("/page4"); // Navigates to page3.js (or any other page)
  };

  // Function to handle navigation back to the previous page
  const handleBack = () => {
    router.push("/page2"); // Navigates back to the home page (or any other page)
  };

  return (
    <div className="bg-cover bg-[#00222F] min-h-screen flex justify-center items-center">
      {/* Content Section */}
      <div className="bg-[#00222F] w-full lg:max-w-[50%] text-white absolute text-center rounded-lg p-10 flex flex-col justify-between h-[100vh] container mx-auto">
        <div className="flex flex-col justify-center items-center flex-grow">
          {/* <Image
            src="/corner.svg"
            width={100}
            height={100}
            alt="Top Left Design"
            className="absolute top-0 left-0"
          /> */}

          {/* Logo */}
          <div className="flex justify-center mb-8">
          <Link href="/"><Image src="/logo.svg" width={200} height={200} alt="Logo" /></Link>
          </div>

          {/* Main Content */}
          <div>
            <Game />
          </div>
        </div>

        {/* Navigation Buttons - Centered at the bottom */}

        {/* <div className="flex justify-between gap-4 mb-8">
          <button
            onClick={handleBack}
            className="bg-[#008E9C] hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
          >
            Back
          </button>
        </div> */}
        {/* <Image
          src="/corner.svg"
          width={50}
          height={100}
          alt="Bottom Right Design"
          className="absolute bottom-0 right-0"
        /> */}
      </div>
    </div>
  );
}

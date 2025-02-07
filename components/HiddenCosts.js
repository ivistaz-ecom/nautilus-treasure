"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function HiddenCosts() {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation to the next page
  const handleNext = () => {
    router.push("/page5"); // Navigates to page3.js (or any other page)
  };

  // Function to handle navigation back to the previous page
  const handleBack = () => {
    router.push("/"); // Navigates back to the home page (or any other page)
  };

  return (
    <div className="bg-cover bg-center bg-[url('/home_banner.jpeg')] min-h-screen flex justify-center items-center">
      {/* Content Section */}
      <div className="bg-[#00222F] w-full lg:max-w-[50%] text-white absolute text-center rounded-lg p-10 flex flex-col justify-between h-[100vh]">
        {/* Logo */}
        <div className="flex justify-end mb-8">
          <Link href="/">
            <Image src="/logo.svg" width={80} height={80} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          {/* <Image
            src="/corner.svg"
            width={100}
            height={100}
            alt="Top Left Design"
            className="absolute top-0 left-0"
          /> */}
 <div className="flex justify-center">
              <Image
              alt="coin"
                src="/coin.svg"
                width={100}
                height={100}
                className="animate-spin-slow"
              />
            </div>
          {/* Main Content */}
          <div>
            <h1 className="text-[40px] md:text-[70px] font-bold">
              Hidden Costs
            </h1>

            <div className="text-left mt-5">
              <p className="text-[18px] md:text-[30px]">1 Unplanned Costs</p>
              <p className="text-[18px] md:text-[30px]">
                2 Crew Rotation and Relieving
              </p>
              <p className="text-[18px] md:text-[30px]">
                3 Environmental and Safety Training
              </p>
              <p className="text-[18px] md:text-[30px]">
                4 Audits and Inspection
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Centered at the bottom */}
        <div className="flex justify-end gap-4 mb-8">
          {/* Back Button */}
          {/* <button
            onClick={handleBack}
            className="bg-[#008E9C] border hover:border-[#008E9C] hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
          >
            Back
          </button> */}

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="bg-[#008E9C] border hover:border-[#008E9C] hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
          >
            Next
          </button>
        </div>

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

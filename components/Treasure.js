"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState } from "react";
import CountUp from "react-countup"; // Import react-countup

export default function Page2() {
  const router = useRouter(); // Initialize the router
  const [show30, setShow30] = useState(false); // State to control when to show 30%

  // Function to handle navigation to the next page
  const handleNext = () => {
    router.push("/page2"); // Navigates to page3.js (or any other page)
  };

  return (
    <div className="bg-cover bg-[#00222F] min-h-screen flex justify-center items-center">
      {/* Content Section */}
      <div className="bg-[#00222F] w-full lg:max-w-[50%] text-white absolute text-center rounded-lg p-10 flex flex-col justify-between h-[100vh]">
         {/* Logo */}
         <div className="flex justify-end mb-8">
         <Link href="/"><Image src="/logo.svg" width={80} height={80} alt="Logo" /></Link>
          </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          {/* <Image
            src="/corner.svg"
            width={100} 
            height={100}
            alt="Top Left Design"
            className="absolute top-0 left-0"
          /> */}

         

          {/* Main Content */}
          <div>
            <h1 className="text-[40px] md:text-[70px] font-bold">
              {show30 ? (
                "20 - 30%"
              ) : (
                <CountUp
                  end={20}
                  duration={2} // Duration of animation
                  suffix="%"
                  onEnd={() => setShow30(true)} // Show 30% after 20% finishes
                />
              )}
            </h1>

            <p className="text-[18px] md:text-[30px]">
              of your crewing budget<br /> goes into hidden costs
            </p>
          </div>
        </div>

        {/* Navigation Buttons - Centered at the bottom */}
        <div className="flex justify-end gap-4 mb-8">
          {/* Next Button */}
          <button
            onClick={handleNext}
            className="bg-[#008E9C] hover:border-[#008E9C] hover:bg-[#fff] border text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
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

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState, useEffect } from "react"

export default function Page2() {
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 0.5; // 0.5 million USD
    const duration = 500; // duration in ms
    const startTime = performance.now();

    const updateCount = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * target);
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, []);
  const router = useRouter(); // Initialize the router

  // Function to handle navigation to the next page
  const handleNext = () => {
    router.push("/page3"); // Navigates to page3.js (or any other page)
  };

  // Function to handle navigation back to the previous page
  const handleBack = () => {
    router.push("/"); // Navigates back to the home page (or any other page)
  };

  return (
    <div className="bg-cover bg-[#00222F] min-h-screen flex justify-center items-center">
    {/* <div className="bg-cover bg-center bg-[url('/home_banner.jpeg')] min-h-screen flex justify-center items-center"> */}
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
            <p className="text-[18px] md:text-[30px] mt-4 flex justify-center items-center">
              Annually this can cost you <br/>up to approximately
            </p>
           
            <h1 className="text-[40px] md:text-[70px] font-bold">
      {count.toFixed(1)} million USD
    </h1>

            <p className="text-[18px] md:text-[30px]">
              for each vessel
            </p>
          </div>
        </div>

        {/* Navigation Buttons - Centered at the bottom */}
        <div className="flex justify-between gap-4 mb-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-[#008E9C] border hover:border-[#008E9C] hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
          >
            Back
          </button>

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

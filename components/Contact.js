"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { IoIosPlay } from "react-icons/io";
import Form from "./Form";
export default function Contact() {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation back to the previous page
  const handleBack = () => {
    router.push("/page4"); // Navigates back to the home page (or any other page)
  };
  const handleHome = () => {
    router.push("/"); // Navigates back to the home page (or any other page)
  };

  return (
    <div className="bg-[#00222F] w-full flex justify-center items-center">
      {/* Content Section */}
      <div className="w-full bg-[#00222F] mt-[1100px]  text-white absolute text-center rounded-lg p-10 flex flex-col justify-between">
         {/* Logo */}
         <div className="flex justify-end mb-8">
         <Link href="/"><Image src="/logo.svg" width={200} height={200} alt="Logo" /></Link>
          </div>
        <div className="flex flex-col justify-center items-center flex-grow">
        
          {/* Main Content */}
          <div>
            <h1 className="text-[40px] md:text-[70px] font-bold">Contact Us</h1>

            <div className="flex flex-col justify-center items-center">
             <Form/>
            </div>
            {/* Navigation Buttons - Centered at the bottom */}
        <div className="flex justify-between gap-4 mb-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-[#008E9C] hover:border-[#008E9C] border hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-5 py-2 rounded-full transition shadow-md"
          >
            <span className="flex gap-2 items-center">
              <IoIosPlay />
              Play Again
            </span>
          </button>
          <button
            onClick={handleHome}
            className="bg-[#008E9C] hover:border-[#008E9C] border hover:bg-[#fff] text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-5 py-2 rounded-full transition shadow-md"
          >
            <span className="flex gap-2 items-center">
              {/* <IoIosPlay /> */}
              Back To Home
            </span>
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
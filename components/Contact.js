"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { IoIosPlay } from "react-icons/io";
export default function Contact() {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation back to the previous page
  const handleBack = () => {
    router.push("/page4"); // Navigates back to the home page (or any other page)
  };

  return (
    <div className="bg-cover bg-center bg-[url('/home_banner.jpeg')] min-h-screen flex justify-center items-center">
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
            <h1 className="text-[40px] md:text-[70px] font-bold">Contact Us</h1>

            <p className="text-[18px] md:text-[25px]">
              Let’s find out how we can reduce these for you
            </p>

            <div className="flex flex-col justify-center mb-8 items-center mt-10">
              <p className="text-[18px] md:text-[30px]">Scan Now</p>
              <Image
                src="/google-qr.png"
                width={200}
                height={200}
                alt="Logo"
                className="pt-5"
              />
            </div>
            {/* Navigation Buttons - Centered at the bottom */}
        <div className="flex justify-center gap-4 mb-8">
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
        </div>
          </div>
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

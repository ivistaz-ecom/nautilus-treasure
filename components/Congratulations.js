"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

export default function Congratulations() {
  const router = useRouter();

  // State to manage the visibility of the second text block
  const [showPercentage, setShowPercentage] = useState(false);

  // State to manage the visibility of the "Next" button
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // Show the percentage text after 3 seconds
    const percentageTimer = setTimeout(() => {
      setShowPercentage(true);

      // Show the "Next" button after an additional 3 seconds
      const buttonTimer = setTimeout(() => {
        setShowNextButton(true);
      }, 2000);

      // Cleanup button timer
      return () => clearTimeout(buttonTimer);
    }, 1000);

    // Cleanup percentage timer
    return () => clearTimeout(percentageTimer);
  }, []);

  // Function to handle navigation to the next page
  const handleNext = () => {
    router.push("/contact-us");
  };

  return (
    <div className="bg-cover bg-[#00222F] min-h-screen flex justify-center items-center">
      {/* Content Section */}
      <div className="bg-[#00222F] w-full lg:max-w-[50%] text-white absolute text-center rounded-lg p-10 flex flex-col justify-between h-[100vh]">
        {/* Logo */}
        <div className="flex justify-end mb-8">
          <Link href="/">
            <Image src="/logo.svg" width={200} height={200} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          {/* Main Content */}
          <div>
            <div className="flex justify-center">
              <Image
                alt="coin"
                src="/coin.svg"
                width={100}
                height={100}
                className="animate-spin-slow"
              />
            </div>
            <h1 className="text-[40px] md:text-[70px] font-bold">
              Congratulations
            </h1>

            {/* First Message */}
            <p className="text-[18px] md:text-[30px]">
              on finding all the hidden costs!
            </p>

            {/* Show this block after 3 seconds */}
            {showPercentage ? (
              <>
                <p className="text-[18px] md:text-[30px]">
                  You have found over
                </p>
                <h1 className="text-[40px] md:text-[70px] font-bold">
                  <CountUp end={18} suffix="%" duration={3} /> <br/>of hidden costs
                </h1>
                <p className="text-[18px] md:text-[30px]">
                  in crew management
                </p>
              </>
            ) : null}
          </div>
        </div>

        {/* Show Next Button after the second text is displayed */}
        {showNextButton && (
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={handleNext}
              className="bg-[#008E9C] hover:border-[#008E9C] hover:bg-[#fff] border text-white hover:text-[#008E9C] text-[16px] md:text-[18px] px-6 py-3 rounded-full transition shadow-md"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "./Form"; // Make sure this is responsive too

export default function Contact() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/page4");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-[#00222F] w-full flex justify-center items-center lg:py-10 py-10 px-4 md:px-10 overflow-x-hidden">
      <div className="w-full max-w-4xl bg-[#00222F] text-white rounded-lg flex flex-col items-center gap-8 h-screen">

        {/* Logo */}
        <div className="w-full flex justify-end">
          <Link href="/">
            <Image src="/logo.svg" width={200} height={200} alt="Logo" />
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[64px] font-bold text-center">Contact Us</h1>
        {/* <p className="text-center text-base max-w-lg">
          Let’s find out how we can reduce these for you
        </p> */}

        {/* Form */}
        <div className="w-full">
          <Form />
        </div>

        
      </div>
    </div>
  );
}

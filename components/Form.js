"use client"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Country } from "country-state-city"
import Select from "react-select"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios"
import { IoIosPlay } from "react-icons/io";
import Image from "next/image"
const Form = () => {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: "",
    message: "",
    consent: false,
  })
  const router = useRouter();

  const handleBack = () => {
    router.push("/page4");
  };

  const handleHome = () => {
    router.push("/");
  };
  // Form validation
  const validateForm = () => {
    let newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty"
    if (!formData.consent) newErrors.consent = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleForm = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      )

      await axios.post(
        "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10026/feedback",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setShowPopup(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        jobTitle: "",
        phone: "",
        country: "",
        message: "",
        consent: false,
      })
      setErrors({})
    } catch (error) {
      setErrors({
        submit: "There was an error submitting the form. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (label, type, name, placeholder) => (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 text-base focus:ring-0 focus:border-gray-300 focus:outline-none"
        value={formData[name]}
        onChange={(e) => setFormData((prev) => ({ ...prev, [name]: e.target.value }))}
      />
      <div className="h-4">
        {errors[name] && <p className="text-red-500 text-xs mt-1">*{errors[name]}</p>}
      </div>
    </div>
  )

  const renderPhoneField = () => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-400 text-base text-start h- -mt-4">Phone Number</label>
      <div className="flex items-center border-b border-gray-300 pb-1 text-black">
        <PhoneInput
          international
          defaultCountry="IN"
          value={formData.phone}
          onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
          className="custom-phone-input w-full text-base text-black focus:outline-none"
        />
      </div>
      <div className="h-4">
        {errors.phone && <span className="text-red-500 text-sm">*{errors.phone}</span>}
      </div>
    </div>
  )

  const renderCountryField = () => {
    const countryOptions = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }))

    return (
      <div className="flex flex-col gap-2 w-full text-start">
        <div className="flex items-center border-b border-gray-300 pb-1">
          <Select
            options={countryOptions}
            className="w-full text-white/85 text-base"
            classNamePrefix="react-select"
            placeholder="Select Country"
            value={countryOptions.find((c) => c.value === formData.country) || null}
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                country: selectedOption ? selectedOption.value : "",
              }))
            }
            styles={{
              control: (base) => ({ ...base, background: "transparent", border: "none", boxShadow: "none" }),
              singleValue: (base) => ({ ...base, color: "white" }),
              dropdownIndicator: (base) => ({ ...base, color: "white", ":hover": { color: "white" } }),
              menu: (base) => ({ ...base, background: "#333" }),
              option: (base, { isFocused }) => ({
                ...base,
                background: isFocused ? "#008E9C" : "#fff",
                color: isFocused ? "#fff" : "#00222F",
              }),
              input: (base) => ({ ...base, color: "white" }),
              placeholder: (base) => ({ ...base, color: "white", fontWeight: "100" }),
            }}
          />
        </div>
        <div className="h-4">
          {errors.country && <span className="text-red-500 text-sm">*{errors.country}</span>}
        </div>
      </div>
    )
  }

  const renderMessageField = () => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-500 text-base sm:text-lg text-start">Message</label>
      <textarea
        name="message"
        cols={50}
        rows={5}
        className="rounded text-base sm:text-lg bg-white text-black focus:ring-0 border border-white p-2 focus:outline-none"
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      ></textarea>
      <div className="h-4">
        {errors.message && <span className="text-red-500 text-sm">*{errors.message}</span>}
      </div>
    </div>
  )

  const renderConsentField = () => (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start md:items-center gap-2">
        <input
          type="checkbox"
          name="consent"
          className="focus:ring-0 accent-secondary w-5 h-5 cursor-pointer"
          checked={formData.consent}
          onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
        />
        <label className="text-sm md:text-base text-white/80 cursor-pointer leading-tight">
          I confirm that I have read and accept the{" "}
          <Link target="_blank" href="https://www.nautilusshipping.com/privacy-policy" className="text-[#008e9c] hover:underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      <div className="h-4">
        {errors.consent && <span className="text-red-500 text-sm">*{errors.consent}</span>}
      </div>
    </div>
  )



  return (
    <>
      <div className="p-4 sm:p-10">
        {!showPopup ? (
          <>
            <h3 className="text-base sm:text-lg md:text-xl font-light text-white text-center md:text-left">
              Let’s find out how we can reduce these for you
            </h3>
  
            <form className="flex flex-col gap-5 pt-5 sm:pt-7" onSubmit={handleForm}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-10">
                {renderField("Name", "text", "name", "Name")}
                {renderField("Email", "email", "email", "Email")}
              </div>
  
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-10">
                {renderField("Company", "text", "company", "Company")}
                {renderField("Job Title", "text", "jobTitle", "Job Title")}
              </div>
  
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-10">
                {renderPhoneField()}
                {renderCountryField()}
              </div>
  
              {renderMessageField()}
              {renderConsentField()}
  
              <button
                type="submit"
                className="self-start py-2 px-6 rounded-lg border border-gray-500 text-white hover:border-secondary hover:bg-[#008E9C] hover:scale-95 transition-all duration-300 ease-in-out inline-flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M50 0a50 50 0 1050 50A50.06 50.06 0 0050 0z"
                        opacity=".25"
                      />
                      <path
                        fill="currentColor"
                        d="M93.97 39.04a4 4 0 00-4.9-2.86 4 4 0 00-2.86 4.9 40 40 0 11-35.5-24.2 4 4 0 10-.1-8A48 48 48 0 1048 96a48.05 48.05 0 0045.97-56.96z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
           <div className="flex justify-center mb-4">
           <Image src="/sent.webp" className="w-60" width={200} height={200}/>
            </div>
            <h3 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Thank You!
            </h3>
            <p className="text-white text-base lg:text-2xl mb-6">
              Your message has been submitted successfully.
            </p>
  
            <div className="flex justify-center lg:gap-10 gap-4">
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
                  Back To Home
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Form

"use client"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Country } from "country-state-city"
import Select from "react-select"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

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
    // if (!formData.phone.trim()) {
    //   newErrors.phone = "Phone number is required"
    // } else if (!/^\d+$/.test(formData.phone)) {
    //   newErrors.phone = "Enter a valid phone number"
    // }
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty"
    if (!formData.consent) newErrors.consent = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Returns true if no errors
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("company", formData.company)
      data.append("jobTitle", formData.jobTitle)
      data.append("phone", formData.phone)
      data.append("country", formData.country)
      data.append("message", formData.message)
      data.append("consent", formData.consent)

      const response = await axios.post(
        "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10026/feedback",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      //console.log("Form Submitted Successfully:", response.data)

      setShowPopup(true) // Show the thank-you popup

      // Reset form fields
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
      //console.error("Form submission failed:", error)
      setErrors({
        submit:
          "There was an error submitting the form. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderNameField = () => (
    <div className="w-full">
      <input
        type="text"
        placeholder="Name"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 text-base focus:ring-0 focus:border-white"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <div className="h-4">
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">*{errors.name}</p>
        )}
      </div>
    </div>
  )

  const renderEmailField = () => (
    <div className="w-full">
      <input
        type="email"
        placeholder="Email"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 text-base focus:ring-0 focus:border-white"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">*{errors.email}</p>
        )}
      </div>
    </div>
  )

  const renderCompanyField = () => (
    <div className="w-full">
      <input
        type="text"
        placeholder="Company"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 text-base focus:ring-0 focus:border-white"
        value={formData.company}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, company: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">*{errors.company}</p>
        )}
      </div>
    </div>
  )

  const renderJobTitleField = () => (
    <div className="w-full">
      <input
        type="text"
        placeholder="Job Title"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 text-base focus:ring-0 focus:border-white"
        value={formData.jobTitle}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">*{errors.jobTitle}</p>
        )}
      </div>
    </div>
  )

  const renderPhoneField = () => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-400 text-base text-start">Phone Number</label>
      <div className="flex items-center border-b border-gray-300 pb-1 text-black">
        <PhoneInput
          international
          defaultCountry="IN"
          value={formData.phone}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, phone: value }))
          }
          className="custom-phone-input w-full text-base text-black bg-transparent focus:outline-none"
        />
      </div>
      <div className="h-4">
        {errors.phone && (
          <span className="text-red-500 text-sm">*{errors.phone}</span>
        )}
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
            className="w-full text-white/85 text-base focus:ring-0 border-none focus:outline-none"
            classNamePrefix="react-select"
            placeholder="Select Country"
            value={
              countryOptions.find((c) => c.value === formData.country) || null
            }
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                country: selectedOption ? selectedOption.value : "", // Reset on form clear
              }))
            }
            styles={{
              control: (base) => ({
                ...base,
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }),
              menu: (base) => ({
                ...base,
                background: "#333",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                background: isFocused ? "#008E9C" : "#fff",
                color: isFocused ? "#fff" : "#00222F",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
                fontWeight: "100",
              }),
            }}
          />
        </div>
        <div className="h-4">
          {errors.country && (
            <span className="text-red-500 text-sm">*{errors.country}</span>
          )}
        </div>
      </div>
    )
  }

  const renderMessageField = () => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-500 text-base sm:text-lg text-start">Message</label>

      <textarea
        name="message"
        id="message"
        cols={50}
        rows={5}
        className="rounded text-base sm:text-lg bg-white text-black focus:ring-0 border border-white p-2 focus:outline-none"
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
      ></textarea>
      <div className="h-4">
        {errors.message && (
          <span className="text-red-500 text-sm">*{errors.message}</span>
        )}
      </div>
    </div>
  )

  const renderConsentField = () => (
    <div className="flex flex-col gap-2 w-full">
      {/* <label className="text-white/80 text-base md:text-base">Consent*</label> */}

      <div className="flex items-start md:items-center gap-2">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          className="focus:ring-0 accent-secondary w-5 h-5 cursor-pointer"
          checked={formData.consent} // Ensures checkbox state is controlled
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, consent: e.target.checked }))
          }
          aria-checked={formData.consent}
          aria-labelledby="consent-label"
        />
        <label
          htmlFor="consent"
          id="consent-label"
          className="text-sm md:text-base text-white/80 cursor-pointer leading-tight"
        >
          I confirm that I have read and accept the{" "}
          <Link
            href="/privacy-policy"
            className="text-secondary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      <div className="h-4">
        {errors.consent && (
          <span className="text-red-500 text-sm">*{errors.consent}</span>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-10">
      <h3 className="text-base sm:text-lg md:text-xl font-light text-white text-center md:text-left">
      Let’s find out how we can reduce these for you
      </h3>
      <form className="flex flex-col gap-5 pt-5 sm:pt-7" onSubmit={handleForm}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-10">
          {renderNameField()}
          {renderEmailField()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-10">
          {renderCompanyField()}
          {renderJobTitleField()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-5 md:gap-10">
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
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      {/* Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 text-black rounded-lg shadow-lg text-center flex flex-col items-center relative">
            <Image src="/sent.webp" width={200} height={100} alt="sent" />
            <h2 className="text-base font-semibold text-primary">Thank You!</h2>
            <p className="text-primary mt-2">
              Your message has been submitted successfully.
            </p>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute -top-3 -right-3 text-white bg-[#008E9C] hover:bg-[#00222F] rounded-full text-sm w-8 h-8 flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/* <button
              className="mt-4 px-4 py-1.5 bg-secondary text-white rounded hover:bg-primary hover:scale-95 transition-all duration-300 ease-in-out"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Form

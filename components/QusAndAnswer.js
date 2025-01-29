"use client";
import Image from "next/image";
import { useState } from "react";

export default function QASession() {
  const questions = [
    {
      id: 1,
      text: "What is Nautilus Shipping's primary service?",
      options: ["Ship Management", "Crew Management", "Commercial Services"],
      correctAnswer: "Ship Management",
    },
    {
      id: 2,
      text: "How many vessels does Nautilus Shipping manage?",
      options: ["50 vessels", "100 vessels", "150 vessels"],
      correctAnswer: "50 vessels",
    },
    {
      id: 3,
      text: "What is the size of Nautilus Shipping's seafarer database?",
      options: ["5,000+ seafarers", "10,000+ seafarers", "20,000+ seafarers"],
      correctAnswer: "20,000+ seafarers",
    },
    {
      id: 4,
      text: "What is Nautilus Shipping’s core focus in their ship management service?",
      options: [
        "Operational Excellence",
        "Cost Reduction",
        "Environmental Sustainability",
      ],
      correctAnswer: "Operational Excellence",
    },
    {
      id: 5,
      text: "Which type of vessels does Nautilus Shipping primarily manage?",
      options: ["Cargo Ships", "Oil Tankers", "Bulk Carriers"],
      correctAnswer: "Bulk Carriers",
    },
    {
      id: 6,
      text: "What geographical regions does Nautilus Shipping serve?",
      options: ["North America", "Europe and Asia", "Global"],
      correctAnswer: "Global",
    },
    {
      id: 7,
      text: "Select one of the options for annual crewing costs:",
      options: [
        "Base Cost Only (Without Hidden Costs)",
        "Total Cost (With 20–30% Hidden Costs)",
        "Total Cost with 18% Savings Applied",
      ],
      correctAnswer: "Total Cost with 18% Savings Applied",
    },
    {
      id: 8,
      text: "What are the hidden cost percentages in crewing?",
      options: ["20%", "30%", "40%"],
      correctAnswer: "30%",
    },
  ];

  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setError(""); // Clear error when an option is selected
  };

  const handleNext = () => {
    if (selectedAnswers[questions[step].id]) {
      setStep(step + 1);
      setError(""); // Clear error on successful navigation
    } else {
      setError("❌ Please select one option before proceeding.");
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setError(""); // Clear error on going back
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
    <div className="bg-cover bg-center bg-[url('/home_banner.jpeg')] min-h-screen flex flex-col justify-center ">
        <div className="pt-10">
        <div className="container mx-auto p-6 bg-black text-white bg-opacity-50 shadow-lg rounded-lg">
      {!submitted ? (
        <>
        <div className="flex justify-center"><Image src="/logo.svg" width={200} height={200} className="bg-[#27677a] p-3"/></div>
          <h2 className="text-lg font-semibold mb-4">
            Question & Answer Session
          </h2>

          {/* Question Display */}
          {questions.map((question, index) =>
            step === index ? (
              <div key={question.id} className="mb-6">
                <p className="font-medium mb-2">{question.text}</p>
                <div className="space-y-2">
                  {question.options.map((option, i) => (
                    <label
                      key={i}
                      className={`block p-3 border rounded-lg cursor-pointer ${
                        selectedAnswers[question.id] === option
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${question.id}`}
                        value={option}
                        className="mr-2"
                        onChange={() => handleSelect(question.id, option)}
                        checked={selectedAnswers[question.id] === option} // Maintain checked state when navigating
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ) : null
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 font-medium mt-2">{error}</p>}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-16">
            {step > 0 && (
              <button
                className="px-4 py-2 bg-[#2894b5] rounded hover:bg-[#21505e] text-white"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}

            {step < questions.length - 1 && (
              <button
                className={`px-4 py-2 rounded ${
                  selectedAnswers[questions[step].id]
                    ? "bg-[#03313F] text-white hover:bg-[#03313F]"
                    : "bg-white text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleNext}
              >
                Next
              </button>
            )}

            {step === questions.length - 1 &&
              selectedAnswers[questions[step].id] && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
          </div>
        </>
      ) : (
        // Submission Summary
        <div className="text-center h-screen">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            ✅ Thank You for Your Submission!
          </h2>
          <p className="mb-4">Here's a summary of your answers:</p>

          <div className="text-left grid grid-cols-2 gap-7">
            {questions.map((question) => {
              const isCorrect =
                selectedAnswers[question.id] === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`p-4 mb-4 rounded-lg ${
                    isCorrect ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  <p className="font-medium">{question.text}</p>
                  <p>
                    <strong>Your Answer:</strong> {selectedAnswers[question.id]}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {question.correctAnswer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
        </div>
    </div>
    </>
  );
}

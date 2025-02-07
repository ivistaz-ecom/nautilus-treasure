"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";

export default function Game() {
  const [revealedCoins, setRevealedCoins] = useState([null, null, null, null]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: {},
  });
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const router = useRouter();

  const handleContact = () => {
    router.push("/hidden-cost"); // Navigate to page5
  };

  // Tooltip texts for each coin
  const tooltipTexts = [
    "Audits and Inspection",
    "Crew Rotation and Relieving",
    "Environmental and Safety Training",
    "Unplanned Costs",
  ];

  // Coin click handler
  const handleCoinClick = (coinIndex, position) => {
    if (revealedCoins.includes(coinIndex)) return;

    const nextAvailableIndex = revealedCoins.findIndex((coin) => coin === null);

    if (nextAvailableIndex !== -1) {
      const newRevealedCoins = [...revealedCoins];
      newRevealedCoins[nextAvailableIndex] = coinIndex;
      setRevealedCoins(newRevealedCoins);

      setTooltip({
        visible: true,
        text: tooltipTexts[coinIndex],
        position: position,
      });
    }
  };

  // All coins found check
  const allCoinsFound = revealedCoins.every((coin) => coin !== null);
  const foundCount = revealedCoins.filter((coin) => coin !== null).length;

  // Timer functionality
  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/hidden-cost"); // Automatically navigate to the next page
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft, router]);

  // Progress calculation for the clock
  const progress = (timeLeft / 60) * 100; // Percentage of time remaining

  // Timer color based on time remaining
  const timerColor =
    timeLeft > 40
      ? "text-green-500"
      : timeLeft > 20
      ? "text-yellow-500"
      : "text-red-500";
  const progressColor =
    timeLeft > 40
      ? "stroke-green-500"
      : timeLeft > 20
      ? "stroke-yellow-500"
      : "stroke-red-500";

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      {/* Timer - Animated Clock */}
      <div className="absolute top-4 right-4">
        <div className="relative w-20 h-20">
          {/* Circular Background */}
          <svg className="absolute top-0 left-0 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#e0e0e0"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              strokeLinecap="round"
              strokeWidth="8"
              fill="none"
              stroke="currentColor"
              className={`transition-all duration-300 ${progressColor}`}
              style={{
                strokeDasharray: "283", // Full circle (2πr where r=45)
                strokeDashoffset: `${283 - (progress / 100) * 283}`, // Progress offset
              }}
            />
          </svg>

          {/* Timer Text */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${timerColor}`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Coin revealing section */}
      <div className="container mx-auto flex justify-center gap-4 my-4">
        {revealedCoins.map((coinIndex, index) => (
          <div
            key={index}
            className="w-12 h-12  rounded-full flex justify-center items-center"
          >
            {coinIndex !== null ? (
              <Image
                src="/coin.svg"
                width={32}
                height={32}
                alt="Coin"
                className="w-10 h-10 scale-125 duration-500 transition-all"
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Game scene */}
      <div className="bg-cover bg-center flex justify-center items-center">
        <div className="relative lg:w-full rounded-md overflow-hidden">
          <TransformWrapper>
            <TransformComponent>
              <div className="relative">
                <Image
                  src="/game.svg"
                  width={600}
                  height={900}
                  alt="Game Scene"
                  className="w-full h-full"
                />

                {/* Hidden Coins */}
                {[
                  { top: "27%", left: "33%" },
                  { top: "28%", left: "51%" },
                  { top: "40%", left: "55%" },
                  { top: "5%", left: "65%" },
                ].map((position, index) => (
                  <p
                    key={index}
                    onClick={() => handleCoinClick(index, position)}
                    className={`absolute lg:w-4 lg:h-4 w-4 h-4 transition-transform duration-300 ease-in-out ${
                      revealedCoins.includes(index)
                        ? "opacity-100 scale-125"
                        : "opacity-0"
                    }`}
                    style={{ top: position.top, left: position.left }}
                  >
                    <Image
                      src="/coin.svg"
                      width={20}
                      height={32}
                      alt="Coin"
                      className="lg:w-full lg:h-full w-20 h-auto"
                    />
                  </p>
                ))}

                {/* Tooltip */}
                {tooltip.visible && (
                  <div
                    className="absolute hidden lg:block bg-white text-[#00222F] text-[12px]  px-3 py-1 rounded-md flex justify-center items-center"
                    style={{
                      top: `calc(${tooltip.position.top} - 30px)`,
                      left: `calc(${tooltip.position.left} - 10px)`,
                    }}
                  >
                    {tooltip.text}
                  </div>
                )}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={allCoinsFound ? handleContact : null}
          disabled={!allCoinsFound}
          className={`border py-2 px-4 rounded-3xl shadow-lg ${
            allCoinsFound
              ? "bg-[#008E9C] hover:border-[#008E9C] hover:bg-[#fff] text-white hover:text-[#008E9C]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {allCoinsFound
            ? "You found all 4 coins!"
            : `You found ${foundCount}-4 coin${foundCount > 1 ? "s" : ""}`}
        </button>
      </div>
    </>
  );
}

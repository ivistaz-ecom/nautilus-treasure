"use client";
import { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";

export default function Game() {
  const [foundCoins, setFoundCoins] = useState([false, false, false, false]);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", position: {} });
  const router = useRouter();

  const handleContact = () => {
    router.push("/page5"); // Navigates to page3.js (or any other page)
  };

  // Different tooltip texts for each coin
  const tooltipTexts = [
    "Audits and Inspection",
    "Crew Rotation and Relieving",
    "Environmental and Safety Training",
    "Unplanned Costs"
  ];

  const handleCoinClick = (index, position) => {
    const newFoundCoins = [...foundCoins];
    newFoundCoins[index] = true;
    setFoundCoins(newFoundCoins);
    setTooltip({
      visible: true,
      text: tooltipTexts[index],
      position: position,
    });
  };

  const allCoinsFound = foundCoins.every((coin) => coin);

  return (
    <>
      {/* Coin revealing section */}
      <div className="container mx-auto flex justify-center gap-4 my-4">
        {foundCoins.map((coin, index) => (
          <div key={index} className="w-12 h-12 border-2 rounded-full flex justify-center items-center">
            {coin ? (
              <Image
                src="/coin.svg"
                width={32}
                height={32}
                alt="Coin"
                className="w-10 h-10"
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
                  src="/game-ship.svg"
                  width={500}
                  height={800}
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
                  <button
                    key={index}
                    onClick={() => handleCoinClick(index, position)}
                    className={`absolute lg:w-8 lg:h-8 w-4 h-4 transition-transform duration-300 ease-in-out ${
                      foundCoins[index] ? "opacity-100 scale-125" : "opacity-0"
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
                  </button>
                ))}

                {/* Tooltip */}
                {tooltip.visible && (
                  <div
                    className="absolute bg-white text-[#00222F] text-sm py-1 px-3 rounded-md flex justify-center items-center"
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

      {/* Button when all coins are found */}
      {allCoinsFound && (
        <div className="flex justify-center mt-6">
          <button onClick={handleContact} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
            You found all 4 coins!
          </button>
        </div>
      )}
    </>
  );
}

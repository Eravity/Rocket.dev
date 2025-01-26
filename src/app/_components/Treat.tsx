"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import drinks from "../images/drinks";
import useQuotes from "@/app/hooks/useQuotes";
import useDrinkPreparation, {
  DrinkItem,
  formatTime,
} from "@/app/hooks/useDrinkPreparation";

const COLORS = {
  orange: "bg-[#ffde59]",
  lightOrange: "bg-[#fff3c2]",
  creamOrange: "bg-[#fffae6]",
} as const;

export default function Treat() {
  const { coffee, tea, hotChocolate } = drinks;
  const { getQuote } = useQuotes();
  const { selectedDrink, status, countdown, handleDrinkSelect } =
    useDrinkPreparation();
  const [currentQuote, setCurrentQuote] = useState<string>("");
  const getQuoteRef = useRef(getQuote);

  useEffect(() => {
    setCurrentQuote(getQuoteRef.current());
  }, []);

  const drinkItems: DrinkItem[] = [
    { src: coffee.src, alt: "Coffee" },
    { src: tea.src, alt: "Tea" },
    { src: hotChocolate.src, alt: "Hot Chocolate" },
  ];

  const getStatusContent = () => {
    if (status === "preparing") {
      return (
        <div className="flex items-center justify-center space-x-2">
          <span>Preparing {selectedDrink?.alt}</span>
          <div className="animate-bounce">☕</div>
        </div>
      );
    }
    if (status === "ready") {
      return (
        <div className="animate-fade-in">
          Here is your {selectedDrink?.alt} ✨
        </div>
      );
    }
    if (status === "cooldown") {
      return (
        <div className="animate-fade-in font-semibold">
          {formatTime(countdown)}
        </div>
      );
    }
    return "";
  };

  return (
    <div
      className={`rounded-xl flex flex-col md:flex-row gap-4 md:gap-0 justify-between p-4 ${COLORS.creamOrange}`}
    >
      <div className="space-y-2 flex-1">
        <div className="flex items-center space-x-3">
          <div
            className={`py-1 px-3 w-fit rounded-md font-semibold text-white ${COLORS.orange}`}
          >
            Treat
          </div>
          <h1 className="font-bold text-lg md:text-xl">Something Good ✨</h1>
        </div>
        <p className="max-w-screen-xl text-sm md:text-base">{currentQuote}</p>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`h-[1px] md:h-full md:w-[1px] mr-0 md:mx-2 w-full my-2 md:my-auto ${COLORS.orange}`}
        />
        <div className="space-y-2 w-full px-2 md:px-4">
          <div className="text-sm md:text-base font-semibold text-center">
            {status === "cooldown"
              ? "Next drink available in:"
              : "Time for a warm treat!"}
          </div>
          <div className="flex justify-center items-center gap-4 md:gap-2">
            {status === "selecting" ? (
              drinkItems.map((drink) => (
                <button
                  key={drink.alt}
                  onClick={() => handleDrinkSelect(drink)}
                  className={`p-2 min-w-[48px] md:min-w-[unset] h-fit border-2 border-[#ffde59] ${COLORS.lightOrange} rounded-lg hover:${COLORS.orange} transition-colors duration-200`}
                >
                  <Image
                    width={32}
                    height={32}
                    src={drink.src}
                    alt={drink.alt}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </button>
              ))
            ) : (
              <div
                className={`w-full min-w-[200px] p-2 text-center border-2 border-[#ffde59] ${
                  COLORS.lightOrange
                } rounded-lg transition-all duration-300 ${
                  status === "preparing" ? "animate-pulse" : ""
                }`}
              >
                {getStatusContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

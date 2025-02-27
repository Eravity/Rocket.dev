"use client";
import { useState } from "react";
import Star from "@/app/_components/Icons/Star";

export default function FavouriteButton() {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(!active)}
      className="flex items-center px-4 py-2 group bg-white rounded-lg font-semibold gap-2"
    >
      {!active ? 'Add to' : 'Remove from'} favourite
      <Star className={`${active ? "fill-yellow-500" : "stroke-black"}`} />
    </button>
  );
}

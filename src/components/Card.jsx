"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Card = ({ work }) => {
  const router = useRouter();

  if (!work) return null;

  const handleClick = () => {
    router.push(`/works/${work.slug}`);
  };

  return (
    <div
      className="cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <Image
        src={work.thumbnail}
        alt={`alt-${work.name}`}
        width={300}
        height={240}
        className="w-full h-60 object-cover rounded-lg shadow-lg"
      />
      <p className="text-center mt-4 font-semibold text-lg">{work.name}</p>
    </div>
  );
};

export default Card;

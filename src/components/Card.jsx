"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";


const Card = ({ work,inside=false }) => {
  const router = useRouter();

  if (!work) return null;

  const handleClick = () => {
    if (!inside) {
      router.push(`/works/${work.slug}`);
    }
  };


  return (
    <div
      className="card cursor-pointer overflow-hidden"
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
        className="w-full h-32 md:h-60 object-cover transform hover:scale-105 transition duration-700 ease-in-out"
      />
      <p className="text-center mt-4 font-semibold text-sm md:text-lg">{work.name}</p>
    </div>
  );
};

export default Card;

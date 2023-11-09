import Image from "next/image";
import React from "react";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const Skeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
      <CardSkeletons />
    </div>
  );
};

export default Skeletons;

export const CardSkeletons = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm flex flex-col items-center md:flex-row md:items-start`}
    >
      {/* Image Skeleton */}
      <div className="mb-4 md:mb-0 md:mr-4 animate-pulse">
        <div className="w-32 h-48 rounded bg-gray-300" />
      </div>
      {/* Text Skeleton */}
      <div className="w-full md:w-64 animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="flex flex-wrap gap-1">
          <div className="h-4 bg-gray-300 rounded-full w-16 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-full w-16 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-full w-16 mb-2"></div>
        </div>
        <div className="flex justify-center md:justify-start gap-2 mt-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

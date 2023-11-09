import React from "react";
import { BookOpenIcon, HeartIcon } from "@heroicons/react/24/outline";
const StatusCheck = ({
  status,
  setStatus,
}: {
  status: any;
  setStatus: any;
}) => {
  return (
    <div>
      <label htmlFor="status" className="mb-2 block text-sm font-medium">
        Status:
      </label>
      <div className="px-[14px]">
        <div className="flex gap-4 justify-center">
          <div className="flex items-center">
            <input
              id="favorite"
              name="status"
              type="radio"
              value="favorite"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "favorite"}
              className="h-5 w-5 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
            />
            <label
              htmlFor="favorite"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-rose-400 px-6 py-3 font-medium text-white dark:text-gray-300 shadow-lg cursor-pointer"
            >
              Favorite <HeartIcon className="h-4 w-4" />
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="record"
              name="status"
              type="radio"
              value="record"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "record"}
              className="h-5 w-5 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
            />
            <label
              htmlFor="record"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-orange-500 px-6 py-3 font-medium text-white dark:text-gray-300 shadow-lg cursor-pointer"
            >
              Record <BookOpenIcon className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;

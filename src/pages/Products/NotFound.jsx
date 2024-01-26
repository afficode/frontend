import React from "react";

const NotFound = () => {
  return (
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto w-full">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="p-3 text-sm font-medium text-primary rounded-full bg-blue-50 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-primary dark:text-white md:text-3xl">
          Not Found
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg md:text-xl">
          The information and/or search combination is not available. You can
          check back some other time, or try other search options.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner"; // Import the spinner component

const Today = () => {
  const [loading, setLoading] = useState(true);

  // Set a delay to simulate a loading screen for 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000); // 2000 ms = 2 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#232323]">
      {loading ? (
        // Show the loading spinner during loading state
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="loading"
          wrapperClass="mb-4"
        />
      ) : (
        // Once loading is complete, show the content
        <>
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🚧 Under Maintenance 🚧
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            We are currently working hard to bring this page to life! <br />
            Please check back later.
          </p>
          <Link
            to="/"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Go Back Home
          </Link>
        </>
      )}
    </div>
  );
};

export default Today;
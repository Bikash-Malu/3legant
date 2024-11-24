import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Maintance = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 2000);

    return () => {
      clearTimeout(timer);
      NProgress.remove();
    };
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-[#232323] p-4">
      {loading ? (
        <div className="mb-4">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            🚧 Under Maintenance 🚧
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
            We are currently working hard to bring this page to life! <br />
            Please check back later.
          </p>
          <Link
            to="/"
            className="dark:bg-green-600 text-white py-2 px-4 rounded-lg dark:hover:bg-green-500 bg-black hover:bg-gray-900 transition duration-300"
          >
            Go Back Home
          </Link>
        </>
      )}
    </div>
  );
};

export default Maintance;

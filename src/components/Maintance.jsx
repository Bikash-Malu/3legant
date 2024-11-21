import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import NProgress from "nprogress"; 
import "nprogress/nprogress.css"; 

const Maintance = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
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
    <div className="flex flex-col items-center justify-center h-screen dark:bg-[#232323] bg-white p-4">
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="loading"
          wrapperClass="mb-4"
        />
      ) : (
        <>
          <h1 className="text-2xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            🚧 Under Maintenance 🚧
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-4">
            We are currently working hard to bring this page to life! <br />
            Please check back later.
          </p>
          
        </>
      )}
    </div>
  );
};

export default Maintance;

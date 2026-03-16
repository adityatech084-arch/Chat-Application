import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import desktopAnimation from "../../assets/mobile desktop.json";

const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-black p-2">
        
        <div className="max-w-md w-full text-center flex flex-col items-center">

          <div className="w-60 sm:w-72 md:w-80">
            <Lottie animationData={desktopAnimation} loop />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mt-1">
            Desktop Required
          </h1>

          <p className="text-sm sm:text-base opacity-80 mt-2">
            This website is optimized for desktop screens.
          </p>

          <p className="text-xs sm:text-sm opacity-60 mt-1">
            Please switch to Desktop Mode or open this site on a Laptop/PC.
          </p>

        </div>

      </div>
    );
  }

  return children;
};

export default DesktopOnly;
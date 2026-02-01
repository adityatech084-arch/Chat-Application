import Lottie from "lottie-react";
import loaderAnimation from "../assets/Rocket in space.json";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        
        {/* Responsive Lottie */}
        <div className="w-24 sm:w-32 md:w-40 lg:w-48">
          <Lottie
            animationData={loaderAnimation}
            loop
            autoplay
          />
        </div>

        {/* Responsive Text */}
        <p className="text-xs sm:text-md md:text-base text-black font-poppins font-bold">
          Loading, please wait...
        </p>

      </div>
    </div>
  );
};

export default PreLoader;

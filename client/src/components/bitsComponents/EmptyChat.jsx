import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
// import noProjectsAnimation from "../../assets/ghosty.json";
import animation from "../../assets/Chatbot.json"
import { useDispatch } from "react-redux";
import { toggleSearchUserModel } from "../../features/toggle/toggleSlice";

export default function EmptyProjects() {
const dispatch = useDispatch();

  return (
    <div className="flex  h-full w-full flex-col items-center justify-center text-center">
      
      {/* Lottie Animation */}
      <div className="w-56 sm:w-64 md:w-73 dark:bg-slate-950">
        <Lottie
          animationData={animation}
          loop
        />
      </div>

      {/* Text */}
    

      <p className="my-2 max-w-md text-sm text-slate-500 dark:text-slate-400 font-Poppins">
       Select a chat or start a new Chat
      </p>

      {/* Button */}
      <button
        onClick={() => dispatch(toggleSearchUserModel())}
        className=" inline-flex items-center gap-2 rounded-lg bg-blue-600  transition-all duration-150 ease-in-out
      active:scale-95 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus size={16} />
         New Chat
      </button>
    </div>
  );
}

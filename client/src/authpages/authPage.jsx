import React, { useState } from 'react';
import { LuMessageSquare } from "react-icons/lu";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Smartphone, Sparkles } from 'lucide-react';

const AuthPage = () => {
  const [mode, setMode] = useState('login');

  return (
    // <div className="flex min-h-screen w-full bg-white font-sans selection:bg-indigo-100">
      
    //   {/* 1. Visual Left Panel - Hidden on mobile, visible on LG screens */}
    //   <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 items-center justify-center p-12 overflow-hidden">
    //     {/* Decorative Background Patterns */}
    //     <div className="absolute inset-0 z-0 opacity-20">
    //       <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
    //     </div>
        
    //     {/* Background Image with Overlay */}
    //     <div 
    //       className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-[10s] hover:scale-100" 
    //       style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")' }}
    //     ></div>
    //     <div className="absolute inset-0 bg-indigo-600/85 mix-blend-multiply z-10"></div>

    //     {/* Branding Content */}
    //     <div className="relative z-20 text-white max-w-lg">
    //       <div className="mb-12 flex items-center gap-3">
    //         <div className="p-2.5 bg-white rounded-xl shadow-xl shadow-indigo-900/20">
    //           <LuMessageSquare className="text-indigo-600 text-3xl" />
    //         </div>
    //         <span className="text-3xl font-black tracking-tight italic">SyncPro</span>
    //       </div>
          
    //       <h1 className="text-6xl font-black leading-[1.05] mb-8 tracking-tight">
    //         Better communication, <br/>
    //         <span className="text-indigo-200">faster results.</span>
    //       </h1>
          
    //       <p className="text-xl text-indigo-50/90 font-medium leading-relaxed mb-10">
    //         Join over 10,000 teams who use SyncPro to streamline their professional communication and boost productivity daily.
    //       </p>

    //       <div className="flex items-center gap-5 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
    //         <div className="flex -space-x-3">
    //           {[1, 2, 3].map((i) => (
    //             <img 
    //               key={i}
    //               className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover" 
    //               src={`https://i.pravatar.cc/150?u=team${i}`} 
    //               alt="Team member"
    //             />
    //           ))}
    //         </div>
    //         <span className="text-sm font-semibold text-indigo-50">Trusted by leading industry experts</span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* 2. Auth Content Panel - Right Side */}
    //   <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-24 bg-white">
    //     <div className="w-full max-w-[420px]">
          
    //       {/* Mobile Logo (Only shows when left panel is hidden) */}
    //       <div className="lg:hidden mb-10 flex items-center gap-2">
    //         <div className="p-2 bg-indigo-600 rounded-lg">
    //           <LuMessageSquare className="text-white text-xl" />
    //         </div>
    //         <span className="text-2xl font-black tracking-tight text-slate-900 italic">SyncPro</span>
    //       </div>

    //       {/* Professional Toggle Switch */}
    //       <div className="p-1.5 bg-slate-100 rounded-2xl flex items-center mb-10 relative border border-slate-200/50">
    //         <div 
    //           className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-in-out z-0 ${mode === 'register' ? 'translate-x-full' : 'translate-x-0'}`}
    //         />
    //         <button 
    //           onClick={() => setMode('login')} 
    //           className={`relative z-10 flex-1 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${mode === 'login' ? 'text-indigo-600' : 'text-slate-500'}`}
    //         >
    //           Sign In
    //         </button>
    //         <button 
    //           onClick={() => setMode('register')} 
    //           className={`relative z-10 flex-1 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${mode === 'register' ? 'text-indigo-600' : 'text-slate-500'}`}
    //         >
    //           Register
    //         </button>
    //       </div>

    //       {/* Header text based on mode */}
    //       <div className="mb-8">
    //         <h3 className="text-3xl font-black text-slate-900 tracking-tight">
    //           {mode === 'login' ? 'Welcome Back' : 'Get Started'}
    //         </h3>
    //         <p className="text-slate-500 font-medium">
    //           {mode === 'login' ? 'Enter your workspace details to continue.' : 'Create your secure account in seconds.'}
    //         </p>
    //       </div>

    //       {/* Form Injection */}
    //       <div className="min-h-[300px]">
    //          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
    //       </div>

    //       {/* Social Access Divider */}
    //       <div className="relative flex items-center py-10">
    //         <div className="flex-grow border-t border-slate-100"></div>
    //         <span className="px-4 text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">Fast Access</span>
    //         <div className="flex-grow border-t border-slate-100"></div>
    //       </div>

    //       {/* Social Buttons */}
    //       <div className="grid grid-cols-2 gap-4">
    //         <SocialBtn icon="https://www.svgrepo.com/show/475656/google-color.svg" name="Google" />
    //         <SocialBtn icon="https://www.svgrepo.com/show/448234/microsoft.svg" name="Azure" />
    //       </div>

    //       {/* Bottom Footer */}
    //       <p className="mt-10 text-center text-slate-400 text-xs font-medium">
    //         By continuing, you agree to SyncPro's <br/>
    //         <span className="underline cursor-pointer hover:text-indigo-600">Terms of Service</span> and <span className="underline cursor-pointer hover:text-indigo-600">Privacy Policy</span>.
    //       </p>
    //     </div>
    //   </div>
    // </div>
     <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden relative bg-[#0a110c] font-['Space_Grotesk',sans-serif] selection:bg-[#13ec5b]/30 text-white">
      {/* Google Font Import */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}
      </style>

      {/* --- CUSTOM RADIAL BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] lg:top-[20%] left-[10%] w-[80%] lg:w-[60%] h-[60%] rounded-full bg-[#13ec5b]/10 blur-[80px] lg:blur-[120px]" />
        <div className="absolute bottom-[10%] lg:bottom-[20%] right-[5%] w-[60%] lg:w-[40%] h-[40%] rounded-full bg-[#13ec5b]/05 blur-[80px] lg:blur-[100px]" />
      </div>

      {/* --- LEFT SECTION: HERO --- */}
      {/* Hidden on mobile, shown on large screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative overflow-hidden border-r border-white/5 z-10">
        <div className="flex items-center gap-4">
          <div className="size-12 flex items-center justify-center rounded-xl bg-[#13ec5b] text-[#0a110c]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">FuturisticChat AI</h2>
        </div>

        <div className="relative max-w-lg">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13ec5b]/10 border border-[#13ec5b]/20 text-[#13ec5b] text-[10px] font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13ec5b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13ec5b]"></span>
            </span>
            Next-Gen Neural Messaging
          </div>
          <h1 className="text-white text-6xl font-black leading-[1.05] mb-8">
            Welcome back to the future.
          </h1>
          <p className="text-[#92c9a4] text-xl leading-relaxed mb-10 opacity-80">
            Experience AI-powered messaging with end-to-end security and premium neural aesthetics.
          </p>
          
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-[#0a110c]" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-bold text-base">10k+ innovators</p>
              <p className="text-[#13ec5b] font-medium">Beta access active</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8 text-sm text-[#92c9a4]/60">
          <a className="hover:text-[#13ec5b] transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-[#13ec5b] transition-colors" href="#">Terms of Service</a>
        </div>
      </div>

      {/* --- RIGHT SECTION: AUTH CARD --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        
        {/* Mobile-only Logo Header */}
        <div className="lg:hidden flex flex-col items-center mb-8 gap-3">
            <div className="size-12 flex items-center justify-center  bg-[#13ec5b] text-[#0a110c]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">FuturisticChat AI</h2>
        </div>

        <div className="w-full max-w-[460px]">
          <div className="  p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl ">
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-[#92c9a4] text-xs sm:text-sm">
                {mode === 'login' ? 'Enter your neural credentials to continue.' : 'Start your journey into the future of messaging.'}
              </p>
            </div>

            {/* Switcher Tabs */}
            <div className="flex p-1 bg-black/40 rounded-xl lg:rounded-2xl mb-6 lg:mb-8 border border-white/5">
              <button 
                onClick={() => setMode('login')}
                className={`flex-1 py-2 lg:py-2 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${mode === 'login' ? 'bg-[#13ec5b] text-[#0a110c]' : 'text-[#92c9a4] hover:text-white'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 lg:py-2 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${mode === 'signup' ? 'bg-[#13ec5b] text-[#0a110c]' : 'text-[#92c9a4] hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Render component based on mode */}
            <div className="min-h-[300px]">
                {mode === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>

            <div className="relative my-4 lg:my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-[#112217] px-4 text-[#92c9a4]/40">Social Gateway</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-bold text-sm">
                <Smartphone size={18} className="text-[#13ec5b]" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-bold text-sm">
                <Sparkles size={18} className="text-[#13ec5b]" />
                Apple
              </button>
            </div>

            <div className="mt-8 lg:mt-10 text-center">
              <p className="text-[#92c9a4] text-xs sm:text-sm">
                {mode === 'login' ? "New to the future?" : "Already an innovator?"} 
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-[#13ec5b] font-black ml-2 hover:underline tracking-tight"
                >
                  {mode === 'login' ? 'Join Beta Now' : 'Access Vault'}
                </button>
              </p>
            </div>
          </div>
          
          {/* Footer links for mobile */}
          <div className="flex justify-center gap-6 mt-8 text-[10px] font-bold uppercase tracking-widest text-[#92c9a4]/30">
            <span>© 2026</span>
            <a className="hover:text-[#13ec5b] transition-colors" href="#">Support</a>
            <a className="hover:text-[#13ec5b] transition-colors" href="#">Legal</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialBtn = ({ icon, name }) => (
  <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 group">
    <img src={icon} alt={name} className="w-5 h-5 group-hover:scale-110 transition-transform" />
    <span className="text-xs font-black uppercase tracking-widest text-slate-700">{name}</span>
  </button>
);

export default AuthPage;
import React from 'react';
import { LuMessageSquare, LuMail, LuArrowLeft, LuSend } from "react-icons/lu";

const ForgotPassword = ({ onBackToLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add recovery logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-white font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* Decorative Background Blobs */}
      <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-8 lg:p-12 border border-slate-100 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Branding & Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-8 group cursor-default">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform">
              <LuMessageSquare className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tight italic text-slate-900">SyncPro</span>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Forgot password?</h2>
            <p className="text-slate-500 text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
              No worries, we'll send you reset instructions. Enter the email linked to your account.
            </p>
          </div>
        </div>

        {/* Recovery Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 group">
            <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">
              Business Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <LuMail size={18} />
              </div>
              <input 
                type="email" 
                required
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                placeholder="name@company.com" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-base hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>Send recovery link</span>
            <LuSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>

        {/* Back Action */}
        <div className="mt-10 text-center">
          <button 
            onClick={onBackToLogin}
            className="inline-flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all group"
          >
            <LuArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
import React, { useState } from 'react';
// Import from the official lucide-react library
import { 
  MessageSquare, 
  Lock, 
  Eye, 
  EyeOff, 
  Info, 
  ArrowLeft, 
  CheckCircle 
} from "lucide-react";

const ResetPassword = ({ onBackToLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fcfcfd] font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* Background Aesthetic */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-8 group cursor-default">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <MessageSquare className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 italic">SyncPro</span>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Set new password</h1>
            <p className="text-slate-500 font-medium">Please enter your new security credentials below.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* New Password Field */}
          <div className="space-y-2 group">
            <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">New Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPass ? "text" : "password"} 
                className="w-full pl-11 pr-12 py-4 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900 font-medium" 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2 group">
            <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showConfirm ? "text" : "password"} 
                className="w-full pl-11 pr-12 py-4 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-slate-900 font-medium" 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <Info className="text-indigo-600 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Use at least 8 characters with a mix of letters, numbers, and symbols.
            </p>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98]">
            <span>Update Password</span>
            <CheckCircle size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={onBackToLogin}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-xs font-bold uppercase tracking-widest transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
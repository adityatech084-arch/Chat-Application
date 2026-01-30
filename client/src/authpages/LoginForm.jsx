import React, { useRef, useState } from 'react';
import { LuMail, LuLock, LuEye, LuCheck, LuShieldCheck } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import Loder from '../components/Loder';
import { login } from '../features/auth/authSlice';

const LoginForm = ({ onForgotPassword }) => {
    const formRef = useRef();
    const dispatch = useDispatch();
    let {isLoggingIn} = useSelector((state) => state.auth);  
   const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    
    setFormData({
      ...formData, 
      [name]: value 
    });
  }
  
  function submit(e) {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  
  
  dispatch(login(formData));
  
  formRef.current.reset();
  
   
  }
  return (
    <form ref={formRef} onSubmit={submit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">Business Email</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <LuMail size={18} />
          </div>
          <input 
            type="email" 
           className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            placeholder="name@company.com" 
            name="email"  
            required
            autoComplete='off'
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">Password</label>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <LuLock size={18} />
          </div>
          <input 
            type="password" 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            
            placeholder="••••••••" 
            name="password"
            onChange={handleChange}
            required
            autoComplete='off'
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
            <LuEye size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="peer hidden" />
          <div className="size-5 rounded-lg border-2 border-slate-200 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
            <LuCheck className="text-white" size={12} strokeWidth={4} />
          </div>
          <span className="text-slate-600 text-xs font-bold uppercase tracking-tight">Keep me signed in</span>
        </label>
        <button onClick={onForgotPassword} className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:underline">Forgot?</button>
      </div>

   
   <button 
     type='submit' 
     disabled={isLoggingIn} 
     className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] ${
          isLoggingIn ? "bg-white/10 cursor-not-allowed text-[#92c9a4]" : "bg-[#13ec5b] text-[#0a110c] hover:shadow-[#13ec5b]/20"
        }
      }
     `}>
       {isLoggingIn && <Loder size={20} />}
   
           <span>Create an Account</span>
           <LuShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
         </button>
    </form>
  );
};

export default LoginForm;
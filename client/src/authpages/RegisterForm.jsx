import React, { useRef, useState } from 'react';
import { LuUser, LuBuilding2, LuMail, LuLock, LuShieldCheck } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import Loder from '../components/Loder.jsx';
const RegisterForm = () => {
  const formRef = useRef();
  const dispatch = useDispatch();
  let {isSigningUp} = useSelector((state) => state.auth);  
 const [formData, setFormData] = useState({
  fullName: "",
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


dispatch(signup(formData));

formRef.current.reset();

 
}

  return (
    <form onSubmit={submit} ref={formRef} autoComplete='off' className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">Full Name</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <LuUser size={18} />
            </div>
            <input
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            placeholder="full-Name" 

            name='fullName'
            onChange={handleChange} required 
            // value={formData.fullName}
            />
         </div>
        </div>
 
      </div>


   

      <div className="space-y-2">
        <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1"> Email</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <LuMail size={18} />
          </div>
          <input
           className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            placeholder="name@company.com" 

          type='email'
          name='email'
          onChange={handleChange} 
          // value={formData.email}
           autoComplete='off'
          required

          />
        </div>
      </div>

      <div className="space-y-2 pb-2">
        <label className="text-slate-700 text-xs font-bold tracking-widest uppercase ml-1">Set Password</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <LuLock size={18} />
          </div>
          <input type="password" 
           className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            
          placeholder="Min. 8 characters"name='password' 
             onChange={handleChange} 
             required
            // value={formData.password}

             />
        </div>
      </div>

<button 
  type='submit' 
  disabled={isSigningUp} 
  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-[0.98] mt-2 
          ${isSigningUp 
            ? "bg-white/10 cursor-not-allowed text-[#92c9a4]" 
            : "bg-[#13ec5b] text-[#0a110c] hover:bg-[#13ec5b]/90 shadow-[#13ec5b]/20"
           }
  `}>
    {isSigningUp && <Loder size={20} />}

        <span>Create an Account</span>
        <LuShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
      </button>
    </form>
  );
};

export default RegisterForm;
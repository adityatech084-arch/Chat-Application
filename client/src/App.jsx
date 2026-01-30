// import React, { useEffect } from 'react'
// // import Login from './authpages/LoginForm'
// import AuthPage from './authpages/authPage'
// import ForgotPassword from './authpages/ForgetPassword'
// import ResetPassword from './authpages/ResectPassword'
// import ChatPage from './pages/ChatPage'
// import { Routes, Route } from 'react-router-dom'
// import { AuthProtector, PublicProtector } from './protector/Protect'
// import { useDispatch } from 'react-redux'
// import { checkAuth } from './features/auth/authSlice'
// import { ToastContainer } from 'react-toastify'
// // import {ToastContainer} from 'react-toastify'
// function App() {
//   const dispatch = useDispatch();
//   useEffect(()=>{
//    dispatch(checkAuth());
//   },[]);
//   return (
//   <>
  
// <ToastContainer/>
//   <Routes>
//    <Route element={<PublicProtector/>}>
//     <Route path='/forgot-password' element={<ForgotPassword/>}/>
//     <Route path='/reset-password' element={<ResetPassword/>}/>
//     <Route path='/auth' element={<AuthPage/>}/>
//    </Route>
//    <Route element={<AuthProtector/>}>
   
//     <Route path='/' element={<ChatPage/>}/>
//    </Route>
//   </Routes>

  
//     </>
//   )
// }

// export default App


// App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthPage from "./authpages/authPage";
import ForgotPassword from "./authpages/ForgetPassword";
import ResetPassword from "./authpages/ResectPassword";
import ChatPage from "./pages/ChatPage";

import { checkAuth } from "./features/auth/authSlice";
import { AuthProtector, PublicProtector } from "./protector/Protect";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {/* ToastContainer must be rendered inside the App component */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Routes>
        {/* Public routes */}
        <Route element={<PublicProtector />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthProtector />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

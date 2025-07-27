import React,{useState} from 'react'
import Spline from '@splinetool/react-spline';
import {Link} from "react-router-dom"
import {toast} from 'react-hot-toast'
import { Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageCircleMore, User } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import { formToJSON } from 'axios';
import { TiMessages } from "react-icons/ti";
const LoginPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const {login,isLoggingIn} = useAuthStore();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleSubmit=(e)=>{
       e.preventDefault();
       if(!formData.email || !formData.password){
         toast.error("Please fill in all fields");
         return;
       }
       login(formData);
  }
  return (
      <div className="min-h-screen grid lg:grid-cols-2 bg-messagebg">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <TiMessages className="size-7 text-purple-500 animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome!!!</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 py-5 rounded-lg"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 py-5 rounded-lg"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/40 z-10" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/40 z-10" />
                  )}
                </button>
              </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary w-full py-5 rounded-lg" disabled={isLoggingIn} >
              {isLoggingIn ?(
                <>
                   <Loader2 className="w-5 h-5 animate-spin" />
                   Loading...
                </>
              ):(
                <>Login</>
              )}
            </button>
            </form>
             <div className="text-center">
            <p className="text-base-content/60">
              New to ChatCom?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        </div>
      {/* right side */}
      <div className="hidden lg:block">
        <Spline scene="https://prod.spline.design/bglubsFoAly53j7E/scene.splinecode" />
      </div>
    </div>
  )
}

export default LoginPage
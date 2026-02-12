import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Welcome back!");
      } else {
        await register(name, email, password);
        toast.success("Account created successfully!");
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-32 animate-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-6xl bg-white dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Left */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://picsum.photos/1200/1200?grayscale"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Auth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-black/40"></div>
          <div className="relative z-10 p-12 flex flex-col justify-between text-white h-full w-full">
            <div className="flex items-center gap-2">
              <span className="material-icons text-3xl">layers</span>
              <span className="text-xl tracking-widest uppercase font-light">
                Fashion Accessories
              </span>
            </div>
            <div className="mb-12">
              <h2 className="text-5xl font-light mb-6 leading-tight">
                Elevate Your <br />
                <span className="font-semibold">Style.</span>
              </h2>
              <p className="text-lg text-white/80 font-light max-w-md">
                Join our exclusive community for early access to premium fashion
                accessories.
              </p>
              <div className="mt-12 pt-12 border-t border-white/20 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://picsum.photos/32/32?random=1"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    alt="U1"
                  />
                  <img
                    src="https://picsum.photos/32/32?random=2"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    alt="U2"
                  />
                  <img
                    src="https://picsum.photos/32/32?random=3"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    alt="U3"
                  />
                </div>
                <span className="text-sm font-medium">
                  Trusted by 10k+ fashion enthusiasts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500">
              {isLogin
                ? "Please enter your details to sign in."
                : "Join us and start shopping today."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
                isLogin
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
                !isLogin
                  ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-icons absolute left-3 top-3 text-slate-400 text-lg">
                    person_outline
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <span className="material-icons absolute left-3 top-3 text-slate-400 text-lg">
                  mail_outline
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="material-icons absolute left-3 top-3 text-slate-400 text-lg">
                  lock_outline
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? isLogin
                  ? "Signing In..."
                  : "Creating Account..."
                : isLogin
                  ? "Secure Login"
                  : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

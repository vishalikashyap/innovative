"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../shared/toaster/ToastProvider";

export default function LoginPage() {
  const [step, setStep] = useState<"choose" | "login" | "verify">("choose");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone" | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleChooseMethod = (method: "email" | "phone") => {
    setOtpMethod(method);
    setStep("login");
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, phone, otpMethod }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        showToast(`OTP sent to your ${otpMethod}`, "success");
        setStep("verify");
      } else {
        showToast("User not found or error occurred", "error");
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-login-otp", {
        method: "POST",
        body: JSON.stringify({ email, phone, otp, otpMethod }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        showToast("Login successful!", "success");
        router.push("/dashboard");
      } else {
        showToast("Invalid OTP", "error");
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center  bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/60 to-purple-700/60 backdrop-blur-sm"></div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="loader border-t-yellow-400 border-gray-200"></div>
        </div>
      )}

      <div className="relative z-10 p-8 rounded-2xl shadow-2xl w-full max-w-md bg-white/10 border border-yellow-400/50">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400 tracking-wide">
          {step === "choose"
            ? "Welcome Back!"
            : step === "login"
            ? `Login with ${otpMethod === "email" ? "Email" : "Phone"}`
            : "Verify OTP"}
        </h1>

        {step === "choose" && (
          <div className="space-y-4">
            <button
              onClick={() => handleChooseMethod("email")}
              className="w-full py-3 rounded-xl font-semibold bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Login with Email
            </button>
            <button
              onClick={() => handleChooseMethod("phone")}
              className="w-full py-3 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Login with Phone
            </button>
          </div>
        )}

        {step === "login" && (
          <div className="space-y-4">
            {otpMethod === "email" && (
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white border border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            )}
            {otpMethod === "phone" && (
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white border border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            )}

            <button
              onClick={handleSendOtp}
              className="w-full py-3 rounded-xl font-semibold bg-yellow-400 text-purple-800 hover:bg-yellow-300 transition"
            >
              Send OTP
            </button>

            <button
              onClick={() => setStep("choose")}
              className="w-full text-sm underline text-white/80 hover:text-yellow-400 transition"
            >
              ← Back
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/, "");
                    const newOtp = otp.split("");
                    newOtp[i] = val;
                    setOtp(newOtp.join(""));
                    if (val && i < 3) {
                      const nextInput = document.getElementById(`otp-${i + 1}`);
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      const prevInput = document.getElementById(`otp-${i - 1}`);
                      prevInput?.focus();
                    }
                  }}
                  id={`otp-${i}`}
                  className="w-12 h-12 text-center mr-4 text-xl rounded-lg bg-white/20 text-white border border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl font-semibold bg-yellow-400 text-purple-800 hover:bg-yellow-300 transition"
            >
              Verify OTP & Login
            </button>
          </div>
        )}

        {step !== "verify" && (
          <div className="mt-6 text-center text-sm text-white/80">
            Don’t have an account?{" "}
            <a href="/signup" className="text-yellow-400 hover:underline">
              Sign up
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #e5e7eb;
          border-top: 4px solid #facc15;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

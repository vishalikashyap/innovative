"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../shared/toaster/ToastProvider";

export default function SignupPage({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  const handleSignup = async () => {
    if (!name || !phone || !email || !address) {
      showToast("All fields are mandatory!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, phone, address, role, email, otpMethod }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        showToast(`OTP sent to your ${otpMethod}!`, "success");
        setStep("verify");
      } else {
        showToast("Signup failed. Try again.", "error");
      }
    } catch {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, phone, otp, otpMethod }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        showToast("Signup successful!", "success");
        onClose?.(); // close modal if provided
        router.push("/dashboard");
      } else {
        showToast("Invalid OTP. Try again.", "error");
      }
    } catch {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md p-6 bg-yellow-50 rounded-2xl shadow-2xl border border-yellow-400">
      {/* Close Button for modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
      )}

      <h1 className="text-3xl font-extrabold text-center mb-2 text-purple-700">
        {step === "signup" ? "Join I&F" : "Verify OTP"}
      </h1>
      <p className="text-center text-gray-700 mb-6">
        {step === "signup"
          ? "Create your account and start learning"
          : "Enter the OTP sent to you"}
      </p>

      {step === "signup" ? (
        <div className="space-y-4 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <input
            type="text"
            placeholder="Address *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
            className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
          >
            <option value="user">Admin</option>
            <option value="admin">User</option>
          </select>
          <div className="flex gap-4 items-center">
            <label>
              <input
                type="radio"
                value="email"
                checked={otpMethod === "email"}
                onChange={() => setOtpMethod("email")}
                className="mr-2 accent-purple-500"
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                value="phone"
                checked={otpMethod === "phone"}
                onChange={() => setOtpMethod("phone")}
                className="mr-2 accent-purple-500"
              />
              Phone
            </label>
          </div>

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-pink-600 transition"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-center gap-4">
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
                  if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0)
                    document.getElementById(`otp-${i - 1}`)?.focus();
                }}
                id={`otp-${i}`}
                className="w-12 h-12 text-center rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-pink-600 transition"
          >
            Verify OTP
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-black text-sm">
        Already have an account?{" "}
        <button onClick={onClose} className="text-purple-700 hover:underline">
          Login
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 rounded-2xl">
          <div className="loader border-t-purple-500 border-gray-300 border-4 w-10 h-10 rounded-full animate-spin"></div>
        </div>
      )}

      <style jsx>{`
        .loader {
          border-radius: 50%;
          border-top-width: 4px;
          border-style: solid;
          width: 40px;
          height: 40px;
        }
      `}</style>
    </div>
  );
}

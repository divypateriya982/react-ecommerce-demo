import { useState, memo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm();

    console.log("Login rendering...");

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 transition-colors">
            <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200/90 shadow-sm sm:shadow-lg p-6 sm:p-8 md:p-10">
                {/* Header Section */}
                <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white mx-auto shadow-xs mb-3">
                        <i className="ri-store-2-line text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                        Welcome Back
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xs mx-auto">
                        Please enter your details to access your account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit((user) => {
                        dispatch(asyncLoginUser(user));
                        reset();
                    })}
                    className="mt-8 space-y-5"
                >
                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                                <i className="ri-mail-line text-base"></i>
                            </span>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                type="text"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors?.email && (
                            <small className="text-rose-600 text-xs mt-1 block font-medium">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                                <i className="ri-lock-2-line text-base"></i>
                            </span>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be atleast 8 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                        message:
                                            "Password must contain an uppercase, lowercase, number and special character",
                                    },
                                })}
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <i className={showPassword ? "ri-eye-off-line text-base" : "ri-eye-line text-base"}></i>
                            </button>
                        </div>
                        {errors?.password && (
                            <small className="text-rose-600 text-xs mt-1 block font-medium leading-tight">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                            <i className="ri-login-box-line text-base"></i>
                            <span>Sign In</span>
                        </button>
                    </div>

                    {/* Footer Links */}
                    <p className="text-center text-xs sm:text-sm text-zinc-500 pt-2">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline cursor-pointer transition-colors"
                        >
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default memo(Login);

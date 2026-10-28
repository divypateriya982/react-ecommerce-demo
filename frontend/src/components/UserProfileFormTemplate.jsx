import { useState, memo } from "react";
import { useForm } from "react-hook-form";
import { asyncUpdateUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserProfileFormTemplate = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const { id, isAdmin } = user || {};
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: user?.fullName || "",
            email: user?.email || "",
            password: user?.password || "",
        },
    });

    console.log("UserProfileForm template rendering...");

    return (
        <form
            onSubmit={handleSubmit((formData) => {
                formData.id = id;
                formData.isAdmin = isAdmin;
                dispatch(asyncUpdateUser(formData, id));
            })}
            className="space-y-5"
        >
            {/* Full Name Field */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                    Full Name
                </label>
                <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                        <i className="ri-user-line text-base"></i>
                    </span>
                    <input
                        {...register("fullName", {
                            required: "Full name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be atleast 3 characters long",
                            },
                            pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Name can only contain letters and spaces",
                            },
                        })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        type="text"
                        placeholder="Enter full name"
                    />
                </div>
                {errors?.fullName && (
                    <small className="text-rose-600 text-xs mt-1 block font-medium">
                        {errors.fullName.message}
                    </small>
                )}
            </div>

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
                        placeholder="Enter email address"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                    Password
                </label>
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
                        placeholder="Enter password"
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

            {/* Save Button */}
            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                    <i className="ri-save-line text-base"></i>
                    <span>Save Profile Changes</span>
                </button>
            </div>
        </form>
    );
};

export default memo(UserProfileFormTemplate);

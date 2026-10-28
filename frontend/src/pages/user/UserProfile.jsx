import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfileFormTemplate from "../../components/UserProfileFormTemplate";
import { memo } from "react";

const UserProfile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);

    console.log("UserProfile rendering...");

    return (
        <main className="min-h-screen bg-zinc-50/70 pt-22 sm:pt-24 pb-16 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation Bar */}
                <div className="py-4 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 shadow-xs transition duration-200 cursor-pointer text-sm font-semibold active:scale-95"
                    >
                        <i className="ri-arrow-left-line text-base"></i>
                        <span>Back</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-400">
                        <span>Account</span>
                        <i className="ri-arrow-right-s-line text-zinc-300"></i>
                        <span className="text-zinc-600">User Profile</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-2">
                    {/* Left Column: User Summary Card */}
                    <div className="md:col-span-5 bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8 text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-white text-3xl font-bold flex items-center justify-center mx-auto shadow-sm uppercase">
                            {user?.fullName ? user.fullName[0] : <i className="ri-user-line text-3xl"></i>}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                                {user?.fullName}
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                                {user?.email}
                            </p>
                        </div>

                        <div>
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                    user?.isAdmin
                                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200/80"
                                        : "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                                }`}
                            >
                                <i className={user?.isAdmin ? "ri-shield-star-line" : "ri-user-check-line"}></i>
                                {user?.isAdmin ? "Administrator" : "Verified Customer"}
                            </span>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 text-left space-y-3 text-xs text-zinc-600">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">Account ID</span>
                                <span className="font-mono text-zinc-700">{user?.id}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">Role Status</span>
                                <span className="font-semibold text-zinc-800">{user?.isAdmin ? "Admin Access" : "Standard Buyer"}</span>
                            </div>
                        </div>

                        {/* Navigation link to Settings */}
                        <div className="pt-4 border-t border-zinc-100">
                            <Link
                                to="/settings"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-semibold text-xs sm:text-sm transition-colors"
                            >
                                <i className="ri-settings-3-line text-base"></i>
                                <span>Go to Account Settings</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Edit Profile Form */}
                    <div className="md:col-span-7 bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8">
                        <div className="pb-5 border-b border-zinc-100 mb-6">
                            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                                Edit Profile Details
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                                Update your account name, email address, or secure password.
                            </p>
                        </div>

                        <UserProfileFormTemplate />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default memo(UserProfile);

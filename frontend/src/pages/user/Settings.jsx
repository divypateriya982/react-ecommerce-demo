import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteUser, asyncLogoutUser } from "../../store/actions/userActions";
import { removeCart } from "../../store/reducers/cartSlice";
import { resetCurrentPage } from "../../store/reducers/productSlice";
import { memo } from "react";

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const { id } = user || {};

    console.log("Settings rendering...");

    const handleLogout = () => {
        dispatch(asyncLogoutUser());
        dispatch(removeCart());
        dispatch(resetCurrentPage());
        navigate("/");
    };

    const handleDeleteAccount = () => {
        if (id) {
            dispatch(asyncDeleteUser(id));
            dispatch(removeCart());
            dispatch(resetCurrentPage());
            navigate("/");
        }
    };

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
                        <span className="text-zinc-600">Settings</span>
                    </div>
                </div>

                {/* Page Title */}
                <div className="pt-2 pb-6 border-b border-zinc-200/80 mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
                        <i className="ri-settings-3-line text-indigo-600"></i>
                        Account Center
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                        Manage your active session, security configurations, and account state.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Profile Shortcut Card */}
                    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-bold text-zinc-900">
                                Personal Profile Information
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                                Modify your account name, email address, or update your password.
                            </p>
                        </div>
                        <Link
                            to="/profile"
                            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs sm:text-sm transition-colors"
                        >
                            <span>Edit Profile</span>
                            <i className="ri-arrow-right-line text-sm"></i>
                        </Link>
                    </div>

                    {/* Active Session & Logout Card */}
                    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-bold text-zinc-900">
                                Active Session
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                                Currently signed in as <span className="font-semibold text-zinc-700">{user?.email}</span>
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer active:scale-95"
                        >
                            <i className="ri-logout-box-r-line text-base"></i>
                            <span>Sign Out</span>
                        </button>
                    </div>

                    {/* Danger Zone: Delete Account */}
                    <div className="bg-rose-50/50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                                <i className="ri-alarm-warning-line"></i>
                                Danger Zone
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mt-1">
                                Delete Account
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5 max-w-lg">
                                Once deleted, your account profile and associated data will be permanently removed. This action cannot be reversed.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold text-xs sm:text-sm shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            <i className="ri-delete-bin-line text-base"></i>
                            <span>Delete Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default memo(Settings);


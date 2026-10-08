import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from '../../store/actions/userActions';
import { removeCart } from '../../store/reducers/cartSlice';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const { id, isAdmin } = user;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user?.fullName,
            email: user?.email,
            password: user?.password
        }
    });
    return (
        <div className="min-h-screen bg-slate-400 pt-25 pb-6 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit((user) => {
                user.id = id,
                    user.isAdmin = isAdmin,
                    dispatch(asyncUpdateUser(user, id));
                navigate('/');
                reset();
            })} className="w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%] bg-white px-6 py-5 rounded-2xl text-sm shadow-xl md:shadow-2xl">
                <h1 className="text-center text-lg font-medium">Welcome Back!</h1>
                <p className="text-[#8B96A0] text-center">We missed you! Please enter your details.</p>
                <div className="mt-3 h-20 md:mt-4">
                    <h2 className="ml-5 mb-1">Full name</h2>
                    <input {...register('fullName', {
                        required: 'Full name is required',
                        minLength: {
                            value: 3,
                            message: 'Name must be atleast 3 characters long'
                        },
                        pattern: {
                            value: /^[A-Za-z ]+$/,
                            message: 'Name can only contain letters and spaces'
                        }
                    })} className=" w-full px-5 py-2 rounded-full bg-white placeholder:text-[#C5CACF] border border-[#C5CACF] outline-none text-[#8B96A0]" type="text" placeholder="Enter Full name" />
                    <small className='text-red-600 block text-xs ml-3'>{errors?.fullName?.message}</small>
                </div>
                <div className="h-20">
                    <h2 className="ml-5 mb-1">Email</h2>
                    <input {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email'
                        }
                    })} className=" w-full px-5 py-2 rounded-full bg-white placeholder:text-[#C5CACF] border border-[#C5CACF] outline-none text-[#8B96A0]" type="text" placeholder="Enter your Email" />
                    <small className='text-red-600 block text-xs ml-3'>{errors?.email?.message}</small>
                </div>
                <div className="h-22 min-w-0">
                    <h2 className="ml-5 mb-1">Password</h2>
                    <input {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be atleast 8 characters long'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                            message: 'Password must contain a uppercase, lowercase, number and special character'
                        }
                    })} className="w-full px-5 py-2 rounded-full bg-white placeholder:text-[#C5CACF] border border-[#C5CACF] outline-none text-[#8B96A0]" type="password" placeholder="Enter Password" />
                    <small className='text-red-600 block text-xs ml-3'>{errors?.password?.message}</small>
                </div>
                <button className="bg-[#2563EB] text-[#FFFFFF] w-full py-2 rounded-full mt-2 active:scale-[0.97] transition duration-200 cursor-pointer">Update User</button>
            </form>
            <button className="bg-gray-700 text-white py-2 rounded-full mt-5 active:scale-[0.97] transition duration-200 font-medium cursor-pointer w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%]" onClick={() => {
                dispatch(asyncLogoutUser());
                dispatch(removeCart());
                navigate('/');
            }}>Logout User</button>
            <button className="bg-red-600/70 text-white py-2 rounded-full mt-4 active:scale-[0.97] transition duration-200 font-medium cursor-pointer w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%]" onClick={() => {
                dispatch(asyncDeleteUser(id));
                dispatch(removeCart());
                navigate('/');
            }}>Delete User</button>
        </div>
    )
}

export default UserProfile
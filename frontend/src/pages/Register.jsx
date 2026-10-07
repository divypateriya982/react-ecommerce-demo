import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../store/actions/userActions';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-linear-to-r from-[#77C3FD] via-[#6D7CFD] to-[#B3AAFC]">
            <form onSubmit={handleSubmit((user) => {
                user.isAdmin = false;
                asyncRegisterUser(user);
                reset();
                navigate('/login');
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
                <button className="bg-[#6375F0] text-white w-full py-2 rounded-full mt-2 active:scale-[0.97] transition duration-200 cursor-pointer">Register</button>
                <p className="text-center mt-2 text-sm">Already have an account? <Link to={'/login'} className="text-blue-600 hover:underline cursor-pointer font-medium">Log in</Link></p>
            </form>
        </div>
    )
}

export default Register
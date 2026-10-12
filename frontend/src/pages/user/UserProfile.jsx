import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteUser, asyncLogoutUser } from '../../store/actions/userActions';
import { removeCart } from '../../store/reducers/cartSlice';
import { resetCurrentPage } from '../../store/reducers/productSlice';
import UserProfileFormTemplate from '../../components/UserProfileFormTemplate';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useSelector((state) => state.userReducer.user);

    console.log('UserProfile rendering...')
    return (
        <div className="min-h-screen bg-slate-400 pt-25 pb-6 flex flex-col items-center justify-center">
            <UserProfileFormTemplate />

            <button className="bg-gray-700 text-white py-2 rounded-full mt-5 active:scale-[0.97] transition duration-200 font-medium cursor-pointer w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%]" onClick={() => {
                dispatch(asyncLogoutUser());
                dispatch(removeCart());
                dispatch(resetCurrentPage());
                navigate('/');
            }}>Logout User</button>

            <button className="bg-red-600/70 text-white py-2 rounded-full mt-4 active:scale-[0.97] transition duration-200 font-medium cursor-pointer w-[85%] min-[480px]:max-[640px]:w-[65%] sm:w-[50%] md:w-[40%] lg:w-[30%]" onClick={() => {
                dispatch(asyncDeleteUser(id));
                dispatch(removeCart());
                dispatch(resetCurrentPage());
                navigate('/');
            }}>Delete User</button>
        </div>
    )
}

export default UserProfile
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector((state) => state.userReducer.user);
    return (
        <div className="py-5 flex justify-center space-x-5 text-lg fixed z-50 top-0 left-0 right-0 border-b border-gray-200/80 bg-white/60 shadow-sm backdrop-blur-md">
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Home</NavLink>
            {user ? <>
                {user?.isAdmin ? (
                    <NavLink to={'/admin/create-product'} className={({ isActive }) => isActive ? 'text-pink-600' : ''}>Create Product</NavLink>
                ) : (
                    <NavLink to={'/cart'} className={({isActive}) => isActive ? 'text-pink-600' : ''}>Cart</NavLink>
                )}
                
                <NavLink to={'/settings'} className={({isActive}) => isActive ? 'text-pink-600' : ''}>Settings</NavLink>
            </> : <>
                <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-pink-600' : ''}>Login</NavLink>
            </>}
            
        </div>
    )
}

export default Navbar
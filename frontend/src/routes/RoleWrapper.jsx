import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const RoleWrapper = ({ role, children }) => {
    const user = useSelector((state) => state.userReducer.user);

    if (!user) {
        <Navigate to={'/login'} replace />
    }

    const hasRequiredRole = role === 'admin' ? (
        user.isAdmin === true
    ) : (
        user.isAdmin === false && role === "customer"
    );

    return hasRequiredRole ? children : <Navigate to={'/'} replace />
}

export default RoleWrapper
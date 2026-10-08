import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const UnauthWrapper = (props) => {
    const user = useSelector((state) => state.userReducer.user);
    return (
        !user ? props.children : <Navigate to={'/'} replace />
    )
}

export default UnauthWrapper;
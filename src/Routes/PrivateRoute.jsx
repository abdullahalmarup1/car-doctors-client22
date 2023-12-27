import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)

    const location = useLocation();
    // console.log(location.pathname);

    if (loading) {
        return <progress className="progress w-full"></progress>
    }


    if (user?.email) {
        return children
    }
    /*State er vitor evave ekta object o deya jabe  {from:location} */
    return <Navigate state={location.pathname} to='/login' replace>
    </Navigate>
};

export default PrivateRoute;
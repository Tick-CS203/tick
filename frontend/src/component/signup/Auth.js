import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const Auth = ({children}) => {
    const { accessToken } = useSelector((state) => state.user); 
    console.log(accessToken);
    if (accessToken) {
        return children;
    }

    return <Navigate to="/login" />
}

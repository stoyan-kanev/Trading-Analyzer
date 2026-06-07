import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/useAuth.tsx";


export function AuthRoute(){
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }
    if(!isAuthenticated){
        return <Navigate to='/login' />;
    }

    return <Outlet/>
}
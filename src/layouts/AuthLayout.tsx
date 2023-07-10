import { Outlet } from "react-router-dom";
import NavBar from '../components/NavBar/NavBar';

function AuthLayout(){
    return <>
    <NavBar/>
    <Outlet/>
    </>
}

export default AuthLayout;
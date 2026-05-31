import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";


export default function AppLayout() {
    return (
        <>
            <NavBar/>

            <main>
                <Outlet/>
            </main>
        </>
    );
}
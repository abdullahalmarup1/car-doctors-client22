import { Outlet } from "react-router-dom";
import NavBar from "../Pages/shared/NavBar/NavBar";
import Footer from "../Pages/shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
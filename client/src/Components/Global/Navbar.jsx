import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { authContext } from "../../Context/authContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const {state} = useContext(authContext);
    const username = state?.user?.username;
    const router = useNavigate();

    const redirectToLogin = () => {
        router("/login");
    }
    // const redirectToHome = () => {
    //     router("/");
    // }
    const redirectToProducts = () => {
        router("/");
    }
    const redirectToMens = () => {
        router("/mens");
    }
    const redirectToWomens = () => {
        router("/womens");
    }
    const redirectToElectronics = () => {
        router("/electronics");
    }

    const navVariants = {
        initial: {
            y: -180
        },
        animate: {
            y: 0
        }
    };

    const transition = {
        type: "spring",
        delay: 0.5,
        stiffness: 260,
        damping: 20,
    }
    return (
        <>
            <motion.nav variants={navVariants} initial="initial" animate="animate" transition={transition} className="fixed top-0 z-50 w-full h-[100px] flex items-center justify-center">
                <section className="w-[40%] h-[60%] border rounded-full backdrop-blur-xl bg-white shadow-xl flex items-center justify-evenly">
                    <Button onClick={redirectToProducts} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Home</Button>
                    <Button onClick={redirectToMens} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Mens</Button>
                    <Button onClick={redirectToWomens} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Womens</Button>
                    <Button onClick={redirectToElectronics} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Electronics</Button>
                    {username ? (<><Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">{username}</Button></>) : (<><Button onClick={redirectToLogin} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Sign In</Button></>)}
                </section>
            </motion.nav>
        </>
    )
}

export default Navbar;
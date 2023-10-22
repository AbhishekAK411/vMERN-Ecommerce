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
            <motion.nav variants={navVariants} initial="initial" animate="animate" transition={transition} className="w-full h-[100px] flex items-center justify-center">
                <section className="w-[40%] h-[60%] border rounded-full backdrop-blur-lg shadow-xl flex items-center justify-evenly">
                    <Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Home</Button>
                    <Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Products</Button>
                    <Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Explore</Button>
                    <Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Features</Button>
                    {username ? (<><Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">{username}</Button></>) : (<><Button onClick={redirectToLogin} size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Sign In</Button></>)}
                </section>
            </motion.nav>
        </>
    )
}

export default Navbar;
import { Button, Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Navbar = () => {

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
                    <Button size="sm" variant="text" className="h-[80%] rounded-full text-gray-500">Sign In</Button>
                </section>
            </motion.nav>
        </>
    )
}

export default Navbar;
import { Avatar, Button, Input} from "@material-tailwind/react";
import registerPng from "../../Resources/Images/register.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
    const router = useNavigate();

    const redirectToRegister = () => {
        router("/register");
    }

    const loginVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        }
    }

    const transition = {
        type: "spring",
        delay: 0.5,
        stiffness: 260,
        damping: 20,
    }
    return (
        <>
            <motion.section variants={loginVariants} initial="initial" animate="animate" transition={transition} className="w-full h-screen flex items-center justify-center">
                <section className="shadow-shadow1 rounded w-[25%] h-[65%] border flex flex-col items-center justify-center">
                    <Avatar src={registerPng} withBorder={true} className="p-0.5 mb-10" alt="avatar" size="xl" />
                    <section className="w-[80%] h-[50%] flex flex-col items-center justify-center gap-y-5">
                        <Input label="Username/Email" />
                        <Input label="Password" />
                        <Button className="rounded">Sign In</Button>
                        <p>Don't have an account? <u className="cursor-pointer" onClick={redirectToRegister}>Sign Up</u></p>
                    </section>
                </section>
            </motion.section>
        </>
    )
}

export default Login;
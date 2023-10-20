import { Avatar, Input, Button } from "@material-tailwind/react";
import registerPng from "../../Resources/Images/register.png";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const router = useNavigate();

    const redirectToLogin = () => {
        router("/login");
    }
    return (
        <>
            <section className="w-full h-screen border-black border flex items-center justify-center">
                <section className="shadow-shadow1 rounded w-[25%] h-[65%] border flex flex-col items-center justify-center">
                    <Avatar src={registerPng} withBorder={true} className="p-0.5 mb-10" alt="avatar" size="xl" />
                    <section className="w-[80%] h-[70%] flex flex-col gap-y-5">
                        <Input label="Username" />
                        <Input label="Email" />
                        <Input label="Contact" />
                        <Input label="Password" />
                        <Input label="ConfirmPassword" />
                        <Button className="rounded">Sign Up</Button>
                        <p>Already have an account? <u className="cursor-pointer" onClick={redirectToLogin}>Sign In</u></p>
                    </section>
                </section>
            </section>
        </>    
    )
}

export default Register;
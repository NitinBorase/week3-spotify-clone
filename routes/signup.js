import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import {makeUnauthenticatePOSTRequest} from "../utils/serverHelpers";

const SignupComponent = () => {
    const[email, setEmail] = useState("");
    const[confirmEmail, setConfirmEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userName, setUsername] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () => {
        if(email!==confirmEmail){
            alert("Emails do not match");
            return;
        }
        const data = {email, firstName, lastName, password, userName};
        try {
            const response = await makeUnauthenticatePOSTRequest("/auth/register", data);
            if (response && !response.err) {
                console.log(response);
                const token = response.token;
                if (!token) {
                    console.error("Token is undefined");
                    alert("Failed to sign up: Token is undefined");
                    return;
                }
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie("token", token, { path: "/", expires: date });
                alert("Successfully signed up");
                navigate("/home");
            } else {
                alert("Failed to sign up");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to sign up");
        }
    };

    return <div className="w-full h-full flex flex-col items-center">
        <div className="logo p-10 border-b border-solid border-gray-400 w-full flex justify-center">
            <Icon icon="logos:spotify" width="165" />
        </div>
        <div className="inputRegion w-1/3 py-10 flex items-center flex-col">
            <div className="font-bold mb-10 text-2xl">Sign up to start listening</div>
            <TextInput label="First Name" placeholder="Enter your first name" className="mb-5" value={firstName} setValue={setFirstName}/>
            <TextInput label="Last Name" placeholder="Enter your last name" className="mb-5" value={lastName} setValue={setLastName}/>
            <TextInput label="Email Address" placeholder="Enter your email" className="mb-5" value={email} setValue={setEmail} />
            <TextInput label="Confirm Email Address" placeholder="Enter your email again" className="mb-5" value={confirmEmail} setValue={setConfirmEmail}/>
            <TextInput label="Username" placeholder="Enter your username" className="mb-5" value={userName} setValue={setUsername}/>
            <PasswordInput label="Password" placeholder="Enter your Password" className="mb-5" value={password} setValue={setPassword}/>
            
            <div className="w-full flex items-center justify-center my-5">
                <button className="bg-green-500 font-semibold text-white rounded-md px-8 p-2"
                onClick = {(e)=>{
                    e.preventDefault();
                    signUp();
                }}
                >SIGN UP</button>
            </div>
            <div className="w-full border border-solid border-gray-400"></div>
            <div className="my-5 font-semibold text-xl">
                Already have an account?
            </div>
            <div className="border border-solid bg-green-500 rounded-full p-3 text-white font-bold px-10">
                <Link to="/login">LOG IN INSTEAD</Link>
            </div>
        </div>
    </div>;
};

export default SignupComponent;
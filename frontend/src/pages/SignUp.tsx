import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/Subheading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail]   = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  return (
    <div className='flex justify-center h-screen bg-slate-200'>
        <div  className='flex flex-col justify-center'>
            <div className='bg-white w-80 text-center h-max rounded-lg'>
                <Heading label={"Sign Up"} />
                <SubHeading label = {"Enter your information to create an account"} />
                <Input label={"Name"} placeholder="John" onChange={(e)=> setUserName(e.target.value)}/>
                <Input label={"Email"} placeholder="shiva@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                <Input label={"Password"} placeholder="123456" onChange={(e)=> setPassword(e.target.value)}/>
                   <div className='pt-4'>
                 <Button onClick= {async () => {
                    console.log("i am under this onclick function")
            const response = await axios.post("http://localhost:3000/api/user/singup", {
              username : userName,
              email,
              password,
              
            });
            console.log(response.data.token)
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
            }
            }
             label={"Sign up"} />
                 </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signIn"} />
            </div>
        </div>
    </div>
  )
}

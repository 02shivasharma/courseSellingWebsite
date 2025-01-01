import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/Subheading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SignIn = () => {
    const [email, setEmail]   = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  return (
    <div className='flex justify-center h-screen bg-slate-200'>
        <div  className='flex flex-col justify-center'>
            <div className='bg-white w-80 text-center h-max rounded-lg'>
                <Heading label={"Sign In"} />
                <SubHeading label = {"Enter your details to sign in to your account"} />
                <Input label={"Email"} placeholder="shiva@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                <Input label={"Password"} placeholder="123456" onChange={(e)=> setPassword(e.target.value)}/>
                   <div className='pt-4'>
                 <Button onClick= {async () => {
            const response = await axios.post("http://localhost:3000/api/user/signin", {
              email,
              password,
              
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
            }
            }
             label={"Sign In"} />
                 </div>
                <BottomWarning label={"Doesn't Have an Account?"} buttonText={"Sign Up"} to={"/signUp"} />
            </div>
        </div>
    </div>
  )
}

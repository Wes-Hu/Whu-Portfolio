import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import RippleButton from "./RippleButton";

const ContactForm = () => {
    const {register, reset, handleSubmit} = useForm();

    const [isSuccess, setIsSuccess] = useState(false);
    const [result, setResult] = useState(null);

    const accessKey = "924cb22b-a23c-487f-a125-fde1898b5705";

    const { submit: onSubmit } = useWeb3Forms({
        access_key: accessKey,
        settings: {
        from_name: "Personal Portfolio",
        subject: "New Contact Message from your Website",
        // ... other settings
        },
        onSuccess: (msg, data) => {
        setIsSuccess(true);
        setResult(msg);
        reset();
        },
        onError: (msg, data) => {
        setIsSuccess(false);
        setResult(msg);
        },
    });

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Full Name</p>
                    <input 
                        type="text" {...register("name", { required: true })} 
                        placeholder="Enter Your Name" 
                        className="w-full font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                </div>
                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Email</p>
                    <input 
                        type="email" {...register("email", { required: true })}
                        placeholder="Enter Your Email"
                        className="w-full font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                </div>
                
                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Message</p>
                    <textarea 
                        {...register("message", { required: true })}
                        placeholder="Enter Your Message"
                        className="w-full h-72 font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                </div>
                
                <button type="submit" className="self-center font-bold text-base lg:text-xl font-raleway">
                    <RippleButton>Submit Form</RippleButton>
                </button>

            </form>
        </div>
    );
};
export default ContactForm;
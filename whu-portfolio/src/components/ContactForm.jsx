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
        <div className="border-blood-red border-2 w-full p-6 rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <input 
                    type="text" {...register("name", { required: true })} 
                    placeholder="Enter Your Name" 
                    className="font-raleway font-bold text-base lg:text-xl text-blood-red bg-night placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                />
                <input 
                    type="email" {...register("email", { required: true })}
                    placeholder="Enter Your Email"
                    className="font-raleway font-bold text-base lg:text-xl text-blood-red bg-night placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                />
                <textarea 
                    {...register("message", { required: true })}
                    placeholder="Enter Your Message"
                    className="font-raleway font-bold text-base lg:text-xl text-blood-red bg-night placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                />
                
                <button type="submit" className="self-center font-bold text-base lg:text-xl font-raleway">
                    <RippleButton>Submit Form</RippleButton>
                </button>

            </form>
        </div>
    );
};
export default ContactForm;
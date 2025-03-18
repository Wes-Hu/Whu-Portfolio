import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import RippleButton from "./RippleButton";

const ContactForm = () => {
    const { register, reset, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [result, setResult] = useState(null);
    const [showError, setShowError] = useState(false);

    const accessKey = "924cb22b-a23c-487f-a125-fde1898b5705";

    const { submit: onSubmit } = useWeb3Forms({
        access_key: accessKey,
        settings: {
            from_name: "My Portfolio Website",
            subject: "New Contact Message",
        },
        onSuccess: (msg, data) => {
            setIsSuccess(true);
            setResult(msg);
            reset();
            setShowError(false);
        },
        onError: (msg, data) => {
            setIsSuccess(false);
            setResult(msg);
        },
    });

    useEffect(() => {
        if (result !== null) {
            if (isSuccess) {
                alert("Message Sent Successfully!");
            } else {
                alert("Message failed to send. Please try again.");
            }
            setResult(null);
        }
    }, [result, isSuccess]);

    useEffect(() => {
        setShowError(Object.keys(errors).length > 0);
    }, [errors, isSubmitted]);

    return (
        <div className="w-full">
            <form 
                onSubmit={handleSubmit((data) => onSubmit(data))}
                className="flex flex-col gap-6"
            >
                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Full Name</p>
                    <input 
                        type="text" 
                        {...register("name", { required: "Full Name is required" })} 
                        placeholder="Enter Your Name"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="w-full font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                    {errors.name && <p className="text-burnt-sienna font-raleway text-base mt-1 pl-4">{errors.name.message}</p>}
                </div>

                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Email</p>
                    <input 
                        type="email" 
                        {...register("email", { required: "Email is required" })} 
                        placeholder="Enter Your Email"
                        aria-invalid={errors.email ? "true" : "false"}
                        className="w-full font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                    {errors.email && <p className="text-burnt-sienna font-raleway text-base mt-1 pl-4">{errors.email.message}</p>}
                </div>

                <div className="w-full">
                    <p className="pl-4 mb-2 font-raleway font-bold text-base lg:text-xl text-blood-red">Message</p>
                    <textarea 
                        {...register("message", { required: "Message is required" })} 
                        placeholder="Enter Your Message"
                        aria-invalid={errors.message ? "true" : "false"}
                        className="w-full h-72 font-raleway font-bold text-base lg:text-xl text-blood-red bg-night hover:text-blood-red-light hover:placeholder-blood-red-light transition-all duration-500 hover:border-blood-red-light placeholder-blood-red border-2 focus:outline-none border-blood-red px-4 py-2 rounded-3xl"
                    />
                    {errors.message && <p className="text-burnt-sienna font-raleway text-base mt-1 pl-4">{errors.message.message}</p>}
                </div>
                <button type="submit" className="self-center font-bold text-base lg:text-xl font-raleway">
                    <RippleButton>Submit Form</RippleButton>
                </button>
                {showError && (
                    <p className="text-burnt-sienna font-raleway text-base text-center">
                        Please fill in all required fields before submitting.
                    </p>
                )}
            </form>
        </div>
    );
};

export default ContactForm;

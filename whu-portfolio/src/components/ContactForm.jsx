import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import RippleButton from "./RippleButton";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
    const { register, reset, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [result, setResult] = useState(null);
    const [showError, setShowError] = useState(false);
    const [notification, setNotification] = useState(null);

    const removeNotif = () => {
        setNotification(null);
    };

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
            setNotification({
                text: isSuccess ? "Message sent successfuly!" : "Message failed to send. Please try again.",
                id: Date.now(),
            });
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
            <AnimatePresence>
                {notification && (
                    <SubmitNotification
                        removeNotif={removeNotif}
                        key={notification.id}
                        {...notification}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const NOTIF_TTL = 5000;

const SubmitNotification = ({ text, id, removeNotif }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => {
          removeNotif();
        }, NOTIF_TTL);
    
        return () => clearTimeout(timeoutRef);
      }, []);

    return (
        <motion.button
            layout
            initial={{ y: 15, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -25, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring" }}
            onClick={() => removeNotif(id)}
            className="flex flex-row gap-4 font-raleway font-bold text-base text-night p-4 bg-blood-red rounded-3xl fixed z-50 bottom-4 right-4"
        >
            <span>{text}</span>
        </motion.button>
    );
};

export default ContactForm;

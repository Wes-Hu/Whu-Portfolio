import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const LoadingScreen = () => {
    const innerControls = useAnimation();
    const outerControls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await innerControls.start({ opacity: 1, transition: { duration: 1, ease: "easeInOut", } });
            await innerControls.start({ opacity: 0, transition: { duration: 1, ease: "easeInOut", delay: 1 } });
            await outerControls.start({ y: "-100%", transition: { duration: 1.5, ease: "easeInOut" } });
        };
        sequence();
    }, []);
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={outerControls}
            className="z-50 fixed top-0 left-0"
        >
            <motion.div
                className="w-screen h-screen bg-blood-red flex justify-center items-center"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={innerControls}
                    className="flex flex-col items-center justify-center gap-10"
                >
                    <img
                        src="/HuLogoBlack.png"
                        alt="logo"
                        className="w-1/6 h-1/6 object-contain"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-night font-rubik font-extrabold text-4xl lg:text-5xl">
                            LOADING
                        </h1>
                        <div className="w-80 h-12 p-2 border-4 border-night overflow-hidden">
                            <LoadingBar/>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <img
                src="/loading.svg"
                alt="Loading Screen"
                className="w-screen h-screen object-cover z-40 -translate-y-10"
            />
      </motion.div>
    );
};

const LoadingBar = () => {
    return (
        <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 320 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            {Array.from({ length: 15 }).map((_, i) => {
                const x = i * 24 - 10;
                return (
                <motion.polygon
                    key={i}
                    points={`${x + 10},0 ${x + 30},0 ${x + 20},48 ${x + 0},48`}
                    fill="#090A0C"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.2 }}
                />
                );
            })}
        </motion.svg>

    );
  };

export default LoadingScreen;
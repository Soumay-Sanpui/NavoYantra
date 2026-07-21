"use client";

import { PhoneCall } from "react-feather";

function Hero() {
    return (
        <section className="relative w-full bg-background overflow-hidden">
            {/* Top part with background image - Lag-free Fixed Background Trick */}
            <div className="relative w-full h-[40vh] md:h-[65vh] min-h-[300px] md:min-h-[500px]" style={{ clipPath: "inset(0)" }}>
                <div
                    className="fixed top-0 left-0 w-full h-screen bg-cover bg-center"
                    style={{ backgroundImage: `url(/hero.jpg)` }}
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Floating Content over the boundary */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-[15vh] md:-mt-[35vh] flex flex-col md:flex-row">
                {/* Left White Box */}
                <div className="bg-surface p-10 md:p-16 md:w-[60%] shadow-2xl flex flex-col justify-center">
                    <p className="text-accent text-xs font-bold tracking-widest uppercase mb-4">
                        Innovating Education
                    </p>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                        Transforming Learning <br /> into Real-World <br /> Innovation
                    </h1>

                    <p className="text-muted text-sm md:text-base mb-10 max-w-md">
                        NavoYantra provides cutting-edge educational solutions, bringing Robotics, AI, and comprehensive STEM Lab setups directly to your institution to prepare students for the future of technology.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <button className="bg-accent hover:opacity-90 transition-opacity text-white text-sm font-bold uppercase py-4 px-8">
                            Get Started
                        </button>
                        <div className="text-foreground font-bold text-lg flex gap-2 items-center">
                            <PhoneCall /> <span className="opacity-80">+91 8796599974</span>
                        </div>
                    </div>
                </div>

                {/* Right Video Box */}
                <div className="bg-zinc-900 p-2 md:p-3 md:w-[40%] flex flex-col justify-center shadow-xl mt-8 md:mt-auto md:mb-12 relative border border-zinc-800">
                    <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden">
                        <video
                            controls
                            className="w-full h-full object-cover"
                            poster="/hero-img.png"
                        >
                            {/* Replace this src with your actual video path */}
                            <source src="/intro-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            {/* Rating below the white box */}
            <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 flex items-center gap-3">
                <div className="w-full md:w-[60%] flex items-center gap-3 pl-4 md:pl-8">
                    <div className="flex text-yellow-500 text-lg">
                        ★★★★★
                    </div>
                    <span className="font-bold text-foreground text-sm">4.8 Rating on Google</span>
                </div>
            </div>
        </section>
    );
}

export default Hero;
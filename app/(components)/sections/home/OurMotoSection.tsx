"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const AUTO_ADVANCE_MS = 3000;

const data = [
    {
        image: "/moto/innovation.jpeg",
        title: "Innovation",
        desc: "We build scalable digital experiences that help businesses grow faster with modern technology.",
    },
    {
        image: "/moto/quality.jpeg",
        title: "Quality",
        desc: "Every product is crafted with attention to detail, performance and long-term maintainability.",
    },
    {
        image: "/moto/trust.jpeg",
        title: "Trust",
        desc: "We believe transparency and commitment create lasting relationships with our clients.",
    },
    {
        image: "/moto/growth.jpeg",
        title: "Growth",
        desc: "Continuous learning and innovation keep us ahead while delivering exceptional results.",
    },
];

export default function OurMoto() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const image = useRef<HTMLImageElement>(null);
    const title = useRef<HTMLHeadingElement>(null);
    const desc = useRef<HTMLParagraphElement>(null);
    const progressFill = useRef<HTMLDivElement>(null);

    const activeRef = useRef(active);
    activeRef.current = active;

    // Animate content whenever the active slide changes
    useEffect(() => {
        const tl = gsap.timeline();

        tl.to([image.current, title.current, desc.current], {
            opacity: 0,
            y: -15,
            duration: 0.35,
            ease: "power2.inOut",
        }).fromTo(
            [image.current, title.current, desc.current],
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
            }
        );

        return () => {
            tl.kill();
        };
    }, [active]);

    useEffect(() => {
        if (paused) return;

        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % data.length);
        }, AUTO_ADVANCE_MS);

        return () => clearInterval(id);
    }, [paused]);

    useEffect(() => {
        if (!progressFill.current) return;

        gsap.killTweensOf(progressFill.current);

        if (paused) return;

        gsap.fromTo(
            progressFill.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: AUTO_ADVANCE_MS / 1000,
                ease: "none",
                transformOrigin: "left center",
            }
        );
    }, [active, paused]);

    const goTo = (index: number) => {
        if (index === activeRef.current) return;
        setActive(index);
    };

    const current = data[active];

    return (
        <section
            className="relative w-full py-24 flex flex-col justify-center text-zinc-900"
            style={{ clipPath: "inset(0)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Fixed Background Image */}
            <div
                className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-20"
                style={{ backgroundImage: `url('/our moto.jpg')` }}
            />

            {/* Black overlay for contrast */}
            <div className="fixed top-0 left-0 w-full h-screen bg-black/60 -z-10" />

            <h2 className="relative z-10 text-6xl font-semibold text-center mb-24 text-white">
                Our Moto
            </h2>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">

                {/* Left */}
                <div className="flex justify-center">
                    <div
                        className="w-72 h-72 md:w-90 md:h-90 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <img
                            ref={image}
                            src={current.image}
                            alt={current.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="p-4 md:p-10 min-h-[300px] md:min-h-87.5 flex flex-col justify-start">
                    <h3
                        ref={title}
                        className="text-6xl font-semibold mb-6 text-white"
                    >
                        {current.title}
                    </h3>

                    <p
                        ref={desc}
                        className="text-lg leading-8 text-white"
                    >
                        {current.desc}
                    </p>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="relative z-10 mt-16 flex justify-center items-center gap-3">
                {data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${active === index ? "w-16 bg-gray-300" : "w-6 bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {active === index && (
                            <div
                                ref={progressFill}
                                className="absolute top-0 left-0 w-full h-full bg-blue-600 origin-left"
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
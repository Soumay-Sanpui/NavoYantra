"use client";

import { useState } from "react";

export default function WhatWeOfferSection() {
    const [active, setActive] = useState(0);

    const categories = [
        {
            image: "/wwo/robotics-kit.jpeg",
            title: "Robotic Kits",
            description: "Build real robots and learn robotics from scratch.",
        },
        {
            image: "/wwo/ai.png",
            title: "AI & IoT Solutions",
            description: "Hands-on Artificial Intelligence projects.",
        },
        {
            image: "/wwo/labsetup.png",
            title: "Innovation Lab Setup",
            description: "Microcontrollers, sensors and electronics.",
        },
        {
            image: "/wwo/STEM.png",
            title: "STEM Education",
            description: "Internet of Things practical solutions.",
        },
        {
            image: "/wwo/embedd.png",
            title: "Embedded Systems Development",
            description: "Coding projects for beginners.",
        },
        {
            image: "/wwo/LMS.png",
            title: "Learning Management System",
            description: "Coding projects for beginners.",
        }
    ];

    return (
        <section className="w-full py-20 px-6">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold">What We Offer?</h2>
                <p className="mt-3 text-gray-500">Explore our STEM Kits</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-[70vh] md:h-137.5">
                {categories.map((category, index) => {
                    const isActive = active === index;
                    return (
                        <div
                            key={`${category.title[0]}-${index}`}
                            onMouseEnter={() => setActive(index)}
                            className={`rounded-lg relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out bg-cover bg-center ${isActive ? "flex-5" : "flex-1"} `}
                            style={{ backgroundImage: `url(${category.image})`, }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/45" />
                            {/* Expanded */}
                            {isActive ? (
                                <div className="relative h-full p-8 flex flex-col justify-between text-white">
                                    <div>
                                        <p className="text-sm opacity-80">0{index + 1} STEM Kit</p>
                                        <h3 className="text-4xl font-bold mt-3">{category.title}</h3>
                                    </div>

                                    <p className="max-w-sm text-lg">{category.description}</p>
                                </div>
                            ) : (
                                <div className="relative h-full flex flex-col items-center justify-start py-8 text-white">
                                    <span className="text-lg">0{index + 1}</span>
                                    <h3
                                        className="mt-4 md:mt-16 text-xl md:text-2xl whitespace-nowrap [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl]"
                                    >
                                        {category.title}
                                    </h3>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
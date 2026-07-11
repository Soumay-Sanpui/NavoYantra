"use client";

import {useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);



export default function OurMoto() {
    const data = [
        {
            image: "/ct-card-bg.png",
            title: "Innovation",
            desc: "We build scalable digital experiences that help businesses grow faster with modern technology.",
        },
        {
            image: "/ct-card-bg.png",
            title: "Quality",
            desc: "Every product is crafted with attention to detail, performance and long-term maintainability.",
        },
        {
            image: "/ct-card-bg.png",
            title: "Trust",
            desc: "We believe transparency and commitment create lasting relationships with our clients.",
        },
        {
            image: "/ct-card-bg.png",
            title: "Growth",
            desc: "Continuous learning and innovation keep us ahead while delivering exceptional results.",
        },
    ];

    const section = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const title = useRef<HTMLHeadingElement>(null);
    const desc = useRef<HTMLParagraphElement>(null);



    useGSAP(() => {
        let current = 0;

        const changeContent = (index: number) => {
            if (index === current) return;

            current = index;

            const tl = gsap.timeline();

            tl.to([image.current, title.current, desc.current], {
                opacity: 0,
                y: 30,
                duration: 0.25,
            });

            tl.call(() => {
                if (image.current) image.current.src  = data[index].image;
                if (title.current) title.current.innerText = data[index].title;
                if (desc.current) desc.current.innerText = data[index].desc;
            });

            tl.fromTo(
                [image.current, title.current, desc.current],
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.05,
                }
            );
        };

        ScrollTrigger.create({
            trigger: section.current,
            start: "top top",
            end: `+=${data.length * window.innerHeight}`,
            pin: true,
            pinSpacing: true, // <-- ensure this
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / (data.length - 1),
                duration: 0.2,
            },
            onUpdate: (self) => {
                const index = Math.min(
                    data.length - 1,
                    Math.floor(self.progress * data.length)
                );

                changeContent(index);
            },
        });
    }, []);

    return (
        <section
            ref={section}
            className="w-full h-screen bg-[#f7f7f7] flex flex-col justify-center"
        >
            <h2 className="text-4xl font-semibold text-center mb-16">
                Our Moto
            </h2>

            <div className="max-w-7xl mx-auto w-full px-10 grid md:grid-cols-2 gap-20 items-center">

                {/* Left */}
                <div className="flex justify-center">
                    <div
                        className="w-90 h-90 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <img
                            ref={image}
                            src={data[0].image}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="bg-gray-200 p-10 min-h-87.5 flex flex-col justify-start">
                    <h3
                        ref={title}
                        className="text-3xl font-semibold mb-6"
                    >
                        {data[0].title}
                    </h3>

                    <p
                        ref={desc}
                        className="text-lg leading-8 text-gray-700"
                    >
                        {data[0].desc}
                    </p>
                </div>

            </div>
        </section>
    );
}
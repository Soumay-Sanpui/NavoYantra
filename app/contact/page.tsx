"use client";

import {ArrowRight, CheckCircle, Cpu, Mail, MapPin, Phone, Settings, Zap} from "react-feather";

export default function Page() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="uppercase tracking-[0.25em] text-blue-500 text-sm font-semibold">
                        Contact
                    </span>

                    <h2 className="text-5xl font-bold mt-4">
                        Let's Build Something Amazing
                    </h2>

                    <p className="max-w-2xl mx-auto mt-6 text-gray-500 leading-8">
                        Whether you're looking for STEM solutions, Industrial IoT,
                        Drone Technology or custom hardware development,
                        our team is ready to help.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">

                    {/* Address */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl transition">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <MapPin className="text-blue-500" size={28} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Visit Us
                        </h3>

                        <p className="mt-4 text-gray-500 leading-7">
                            1/10726-A KH No. 1622/62,
                            <br />
                            Gali No. 2, Subhash Park,
                            <br />
                            Naveen Shahdara,
                            <br />
                            Delhi - 110032
                        </p>
                    </div>

                    {/* Email */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl transition">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <Mail className="text-blue-500" size={28} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Email
                        </h3>

                        <p className="mt-4 text-gray-500 leading-7">
                            contact@navoyantra.com
                            <br />
                            info@navoyantra.com
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl transition">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <Phone className="text-blue-500" size={28} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Call Us
                        </h3>

                        <p className="mt-4 text-gray-500 leading-7">
                            +91 87965999674
                        </p>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="grid lg:grid-cols-2 gap-14 items-stretch">

                    {/* Map */}
                    <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200 min-h-[550px]">
                        <iframe
                            title="Navoyantra Location"
                            src="https://maps.google.com/maps?q=Subhash%20Park%2C%20Naveen%20Shahdara%2C%20Delhi%20110032&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Contact Content */}
                    <div className="flex flex-col justify-center lg:pl-6">

                        <span className="uppercase tracking-[0.2em] text-blue-500 text-sm font-semibold">
                            Get In Touch
                        </span>

                        <h2 className="text-5xl font-bold mt-3 leading-tight">
                            Let's Talk
                            <br />
                            Technology
                        </h2>

                        <p className="text-gray-500 mt-6 leading-8">
                            Have an idea or looking for a technology partner?
                            Connect with our engineering team and let's turn your
                            ideas into innovative solutions.
                        </p>

                        {/* Pointers */}
                        <div className="mt-10 space-y-6">

                            {/* Engineering Expertise */}
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <Cpu
                                        className="text-blue-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Engineering Expertise
                                    </h3>

                                    <p className="text-gray-500 mt-1 leading-7">
                                        Get expert guidance for IoT, Embedded Systems,
                                        Drone Technology and custom hardware solutions.
                                    </p>
                                </div>
                            </div>

                            {/* Custom Solutions */}
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <Settings
                                        className="text-blue-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Custom Solutions
                                    </h3>

                                    <p className="text-gray-500 mt-1 leading-7">
                                        We design and develop technology solutions
                                        tailored specifically to your project requirements.
                                    </p>
                                </div>
                            </div>

                            {/* Fast Response */}
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <Zap
                                        className="text-blue-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Fast Response
                                    </h3>

                                    <p className="text-gray-500 mt-1 leading-7">
                                        Reach out to our team and we'll get back to you
                                        as soon as possible to discuss your project.
                                    </p>
                                </div>
                            </div>

                            {/* End-to-End Support */}
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <CheckCircle
                                        className="text-blue-500"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        End-to-End Support
                                    </h3>

                                    <p className="text-gray-500 mt-1 leading-7">
                                        From initial concept and prototyping to development
                                        and deployment, we're here to support you.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Contact Button */}
                        <div className="mt-10">
                            <a
                                href="mailto:contact@navoyantra.com?subject=Project%20Inquiry"
                                className="inline-flex items-center gap-3 bg-blue-500 px-8 py-4 font-semibold text-white transition hover:bg-blue-600"
                            >
                                <Mail size={20} />

                                Contact Us

                                <ArrowRight size={18} />
                            </a>
                        </div>

                        {/* Email Text */}
                        <p className="mt-4 text-sm text-gray-400">
                            Or email us directly at contact@navoyantra.com
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}
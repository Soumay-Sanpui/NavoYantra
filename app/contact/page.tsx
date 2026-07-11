"use client";

import {Mail, MapPin, Phone, Send} from "react-feather";

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

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl transition">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <MapPin className="text-blue-500" size={28} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Visit Us
                        </h3>

                        <p className="mt-4 text-gray-500 leading-7">
                            C-403, GGSIPU EDC,
                            <br />
                            Shahdara,
                            <br />
                            Delhi - 110092
                        </p>

                    </div>

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

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl transition">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <Phone className="text-blue-500" size={28} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Call Us
                        </h3>

                        <p className="mt-4 text-gray-500 leading-7">
                            +91 1234567890
                            <br />
                            +91 1234567890
                        </p>

                    </div>

                </div>

                {/* Bottom Section */}

                <div className="grid lg:grid-cols-2 gap-14 items-start">

                    {/* Map */}

                    <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200 h-155">

                        <iframe
                            title="Google Maps"
                            src="https://maps.google.com/maps?q=ggsip&t=&z=12&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                        />

                    </div>

                    {/* Form */}

                    <div>

            <span className="uppercase tracking-[0.2em] text-blue-500 text-sm font-semibold">
              Get In Touch
            </span>

                        <h2 className="text-5xl font-bold mt-3 leading-tight">
                            Let's Talk About
                            <br />
                            Your Project
                        </h2>

                        <p className="text-gray-500 mt-6 leading-8">
                            Fill out the form below and our engineering team will
                            get back to you within 24 hours.
                        </p>

                        <form className="space-y-5 mt-10">

                            <input
                                placeholder="Your Name"
                                className="w-full  border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
                            />

                            <input
                                placeholder="Email Address"
                                type="email"
                                className="w-full  border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
                            />

                            <input
                                placeholder="Phone Number"
                                className="w-full  border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
                            />

                            <select className="w-full  border border-gray-300 px-5 py-4 outline-none focus:border-blue-500">
                                <option>Select Service</option>
                                <option>Drone Technology</option>
                                <option>Industrial IoT</option>
                                <option>STEM Education</option>
                                <option>Embedded Systems</option>
                                <option>Lab Setups</option>
                                <option>Talk Technology</option>
                            </select>

                            <textarea
                                rows={6}
                                placeholder="Tell us about your project..."
                                className="w-full  border border-gray-300 px-5 py-4 outline-none focus:border-blue-500 resize-none"
                            />

                            <button
                                className="cursor-pointer inline-flex items-center gap-3  bg-blue-500 px-8 py-4 font-semibold text-white transition hover:bg-blue-600"
                            >
                                Send Message

                                <Send size={18} />
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}
"use client";

const categories = [
    {
        title: "Robotics Kits",
        image: "/product-category/robotic.jpeg",
        className: "col-span-1 md:col-span-3 row-span-1",
    },
    {
        title: "AI & Smart Learning Kits",
        image: "/product-category/ai.png",
        className: "col-span-1 md:col-span-4 row-span-1",
    },
    {
        title: "IoT Developement Kits",
        image: "/product-category/iot.png",
        className: "col-span-1 md:col-span-3 row-span-1",
    },
    {
        title: "Electronic Components",
        image: "/product-category/ec.png",
        className: "col-span-1 md:col-span-3 row-span-1",
    },
    {
        title: "Drones",
        image: "/product-category/drone.png",
        className: "col-span-1 md:col-span-3 row-span-1",
    },
    {
        title: "Other Accessories",
        image: "/product-category/acces.png",
        className: "col-span-1 md:col-span-4 row-span-1",
    },
];

export default function ProductCategorySection() {
    return (
        <section className="w-full py-20 px-5 lg:px-12">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold">
                    Product Category
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 auto-rows-[250px] md:auto-rows-55">

                {categories.map((item, index) => (
                    <div
                        key={index}
                        className={` group relative overflow-hidden cursor-pointer ${item.className} `}
                    >
                        {/* Background */}

                        <img
                            src={item.image}
                            alt={item.title}
                            className=" absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className=" absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/60"/>

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                            <h3 className="text-2xl font-semibold">{item.title}</h3>

                            <button className=" opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 self-start rounded-full border px-5 py-2 backdrop-blur-md">
                                View Products →
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
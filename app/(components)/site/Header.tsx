"use client";

import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Heart, ShoppingCart, X } from "react-feather";
import { usePathname } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function Header() {
    const headerOptions = [
        "Store",
        //"Courses",
        "Lab Setup",
        "About",
        "Contact",
        "Blog",
    ];

    const [open, setOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const pathname = usePathname();

    useEffect(() => {
        const updateWishlist = () => {
            const items = localStorage.getItem("wishlist");
            if (items) {
                try {
                    setWishlistItems(JSON.parse(items));
                } catch (e) {
                    console.error(e);
                }
            } else {
                setWishlistItems([]);
            }
        };

        const updateCart = () => {
            const items = localStorage.getItem("cart");
            if (items) {
                try {
                    const parsed = JSON.parse(items);
                    const count = parsed.reduce((acc: number, curr: any) => acc + (curr.quantity || 1), 0);
                    setCartCount(count);
                } catch (e) {
                    console.error(e);
                }
            } else {
                setCartCount(0);
            }
        };

        updateWishlist();
        updateCart();

        window.addEventListener("wishlist-updated", updateWishlist);
        window.addEventListener("cart-updated", updateCart);
        window.addEventListener("storage", () => {
            updateWishlist();
            updateCart();
        });

        return () => {
            window.removeEventListener("wishlist-updated", updateWishlist);
            window.removeEventListener("cart-updated", updateCart);
        };
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.wishlist-container')) {
                setWishlistOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <>
            <header
                className={`${poppins.className} z-50 sticky top-0 w-full bg-white/20 backdrop-blur-2xl flex items-center justify-between px-5 py-4 lg:px-10`}
            >
                <Link href="/">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Desktop Logo */}
                        <Image
                            src="/logo.png"
                            width={220}
                            height={70}
                            alt="Logo"
                            priority
                            className="logo-img hidden md:block w-36 h-auto lg:w-48"
                        />
                        {/* Mobile Logo */}
                        <Image
                            src="/mobile-logo.png"
                            width={124}
                            height={26}
                            alt="Logo"
                            priority
                            className="logo-img block md:hidden w-auto h-8"
                        />
                    </motion.div>
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {headerOptions.map((option, index) => (
                            <motion.li
                                key={option}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.15, duration: 0.7 }}
                                className="nav-item overflow-hidden h-6 cursor-pointer group"
                            >
                                <Link
                                    href={option === "Home" ? "/" : `/${option.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`text-wrapper flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2 ${pathname === `/${option.toLowerCase().replace(/\s+/g, "-")}` ? "text-blue-500 underline font-semibold" : ""}`}
                                >
                                    <span>{option}</span>
                                    <span>{option}</span>
                                </Link>
                            </motion.li>
                        ))}

                        {/* Shopping Cart */}
                        <div className="relative cursor-pointer">
                            <ShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* Wishlist */}
                        <div className="relative wishlist-container">
                            <Heart
                                onClick={() => setWishlistOpen(!wishlistOpen)}
                                className={`cursor-pointer hover:text-red-500 transition ${wishlistItems.length > 0 ? "text-red-500 fill-current" : ""}`}
                            />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </div>
                    </ul>
                </nav>

                <div className="flex items-center gap-4 md:hidden">
                    <div className="relative wishlist-container">
                        <button
                            onClick={() => setWishlistOpen(!wishlistOpen)}
                            className="hover:text-red-500 flex items-center"
                        >
                            <Heart size={24} className={wishlistItems.length > 0 ? "text-red-500 fill-current" : ""} />
                        </button>
                        {wishlistItems.length > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
                                {wishlistItems.length}
                            </span>
                        )}
                    </div>

                    <button className="relative">
                        <ShoppingCart size={24} strokeWidth={2} />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button onClick={toggleMenu} className="text-3xl">
                        <HiOutlineMenuAlt3 />
                    </button>
                </div>

                {wishlistOpen && (
                    <div className="absolute right-5 lg:right-10 top-full mt-2 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden z-[999] wishlist-container">
                        <div className="flex items-center justify-between px-5 py-4">
                            <h3 className="font-semibold text-lg">My Wishlist</h3>
                            <button
                                onClick={() => setWishlistOpen(false)}
                                className="hover:text-red-500 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {wishlistItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6">
                                <Heart size={42} className="text-gray-300" />
                                <h4 className="mt-5 text-lg font-semibold">No Wishlist Items</h4>
                            </div>
                        ) : (
                            <div className="max-h-96 overflow-y-auto">
                                {wishlistItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 border-b p-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-blue-600 font-semibold">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </header>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
                            className="fixed right-0 top-0 z-50 h-screen w-72 bg-white shadow-xl p-8 md:hidden"
                        >
                            <div className="flex justify-end">
                                <button onClick={toggleMenu} className="text-3xl">
                                    <HiOutlineX />
                                </button>
                            </div>
                            <motion.ul
                                variants={{
                                    show: {
                                        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                                    },
                                    hidden: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 },
                                    },
                                }}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="mt-12 space-y-8"
                            >
                                {headerOptions.map((option) => (
                                    <motion.li
                                        key={option}
                                        variants={{
                                            hidden: { x: 40, opacity: 0 },
                                            show: { x: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.35 } },
                                        }}
                                    >
                                        <Link
                                            href={option === "Home" ? "/" : `/${option.toLowerCase().replace(/\s+/g, "-")}`}
                                            onClick={toggleMenu}
                                            className="text-2xl font-semibold"
                                        >
                                            {option}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
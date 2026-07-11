"use client";

import {Poppins} from "next/font/google";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {HiOutlineMenuAlt3, HiOutlineX} from "react-icons/hi";
import {Heart, ShoppingCart, X} from "react-feather";
import {usePathname} from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function Header() {

    const headerOptions = [
        "Store",
        "Courses",
        "Lab Setup",
        "About",
        "Contact",
        "Blog",
    ];

    const desktopNavRef = useRef<HTMLUListElement>(null);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const tl = useRef<gsap.core.Timeline | null>(null);

    const wishlistRef = useRef<HTMLDivElement>(null);


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
            if (
                wishlistRef.current &&
                !wishlistRef.current.contains(e.target as Node)
            ) {
                setWishlistOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    useGSAP(() => {
        gsap.from(".logo-img", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        gsap.from(".nav-item", {
            y: -20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
        });

        gsap.utils.toArray<HTMLElement>(".nav-item").forEach((item) => {
            const wrapper = item.querySelector(".text-wrapper");

            if (!wrapper) return;

            const hoverTl = gsap.timeline({
                paused: true,
            });

            hoverTl.to(wrapper, {
                yPercent: -50,
                duration: 0.35,
                ease: "power3.out",
            });

            item.addEventListener("mouseenter", () => hoverTl.play());
            item.addEventListener("mouseleave", () => hoverTl.reverse());
        });

        gsap.set(sidebarRef.current, {
            xPercent: 100,
        });

        gsap.set(overlayRef.current, {
            opacity: 0,
            pointerEvents: "none",
        });

        tl.current = gsap
            .timeline({
                paused: true,
            })
            .to(overlayRef.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.2,
            })
            .to(
                sidebarRef.current,
                {
                    xPercent: 0,
                    duration: 0.5,
                    ease: "power4.out",
                },
                0
            )
            .from(
                ".mobile-item",
                {
                    x: 40,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.35,
                },
                "-=0.2"
            );
    });

    const toggleMenu = () => {
        if (!tl.current) return;

        if (open) {
            tl.current.reverse();
        } else {
            tl.current.play();
        }

        setOpen(!open);
    };

    return (
        <>
            <header
                className={`${poppins.className} z-50 sticky top-0 w-svw bg-white/20 backdrop-blur-2xl flex items-center justify-between px-5 py-4 lg:px-10`}
            >

                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={220}
                        height={70}
                        alt="Logo"
                        priority
                    className="logo-img w-36 lg:w-48"
                    /></Link>

                <nav className="hidden md:block">

                    <ul
                        ref={desktopNavRef}
                        className="flex items-center gap-8"
                    >

                        {headerOptions.map((option) => (

                            <li
                                key={option}
                                className="nav-item overflow-hidden h-6 cursor-pointer"
                            >

                                <Link
                                    href={option === "Home" ? "/" : `/${option.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`text-wrapper flex flex-col ${pathname === `/${option.toLowerCase().replace(/\s+/g, "-")}` ? "text-blue-500 underline font-semibold" : ""}`}
                                >

                                    <span>{option}</span>
                                    <span>{option}</span>

                                </Link>

                            </li>

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

                        <div
                            ref={wishlistRef}
                            className="relative"
                        >
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

                    <div
                        ref={wishlistRef}
                        className="relative"
                    >
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
                        <ShoppingCart
                            size={24}
                            strokeWidth={2}
                        />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="text-3xl"
                    >
                        <HiOutlineMenuAlt3 />
                    </button>

                </div>

            </header>

            {wishlistOpen && (
                <div className="absolute right-0 top-10 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden z-[999]">

                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <h3 className="font-semibold text-lg">
                            My Wishlist
                        </h3>

                        <button
                            onClick={() => setWishlistOpen(false)}
                            className="hover:text-red-500 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {wishlistItems.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-12 px-6">

                            <Heart
                                size={42}
                                className="text-gray-300"
                            />

                            <h4 className="mt-5 text-lg font-semibold">
                                No Wishlist Items
                            </h4>

                            <p className="mt-2 text-center text-sm text-gray-500">
                                Products that you add to your wishlist
                                will appear here.
                            </p>

                            <button
                                onClick={() => setWishlistOpen(false)}
                                className="mt-6 rounded-lg bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 transition"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    ) : (

                        <div className="max-h-96 overflow-y-auto">

                            {wishlistItems.map((item, index) => (

                                <div
                                    key={index}
                                    className="flex items-center gap-4 border-b p-4"
                                >

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-cover"
                                    />

                                    <div className="flex-1">

                                        <h4 className="font-medium">
                                            {item.name}
                                        </h4>

                                        <p className="text-blue-600 font-semibold">
                                            ₹{item.price}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>
            )}

            <div
                ref={overlayRef}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/40 z-40"
            />

            <aside
                ref={sidebarRef}
                className="fixed right-0 top-0 z-50 h-screen w-72 bg-white shadow-xl p-8"
            >

                <div className="flex justify-end">

                    <button
                        onClick={toggleMenu}
                        className="text-3xl"
                    >
                        <HiOutlineX />
                    </button>

                </div>

                <ul className="mt-12 space-y-8">

                    {headerOptions.map((option) => (

                        <li
                            key={option}
                            className="mobile-item"
                        >

                            <Link
                                href={option === "Home" ? "/" : `/${option.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={toggleMenu}
                                className="text-2xl font-semibold"
                            >
                                {option}
                            </Link>

                        </li>

                    ))}

                </ul>

            </aside>
        </>
    )
}
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
    Search,
    Sliders,
    ShoppingCart,
    Heart,
    X,
    Check,
    ChevronDown,
    ShoppingBag,
    Eye
} from "react-feather";

const products = [
    {
        id: 1,
        name: "RoboLearner Kit",
        price: 2800,
        category: "Robotics Kits",
        description: "An all-in-one introductory kit to build your first autonomous obstacle-avoiding robot. Includes chassis, micro-controller, sensors, and full instruction booklet.",
        features: [
            "Arduino-compatible controller",
            "Ultrasonic & IR line sensors",
            "Dual high-torque DC motors",
            "Comprehensive video tutorials and documentation"
        ],
        image: "/ct-card-bg.png",
        inStock: true,
        popularity: 95
    }
];

const categories = [
    "All",
    "Robotics Kits",
    "AI & Smart Learning",
    "IoT Development",
    "Embedded Systems",
    "Drones",
    "Electronic Components"
];

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popularity");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Load wishlist on client side mount
    useEffect(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
            try {
                const parsed = JSON.parse(storedWishlist);
                setWishlist(parsed.map((item: any) => item.id));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    // Filtered and sorted products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else {
            result.sort((a, b) => b.popularity - a.popularity);
        }

        return result;
    }, [selectedCategory, searchQuery, sortBy]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleWishlist = (product: any, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        const storedWishlist = localStorage.getItem("wishlist");
        let currentWishlist: any[] = [];
        if (storedWishlist) {
            try {
                currentWishlist = JSON.parse(storedWishlist);
            } catch (e) {
                console.error(e);
            }
        }

        const isCurrentlyFav = wishlist.includes(product.id);
        let updatedWishlist: any[];

        if (isCurrentlyFav) {
            updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
            setWishlist(prev => prev.filter(id => id !== product.id));
            showToast(`Removed "${product.name}" from wishlist`);
        } else {
            const wishlistItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            };
            updatedWishlist = [...currentWishlist, wishlistItem];
            setWishlist(prev => [...prev, product.id]);
            showToast(`Added "${product.name}" to wishlist`);
        }

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("wishlist-updated"));
    };

    const addToCart = (product: any, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!product.inStock) {
            showToast(`"${product.name}" is currently out of stock`);
            return;
        }

        const storedCart = localStorage.getItem("cart");
        let cartItems: any[] = [];
        if (storedCart) {
            try {
                cartItems = JSON.parse(storedCart);
            } catch (e) {
                console.error(e);
            }
        }

        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("cart-updated"));
        showToast(`Added "${product.name}" to cart`);
    };

    return (
        <main className="bg-zinc-50 min-h-screen pb-24">
            {/* Minimal Boxy Hero Banner */}
            <section className="bg-white border-b-2 border-zinc-200 py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_360px] gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-xs mb-3">
                            <ShoppingBag size={14} />
                            <span>NavoYantra Store</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight">
                            STEM & <span className="text-blue-600">Hardware</span>
                        </h1>
                        <p className="mt-4 text-zinc-600 max-w-xl text-sm leading-relaxed">
                            Acquire high-quality development boards, customizable robotics chassis, and ready-to-deploy IoT lab setups. Built for learners, innovators, and schools.
                        </p>
                    </div>

                    <div className="border-2 border-zinc-200 p-6 bg-white relative hidden md:block">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 translate-x-12 -translate-y-12 rotate-45" />
                        <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider mb-2">OEM Advantage</h3>
                        <p className="text-xs text-zinc-500 leading-normal">
                            All hardware kits are manufactured in-house. We guarantee commercial-grade reliability, open-source schematics, and direct engineering assistance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Utility / Search and Sort Toolbar */}
            <section className="max-w-7xl mx-auto px-6 mt-10">
                <div className="bg-white border-2 border-zinc-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="SEARCH HARDWARE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-none pl-10 pr-4 py-2.5 text-sm font-bold uppercase tracking-wider placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Sorting dropdown */}
                    <div className="flex items-center gap-3">
                        <Sliders size={16} className="text-zinc-500 hidden sm:inline" />
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-zinc-50 border border-zinc-200 rounded-none pl-4 pr-10 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-700 cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            >
                                <option value="popularity">SORT BY: POPULARITY</option>
                                <option value="price-low">PRICE: LOW TO HIGH</option>
                                <option value="price-high">PRICE: HIGH TO LOW</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 pointer-events-none">
                                <ChevronDown size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Core Grid */}
            <section className="max-w-7xl mx-auto px-6 mt-8">
                <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
                    {/* Categories Sidebar */}
                    <aside className="w-full lg:w-72 rounded-none border-2 border-zinc-200 bg-white p-6 h-fit lg:sticky lg:top-24 shadow-sm">
                        <h2 className="text-sm font-bold mb-6 uppercase tracking-wider text-zinc-900 border-l-4 border-blue-600 pl-3">
                            Hardware categories
                        </h2>

                        <div className="flex flex-row flex-wrap lg:flex-col gap-2.5">
                            {categories.map((cat) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex items-center justify-between w-full rounded-none px-4 py-3 text-left text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border
                                            ${
                                                isActive
                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                                                    : "bg-white border-zinc-200 text-zinc-700 hover:border-blue-500 hover:text-blue-600"
                                            }`}
                                    >
                                        <span>{cat}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="space-y-6">
                        {filteredProducts.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => {
                                    const isFav = wishlist.includes(product.id);
                                    return (
                                        <div
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className="group relative flex flex-col justify-between bg-white border-2 border-zinc-200 hover:border-blue-500 transition-all duration-300 rounded-none shadow-sm overflow-hidden cursor-pointer"
                                        >
                                            <div>
                                                {/* Image and stock layer */}
                                                <div className="relative h-44 w-full bg-zinc-100 overflow-hidden">
                                                    <Image
                                                        src="/ct-card-bg.png"
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        priority
                                                    />
                                                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />

                                                    {/* Floating top bar */}
                                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                                                            product.inStock
                                                                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                                                : "bg-red-50 border-red-200 text-red-600"
                                                        }`}>
                                                            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                                                        </span>

                                                        <button
                                                            onClick={(e) => toggleWishlist(product, e)}
                                                            className={`p-1.5 border transition-all duration-200 ${
                                                                isFav
                                                                    ? "bg-red-50 border-red-200 text-red-500"
                                                                    : "bg-white/80 backdrop-blur-sm border-zinc-200 text-zinc-500 hover:text-red-500 hover:bg-white"
                                                            }`}
                                                        >
                                                            <Heart size={12} fill={isFav ? "currentColor" : "none"} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 space-y-2">
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                                                        {product.category}
                                                    </span>
                                                    <h3 className="text-base font-bold text-zinc-950 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Footer Price & CTA */}
                                            <div className="p-5 pt-0 border-t border-zinc-50 mt-4 flex items-center justify-between">
                                                <span className="font-black text-zinc-900 text-base">₹{product.price.toLocaleString("en-IN")}</span>

                                                <button
                                                    onClick={(e) => addToCart(product, e)}
                                                    disabled={!product.inStock}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white border transition-all duration-200 cursor-pointer
                                                        ${
                                                            product.inStock
                                                                ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                                                                : "bg-zinc-200 border-zinc-200 text-zinc-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <ShoppingCart size={11} />
                                                    <span>Buy</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-zinc-200 bg-white p-16 text-center">
                                <p className="text-zinc-500 font-bold uppercase tracking-wider text-sm">No hardware kits match your query.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                                    className="mt-4 px-4 py-2 border-2 border-zinc-900 font-bold uppercase tracking-wider text-xs hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Product Detail Modal / Drawer */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white border-2 border-zinc-950 w-full max-w-2xl shadow-2xl relative rounded-none animate-in fade-in zoom-in duration-200"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors border border-zinc-300"
                        >
                            <X size={16} />
                        </button>

                        <div className="grid md:grid-cols-2">
                            {/* Left Image Side */}
                            <div className="relative h-64 md:h-full min-h-[280px] bg-zinc-100 border-b-2 md:border-b-0 md:border-r-2 border-zinc-950">
                                <Image
                                    src="/ct-card-bg.png"
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                            </div>

                            {/* Right Content Side */}
                            <div className="p-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-200 bg-blue-50 px-2 py-0.5">
                                            {selectedProduct.category}
                                        </span>
                                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 mt-2">
                                            {selectedProduct.name}
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xl font-black text-zinc-900">
                                            ₹{selectedProduct.price.toLocaleString("en-IN")}
                                        </span>
                                        <span className={`px-2 py-0.5 text-[9px] font-bold border ${
                                            selectedProduct.inStock
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                                : "bg-red-50 border-red-200 text-red-600"
                                        }`}>
                                            {selectedProduct.inStock ? "IN STOCK" : "OUT OF STOCK"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-zinc-600 leading-relaxed">
                                        {selectedProduct.description}
                                    </p>

                                    {/* Features Checklist */}
                                    <div className="space-y-1.5 pt-2">
                                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                            Specifications:
                                        </h4>
                                        <ul className="space-y-1">
                                            {selectedProduct.features.map((feat: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-1.5 text-xs text-zinc-700">
                                                    <Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-zinc-100">
                                    <button
                                        onClick={() => toggleWishlist(selectedProduct)}
                                        className={`flex items-center justify-center gap-2 border-2 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer
                                            ${
                                                wishlist.includes(selectedProduct.id)
                                                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                                                    : "bg-white border-zinc-900 text-zinc-900 hover:bg-zinc-50"
                                            }`}
                                    >
                                        <Heart size={14} fill={wishlist.includes(selectedProduct.id) ? "currentColor" : "none"} />
                                        <span>Wishlist</span>
                                    </button>

                                    <button
                                        onClick={() => addToCart(selectedProduct)}
                                        disabled={!selectedProduct.inStock}
                                        className={`flex items-center justify-center gap-2 border-2 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 cursor-pointer
                                            ${
                                                selectedProduct.inStock
                                                    ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                                                    : "bg-zinc-200 border-zinc-200 text-zinc-400 cursor-not-allowed"
                                            }`}
                                    >
                                        <ShoppingCart size={14} />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Toast Alert */}
            {toastMessage && (
                <div className="fixed bottom-5 right-5 z-[9999] bg-zinc-900 text-white border-l-4 border-blue-600 p-4 shadow-xl flex items-center justify-between gap-4 max-w-sm rounded-none animate-in slide-in-from-bottom-5">
                    <span className="text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={14} />
                    </button>
                </div>
            )}
        </main>
    );
}

import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";



function LanguageDropdown() {
    const [open, setOpen] = useState(false);
    const [activeLang, setActiveLang] = useState("English");
    const dropdownRef = useRef(null);

    const languages = [
        { label: "English", flag: "🇺🇸" },

    ];

    // Click ngoài đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Nút Language */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full transition hover:bg-white/20 shadow-md"
            >
                🌐 <strong>Language</strong> <span className="ml-1">{languages.find(l => l.label === activeLang)?.flag}</span>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-[#121a3a] rounded-2xl shadow-2xl overflow-hidden z-50 border border-white/10">
                    <div className="max-h-60 overflow-y-auto">
                        {languages.map((lang, i) => {
                            const isActive = lang.label === activeLang; // kiểm tra active
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setActiveLang(lang.label); // set active mới
                                        setOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-2 px-4 py-3 transition text-white font-medium ${isActive
                                        ? "bg-linear-to-r from-purple-600 to-pink-500"
                                        : "hover:bg-purple-700/50"
                                        }`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MainLayout() {
    const { user } = useAuth();
    const username = user?.email ? user.email.split("@")[0] : "";
    const location = useLocation();

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", path: "/", icon: "🏠" },
        { name: "Trade", path: "/trade", icon: "🔄" },
        { name: "Transfer", path: "/transfer", icon: "💸" },
        { name: "My Account", path: "/account", icon: "👤" },
    ];

    return (
        <div className="min-h-screen flex bg-[#0b0f29] text-white">
            <aside className="hidden lg:flex w-64 bg-[#101738] flex-col p-6 space-y-6 shadow-lg sticky top-0 h-screen">
                <div className="text-2xl font-bold">
                    <Link
                        to={"/"}
                    >
                        <img src="/public/logo.png" width={50} alt="" />

                    </Link>
                </div>
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`p-3 rounded-lg flex items-center gap-3 transition 
          ${location.pathname === item.path ? "bg-purple-600 text-white" : "hover:bg-purple-800/40"}`}
                        >
                            <span>{item.icon}</span>
                            <strong>{item.name}</strong>
                        </Link>
                    ))}
                </nav>
            </aside>


            <div className="flex-1 flex flex-col">
                <header
                    className={`flex items-center justify-between p-4 border-b border-white/10 sticky top-0 z-50 transition-colors duration-300 ${isSticky ? "bg-[#101738]" : "bg-[#101738]/40"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <Link
                            to={"/"}
                        >
                            <img
                                src="/public/logo.png"
                                alt="Logo"
                                className="w-10 h-10 object-contain lg:hidden"
                            />
                        </Link>
                    </div>

                    <LanguageDropdown />
                </header>

                <main className="flex-1 p-4 bg-[#0b0f29] rounded-lg shadow-inner">
                    <Outlet />
                </main>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#101738] border-t border-white/10 p-2 flex justify-around shadow-lg">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center text-xs p-2 
            ${location.pathname === item.path ? "text-purple-400" : "text-gray-300"}`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <strong>{item.name}</strong>
                    </Link>
                ))}
            </div>
        </div>
    );
}
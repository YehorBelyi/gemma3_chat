"use client";

import logo from "../../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

    return (
        <header className="bg-white shadow-xl fixed top-0 w-full z-10">
            <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px]">
                        <Image src={logo} alt="Logo" width={70} height={70} className="object-contain" />
                    </div>
                </div>

                <div>
                    <Link href="/" className="text-white bg-gray-700 
                             hover:bg-gray-800 focus:ring-4 focus:ring-gray-300
                             font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             focus:outline-none">Home</Link>
                    <Link href="/chat" className="text-white bg-blue-700 
                                 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                                 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 focus:outline-none">Chat</Link>
                </div>
            </div>
        </header >
    );
}

export default Header;
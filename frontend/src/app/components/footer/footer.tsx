"use client";

const Footer = () => {

    return (
        <footer className="dark:bg-white-800 mt-auto bg-white rounded-lg shadow-xl m-4" >
            <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400  mt-3">© 2025 <a href="#" className="hover:underline">Yehor Bilyi</a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Contact</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy</a>
                    </li>
                </ul>
            </div>
        </footer >
    );
}

export default Footer;
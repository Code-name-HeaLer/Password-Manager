import React from 'react';
import { Github } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className='bg-gray-900 text-white shadow-lg'>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="logo font-bold text-2xl">
                    <span className='text-red-500'>&lt;</span>
                    Pass<span className='text-red-500'>OP</span>
                    <span className='text-red-500'>/&gt;</span>
                </div>
                <a
                    href="https://github.com/yourusername/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center'
                >
                    <Github size={20} className="mr-2" />
                    GitHub
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-6'>
            <div className="container mx-auto px-6 flex flex-col items-center">
                <div className="logo font-bold text-2xl mb-2">
                    <span className='text-red-500'>&lt;</span>
                    Pass<span className='text-red-500'>OP</span>
                    <span className='text-red-500'>/&gt;</span>
                </div>
                <div className='flex items-center text-sm'>
                    Created with <Heart size={16} className="text-red-500 mx-1" /> by HeaLer
                </div>
            </div>
        </footer>
    );
};

export default Footer;
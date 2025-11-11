import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
// Assuming useSmoothScroll is imported or the logic is inlined here

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- Core Scrolling Function ---
    const scrollToId = useCallback((id) => {
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    // Effect to detect scroll position (Existing logic)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        // Ensure these IDs match the IDs you assign to your sections (e.g., <div id="home">)
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#experience' }, // Assuming 'About' links to the Experience section
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    // Handler for navigation clicks
    const handleNavigation = (e, href) => {
        e.preventDefault(); // Prevent default hash scrolling
        setIsMobileMenuOpen(false); // Close mobile menu if open
        
        scrollToId(href); // Call the smooth scroll function
    };

    // Base classes for the navbar (fixed, dark, transition)
    const baseNavClass = `fixed w-full z-50 transition-all duration-300 ease-in-out py-4`;
    
    // Scrolled state classes (blur and border)
    const scrolledClass = isScrolled
        ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg'
        : 'bg-transparent';

    return (
        <nav className={`${baseNavClass} ${scrolledClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo (Scrolls to #home) */}
                    <a 
                        href="#home" 
                        className="flex items-center text-2xl font-bold tracking-wider transition-colors duration-300 hover:text-gray-300"
                        onClick={(e) => handleNavigation(e, '#home')}
                    >
                        <span className="text-white/80">M</span>
                        <span className="text-white">Nabeel</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name}
                                href={link.href} 
                                className="text-sm font-medium text-gray-400 uppercase tracking-wider hover:text-white transition-colors duration-300 relative group"
                                onClick={(e) => handleNavigation(e, link.href)} // Attach smooth scroll handler
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="sm:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Full Screen Overlay) */}
            <div 
                className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transform transition-transform duration-500 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
                } sm:hidden`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map((link, index) => (
                        <a 
                            key={link.name}
                            href={link.href} 
                            className="text-4xl font-bold text-white/90 hover:text-white transition-colors duration-300"
                            onClick={(e) => handleNavigation(e, link.href)} // Attach smooth scroll handler
                            style={{ transitionDelay: `${index * 50}ms` }} 
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
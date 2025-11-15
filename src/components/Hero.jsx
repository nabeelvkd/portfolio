import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
// import pic from "../assets/nb.png" // Assumed pic is handled via inline style

// Data extracted from resume
const HERO_TITLES = [
    'n Electrical & Electronics Engineer',
    ' Graphics Designer',
    ' Full-stack Web Developer',
];

const CONTACT_LINKS = {
    github: 'https://github.com/nabeelvkd', // Placeholder for Git Link
    linkedin: 'https://linkedin.com/in/nabeel-muhammed-7a089a220', // Placeholder for LinkedIn Link
    email: 'mhdnabeel91@gmail.com', 
};

const RESUME_INFO = {
    name: 'Muhammed Nabeel',
    profileSummary: `I'm an Electrical and Electronics Engineer currently working as a Power System Modelling Engineer at TNEI Group (IPSA).`
};


function Hero() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef(null);

    // 1. Title Rotation Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTitleVisible(false); 
            const timeout = setTimeout(() => {
                setCurrentTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
                setIsTitleVisible(true); 
            }, 500); 
            return () => clearTimeout(timeout);
        }, 3000); 
        return () => clearInterval(interval);
    }, []);

    // 2. Parallax and Mouse Parallax Effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height
                });
            }
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate background parallax offset
    const orbParallaxOffset = {
        transform: `translate(-50%, ${scrollY * 0.3}px)`,
        left: `${50 + (mousePosition.x - 0.5) * 10}%` 
    };

    const SocialLink = ({ href, Icon }) => (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-110"
        >
            <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
    );


    return (
        <div 
            ref={containerRef} 
            className="relative bg-black text-white overflow-hidden flex items-center py-32 sm:py-24"
            style={{ minHeight: '85vh' }}
        >
            {/* --- BACKGROUND ELEMENTS (Parallax and Grid) --- */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Particles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Gradient orb with parallax */}
            <div 
                className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-white rounded-full opacity-5 blur-3xl"
                style={orbParallaxOffset}
            ></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }}></div>

            {/* --- MAIN CONTENT (Two Columns) --- */}
            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                {/* FIX: Ensure grid collapse to single column on small screens */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* ===== LEFT COLUMN: Text and Social Links (FULL WIDTH on mobile, lg:col-span-7 on desktop) ===== */}
                    <div className="lg:col-span-7 text-center lg:text-left">
                        
                        {/* Badge */}
                        <div className="inline-flex lg:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 hover:bg-white/10 transition-all duration-500 animate-fade-in">
                            <Sparkles className="w-4 h-4 text-white/60 animate-pulse" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Portfolio</span>
                        </div>

                        {/* Name & Greeting */}
                        <div className="mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                <span className="text-white/60">Hi, I'm</span>
                                <br />
                                <span className="text-white">{RESUME_INFO.name}</span>
                            </h1>
                        </div>

                        {/* Title Animation */}
                        <div className="mb-8 h-12 flex items-center justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '400ms' }}>
                            <h3 
                                className={`text-xl md:text-2xl text-gray-400 font-light transition-all duration-500 ${
                                    isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                                }`}
                            >
                                A{HERO_TITLES[currentTitleIndex]}
                            </h3>
                        </div>
                        
                        {/* Summary */}
                        <p className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in" style={{ animationDelay: '600ms' }}>
                            {RESUME_INFO.profileSummary}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-16 animate-fade-in" style={{ animationDelay: '800ms' }}>
                            <SocialLink href={CONTACT_LINKS.github} Icon={Github} />
                            <SocialLink href={CONTACT_LINKS.linkedin} Icon={Linkedin} />
                            <SocialLink href={`mailto:${CONTACT_LINKS.email}`} Icon={Mail} />
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: Seamless Image (HIDDEN ON MOBILE, lg:col-span-5 on desktop) ===== */}
                    <div className="hidden lg:col-span-5 lg:flex justify-end animate-fade-in" style={{ animationDelay: '1000ms' }}>
                        {/* Smaller height on mobile, taller on desktop */}
                        <div className="relative w-full max-w-md h-[400px] md:h-[550px] lg:h-[700px] overflow-hidden">
                            
                            {/* Blended Image Holder */}
                            <div className="absolute inset-0 w-full h-full bg-white/5 opacity-80" 
                                style={{
                                    backgroundImage: `url(https://i.ibb.co/XfP4HVjz/39.jpg)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center top',
                                    // FIX: Maintained 90% mask for blending effect on desktop
                                    maskImage: 'radial-gradient(circle at center, black 90%, transparent 100%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 90%, transparent 100%)',
                                }}
                            >
                            </div>
                            
                            {/* Subtle Background Glow */}
                            <div className="absolute inset-0 top-1/4 w-full h-full bg-white/5 blur-3xl opacity-50 z-[-1]"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator (Centered below content area) */}
                <div className="flex justify-center mt-16">
                    <div className="animate-bounce animate-fade-in" style={{ animationDelay: '1200ms' }}>
                        <div className="inline-flex items-center gap-2 text-white/40 text-sm">
                            <span>Scroll to explore</span>
                            <ArrowDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GLOBAL STYLES (Keyframes) --- */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.4;
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                    opacity: 0;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-bounce {
                    animation: bounce 2s infinite;
                }
            `}</style>
        </div>
    );
}

export default Hero;
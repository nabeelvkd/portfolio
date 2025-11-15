import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';
import { debounce } from 'lodash'; 

// --- HORIZONTAL EDUCATION CARD (Used ONLY on Desktop) ---
// This component remains largely unchanged but is used conditionally.
const HorizontalEducationCard = React.forwardRef(({ edu, index, isCurrent }, forwardedRef) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const Icon = edu.icon;

    // Combined styling logic for horizontal mode (3D tilt, glow)
    const handleMouseMove = (e) => {
        if (!cardRef.current || !glowRef.current || !isCurrent) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6;
        const rotateY = (x / (rect.width / 2)) * 6;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        const glowX = (e.clientX - rect.left) / rect.width * 100;
        const glowY = (e.clientY - rect.top) / rect.height * 100;
        glowRef.current.style.setProperty('--mouse-x', `${glowX}%`);
        glowRef.current.style.setProperty('--mouse-y', `${glowY}%`);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <motion.div
            ref={forwardedRef}
            // Animate scale/opacity based on current card index (Horizontal mode only)
            animate={{ scale: isCurrent ? 1 : 0.93, opacity: isCurrent ? 1 : 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 } }}
            
            // Layout classes (Desktop)
            className="hidden lg:flex flex-shrink-0 w-[450px] snap-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div
                ref={cardRef}
                className="relative group transition-transform duration-300 ease-out h-full"
                style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
            >
                {/* Glow & Card Content (Simplified for brevity) */}
                <div ref={glowRef} className={`absolute -inset-6 rounded-3xl blur-2xl transition-opacity duration-500 ${isHovered && isCurrent ? 'opacity-30' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 70%)' }}></div>
                <div className="relative flex gap-6">
                    <div className={`mt-1 flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-500 ${isHovered && isCurrent ? 'scale-110 bg-white/20' : ''}`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-grow">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Calendar className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60 font-medium tracking-wider">{edu.period}</span>
                        </div>
                        <h3 className="text-5xl font-bold text-white mb-4">{edu.degree}</h3>
                        <p className="text-2xl text-gray-400 mb-6">{edu.institution}</p>
                        <p className="text-lg text-gray-600 leading-relaxed">{edu.description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});


// --- VERTICAL TIMELINE ITEM (Used ONLY on Mobile) ---
function VerticalEducationItem({ edu, index, isLast }) {
    const Icon = edu.icon;
    
    // Simple staggering for vertical view
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, delay: index * 0.1 }
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex group mb-12 last:mb-0"
        >
            {/* Timeline Line and Dot */}
            <div className="absolute top-0 left-0 h-full w-10 flex flex-col items-center">
                {!isLast && <div className="flex-grow w-px bg-white/10"></div>}
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-white/70" />
                </div>
                {!isLast && <div className="flex-grow w-px bg-white/10"></div>}
            </div>

            {/* Content Card (Simplified for Mobile) */}
            <div className="ml-16 w-full p-4 rounded-xl transition-all duration-300 hover:bg-white/5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-3">
                    <Calendar className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-white/60 font-medium tracking-wider">{edu.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1.5">{edu.degree}</h3>
                <p className="text-lg text-gray-400 mb-3">{edu.institution}</p>
                <p className="text-base text-gray-600 leading-relaxed">{edu.description}</p>
            </div>
        </motion.div>
    );
}


// --- MAIN EDUCATION COMPONENT ---
function Education() {
    // State is only used for the Desktop Horizontal Scroll tracking
    const [currentCardIndex, setCurrentCardIndex] = useState(0); 
    const scrollContainerRef = useRef(null);
    const cardRefs = useRef([]);

    const education = [
        { id: 1, degree: 'B.Tech in Electrical and Electronics Engineering', institution: 'Mar Athanasius College of Engineering', period: '2021 - 2025', icon: GraduationCap, description: 'Specialized in Embedded Systems, Control Systems, and Electronics' },
        { id: 2, degree: 'Higher Secondary Education', institution: 'GHSS REC Chathamangalam', period: '2018 - 2020', icon: BookOpen, description: 'Focused on Science stream with Mathematics and Physics' },
        { id: 3, degree: 'High School', institution: 'Markaz HSS Karanthur', period: '2017 - 2018', icon: Award, description: 'Completed general education with distinction' }
    ];

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, education.length);
    }, [education.length]);

    // Scroll handler for Desktop Horizontal View
    const handleHorizontalScroll = () => {
        if (!scrollContainerRef.current) return;
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let smallestDistance = Infinity;

        // Find card closest to the container's center
        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== currentCardIndex) {
            setCurrentCardIndex(closestIndex);
        }
    };

    // Debounced handler used ONLY on Desktop
    const debouncedScrollHandler = useCallback(debounce(handleHorizontalScroll, 50), [currentCardIndex]);

    // Manually trigger on load (for Desktop)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (window.innerWidth >= 1024) { // Only run horizontal logic if desktop
                handleHorizontalScroll();
            }
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white py-32 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`, animationDelay: `${Math.random() * 5}s` }}></div>
                ))}
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- DESKTOP HORIZONTAL VIEW --- */}
                <div className="hidden lg:flex flex-row gap-24 items-start">
                    {/* Left Side - Header (Desktop Sticky) */}
                    <div className="lg:sticky lg:top-32 lg:w-1/3 flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-all duration-500">
                            <Sparkles className="w-4 h-4 text-white/60 animate-pulse" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Academic Journey</span>
                        </div>
                        <h2 className="text-8xl font-bold text-white mb-8 tracking-tight leading-none">Education</h2>
                        <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                        <p className="text-xl text-gray-500 leading-relaxed mb-8">A timeline of learning, growth, and transformation</p>
                        {/* Desktop Progress Indicators */}
                        <div className="flex flex-col gap-3">
                            {education.map((_, index) => (
                                <div key={index} className={`h-1 rounded-full transition-all duration-500 ${currentCardIndex === index ? 'w-16 bg-white' : 'w-8 bg-white/30'}`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Horizontal Scrolling Content (Desktop) */}
                    <div className="lg:w-2/3">
                        <div
                            ref={scrollContainerRef}
                            onScroll={debouncedScrollHandler}
                            className="overflow-x-auto no-scrollbar snap-x snap-mandatory"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {/* PADDING ensures first/last items center correctly on large screens */}
                            <div className="flex space-x-12 py-8 px-32">
                                {education.map((edu, index) => (
                                    // Use the Horizontal component variant
                                    <HorizontalEducationCard
                                        key={edu.id}
                                        edu={edu}
                                        index={index}
                                        isCurrent={currentCardIndex === index}
                                        forwardedRef={(el) => (cardRefs.current[index] = el)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Timeline (Hidden on small screens) */}
                        <div className="flex justify-center mt-12 px-8">
                            <div className="w-full max-w-sm flex items-center justify-between relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-white/10"></div>
                                <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white"
                                    animate={{ width: `${(currentCardIndex / (education.length - 1)) * 100}%` }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                />
                                {education.map((_, index) => (
                                    <div key={`dot-${index}`} className={`relative z-10 w-3 h-3 rounded-full transition-all duration-500 ${currentCardIndex >= index ? 'bg-white' : 'bg-white/30'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MOBILE VERTICAL VIEW --- */}
                <div className="lg:hidden">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                            <Sparkles className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Academic Journey</span>
                        </div>
                        <h2 className="text-6xl font-bold text-white mb-8">Education</h2>
                        <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                        <p className="text-xl text-gray-500 leading-relaxed">A timeline of learning, growth, and transformation</p>
                    </div>

                    {/* Vertical Timeline Items (Mobile) */}
                    <div className="flex flex-col pl-4">
                        {education.map((edu, index) => (
                            <VerticalEducationItem
                                key={edu.id}
                                edu={edu}
                                index={index}
                                isLast={index === education.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}

export default Education;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';
// Import debounce (not throttle)
import { debounce } from 'lodash'; // Run: npm install lodash

// --- EDUCATION CARD COMPONENT ---
// No changes to this component
function EducationCard({ edu, index, isCurrent, forwardedRef }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const Icon = edu.icon;

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

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }
        }
    };

    return (
        <motion.div
            ref={forwardedRef}
            animate={{
                scale: isCurrent ? 1 : 0.93,
                opacity: isCurrent ? 1 : 0.6
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-[85vw] sm:w-[400px] md:w-[450px] flex-shrink-0 snap-center" // Kept snap-center
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div
                ref={cardRef}
                className="relative group transition-transform duration-300 ease-out h-full"
                style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
            >
                <div
                    ref={glowRef}
                    className={`absolute -inset-6 rounded-3xl blur-2xl transition-opacity duration-500 ${isHovered && isCurrent ? 'opacity-30' : 'opacity-0'
                        }`}
                    style={{
                        background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 70%)',
                    }}
                ></div>
                <div className="relative flex gap-6">
                    <div className={`mt-1 flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-500 ${isHovered && isCurrent ? 'scale-110 bg-white/20' : ''
                        }`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-grow">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-6 transition-all duration-500 hover:bg-white/10 hover:scale-105">
                            <Calendar className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60 font-medium tracking-wider">
                                {edu.period}
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-500 group-hover:text-gray-300">
                            {edu.degree}
                        </h3>
                        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 mb-6 cursor-pointer w-fit group/link">
                            <p className="text-xl md:text-2xl text-gray-400 transition-colors duration-300 group-hover/link:text-white">
                                {edu.institution}
                            </p>
                            <ArrowUpRight className="w-5 h-5 text-gray-600 opacity-0 group-hover/link:opacity-100 transform translate-y-1 group-hover/link:translate-y-0 transition-all duration-300" />
                        </a>
                        <p className="text-lg text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-500">
                            {edu.description}
                        </p>
                        <div className="relative mt-8">
                            <div className="h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div
                                className="absolute inset-0 h-px bg-gradient-to-r from-white/40 to-transparent transition-all duration-700 origin-left"
                                style={{
                                    transform: isHovered && isCurrent ? 'scaleX(1)' : 'scaleX(0)',
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


// --- MAIN EDUCATION COMPONENT ---
function Education() {
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

    // The new scroll handler
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        // Get the center of the scroll container (viewport)
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

    // --- Use debounce ---
    // This waits 50ms AFTER scrolling stops to run the calculation
    const debouncedScrollHandler = useCallback(debounce(handleScroll, 50), [currentCardIndex]);

    // --- Manually trigger on load ---
    // This ensures the first card is highlighted correctly on initial render
    useEffect(() => {
        // A small timeout to ensure refs are populated
        setTimeout(() => {
            handleScroll();
        }, 100);
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
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Left Side - Header */}
                    <div className="lg:sticky lg:top-32 lg:w-1/3 flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-all duration-500">
                            <Sparkles className="w-4 h-4 text-white/60 animate-pulse" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Academic Journey</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                            Education
                        </h2>
                        <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                        <p className="text-xl text-gray-500 leading-relaxed mb-8">
                            A timeline of learning, growth, and transformation
                        </p>
                        <div className="hidden lg:flex flex-col gap-3">
                            {education.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 rounded-full transition-all duration-500 ${currentCardIndex === index ? 'w-16 bg-white' : 'w-8 bg-white/30'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Scrolling Content */}
                    <div className="lg:w-2/3">
                        <div
                            ref={scrollContainerRef}
                            onScroll={debouncedScrollHandler} // Use the debounced handler
                            className="overflow-x-auto no-scrollbar snap-x snap-mandatory" // Snap properties on the container
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {/* --- ADDED PADDING HERE ---
                  This padding ensures the first and last items can be centered */}
                            <div className="flex space-x-12 py-8 px-16 md:px-24 lg:px-32">
                                {education.map((edu, index) => (
                                    <EducationCard
                                        key={edu.id}
                                        edu={edu}
                                        index={index}
                                        isCurrent={currentCardIndex === index}
                                        forwardedRef={(el) => (cardRefs.current[index] = el)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex justify-center mt-12 px-8">
                            <div className="w-full max-w-sm flex items-center justify-between relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-white/10"></div>
                                <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white"
                                    animate={{
                                        width: `${(currentCardIndex / (education.length - 1)) * 100}%`
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                />
                                {education.map((_, index) => (
                                    <div
                                        key={`dot-${index}`}
                                        className={`relative z-10 w-3 h-3 rounded-full transition-all duration-500 ${currentCardIndex >= index ? 'bg-white' : 'bg-white/30'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
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
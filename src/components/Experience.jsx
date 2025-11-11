import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Briefcase, Code } from 'lucide-react'; 

// --- EXPERIENCE DATA (Full list from resume) ---
const allExperienceData = [
    {
        id: 1,
        title: 'Power System Modelling Engineer',
        company: 'TNEI Group (IPSA)',
        period: '08/2025 - Present',
        location: 'Kochi, India',
        icon: Briefcase,
        type: 'experience',
        description: [
            'Develop control system plugins and libraries in C++ for IPSA Software.',
            'Enabling advanced transient analysis and expanding simulation capabilities.',
            'Conduct release testing to ensure stability, performance, and reliability of IPSA updates before deployment.'
        ],
    },
    {
        id: 2,
        title: 'Electrical Maintanence Apprentice',
        company: 'MRF',
        period: '06/2025 - 07/2025',
        location: 'Chennai, India',
        icon: Briefcase,
        type: 'experience',
        description: [
            'Supported electrical maintenance and troubleshooting of plant machinery.',
            'Contributed to reduced downtime and improved operational efficiency.'
        ],
    },
];

// --- TIMELINE ITEM COMPONENT (Refined Highlighting) ---
function TimelineItem({ item, index, isFirst, isLast, isIntersecting }) {
    const Icon = item.icon;

    // Highlighting based on Intersection State
    const highlightTitleClass = isIntersecting 
        ? 'text-4xl font-bold text-white opacity-100' 
        : 'text-3xl font-semibold text-gray-500 opacity-80'; 

    const highlightTextClass = isIntersecting 
        ? 'text-lg text-gray-300' 
        : 'text-base text-gray-600';

    const iconHighlightClass = isIntersecting 
        ? 'scale-125 bg-white border-white text-black shadow-lg shadow-white/20' 
        : 'scale-100 bg-white/10 border-white/20 text-white/50';

    const lineHighlightClass = isIntersecting 
        ? 'bg-white/70 w-0.5' 
        : 'bg-white/10 w-px';

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, delay: index * 0.5 } 
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            // FIX: Removed mb-12 to reduce vertical margin between items
            className={`relative flex group mb-12 last:mb-1 transition-all duration-700 ease-out`} 
        >
            {/* Vertical Timeline Element (The Line and Dot/Icon) */}
            <div className="absolute top-0 left-0 h-full w-10 flex flex-col items-center">
                {/* Line segment above */}
                {!isFirst && (
                    <div 
                        className={`flex-grow transition-all duration-500 ${lineHighlightClass}`}
                    ></div>
                )}
                {/* Dot/Icon container */}
                <div 
                    className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 z-10 ${iconHighlightClass}`}
                >
                    <Icon className={`w-5 h-5 transition-colors duration-500`} />
                </div>
                {/* Line segment below */}
                {!isLast && (
                    <div 
                        className={`flex-grow transition-all duration-500 ${lineHighlightClass}`}
                    ></div>
                )}
            </div>

            {/* Content Area - Focus on text/size change */}
            <div 
                className={`ml-16 w-full p-2 transition-all duration-700 ease-out`}
            >
                {/* Period Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm mb-4 transition-colors duration-500 bg-white/5 border border-white/10">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/70 font-medium tracking-wider">
                        {item.period}
                    </span>
                </div>

                <h3 className={`mb-2 transition-all duration-500 ${highlightTitleClass}`}>
                    {item.title}
                </h3>
                <p className={`mb-4 transition-colors duration-500 ${isIntersecting ? 'text-xl text-white/80' : 'text-lg text-gray-500'}`}>
                    {item.company} {item.location && <span className="text-sm text-gray-600">({item.location})</span>}
                </p>
                
                <ul className={`list-disc ml-5 space-y-3 leading-relaxed transition-colors duration-500 ${highlightTextClass}`}>
                    {item.description.map((line, idx) => (
                        <li key={idx}>
                            {line}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

// --- MAIN EXPERIENCE COMPONENT ---
function Experience() {
    // State to track the ID of the currently intersecting (highlighted) item
    const [currentId, setCurrentId] = useState(allExperienceData[0].id);
    const itemRefs = useRef({});

    // Intersection Observer Callback 
    const handleIntersect = useCallback((entries) => {
        entries.forEach(entry => {
            // Check if the element is intersecting and its midpoint is near the viewport center (threshold 0.5)
            // NOTE: Threshold is set to 0.8 in the provided useCallback, but 0.5 in useEffect, 
            // I'll adjust the logic to handle one consistent approach.
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) { 
                setCurrentId(parseInt(entry.target.id));
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.5, // Used 0.5 for consistency
        });

        // Observe all timeline items
        Object.values(itemRefs.current).forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        // Cleanup
        return () => observer.disconnect();
    }, [handleIntersect]);


    return (
        <div className="bg-black text-white py-32 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`, animationDelay: `${Math.random() * 5}s` }}></div>
                ))}
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* Left Side - Header (FROZEN/STICKY CONTAINER) */}
                    <div className="lg:w-1/3 flex-shrink-0">
                        {/* Container that holds the sticky content */}
                        <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]"> 
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 transition-all duration-500">
                                <Sparkles className="w-4 h-4 text-white/60 animate-pulse" />
                                <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Career & Innovation</span>
                            </div>
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                                Experience
                            </h2>
                            <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                            <p className="text-xl text-gray-500 leading-relaxed mb-8">
                                A showcase of professional roles and key engineering projects.
                            </p>
                            
                            {/* Vertical Progress Indicator for large screens */}
                            <div className="hidden lg:flex flex-col gap-3 pt-6">
                                {allExperienceData.map((item) => (
                                    <div
                                        key={`dot-${item.id}`}
                                        className={`h-1 rounded-full transition-all duration-500 ${
                                            currentId === item.id ? 'w-16 bg-white' : 'w-8 bg-white/30'
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content Timeline (SCROLLING) */}
                    <div className="lg:w-2/3 w-full">
                        <div className="flex flex-col pr-4">
                            {/* FIX: Removed pb-[50vh] padding and used standard pt-8/pb-8 */}
                            <div className='pt-8 pb-8'> 
                                {allExperienceData.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        id={item.id} 
                                        // Using ref callback to dynamically populate the itemRefs object
                                        ref={el => itemRefs.current[item.id] = el}
                                    >
                                        <TimelineItem 
                                            item={item}
                                            index={index}
                                            isFirst={index === 0}
                                            isLast={index === allExperienceData.length - 1}
                                            isIntersecting={currentId === item.id} 
                                        />
                                    </div>
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
            `}</style>
        </div>
    );
}

export default Experience;
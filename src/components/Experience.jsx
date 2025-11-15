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

// --- VERTICAL TIMELINE ITEM (Used ONLY on Mobile/Small Screens) ---
function VerticalTimelineItem({ item, index, isFirst, isLast }) {
    const Icon = item.icon;

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
            className="relative flex group mb-8 last:mb-0"
        >
            {/* Timeline Line and Dot */}
            <div className="absolute top-0 left-0 h-full w-10 flex flex-col items-center">
                {!isLast && <div className="flex-grow w-px bg-white/10"></div>}
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-white/70" />
                </div>
                {!isLast && <div className="flex-grow w-px bg-white/10"></div>}
            </div>

            {/* Content Details */}
            <div className="ml-12 w-full p-2 rounded-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-2">
                    <Calendar className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-white/70 font-medium tracking-wider">{item.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-base text-gray-400 mb-3">{item.company} ({item.location})</p>
                
                <ul className="list-disc ml-5 space-y-1 text-base text-gray-600 leading-relaxed">
                    {item.description.map((line, idx) => (
                        <li key={idx}>{line}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

// --- DESKTOP TIMELINE ITEM (Used ONLY on Desktop) ---
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
            transition: { duration: 0.6, delay: index * 0.1 } 
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className={`relative flex group mb-12 last:mb-1 transition-all duration-700 ease-out`} 
        >
            {/* Vertical Timeline Element (The Line and Dot/Icon) */}
            <div className="absolute top-0 left-0 h-full w-10 flex flex-col items-center">
                {!isFirst && (<div className={`flex-grow transition-all duration-500 ${lineHighlightClass}`}></div>)}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 z-10 ${iconHighlightClass}`}>
                    <Icon className={`w-5 h-5 transition-colors duration-500`} />
                </div>
                {!isLast && (<div className={`flex-grow transition-all duration-500 ${lineHighlightClass}`}></div>)}
            </div>

            {/* Content Area */}
            <div className={`ml-16 w-full p-2 transition-all duration-700 ease-out`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm mb-4 transition-colors duration-500 bg-white/5 border border-white/10">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/70 font-medium tracking-wider">{item.period}</span>
                </div>
                <h3 className={`mb-2 transition-all duration-500 ${highlightTitleClass}`}>{item.title}</h3>
                <p className={`mb-4 transition-colors duration-500 ${isIntersecting ? 'text-xl text-white/80' : 'text-lg text-gray-500'}`}>
                    {item.company} {item.location && <span className="text-sm text-gray-600">({item.location})</span>}
                </p>
                <ul className={`list-disc ml-5 space-y-3 leading-relaxed transition-colors duration-500 ${highlightTextClass}`}>
                    {item.description.map((line, idx) => (<li key={idx}>{line}</li>))}
                </ul>
            </div>
        </motion.div>
    );
}

// --- MAIN EXPERIENCE COMPONENT ---
function Experience() {
    const [currentId, setCurrentId] = useState(allExperienceData[0].id);
    const itemRefs = useRef({});

    // Intersection Observer Callback 
    const handleIntersect = useCallback((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) { 
                setCurrentId(parseInt(entry.target.id));
            }
        });
    }, []);

    useEffect(() => {
        // Only attach observer if the screen size is large (desktop layout)
        if (window.innerWidth >= 1024) {
            const observer = new IntersectionObserver(handleIntersect, {
                root: null, threshold: 0.5, 
            });

            Object.values(itemRefs.current).forEach(ref => {
                if (ref) { observer.observe(ref); }
            });

            return () => observer.disconnect();
        }
        // No cleanup needed if observer was never created
    }, [handleIntersect]);


    return (
        <div className="bg-black text-white py-32 px-4 relative overflow-hidden">
            {/* Background elements (Floating dots and grid) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`, animationDelay: `${Math.random() * 5}s` }}></div>
                ))}
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- DESKTOP (Horizontal Scroll/Sticky Header) --- */}
                <div className="hidden lg:flex flex-row gap-24 items-start">
                    
                    {/* Left Side - Header (Desktop Sticky) */}
                    <div className="lg:sticky lg:top-32 lg:w-1/3 flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 transition-all duration-500">
                            <Sparkles className="w-4 h-4 text-white/60 animate-pulse" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Career & Innovation</span>
                        </div>
                        <h2 className="text-8xl font-bold text-white mb-8 tracking-tight leading-none">Experience</h2>
                        <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                        <p className="text-xl text-gray-500 leading-relaxed mb-8">A showcase of professional roles and key engineering projects.</p>
                        {/* Desktop Progress Indicators */}
                        <div className="flex flex-col gap-3">
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

                    {/* Right Side - Vertical Scrolling Content (Desktop) */}
                    <div className="lg:w-2/3">
                        <div className="flex flex-col pr-4">
                            <div className='pt-8 pb-8'> 
                                {allExperienceData.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        id={item.id} 
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

                {/* --- MOBILE VERTICAL VIEW (Visible on < lg) --- */}
                <div className="lg:hidden">
                    
                    {/* Header (Mobile Stacked) */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                            <Sparkles className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Career & Innovation</span>
                        </div>
                        <h2 className="text-6xl font-bold text-white mb-8">Experience</h2>
                        <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                        <p className="text-xl text-gray-500 leading-relaxed">A showcase of professional roles and key engineering projects.</p>
                    </div>

                    {/* Vertical Timeline Items (Mobile) */}
                    <div className="flex flex-col pl-4">
                        {allExperienceData.map((item, index) => (
                            <VerticalTimelineItem
                                key={item.id}
                                item={item}
                                index={index}
                                isFirst={index === 0}
                                isLast={index === allExperienceData.length - 1}
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
            `}</style>
        </div>
    );
}

export default Experience;
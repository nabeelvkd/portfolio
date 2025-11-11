import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Code, Database, Globe, Zap, Briefcase, SquareTerminal, Sigma, GitBranch, FileText, Cpu, Network, Layers, Server, Layout, Monitor, Shield, Palette } from 'lucide-react';

// --- 1. ICON MAPPING (Kept for individual styling) ---
const skillIconMap = {
    'C++': SquareTerminal,
    'Python': Code,
    'C Programming': SquareTerminal,
    'NodeJS': Network,
    'ReactJS': Layers,
    'ExpressJS': Server,
    'HTML': Layout,
    'CSS': Layout,
    'MongoDB': Shield,
    'MySQL': Database,
    'Arduino': Cpu,
    'ESP32': Cpu,
    'IPSA': Zap,
    'MATLAB': Sigma,
    'Proteus': Monitor,
    'Git': GitBranch,
    'Adobe Illustrator': Palette,
    'MS Excel': FileText,
};

// --- SKILLS DATA (Flattened and Tagged) ---
const skillsData = [
    { name: 'C++', category: 'Core' },
    { name: 'Python', category: 'Core' },
    { name: 'C Programming', category: 'Core' },
    { name: 'ReactJS', category: 'Web' },
    { name: 'NodeJS', category: 'Web' },
    { name: 'ExpressJS', category: 'Web' },
    { name: 'HTML', category: 'Web' },
    { name: 'CSS', category: 'Web' },
    { name: 'MongoDB', category: 'Data' },
    { name: 'MySQL', category: 'Data' },
    { name: 'Arduino', category: 'Embedded' },
    { name: 'ESP32', category: 'Embedded' },
    { name: 'IPSA', category: 'Tool' },
    { name: 'MATLAB', category: 'Tool' },
    { name: 'Proteus', category: 'Tool' },
    { name: 'Git', category: 'Tool' },
    { name: 'Adobe Illustrator', category: 'Tool' },
    { name: 'MS Excel', category: 'Tool' },
];

// --- 2. DYNAMIC TAG COMPONENT ---
function SkillTag({ skill, index }) {
    const Icon = skillIconMap[skill.name] || Code;

    const [isHovered, setIsHovered] = useState(false);

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.5 + index * 0.03 // Staggered entry
            }
        },
    };

    return (
        <motion.div
            variants={tagVariants}
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            // Visual style overhaul: Bubble/Pill shape, subtle glow on hover
            className={`
                inline-flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer 
                bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm
                transition-all duration-300 ease-in-out whitespace-nowrap
                ${isHovered ? 'border-white/40 bg-white/15 text-white shadow-lg shadow-white/5' : ''}
            `}
        >
            <motion.div
                animate={{ rotate: isHovered ? 15 : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center"
            >
                <Icon className={`w-4 h-4 mr-1 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-400'}`} />
            </motion.div>
            <span className="text-sm font-medium tracking-wide">
                {skill.name}
            </span>
        </motion.div>
    );
}

// --- MAIN SKILLS COMPONENT (Stabilized) ---
function Skills() {
    return (
        // FIX: The main container ensures content is visible and scrollable.
        <div className="min-h-screen bg-black text-white py-32 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`, animationDelay: `${Math.random() * 5}s` }}></div>
                ))}
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="mb-16 text-center lg:text-left">
                    {/* Simplified animations for header elements to reduce initial load complexity */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 transition-all duration-500"
                    >
                        <Star className="w-4 h-4 text-white/60 animate-pulse" />
                        <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Technical Proficiencies</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-none"
                    >
                        Expertise
                    </motion.h2>
                    <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mx-auto lg:mx-0"></div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    >
                        A dynamic overview of technical tools, languages, and frameworks.
                    </motion.p>
                </div>

                {/* Skills Cloud - Interaction and Aesthetics Focused */}
                <motion.div
                    className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4"
                >
                    {skillsData.map((skill, index) => (
                        <SkillTag
                            key={skill.name}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Information Footer/Legend */}
                <div className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto">
                    <p className="text-lg text-gray-600">
                        As an Electrical and Electronics Engineer, my technical versatility spans both core hardware and modern software
                        development. I possess strong C++ expertise focused on control system plugin development , evidenced by my work enabling
                        advanced transient analysis for IPSA Software. Complementing my engineering foundation, I am proficient in Python and
                        full-stack web development (MERN stack), allowing me to bridge traditional engineering challenges with contemporary
                        software solutions. I am skilled in embedded systems using Arduino and ESP32 , and comfortable utilizing professional
                        tools like MATLAB and Git.
                    </p>
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

export default Skills;
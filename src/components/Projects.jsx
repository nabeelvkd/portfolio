import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, GitBranch, ArrowUpRight } from 'lucide-react'; 

// --- PROJECTS DATA ---
const projectData = [
    {
        id: 1,
        title: 'Online Token & Appointment Booking System',
        period: '05/2025 - 07/2025',
        company: 'Full-stack Web Application',
        description: [
            'Developed a full-stack web application designed to help businesses manage customer flow through online tokens and scheduled appointments.',
            'The system is customizable for various services like a salon, clinic, auto garage, or legal service.',
        ],
        gitLink: '#', // Placeholder for Git Link - REPLACE WITH ACTUAL URL
    },
    {
        id: 2,
        title: 'Dynamic Wireless Charging for EVs',
        period: '08/2024 - 04/2025',
        company: 'Electrical Engineering Project',
        description: [
            'Designed a system that charges electric vehicles while driving using inductive power transfer (IPT) and resonant frequency tuning.',
            'The design aimed to improve efficiency and reduce energy loss.',
        ],
        gitLink: '#', // Placeholder for Git Link - REPLACE WITH ACTUAL URL
    },
    {
        id: 3,
        title: 'Automated Hydroponic Farming',
        period: '04/2023 - 07/2023',
        company: 'Embedded System Project',
        description: [
            'Built an automated hydroponic system using the ESP32 to monitor and control factors like water pH, temperature and lighting.',
            'The system automatically adjusts the lighting and water quality.',
        ],
        gitLink: '#', // Placeholder for Git Link - REPLACE WITH ACTUAL URL
    },
];

// --- PROJECT LIST ITEM COMPONENT (Non-Card) ---
function ProjectListItem({ item, index }) {
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, delay: index * 0.1 }
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col p-4 border-b border-white/10 group transition-colors duration-300 hover:bg-white/5"
        >
            <div className="flex justify-between items-start mb-2">
                {/* Title and Company */}
                <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gray-300">
                    {item.title}
                </h3>

                {/* Git Link Button */}
                <a 
                    href={item.gitLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-xs text-white/80 transition-all duration-300 hover:bg-white hover:text-black hover:border-white flex-shrink-0 ml-4"
                >
                    <GitBranch className="w-4 h-4" />
                    Repo
                    <ArrowUpRight className="w-3 h-3" />
                </a>
            </div>

            {/* Sub-info */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                <p className="font-medium text-white/70">{item.company}</p>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                </div>
            </div>

            {/* Description List */}
            <ul className="list-disc ml-5 space-y-1 text-base text-gray-600 leading-relaxed">
                {item.description.map((line, idx) => (
                    <li key={idx}>
                        {line}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// --- MAIN PROJECTS COMPONENT ---
function Projects() {
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
                
                {/* --- 1. HEADER SECTION (Left Alignment) --- */}
                <div className="mb-16 text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <Code className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Innovation & Development</span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                        Projects
                    </h2>
                    
                    {/* Line */}
                    <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                    
                    {/* Description */}
                    <p className="mt-8 text-xl text-gray-500 leading-relaxed max-w-4xl">
                        A showcase of practical applications of software and engineering principles developed throughout my career.
                    </p>
                </div>

                {/* --- 2. PROJECTS CONTENT (Two-Column List) --- */}
                <div className="mt-12">
                    {/* Displaying two projects side-by-side for desktop, single column for mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                        {projectData.map((item, index) => (
                            <ProjectListItem 
                                key={item.id} 
                                item={item}
                                index={index}
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

export default Projects;
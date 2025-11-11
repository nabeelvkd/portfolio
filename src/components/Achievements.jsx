import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, CheckSquare, TrendingUp, Zap } from 'lucide-react'; 

// --- ACHIEVEMENTS DATA (Using provided data) ---
const achievementsData = [
    {
        id: 1,
        title: 'Graduate Aptitude Test in Engineering (GATE) 2024',
        icon: Award,
        details: [
            { label: 'Result', value: 'Qualified in Electrical Engineering (EE)' },
            { label: 'Score', value: '411' }
        ],
        type: 'Academic',
        isGolden: true, 
    },
    {
        id: 2,
        title: 'Competitive Programming Proficiency',
        icon: CheckSquare,
        details: [
            { label: 'Platform', value: 'LeetCode' },
            { label: 'Progress', value: '150+ problems solved' }
        ],
        type: 'Technical',
        isGolden: false,
    },
];

// Animation variants for staggered entry
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Animation variants for individual items
const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};


// --- ACHIEVEMENT ITEM COMPONENT ---
function AchievementItem({ item, index }) {
    const Icon = item.icon;
    const isGolden = item.isGolden;

    // Conditional styling for the gold accent (GATE)
    const titleClass = isGolden ? 'text-white font-extrabold text-2xl md:text-3xl' : 'text-gray-300 font-semibold text-xl md:text-2xl';
    const accentColor = isGolden ? 'text-amber-400' : 'text-white/60';
    const borderStyle = isGolden ? 'border-amber-400' : 'border-white/20';

    return (
        <motion.div 
            variants={itemVariants}
            className="flex flex-col mb-12 last:mb-0 transition-all duration-500 group"
        >
            <div className={`flex items-start gap-4 md:gap-6 pb-6 border-b ${borderStyle}`}>
                
                {/* Icon Circle (Visual Anchor) */}
                <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 ${borderStyle} transition-all duration-500 ${isGolden ? 'bg-amber-400/10' : 'bg-white/5'} group-hover:scale-105`}>
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${accentColor}`} />
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                    <h3 className={`leading-snug mb-3 transition-colors duration-300 ${titleClass}`}>
                        {item.title}
                    </h3>
                    
                    {/* FIX: Changed grid-cols-2 to handle mobile stacking better */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 gap-y-2">
                        {item.details.map((detail, i) => (
                            <motion.div 
                                key={i} 
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <p className="text-xs text-gray-500 uppercase font-medium tracking-wider mb-0.5">
                                    {detail.label}
                                </p>
                                <p className={`text-base md:text-lg font-semibold ${accentColor}`}>
                                    {detail.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- MAIN ACHIEVEMENTS COMPONENT ---
function Achievements() {
    return (
        <div className="min-h-screen bg-black text-white py-32 px-4 relative overflow-hidden">
            {/* Background elements (FIX: Added moving dots background) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`, animationDelay: `${Math.random() * 5}s` }}></div>
                ))}
            </div>
            {/* Grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
            
            {/* Added subtle glow for gold accent */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="mb-20 text-left">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 transition-all duration-500">
                        <Star className="w-4 h-4 text-white/60 animate-pulse" />
                        <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Milestones & Recognition</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                        Achievements
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                    <p className="mt-8 text-xl text-gray-500 leading-relaxed max-w-4xl">
                        A summary of academic qualifications and proficiency in challenging technical domains.
                    </p>
                </div>

                {/* Achievements List */}
                {/* FIX: Removed mx-auto, allowing the list to use the full width on small screens */}
                <motion.div 
                    className="max-w-4xl lg:mx-auto space-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {achievementsData.map((item, index) => (
                        <AchievementItem 
                            key={item.id} 
                            item={item}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
            
            {/* Custom Styles with keyframes */}
            <style>{`
                .text-amber-400 { color: #fbbf24; }
                .border-amber-400 { border-color: #fbbf24; }
                .bg-amber-400\/10 { background-color: rgba(251, 191, 36, 0.1); }

                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}

export default Achievements;
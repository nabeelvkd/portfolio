import React from 'react';
import { motion } from 'framer-motion';
import { Code, Link, GitBranch, ArrowRight, MousePointerClick, MessageSquare, Handshake } from 'lucide-react'; 

// --- PROJECT DATA (Updated to reflect ongoing status and features) ---
const featuredProjects = [
    {
        id: 1,
        title: "FingerFlow: Typing Practice Web App",
        tagline: "Enhance speed and accuracy with customized lessons.",
        description: [
            "Real-time WPM (Words Per Minute) and accuracy tracking.",
            "Customizable typing content and diverse lesson libraries.",
            "Responsive design for seamless use across desktop and mobile devices.",
            "Progressive difficulty levels to continuously challenge the user."
        ],
        tech: ['ReactJS', 'NodeJS', 'tailwindCSS'],
        icon: MousePointerClick,
        liveLink: "#", // Replace with actual live URL
        repoLink: "#", // Replace with actual GitHub URL
    },
    
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- PROJECT SECTION COMPONENT (Non-Card Structure) ---
function ProjectSection({ project, index }) {
    const Icon = project.icon;

    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-8 border-b border-white/10 pb-10 pt-4 transition-all duration-500 group hover:border-white/50"
        >
            {/* Left Column: Title and Description (Features) */}
            <div className="md:w-3/5">
                <div className="flex items-center gap-4 mb-3">
                    <Icon className="w-6 h-6 text-white/80" />
                    <h3 className="text-3xl font-bold text-white leading-snug">{project.title}</h3>
                </div>
                
                <p className="text-lg text-gray-400 mb-4">{project.tagline}</p>
                
                {/* Description converted to features list */}
                <ul className="space-y-2 mb-6 text-gray-500 list-disc ml-5">
                    {project.description.map((line, i) => (
                        <li key={i} className="text-base">{line}</li>
                    ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 font-medium border border-white/20 transition-all duration-300 group-hover:bg-white/20">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Column: Links and Interaction */}
            <div className="md:w-2/5 flex flex-col justify-center items-start md:items-end">
                <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Project Access</p>
                
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <motion.a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between font-semibold px-4 py-3 rounded-lg bg-white text-black transition-all duration-300 shadow-md hover:bg-gray-200 hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        Live Demo
                        <Link className="w-5 h-5 ml-2" />
                    </motion.a>
                    
                    <motion.a 
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between font-semibold px-4 py-3 rounded-lg border border-white/30 text-white/90 transition-all duration-300 hover:bg-white/10"
                        whileHover={{ scale: 1.02 }}
                    >
                        View Codebase
                        <GitBranch className="w-5 h-5 ml-2" />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}


// --- MAIN FEATURED PROJECTS COMPONENT ---
function FeaturedProjects() {
    return (
        <div className="min-h-screen bg-black text-white py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="mb-16 text-left">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <Code className="w-4 h-4 text-white/60 animate-pulse" />
                        <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Key Technical Applications</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                        Ongoing Projects
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                    <p className="mt-8 text-xl text-gray-500 leading-relaxed max-w-4xl">
                        A focused showcase of my current full-stack development and engineering application efforts.
                    </p>
                </div>

                {/* Projects List */}
                <motion.div 
                    className="flex flex-col divide-y divide-white/10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {featuredProjects.map((project, index) => (
                        <ProjectSection 
                            key={project.id} 
                            project={project}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Call to Action - Clean Banner Structure (Replaces Card) */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center mt-20 p-8 md:p-12 bg-white/5 border border-white/10"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="text-left mb-6 md:mb-0">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <Handshake className="w-6 h-6" />
                            <h3 className="text-3xl font-bold">
                                Collaborate on New Ideas
                            </h3>
                        </div>
                        <p className="text-lg text-gray-400 max-w-xl">
                            I am actively seeking collaboration on impactful projects utilizing C++, embedded systems, or web technologies.
                        </p>
                    </div>

                    <a 
                        href="#contact" 
                        className="inline-flex items-center gap-3 text-lg font-bold text-black px-6 py-3 rounded-lg bg-white transition-all duration-300 shadow-xl hover:shadow-white/40 hover:bg-gray-200 flex-shrink-0"
                    >
                        Get in Touch <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>

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

export default FeaturedProjects;
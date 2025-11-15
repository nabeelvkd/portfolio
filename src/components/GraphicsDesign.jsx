import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Code } from 'lucide-react';

// --- BASE GALLERY DATA (10 Unique Items) ---
const baseDesignData = [

    { id: 3, image: 'https://i.ibb.co/4Rwr00yL/kpl-kwpl-kerala-logodesign-poster-graphicdesign-posterdesign.jpg' },
    { id: 4, image: 'https://i.ibb.co/7dzw5zvM/463040259-1232481484660760-1009524893090421400-n.jpg' },
    { id: 5, image: 'https://i.ibb.co/bgMmydj2/502063739-17990037812814572-4034309491166415629-n.webp' },
    { id: 6, image: 'https://i.ibb.co/Mx9SkhSN/p6.jpg' },
    { id: 7, image: 'https://i.ibb.co/DPb2snY9/To-win-you-have-to-score-one-more-goal-than-your-opponent-Johan-Cruyff-Hey-football-fanat.jpg' },
    { id: 8, image: 'https://i.ibb.co/mVPNV1V1/kpl-kwpl-kerala-logodesign-poster-graphicdesign-posterdesign-1.jpg' },
    { id: 10, image: 'https://i.ibb.co/7NZR92XY/image.jpg' },
];

// Duplicate the set for seamless looping
const designTrack = [...baseDesignData, ...baseDesignData.map(item => ({ ...item, id: item.id + baseDesignData.length }))];

// --- PARTNER DATA ---
const partnerLogos = [
    { id: 101, name: 'Lysiebug', image: 'https://i.ibb.co/chNdDqy1/Logo-1.png' },
    { id: 102, name: 'Lollice', image: 'https://i.ibb.co/21z8h2Fn/lollice-2-removebg-preview.png' },
    { id: 103, name: 'teamHash', image: 'https://i.ibb.co/pBws42sY/teamhash.png' },
    { id: 104, name: 'Brand Y', image: 'https://i.ibb.co/Rk6dsvq3/lgp.png' },
    { id: 105, name: 'Hagiya', image: 'https://i.ibb.co/GQXL5dfh/hagiya-removebg-preview.png' },
];

// --- GALLERY TRACK COMPONENT ---
function GalleryTrack({ trackData, duration }) {
    const durationStyle = { '--duration': `${duration}s` };

    return (
        <div
            className={`w-[200%] flex flex-nowrap gap-4 md:gap-10 py-3 transition-all duration-300 animate-scroll-left items-center`}
            style={durationStyle}
        >
            {trackData.map((item, index) => {
                // Apply vertical offset for the wave effect
                const offset = (index % 2 === 0)
                    // Use a slightly smaller offset to prevent clipping in the main container
                    ? 'translate-y-10 md:translate-y-12'
                    : '-translate-y-10 md:-translate-y-12';

                return (
                    <div
                        key={item.id}
                        // Outer container determines the wave offset, inner div holds the image
                        className={`flex-shrink-0 w-60 h-80 md:w-[400px] md:h-[500px] transition-transform duration-700 ${offset}`}
                    >
                        <div className="w-full h-full rounded-lg overflow-hidden relative group">
                            {/* FIX: Using object-cover to ensure no letterboxing, accepting slight crop if aspect ratio is way off */}
                            <img
                                src={item.image}
                                alt={`Design Work ${item.id}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x500/1e1e1e/FFFFFF?text=Error+Loading"; }}
                            />
                            {/* Subtle border and hover effect */}
                            <div className="absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none transition-colors duration-300 group-hover:border-white/30"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --- MAIN GRAPHICS PORTFOLIO COMPONENT ---
function GraphicsPortfolio() {
    // Set a base duration (Desktop speed)
    const desktopDuration = 20;

    return (
        <div className="bg-black text-white py-32 px-4 relative overflow-hidden min-h-[700px]">

            <div className="max-w-7xl mx-auto relative z-10 mb-16">

                {/* Header (Left-aligned) */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <Palette className="w-4 h-4 text-white/60 animate-pulse" />
                        <span className="text-sm text-white/60 font-medium tracking-wider uppercase">Creative Showcase</span>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none">
                        Design Portfolio
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent mb-8"></div>
                    <p className="text-xl text-gray-500 max-w-3xl">
                        A dynamic, flowing stream of graphics design works, illustrating creative proficiency alongside technical skills.
                    </p>
                </div>
            </div>

            {/* --- AUTO-SCROLLING WAVE GALLERY CONTAINER --- */}
            {/* The primary viewport container */}
            <div className="relative overflow-hidden w-full h-[450px] md:h-[650px] flex items-center mb-24">

                {/* Track 1: Scrolls Left with Wave Effect */}
                <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <GalleryTrack
                        trackData={designTrack}
                        duration={desktopDuration}
                    />
                </div>

                {/* Fade overlays for the edges */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 inset-y-0 w-1/12 bg-gradient-to-r from-black to-transparent"></div>
                    <div className="absolute right-0 inset-y-0 w-1/12 bg-gradient-to-l from-black to-transparent"></div>
                </div>
            </div>

            {/* --- PARTNERS/CLIENTS LOGO BAR --- */}
            <div className="max-w-7xl mx-auto relative z-10">
                <h3 className="text-xl font-semibold text-white/80 mb-8 uppercase text-center">
                    Clients & Featured Partnerships
                </h3>
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {partnerLogos.map(partner => (
                        <img
                            key={partner.id}
                            src={partner.image}
                            alt={`${partner.name} logo`}
                            className="h-8 md:h-10 lg:h-12 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 cursor-pointer"
                        />
                    ))}
                </motion.div>

                {/* Decorative separator line */}
                <div className="w-full h-px bg-white/10 mt-12 mx-auto"></div>
            </div>


            {/* --- CSS KEYFRAMES --- */}
            <style>{`
                @keyframes scroll-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-scroll-left {
                    animation: scroll-left var(--duration) linear infinite;
                }
                
                /* Base (Desktop) Duration */
                .animate-scroll-left {
                    --duration: ${desktopDuration}s; 
                }

                /* FIX: Faster Mobile Duration */
                @media (max-width: 768px) {
                    .animate-scroll-left {
                        --duration: 30s; /* Much faster scroll for smaller screens */
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}

export default GraphicsPortfolio;
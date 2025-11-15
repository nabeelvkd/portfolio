import React from 'react';
import { motion } from 'framer-motion';
// Import new social icons
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Twitter, Facebook, MessageSquare } from 'lucide-react'; 

// --- CONTACT DATA (Extracted from Resume) ---
const contactData = {
    name: 'Muhammed Nabeel',
    email: 'mhdnabeel91@gmail.com',
    phone: '+91 9496085317',
    location: 'Calicut, India',
    linkedin: 'https://linkedin.com/in/nabeel-muhammed-7a089a220', 
    github: 'https://github.com/nabeelvkd', 
    instagram: 'https://www.instagram.com/mhd.nabeeel?igsh=MWRiOThieWZpMm50bg==', // New Placeholder
    x: '#', // New Placeholder for X (Twitter)
    facebook: 'https://www.facebook.com/mohdnabeel.vkd', // New Placeholder
    whatsapp: 'https://api.whatsapp.com/send/?phone=919496085317', // New Placeholder
};

// --- Footer Link Component (Modified) ---
function FooterLink({ Icon, label, href, isSocial = false }) {
    // Determine the target for WhatsApp/Phone (if not a standard URL)
    const effectiveHref = label === 'WhatsApp' ? `https://wa.me/${contactData.phone.replace(/[^+\d]/g, '')}` : href;

    return (
        <motion.a
            href={effectiveHref}
            target={isSocial ? "_blank" : "_self"}
            rel={isSocial ? "noopener noreferrer" : undefined}
            // Add title for accessibility on icon-only links
            title={isSocial ? label : undefined}
            className="flex items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-white group"
            // Updated hover animation
            whileHover={isSocial ? { scale: 1.1, y: -2 } : { x: 5 }}
        >
            <div className="p-2 rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:bg-white/15">
                <Icon className="w-5 h-5 text-white/70 group-hover:text-white" />
            </div>
            {/* --- MODIFICATION: Only show label if NOT social --- */}
            {!isSocial && (
                <span className="text-lg font-medium">
                    {label}
                </span>
            )}
        </motion.a>
    );
}

// --- MAIN FOOTER COMPONENT ---
function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 text-white py-16 px-4 relative overflow-hidden">
            {/* Background elements (subtle noise/grid pattern) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- TOP SECTION: Intro & Contact --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-white/10 pb-12">
                    
                    {/* Column 1: Introduction & Copyright */}
                    <div className="lg:col-span-1">
                        <motion.h3 
                            className="text-4xl font-bold mb-4"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {contactData.name}
                        </motion.h3>
                        <p className="text-gray-500 mb-6">
                            Power System Modelling Engineer, TNEI Group (IPSA).


                        </p>
                        
                    </div>

                    {/* Column 2: Contact Details */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">
                            Get in Touch
                        </h4>
                        <div className="space-y-4">
                            <FooterLink 
                                Icon={Mail} 
                                label={contactData.email} 
                                href={`mailto:${contactData.email}`} 
                            />
                            <FooterLink 
                                Icon={Phone} 
                                label={contactData.phone} 
                                href={`tel:${contactData.phone.replace(/[^+\d]/g, '')}`} 
                            />
                            {/* Non-link location item */}
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="p-2 rounded-full border border-white/10 bg-white/5">
                                    <MapPin className="w-5 h-5 text-white/70" />
                                </div>
                                <span className="text-lg font-medium">{contactData.location}</span> 
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- NEW BOTTOM SECTION: Social Media Links --- */}
                <div className="mt-12">
                    <h4 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider text-center">
                        Connect Online
                    </h4>
                    {/* Horizontal, centered flex container */}
                    <div className="flex flex-row flex-wrap items-center justify-center gap-6">
                        <FooterLink 
                            Icon={Linkedin} 
                            label="LinkedIn"
                            href={contactData.linkedin} 
                            isSocial
                        />
                        <FooterLink 
                            Icon={Github} 
                            label="GitHub"
                            href={contactData.github} 
                            isSocial
                        />
                        <FooterLink 
                            Icon={Instagram} 
                            label="Instagram"
                            href={contactData.instagram} 
                            isSocial
                        />
                        <FooterLink 
                            Icon={Twitter} 
                            label="X (Twitter)"
                            href={contactData.x} 
                            isSocial
                        />
                        <FooterLink 
                            Icon={Facebook} 
                            label="Facebook"
                            href={contactData.facebook} 
                            isSocial
                        />
                        <FooterLink 
                            Icon={MessageSquare} 
                            label="WhatsApp"
                            href={contactData.whatsapp} 
                            isSocial
                        />
                    </div>
                </div>

                {/* --- Final Copyright Line --- */}
                <div className="mt-12 text-center text-sm text-gray-600">
                   <p className="text-sm text-gray-600">
                            &copy; {new Date().getFullYear()} Muhammed Nabeel. All Rights Reserved.
                        </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
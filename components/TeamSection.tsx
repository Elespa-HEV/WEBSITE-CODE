"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

const directors = [
  {
    name: "Prathamesh Choudhary",
    role: "Director",
    photo: "/assets/prathemesh.jpeg",
    shortBio: "BE Mechanical & MBA from SPPU, Pune. 5+ years in automotive design, testing & marketing. 12 State, 8 National, and 1 International Award winner.",
    fullBio: `BE Mechanical Engineer & MBA in Marketing and Operations & Supply Chain Management from SPPU, Pune. 5+ years in automotive design, testing, marketing, and supply chain strategies. Won around 12 State Awards, 8 National Awards and 1 International Award. Featured as the cover page of CEO Insights Magazine among all Shortlisted "TOP 10 Best Startup CEO's in 2022". He is the only innovator cum entrepreneur who brought forward the concept of Hybrid Electric Scooters/Mopeds/Bikes into the market. His vision has been to electrify India by converting existing vehicles into Hybrid Electric Vehicles, thereby reducing pollution and consumption of fossil fuels.`,
  },
  {
    name: "Sagar Naikwadi",
    role: "Director",
    photo: "/assets/sagar.jpeg",
    shortBio: "8+ years in hybrid cooling & automotive sector. BE E&TC (Pune) + MS IC Design (HKUST). IT & Fintech business development expertise.",
    fullBio: `An accomplished engineering and business professional with over eight years of expertise in energy-saving solutions for hybrid cooling and the automotive sector. With a strong background in electronic hardware and software technologies, he has consistently delivered innovative solutions that merge technical excellence with sustainable impact. In addition, he brings more than four years of experience in IT and Fintech business development, where he has led software proof-of-concepts, business models, and marketing strategies. Holding a Bachelor's degree in Electronics and Telecommunications Engineering from the University of Pune and a Master's in Integrated Circuit Design Engineering from the Hong Kong University of Science and Technology, Mr. Naikwadi combines global perspective with entrepreneurial vision.`,
  },
  {
    name: "Nitin Choudhary",
    role: "Director",
    photo: "/assets/nitin.png",
    shortBio: "BE Civil Engineer with 20+ years in large-scale project execution. Former Kumar Properties, Kolte Patil, DSK Developers.",
    fullBio: `BE Civil engineer with 20+ years of experience in large-scale project execution and infrastructure development. He has worked with reputed organizations such as Kumar Properties, Kolte Patil Developers, and DSK Developers, delivering complex residential and commercial projects. At ELESPA HEV, his role will be instrumental in building scalable manufacturing infrastructure, streamlining operations, and executing large-scale deployment strategies. His deep understanding of execution dynamics, vendor coordination, and on-ground project management will significantly strengthen our transition from prototype development to mass manufacturing.`,
  },
  {
    name: "Rajesh Kulkarni",
    role: "Director",
    photo: "/assets/Picture1.png",
    shortBio: "30+ years of entrepreneurship. Founder Director of Bhaskaren Energies India. Clean energy & DPDP compliance specialist.",
    fullBio: `Entrepreneur and sustainability advocate focused on clean energy and responsible technology innovation, with 30+ years of entrepreneurship experience. Founder Director of Bhaskaren Energies India Private Limited, a renewable energy enterprise advancing next-generation Compressed Biogas (CBG) and Liquefied Biogas (LBG) technologies. Also serves as Director of Privacy Global, a division of Green Point Global, working in Digital Personal Data Protection (DPDP) compliance, consent management, and Governance, Risk, and Compliance (GRC) advisory.`,
  },
  {
    name: "Mahendra Kumar Singh",
    role: "Director",
    photo: "/assets/Picture2.png",
    shortBio: "20+ years in energy sector. PGDM Energy (MDI Gurgaon), dual MS-MBA (SNHU, USA). Former MNGL, Think Gas, Great Eastern Energy.",
    fullBio: `Energy sector professional with over 20 years of experience across natural gas infrastructure, city gas distribution (CGD), business development, and energy market strategy. Holds a PGDM in Energy & Marketing from MDI Gurgaon and a dual MS-MBA (IT & Marketing) from SNHU, USA. Held senior leadership roles at MNGL (a JV of GAIL India and BPCL), Think Gas Distribution, Great Eastern Energy, and Gasonet Services.`,
  },
];

export default function TeamSection() {
  const [expandedDirector, setExpandedDirector] = useState<number | null>(null);

  return (
    <section id="team" className="bg-[#0a0a0c] text-white relative overflow-hidden py-20 lg:py-32">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(245,183,0,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Leadership
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight"
          >
            Our Core Team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-[16px] max-w-lg mx-auto leading-relaxed"
          >
            Five directors driving India&apos;s hybrid mobility revolution with decades of combined expertise.
          </motion.p>
        </div>

        {/* Director Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {directors.map((director, i) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div
                className="relative rounded-2xl overflow-hidden bg-[#111] border border-white/[0.06] hover:border-[var(--accent-yellow)]/30 transition-all duration-500 cursor-pointer"
                onClick={() => setExpandedDirector(i)}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={director.photo}
                    alt={`${director.name} — ${director.role}, ELESPA HEV`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--accent-yellow)]/0 group-hover:bg-[var(--accent-yellow)]/5 transition-colors duration-300" />
                </div>

                {/* Info */}
                <div className="p-5 -mt-12 relative z-10">
                  <h3 className="font-display font-bold text-[16px] text-white mb-1 leading-tight">
                    {director.name}
                  </h3>
                  <p className="text-[var(--accent-yellow)] text-[12px] font-semibold tracking-wider uppercase mb-3">
                    {director.role}
                  </p>
                  <p className="text-white/40 text-[12px] leading-relaxed line-clamp-3">
                    {director.shortBio}
                  </p>

                  {/* Read more indicator */}
                  <div className="flex items-center gap-1 mt-4 text-[var(--accent-yellow)] text-[11px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read Bio</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Bio Modal */}
      <AnimatePresence>
        {expandedDirector !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setExpandedDirector(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-[#111] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setExpandedDirector(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close bio"
              >
                <X size={18} className="text-white/60" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="md:w-[40%] flex-shrink-0">
                  <div className="aspect-[3/4] md:h-full">
                    <img
                      src={directors[expandedDirector].photo}
                      alt={`${directors[expandedDirector].name} — ${directors[expandedDirector].role}`}
                      className="w-full h-full object-cover object-top rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1">
                  <div className="mb-6">
                    <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2">
                      {directors[expandedDirector].name}
                    </h3>
                    <p className="text-[var(--accent-yellow)] text-[13px] font-bold tracking-wider uppercase">
                      {directors[expandedDirector].role}
                    </p>
                  </div>

                  <div className="w-12 h-[2px] bg-[var(--accent-yellow)]/30 mb-6" />

                  <p className="text-white/60 text-[14px] leading-[1.8] whitespace-pre-line">
                    {directors[expandedDirector].fullBio}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

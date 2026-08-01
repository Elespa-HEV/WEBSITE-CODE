"use client";

import React from "react";
import { motion } from "framer-motion";

const advisors = [
  { name: "Dr. Reji Mathai", org: "ARAI Director", photo: "/assets/Picture1.png" },
  { name: "Sudeep Ambare", org: "ARAI-AMTIF CEO", photo: "/assets/Picture2.png" },
  { name: "Pratima Kirloskar", org: "Kirloskar Brothers Limited", photo: "/assets/Picture3.png" },
  { name: "Priya Philip", org: "Interics Designs MD & Founder", photo: "/assets/Picture4.png" },
  { name: "Shreeyash Kolhapure", org: "Sandvik Coromant, Global Head", photo: "/assets/Picture5.png" },
  { name: "Shailendra Bhandare", org: "Khaitan & Co., Director", photo: "/assets/Picture6.png" },
  { name: "Dr. Pradeep Patil", org: "Principal, JSCOE", photo: "/assets/Picture7.png" },
  { name: "Rajeev Khade", org: "Sigma Electric, VP & Global Head of IT", photo: "/assets/Picture8.png" },
];

export default function AdvisorsGrid() {
  return (
    <section className="bg-[#111] text-white relative overflow-hidden py-20 lg:py-28">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Guidance
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4 tracking-tight"
          >
            Our Advisors &amp; Mentors
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-[15px] max-w-md mx-auto"
          >
            Industry leaders and innovators guiding ELESPA&apos;s mission forward.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {advisors.map((advisor, i) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-2 border-white/[0.06] group-hover:border-[var(--accent-yellow)]/30 transition-colors duration-500">
                <img
                  src={advisor.photo}
                  alt={`${advisor.name} — ${advisor.org}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </div>

              {/* Info */}
              <h3 className="font-display font-bold text-[14px] text-white mb-1 leading-tight">
                {advisor.name}
              </h3>
              <p className="text-white/35 text-[11px] font-medium leading-snug max-w-[160px]">
                {advisor.org}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

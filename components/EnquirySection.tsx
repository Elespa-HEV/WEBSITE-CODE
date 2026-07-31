"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, MessageCircle, ChevronDown, CheckCircle } from "lucide-react";

const enquiryTypes = ["Service", "Investor", "Installation", "Retrofitting Kits", "Other"];

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    enquiryType: "",
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="enquiry" className="bg-[#FAFAFA] text-[#0A0A0A] relative overflow-hidden py-20 lg:py-32">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-18">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Get In Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4 tracking-tight text-[#0A0A0A]"
          >
            Enquiry
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#525252] text-[16px] max-w-lg mx-auto"
          >
            Interested in our hybrid technology? Have questions about retrofitting? We&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Enquiry Type */}
              <div className="relative">
                <label htmlFor="enquiryType" className="block text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-2">
                  Enquiry Type
                </label>
                <div className="relative">
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0A0A0A] font-medium focus:outline-none focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/20 transition-all cursor-pointer"
                  >
                    <option value="">Select enquiry type</option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#525252] pointer-events-none" />
                </div>
              </div>

              {/* Name + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0A0A0A] font-medium placeholder:text-[#aaa] focus:outline-none focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0A0A0A] font-medium placeholder:text-[#aaa] focus:outline-none focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-2">
                  Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0A0A0A] font-medium placeholder:text-[#aaa] focus:outline-none focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/20 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0A0A0A] font-medium placeholder:text-[#aaa] focus:outline-none focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--accent-yellow)] text-[#0A0A0A] font-bold text-[15px] px-10 py-4 rounded-full hover:bg-[#e6a800] transition-colors duration-300 shadow-lg shadow-[var(--accent-yellow)]/20"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Enquiry
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <a href="mailto:enquiry@elespa.in" className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-[var(--accent-yellow)]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-yellow)]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[var(--accent-yellow)]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-1">Email</p>
                  <p className="text-[15px] font-semibold text-[#0A0A0A] group-hover:text-[var(--accent-yellow)] transition-colors">enquiry@elespa.in</p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+917498378219" className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-[var(--accent-yellow)]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-yellow)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[var(--accent-yellow)]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-1">Phone</p>
                  <p className="text-[15px] font-semibold text-[#0A0A0A] group-hover:text-[var(--accent-yellow)] transition-colors">+91 74983 78219</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-black/[0.06]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-yellow)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[var(--accent-yellow)]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#525252] tracking-wider uppercase mb-1">Office</p>
                  <p className="text-[14px] font-medium text-[#525252] leading-relaxed">
                    ELESPA Office, B Wing, JSCOE,<br />
                    Handewadi, Satar Nagar, Hadapsar,<br />
                    Pune, Maharashtra 411028
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917498378219"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[15px] transition-all duration-300 shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8!2d73.94!3d18.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI5JzAyLjgiTiA3M8KwNTYnMjQuMCJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ELESPA HEV Office Location — Hadapsar, Pune"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

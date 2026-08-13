"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#team" },
  { label: "Products", href: "#products" },
  { label: "Teams", href: "#team" },
  { label: "Our Mission", href: "#mission" },
  { label: "Enquiry", href: "#enquiry" },
  { label: "Blog", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent-yellow)]/20 to-transparent" />

      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/assets/elespa_logo_cropped.png"
                alt="ELESPA HEV"
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-xs mb-8">
              Bridging the gap between ICE vehicles and full EVs. India&apos;s first plug-in parallel hybrid electric two-wheeler technology.
            </p>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/917498378219"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] text-[13px] font-bold hover:text-[#20bd5a] transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[12px] font-bold text-white/40 tracking-[0.15em] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-[14px] hover:text-[var(--accent-yellow)] transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[12px] font-bold text-white/40 tracking-[0.15em] uppercase mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:elespahev@gmail.com" className="text-white/60 text-[14px] hover:text-[var(--accent-yellow)] transition-colors">
                  elespahev@gmail.com
                </a>
              </div>
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Phone</p>
                <a href="tel:+917498378219" className="text-white/60 text-[14px] hover:text-[var(--accent-yellow)] transition-colors">
                  +91 74983 78219
                </a>
              </div>
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Office</p>
                <p className="text-white/40 text-[13px] leading-relaxed">
                  ELESPA Office, B Wing, JSCOE,
                  Handewadi, Satav Nagar, Hadapsar,
                  Pune, MH 411028
                </p>
              </div>
            </div>
          </div>

          {/* CTA Column */}
          <div>
            <h4 className="text-[12px] font-bold text-white/40 tracking-[0.15em] uppercase mb-6">
              Join The Movement
            </h4>
            <p className="text-white/40 text-[13px] leading-relaxed mb-6">
              Be part of India&apos;s hybrid mobility revolution. Whether you&apos;re a rider, investor, or dealer — let&apos;s build the future together.
            </p>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 bg-[var(--accent-yellow)] text-[#0A0A0A] font-bold text-[13px] px-6 py-3 rounded-full hover:bg-[#e6a800] transition-colors shadow-lg shadow-[var(--accent-yellow)]/10"
            >
              Get Started
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px]">
            © 2026 ELESPA HEV Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 text-[12px] hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/25 text-[12px] hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

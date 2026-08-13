"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import SpecularButton from "./ui/SpecularButton";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology-modes" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#team" },
  { label: "Contact", href: "#enquiry" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Active Link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section with highest intersection ratio
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const targetId = `#${visibleSection.target.id}`;
          const currentLink = NAV_LINKS.find((link) => link.href === targetId);
          if (currentLink) {
            setActiveLink(currentLink.label);
          }
        }
      },
      {
        rootMargin: "-100px 0px -40% 0px", // adjust to trigger active state accurately
        threshold: 0,
      }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActiveLink(label);
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // 60px offset: element lands 60px from viewport top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 60;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: "rgba(10, 10, 10, 0)", borderBottomColor: "rgba(255, 255, 255, 0)" }}
        animate={{
          backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.8)" : "rgba(10, 10, 10, 0)",
          borderBottomColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-[80px] z-50 flex items-center border-b"
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <span className="[font-family:var(--font-syncopate)] font-bold tracking-widest text-xl text-white italic">
              ELESPA
            </span>
            <span className="[font-family:var(--font-syncopate)] text-[10px] tracking-[0.2em] text-white/80 mt-1 uppercase">
              HEV
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12 lg:gap-16">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative pb-1">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`text-[13px] font-medium transition-colors ${
                    activeLink === link.label ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
                {activeLink === link.label && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent-yellow)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 z-50">
            <div className="hidden sm:block">
              <a href="https://www.instagram.com/elespa_hev/?hl=en" target="_blank" rel="noopener noreferrer">
                {/* @ts-ignore */}
                <SpecularButton
                  size="sm"
                  radius={999}
                  tint="#ffffff"
                  tintOpacity={0}
                  blur={0}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#333333"
                  intensity={1}
                  shineSize={30}
                  shineFade={40}
                  thickness={2}
                  speed={0.5}
                  followMouse={true}
                  proximity={250}
                  autoAnimate={false}
                  className="font-medium text-sm !px-6 py-2 group cursor-pointer"
                >
                  <div className="flex items-center">
                    Join the Movement
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </SpecularButton>
              </a>
            </div>
            <button
              className="text-white p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className={`text-4xl font-display font-bold ${activeLink === link.label ? "text-[var(--accent-yellow)]" : "text-white"}`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Button variant="primary" className="group">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

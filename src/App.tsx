/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book3D } from "./components/Book3D";
import { Particles } from "./components/Particles";
import { 
  Feather, 
  Sparkles, 
  BookOpen, 
  Book,
  Compass, 
  Heart, 
  Camera, 
  Eye, 
  User, 
  Mail, 
  Send, 
  X, 
  Plus, 
  ExternalLink,
  Sunset,
  Clock,
  Flame,
  Check,
  Palette,
  ArrowRight,
  Code,
  Menu
} from "lucide-react";

import { NOVELS, POEMS, ARTPIECES, BLOGPOSTS } from "./data";
import { Novel, Poem, Artpiece, Blogpost } from "./types";
import Hero from "./components/Hero";
import About from "./components/About";
import ChapterReader from "./components/ChapterReader";
import ArticleReader from "./components/ArticleReader";

interface WpTemplateBlockProps {
  filename: string;
  templateTag: string;
  active: boolean;
  onInspect: () => void;
  children: ReactNode;
}

function WpTemplateBlock({ children }: WpTemplateBlockProps) {
  return <>{children}</>;
}

export default function App() {
  const wpDevMode = false;
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"all" | "novels" | "poetry" | "art" | "photography">("all");
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [selectedArt, setSelectedArt] = useState<Artpiece | null>(null);
  const [readerNovel, setReaderNovel] = useState<Novel | null>(null);
  const [readPost, setReadPost] = useState<Blogpost | null>(null);
  const [heroNovelIndex, setHeroNovelIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  


  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterResult, setNewsletterResult] = useState<{ success: boolean; message: string } | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(147);

  // Contact States
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", category: "Collaborazione" });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Scroll tracking for header dynamism
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load subscriptions on init
  useEffect(() => {
    // Fetch subscriber count
    fetch("/api/newsletter/count")
      .then(res => res.json())
      .then(data => {
        if (data && data.count) setSubscriberCount(data.count);
      })
      .catch(() => {});
  }, []);



  // Newsletter action
  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterResult(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await response.json();
      setNewsletterResult(data);
      if (data.success) {
        setNewsletterEmail("");
        // trigger counter refresh
        fetch("/api/newsletter/count")
          .then(res => res.json())
          .then(d => d.count && setSubscriberCount(d.count))
          .catch(() => {});
      }
    } catch (error) {
      setNewsletterResult({ success: false, message: "Connessione problematica. L'Archivio dorme temporaneamente." });
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", email: "", message: "", category: "Collaborazione" });
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-midnight font-sans overflow-x-hidden select-none md:select-text">
      {/* Decorative grain backdrop */}
      <div className="fixed inset-0 paper-grain pointer-events-none opacity-40 z-50" />
      <Particles />

      {/* Aesthetic Top Navigation Bar wrapped in WP Header block */}
      <WpTemplateBlock 
        filename="header.php" 
        templateTag="<?php get_header(); ?>" 
        active={wpDevMode} 
        onInspect={() => { setWpActiveFile("header.php"); setWpStudioOpen(true); }}
      >
        <header 
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
            scrolled 
              ? "bg-midnight/62 backdrop-blur-lg border-b border-gold-accent/20 shadow-[0_8px_32px_rgba(2,4,8,0.25)]" 
              : "bg-midnight/25 backdrop-blur-md border-b border-ivory/5"
          }`}
        >
          {/* Main Header Row (Selected Element Container) */}
          <div 
            className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ease-in-out ${
              scrolled ? "h-14 sm:h-16" : "h-20"
            }`}
          >
            <button 
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-3 cursor-pointer text-left focus:outline-hidden"
            >
              {/* Elegant Minimalist Quill Logo Mark */}
              <div className="relative w-9 h-9 rounded-full border border-gold-accent/30 bg-[#070e1b] flex items-center justify-center transition-all duration-500 group-hover:border-gold-bright group-hover:scale-105 shadow-[0_0_12px_rgba(197,168,128,0.1)] group-hover:shadow-[0_0_18px_rgba(197,168,128,0.25)]">
                {/* Inner subtle glow */}
                <div className="absolute inset-1 rounded-full bg-radial-gradient from-gold-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Feather className="w-4 h-4 text-gold-accent group-hover:text-gold-bright transform -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                
                {/* Status orbit beacon pin */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-midnight border border-gold-accent/40 flex items-center justify-center">
                  <span className="w-1 h-1 bg-gold-bright rounded-full animate-pulse" />
                </span>
              </div>
            </button>

            {/* Nav links with dynamic indicators */}
            <nav className="hidden md:flex items-center gap-8 font-serif text-sm tracking-wide">
              {[
                { id: "introduce", label: "L'Autore" },
                { id: "portali", label: "Portali Universali" },
                { id: "blog", label: "Riflessioni" },
                { id: "contatti", label: "Scrivimi" }
              ].map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)} 
                  className="relative py-1 cursor-pointer transition duration-300 group text-gold-accent/80 hover:text-ivory"
                >
                  <span>{link.label}</span>
                  {/* Dynamic custom highlight underline */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </button>
              ))}
            </nav>

            {/* Right spacer for centering (desktop) */}
            <div className="hidden md:block w-9" />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gold-accent hover:text-gold-bright transition-colors focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl border-b border-gold-accent/20 md:hidden flex flex-col px-8 overflow-hidden shadow-2xl z-40"
              >
                <div className="py-6 flex flex-col gap-6">
                  {[
                    { id: "introduce", label: "L'Autore" },
                    { id: "portali", label: "Portali Universali" },
                    { id: "blog", label: "Riflessioni" },
                    { id: "contatti", label: "Scrivimi" }
                  ].map((link) => (
                    <button 
                      key={link.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToSection(link.id);
                      }} 
                      className="text-left font-display text-lg tracking-widest uppercase text-gold-accent hover:text-ivory transition duration-300 w-fit"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic scroll progress indicator */}
          <div 
            className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-gold-accent/20 via-gold-bright to-gold-accent/20 transition-all duration-100 ease-out" 
            style={{ width: `${scrollProgress}%` }} 
          />
        </header>
      </WpTemplateBlock>

      {/* Main Container */}
      <main>
        
        {/* 1. Hero View wrapped in Content Hero block */}
        <WpTemplateBlock 
          filename="template-parts/content-hero.php" 
          templateTag="<?php get_template_part('template-parts/content-hero'); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("index.php"); setWpStudioOpen(true); }}
        >
          <Hero 
            onExploreClick={() => scrollToSection("introduce")} 
            onNovelClick={setReaderNovel} 
            currentIndex={heroNovelIndex}
            setCurrentIndex={setHeroNovelIndex}
          />
        </WpTemplateBlock>

        {/* 2. Manifesto Introduction wrapped in Content About block */}
        <WpTemplateBlock 
          filename="template-parts/content-about.php" 
          templateTag="<?php get_template_part('template-parts/content-about'); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("index.php"); setWpStudioOpen(true); }}
        >
          <About />
        </WpTemplateBlock>

        {/* 3. Portals and Galleries Section wrapped in single-romanzo.php */}
        <WpTemplateBlock 
          filename="single-romanzo.php" 
          templateTag="<?php if (have_posts()) : the_post(); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("single-romanzo.php"); setWpStudioOpen(true); }}
        >
          <section id="portali" className="relative py-24 bg-gradient-to-b from-[#081119] to-midnight overflow-hidden">
            <div className="absolute inset-0 paper-grain opacity-40 pointer-events-none" />
          
          {/* Dynamic Floating Arcana/Cosmo Elements resembling the intro section */}
          <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`portal-bg-${i}`}
                className="absolute rounded-full bg-cyan-500/5 sm:bg-gold-accent/10 blur-2xl"
                animate={{
                  x: [0, Math.cos(i) * 60, Math.sin(i) * -40, 0],
                  y: [0, Math.sin(i) * -60, Math.cos(i) * 50, 0],
                  scale: [1, 1.15, 0.9, 1],
                  opacity: [0.1, 0.35, 0.15, 0.1]
                }}
                transition={{
                  duration: 22 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: `${120 + i * 50}px`,
                  height: `${120 + i * 50}px`,
                  right: `${5 + i * 18}%`,
                  bottom: `${10 + i * 15}%`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold-accent block mb-2">Pagine Svelate</span>
              <h2 className="text-3xl md:text-5xl font-display text-ivory tracking-wider uppercase mb-3">Portali Universali</h2>
              
              {/* Double underline from the drawing */}
              <div className="flex flex-col items-center gap-[3px] mb-6 select-none pointer-events-none">
                <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-accent/70 to-transparent" />
                <div className="h-[1.5px] w-36 bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent" />
              </div>

              <p className="text-sm font-serif italic text-gold-accent/60 max-w-lg mx-auto">Ogni porta apre una piega della realtà di Frammenti d'Inchiostro. Immergiti nei sussurri dell'autore.</p>
              
              {/* Gothic Arched Portals (Interactive Categories) */}
              <div className="mt-12 flex flex-col items-center gap-6 md:gap-8 max-w-3xl mx-auto">
                {/* Row 1: Romanzi, Poesia, Arte */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16">
                  {[
                    { id: "novels", label: "Romanzi", icon: Book },
                    { id: "poetry", label: "Poesia", icon: Feather },
                    { id: "art", label: "Arte", icon: Palette }
                  ].map((portal) => (
                    <motion.button
                      key={portal.id}
                      onClick={() => setActiveTab(portal.id as any)}
                      className="group flex flex-col items-center focus:outline-hidden cursor-pointer relative"
                      whileHover={{ y: -8, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      {/* SURROUNDING ELEMENTS: Rotating Astrolabe/Compass Wheel behind the arch */}
                      <div className={`absolute -top-3 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold-accent/20 border-dashed pointer-events-none transition-all duration-1000 -z-10 ${
                        activeTab === portal.id 
                          ? "opacity-100 scale-110 rotate-180 animate-[spin_30s_linear_infinite]" 
                          : "opacity-0 scale-90 group-hover:opacity-40 group-hover:rotate-45"
                      }`}>
                        <div className="absolute inset-2 rounded-full border border-gold-accent/10 border-dotted" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gold-accent/5" />
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gold-accent/5" />
                      </div>

                      {/* SURROUNDING ELEMENTS: Floating Mystic Dust & Sparks */}
                      {activeTab === portal.id && (
                        <div className="absolute -inset-6 pointer-events-none select-none z-0">
                          {/* Sparkle 1 */}
                          <Sparkles className="absolute -top-2 left-6 w-3.5 h-3.5 text-gold-bright animate-pulse" />
                          {/* Sparkle 2 */}
                          <Sparkles className="absolute bottom-5 -right-2 w-3 h-3 text-gold-accent/80 animate-ping" style={{ animationDuration: '3s' }} />
                          {/* Floating cosmic dust dot */}
                          <span className="absolute top-1/3 -left-3 w-1.5 h-1.5 rounded-full bg-gold-bright/70 animate-bounce" style={{ animationDuration: '2.5s' }} />
                          {/* Subtle extra mini dot */}
                          <span className="absolute -bottom-1 left-2 w-1 h-1 rounded-full bg-gold-accent/50 animate-ping" />
                        </div>
                      )}

                      {/* GOTHIC ARCH PORTAL */}
                      <div className={`w-20 h-28 sm:w-24 sm:h-34 md:w-28 md:h-38 rounded-t-full border transition-all duration-500 relative flex flex-col items-center justify-center overflow-hidden ${
                        activeTab === portal.id
                          ? "border-gold-accent bg-gold-accent/15 shadow-[0_0_26px_rgba(197,168,128,0.4)] scale-105"
                          : "border-gold-accent/20 bg-midnight/55 hover:border-gold-accent/60 hover:bg-gold-accent/5 hover:shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                      }`}>
                        {/* Concentric Inner Arch Line */}
                        <div className={`absolute inset-1.5 rounded-t-full border transition-all duration-500 ${
                          activeTab === portal.id ? "border-gold-accent/45" : "border-transparent group-hover:border-gold-accent/20"
                        }`} />

                        {/* Subtle Floating Nebular Dot in active state */}
                        {activeTab === portal.id && (
                          <div className="absolute top-4 w-12 h-12 bg-gold-accent/15 rounded-full blur-md animate-pulse" />
                        )}

                        {/* Portal Icon with dynamic spin on active to make it extra animated! */}
                        <portal.icon className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-all duration-500 ${
                          activeTab === portal.id 
                            ? "text-gold-bright scale-110 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" 
                            : "text-gold-accent/50 group-hover:text-gold-accent/90"
                        }`} />
                        
                        {/* Mystical baseline marker at the bottom doorjamb */}
                        <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors duration-500 ${
                          activeTab === portal.id ? "bg-gradient-to-r from-transparent via-gold-bright to-transparent" : "bg-transparent"
                        }`} />
                      </div>

                      {/* Literal Human Label from drawing */}
                      <span className={`mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                        activeTab === portal.id ? "text-gold-bright drop-shadow-[0_0_4px_rgba(255,215,0,0.25)] font-semibold" : "text-gold-accent/60 group-hover:text-gold-accent/95"
                      }`}>
                        {portal.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Row 2: Fotografia, Tutti */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16">
                  {[
                    { id: "photography", label: "Fotografia", icon: Camera },
                    { id: "all", label: "Tutti", icon: Compass }
                  ].map((portal) => (
                    <motion.button
                      key={portal.id}
                      onClick={() => setActiveTab(portal.id as any)}
                      className="group flex flex-col items-center focus:outline-hidden cursor-pointer relative"
                      whileHover={{ y: -8, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      {/* SURROUNDING ELEMENTS: Rotating Astrolabe/Compass Wheel behind the arch */}
                      <div className={`absolute -top-3 w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold-accent/20 border-dashed pointer-events-none transition-all duration-1000 -z-10 ${
                        activeTab === portal.id 
                          ? "opacity-100 scale-110 rotate-180 animate-[spin_30s_linear_infinite]" 
                          : "opacity-0 scale-90 group-hover:opacity-40 group-hover:rotate-45"
                      }`}>
                        <div className="absolute inset-2 rounded-full border border-gold-accent/10 border-dotted" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gold-accent/5" />
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gold-accent/5" />
                      </div>

                      {/* SURROUNDING ELEMENTS: Floating Mystic Dust & Sparks */}
                      {activeTab === portal.id && (
                        <div className="absolute -inset-6 pointer-events-none select-none z-0">
                          {/* Sparkle 1 */}
                          <Sparkles className="absolute -top-2 left-6 w-3.5 h-3.5 text-gold-bright animate-pulse" />
                          {/* Sparkle 2 */}
                          <Sparkles className="absolute bottom-5 -right-2 w-3 h-3 text-gold-accent/80 animate-ping" style={{ animationDuration: '3s' }} />
                          {/* Floating cosmic dust dot */}
                          <span className="absolute top-1/3 -left-3 w-1.5 h-1.5 rounded-full bg-gold-bright/70 animate-bounce" style={{ animationDuration: '2.5s' }} />
                          {/* Subtle extra mini dot */}
                          <span className="absolute -bottom-1 left-2 w-1 h-1 rounded-full bg-gold-accent/50 animate-ping" />
                        </div>
                      )}

                      {/* GOTHIC ARCH PORTAL */}
                      <div className={`w-20 h-28 sm:w-24 sm:h-34 md:w-28 md:h-38 rounded-t-full border transition-all duration-500 relative flex flex-col items-center justify-center overflow-hidden ${
                        activeTab === portal.id
                          ? "border-gold-accent bg-gold-accent/15 shadow-[0_0_26px_rgba(197,168,128,0.4)] scale-105"
                          : "border-gold-accent/20 bg-midnight/55 hover:border-gold-accent/60 hover:bg-gold-accent/5 hover:shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                      }`}>
                        {/* Concentric Inner Arch Line */}
                        <div className={`absolute inset-1.5 rounded-t-full border transition-all duration-500 ${
                          activeTab === portal.id ? "border-gold-accent/45" : "border-transparent group-hover:border-gold-accent/20"
                        }`} />

                        {/* Subtle Floating Nebular Dot in active state */}
                        {activeTab === portal.id && (
                          <div className="absolute top-4 w-12 h-12 bg-gold-accent/15 rounded-full blur-md animate-pulse" />
                        )}

                        {/* Portal Icon */}
                        <portal.icon className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-all duration-500 ${
                          activeTab === portal.id 
                            ? "text-gold-bright scale-110 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" 
                            : "text-gold-accent/50 group-hover:text-gold-accent/90"
                        }`} />
                        
                        {/* Mystical baseline marker at the bottom doorjamb */}
                        <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors duration-500 ${
                          activeTab === portal.id ? "bg-gradient-to-r from-transparent via-gold-bright to-transparent" : "bg-transparent"
                        }`} />
                      </div>

                      {/* Literal Human Label from drawing */}
                      <span className={`mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                        activeTab === portal.id ? "text-gold-bright drop-shadow-[0_0_4px_rgba(255,215,0,0.25)] font-semibold" : "text-gold-accent/60 group-hover:text-gold-accent/95"
                      }`}>
                        {portal.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Display based on active tab filtering */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Category 1: Novels Display (Filtered) */}
              {(activeTab === "all" || activeTab === "novels") && (
                <div className="col-span-12 space-y-8">
                  <div className="flex items-center gap-3 border-b border-gold-accent/20 pb-3 mb-6">
                    <Feather className="w-5 h-5 text-gold-accent" />
                    <h3 className="font-display text-lg uppercase tracking-widest text-ivory">Romanzi</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {NOVELS.map((novel, index) => (
                      <motion.div
                        key={novel.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      >
                        <Book3D 
                          novel={novel} 
                          coverUrl={index === 0 ? "/cover-1.jpeg" : index === 1 ? "/cover-2.jpg" : "/cover-3.jpg"} 
                          onRead={() => setReaderNovel(novel)} 
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 2: Poetry "Pensieri Dispersi" */}
              {(activeTab === "all" || activeTab === "poetry") && (
                <div className="col-span-12 space-y-6 mt-12">
                  <div className="flex items-center gap-3 border-b border-gold-accent/20 pb-3 mb-4">
                    <Sparkles className="w-5 h-5 text-gold-accent" />
                    <h3 className="font-display text-lg uppercase tracking-widest text-ivory">Poesie</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {POEMS.map((poem, index) => (
                      <motion.div
                        key={poem.id}
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="p-8 bg-midnight/80 border border-ivory/5 rounded-xs hover:border-gold-accent/30 group transition-all duration-500 relative flex flex-col justify-between shadow-md hover:shadow-xl cursor-default overflow-hidden"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-radial-gradient from-amber-950/10 to-transparent" />
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-accent/50">{poem.category}</span>
                          </div>

                          <h4 className="font-display text-xl text-ivory mb-6 group-hover:text-gold-accent/90 transition duration-300">{poem.title}</h4>

                          <div className="space-y-3 font-serif text-sm text-gold-accent/90 italic pl-3 border-l border-gold-accent/20 leading-relaxed mb-6">
                            {poem.verses.map((verse, index) => (
                              <p key={index}>{verse}</p>
                            ))}
                          </div>
                        </div>

                        {/* No footer buttons here */}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 3 & 4: Visual Art & Photography */}
              {(activeTab === "all" || activeTab === "art" || activeTab === "photography") && (
                <div className="col-span-12 space-y-6 mt-12">
                  <div className="flex items-center gap-3 border-b border-gold-accent/20 pb-3 mb-4">
                    <Camera className="w-5 h-5 text-gold-accent" />
                    <h3 className="font-display text-lg uppercase tracking-widest text-ivory">Arti visive</h3>
                  </div>

                  <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar">
                    {ARTPIECES.filter(art => {
                      if (activeTab === "art") return art.tags.includes("Illustrazione") || art.tags.includes("Simbolismo");
                      if (activeTab === "photography") return art.tags.includes("Fotografia") || art.tags.includes("Venezia");
                      return true;
                    }).map((art, index) => (
                      <motion.div
                        key={art.id}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="w-[85vw] md:w-[320px] shrink-0 snap-start bg-midnight/45 border border-ivory/5 hover:border-gold-accent/30 rounded-xs group transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl cursor-default"
                      >
                        <div className="relative aspect-square bg-[#0b1322] border-b border-ivory/5 flex items-center justify-center overflow-hidden">
                          <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out contrast-[1.15] saturate-[1.1] brightness-[1.05]" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/10 to-transparent opacity-90" />
                          
                          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col text-left space-y-1">
                            <div className="font-display text-xs text-gold-accent tracking-widest uppercase truncate">{art.title}</div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-ivory/70 truncate">{art.medium}</span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex gap-1 mb-2 font-mono text-[9px] text-gold-accent/50 uppercase">
                              {art.tags.map(t => <span key={t} className="bg-forest/20 px-1.5 py-0.5 rounded-sm">#{t}</span>)}
                            </div>
                            
                            <p className="font-sans text-xs text-gold-accent/80 leading-relaxed line-clamp-3">
                              {art.story}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-ivory/5">
                            <button
                              onClick={() => setSelectedArt(art)}
                              className="font-mono text-[10px] text-ivory hover:text-gold-accent uppercase flex items-center gap-1 cursor-pointer transition"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Dettagli &rarr;
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          </section>
        </WpTemplateBlock>

        {/* 5. Emotional Blog / Reflections on Character Psychology wrapped in single-articolo.php */}
        <WpTemplateBlock 
          filename="single-articolo.php" 
          templateTag="<?php if (have_posts()) : while (have_posts()) : the_post(); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("single-articolo.php"); setWpStudioOpen(true); }}
        >
          <section id="blog" className="relative py-24 bg-[#070c18]">
            <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold-accent/70 block mb-2">Tracce d'Inchiostro</span>
                <h2 className="text-3xl md:text-5xl font-display text-ivory tracking-wider uppercase">Riflessioni & Laboratorio</h2>
                <p className="font-serif italic text-sm text-gold-accent/60 mt-3 max-w-xl">Dietro le quinte delle storie: articoli intimi sui meccanismi della suspense e sulla fragilità psicologica delle nostre ombre.</p>
              </div>
              <div className="h-[1px] md:w-1/3 bg-gold-accent/20 mt-4 md:mt-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOGPOSTS.map((post) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="p-8 bg-forest/20 border border-ivory/5 hover:border-gold-accent/30 rounded-xs group transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => setReadPost(post)}
                >
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-ivory mb-4 group-hover:text-gold-accent transition duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-gold-accent/40 uppercase tracking-widest font-semibold mb-4 italic flex gap-1.5 items-center">
                      <Clock className="w-3.5 h-3.5 text-gold-accent/30" />
                      Tempo di lettura: {post.readTime}
                    </p>

                    <p className="font-serif text-sm text-gold-accent/80 italic leading-relaxed mb-4">
                      &ldquo;{post.excerpt}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-ivory/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-accent/35">
                      Frammenti d'Inchiostro Lab
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReadPost(post);
                      }}
                      className="text-xs uppercase tracking-widest font-mono text-[#d9b37c] group-hover:text-gold-bright flex items-center gap-1.5 cursor-pointer transition duration-300 group/btn"
                    >
                      <span>Leggi Articolo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-gold-accent" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          </section>
        </WpTemplateBlock>

        {/* 6. Newsletter Subscription (Archive Invitation) wrapped in functions.php widget support */}
        <WpTemplateBlock 
          filename="functions.php" 
          templateTag="<?php register_sidebar(); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("functions.php"); setWpStudioOpen(true); }}
        >
          <section id="newsletter" className="relative py-24 md:py-32 bg-gradient-to-b from-midnight to-[#050914] overflow-hidden border-t border-ivory/5">
            <div className="absolute inset-0 paper-grain opacity-40 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            
            <div className="w-12 h-12 bg-forest/40 border border-gold-accent/40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Mail className="w-5 h-5 text-gold-accent animate-pulse" />
            </div>

            <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold-accent block mb-2">Accesso Riservato</span>
            <h2 className="text-3xl md:text-5xl font-display text-ivory tracking-wider mb-6">Un'invitazione all'Archivio Segreto</h2>
            
            <p className="font-serif italic text-sm md:text-base text-gold-accent/80 leading-relaxed max-w-xl mx-auto mb-10">
              Non inviamo pubblicità o resoconti asettici. Chi si iscrive all'inchiostro riceve confessioni letterarie segrete, capitoli inediti recapitati di notte, e schizzi di illustrazioni nati sul margine delle pagine.
            </p>

            <form onSubmit={handleNewsletter} className="max-w-md mx-auto mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Inserisci la tua email segreta"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-[#0b1322] border border-gold-accent/30 rounded-sm py-3 px-4 font-serif text-sm text-ivory placeholder-gold-accent/30 focus:border-gold-bright focus:outline-hidden transition shadow-inner"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="px-6 py-3 bg-forest text-gold-accent border border-gold-accent/40 rounded-sm font-mono text-xs uppercase tracking-widest hover:bg-gold-accent hover:text-midnight hover:border-gold-bright transition duration-300 disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2 font-bold overflow-hidden animate-gleam"
              >
                {newsletterLoading ? "Sigillando..." : "Richiedi Accesso"}
              </button>
            </form>

            {newsletterResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs font-mono max-w-md mx-auto p-3 rounded-xs border ${
                  newsletterResult.success 
                    ? "bg-forest/20 border-gold-accent/30 text-gold-accent" 
                    : "bg-red-950/20 border-red-500/20 text-red-300"
                }`}
              >
                {newsletterResult.message}
              </motion.div>
            )}

            <div className="mt-8 font-mono text-[10px] text-gold-accent/40 uppercase tracking-[0.25em]">
              Attualmente custoditi nel registro: <strong>{subscriberCount}</strong> custodi d'inchiostro
            </div>
          </div>
          </section>
        </WpTemplateBlock>

        {/* 7. Minimal/Elegant Contact Form wrapped in template-parts/content-contact.php */}
        <WpTemplateBlock 
          filename="template-parts/content-contact.php" 
          templateTag="<?php get_template_part('template-parts/content-contact'); ?>" 
          active={wpDevMode} 
          onInspect={() => { setWpActiveFile("index.php"); setWpStudioOpen(true); }}
        >
          <section id="contatti" className="relative py-24 bg-midnight border-t border-ivory/5">
            <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Info Column */}
              <div className="md:col-span-5 space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold-accent/70 block">Epistole</span>
                <h2 className="text-3xl md:text-4xl font-display text-ivory tracking-wide uppercase">Apri un Canale d'Intreccio</h2>
                
                <p className="font-serif text-sm text-gold-accent/80 leading-relaxed italic">
                  Sei un editore interessato ai miei labirinti mentali? Un illustratore desideroso di accostare le tue luci alle mie tenebre? O semplicemente un lettore che sente un rintocco familiare nelle mie parole? Mandami un'epistola sigillata. Rispondo sempre di notte.
                </p>

                <div className="space-y-4 pt-4 border-t border-ivory/5 font-mono text-xs text-gold-accent/60">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gold-accent/40" />
                    <span>Autore: Frammenti d'Inchiostro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold-accent/40" />
                    <span>daianavaiani67@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold-accent/40" />
                    <span>Risposta: Entro il sorgere della luna nuova</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="md:col-span-7 bg-forest/10 border border-ivory/5 p-6 md:p-8 rounded-xs shadow-xl">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gold-accent/70 mb-1.5">Il tuo nome d'Inchiostro</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Identità o alias letterario"
                      className="w-full bg-[#0b1322]/80 border border-ivory/10 hover:border-gold-accent/30 rounded-sm py-2.5 px-4 font-serif text-sm text-ivory placeholder-gold-accent/20 focus:border-gold-accent focus:outline-hidden transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gold-accent/70 mb-1.5">Indirizzo per la risposta</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="nome@indirizzo.it"
                        className="w-full bg-[#0b1322]/80 border border-ivory/10 hover:border-gold-accent/30 rounded-sm py-2.5 px-4 font-serif text-sm text-ivory placeholder-gold-accent/20 focus:border-gold-accent focus:outline-hidden transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gold-accent/70 mb-1.5">Oggetto dell'epistola</label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        className="w-full bg-[#0b1322]/80 border border-ivory/10 hover:border-gold-accent/30 rounded-sm py-2.5 px-4 font-serif text-sm text-ivory focus:border-gold-accent focus:outline-hidden cursor-pointer transition"
                      >
                        <option value="Collaborazione">Collaborazione Editoriale</option>
                        <option value="Illustrazione">Progetto di Arti Visive</option>
                        <option value="Lettura">Lettera del Lettore</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gold-accent/70 mb-1.5">Contenuto dell'epistola</label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Scrivi qui i tuoi pensieri..."
                      className="w-full bg-[#0b1322]/80 border border-ivory/10 hover:border-gold-accent/30 rounded-sm py-2.5 px-4 font-serif text-sm text-ivory placeholder-gold-accent/20 focus:border-gold-accent focus:outline-hidden transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-forest border border-gold-accent/30 text-gold-accent hover:bg-gold-accent hover:text-midnight font-mono text-xs uppercase tracking-widest rounded-sm transition duration-300 flex items-center justify-center gap-2 cursor-pointer overflow-hidden animate-gleam"
                  >
                    <Send className="w-4 h-4" />
                    Spedisci Epistola &rarr;
                  </button>

                  <AnimatePresence>
                    {contactSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-forest/30 border border-gold-accent/40 text-gold-accent font-serif text-xs italic text-center rounded-sm"
                      >
                        L'epistola è stata conservata sicuro. Sarà letta con la prima nebbia.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
          </section>
        </WpTemplateBlock>

      </main>



      {/* Footer and Brand copyright statement with navigable menu wrapped in footer.php */}
      <WpTemplateBlock 
        filename="footer.php" 
        templateTag="<?php get_footer(); ?>" 
        active={wpDevMode} 
        onInspect={() => { setWpActiveFile("footer.php"); setWpStudioOpen(true); }}
      >
        <footer className="relative py-16 bg-[#050810] border-t border-ivory/5 text-center text-xs font-mono text-gold-accent/40 uppercase tracking-widest z-10">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Main Footer Navigation Menu */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pb-8 border-b border-ivory/5 max-w-2xl mx-auto">
            {[
              { id: "hero", label: "Inizio" },
              { id: "introduce", label: "L'Autore" },
              { id: "portali", label: "Portali" },
              { id: "blog", label: "Riflessioni" },
              { id: "newsletter", label: "Archivio" },
              { id: "contatti", label: "Contatti" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-gold-bright transition duration-300 relative py-1 cursor-pointer group tracking-[0.25em]"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </nav>

          <div className="space-y-4">
            <div className="tracking-[0.3em]">
              &copy; {new Date().getFullYear()} Frammenti d'Inchiostro. Tutti i diritti sigillati.
            </div>
            <div className="text-[10px] text-gold-accent/20 lowercase tracking-wider italic font-serif">
              &ldquo;Siamo frammenti scritti sulla cenere, inchiostro nero che tenta di esistere.&rdquo;
            </div>
          </div>
        </div>
        </footer>
      </WpTemplateBlock>

      {/* --- MODALS & OVERLAYS --- */}

      {/* Novel expanded modal drawer */}
      <AnimatePresence>
        {selectedNovel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNovel(null)}
              className="absolute inset-0 bg-midnight/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-3xl bg-[#09111c] border-2 border-gold-accent/30 p-6 md:p-10 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedNovel(null)}
                className="absolute top-4 right-4 p-2 text-gold-accent/50 hover:text-ivory rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-accent">{selectedNovel.genre}</span>
                <span className="font-mono text-xs text-gold-accent/40 block mt-1">Pubblicazione: {selectedNovel.publishedYear}</span>
                
                <h3 className="font-display text-3xl md:text-4xl text-ivory tracking-wide mt-2 mb-6 border-b border-gold-accent/25 pb-4">
                  {selectedNovel.title}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-accent/60 mb-2 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Atmosfera
                    </h5>
                    <p className="font-serif italic text-sm text-gold-accent">{selectedNovel.atmosphere}</p>
                  </div>

                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-accent/60 mb-2">Una Perla di Lettura (Estratto)</h5>
                    <div className="p-6 bg-midnight text-gold-bright/95 rounded-sm border border-ivory/5 font-serif text-lg italic leading-relaxed">
                      &ldquo;{selectedNovel.excerpt}&rdquo;
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-10 pt-6 border-t border-ivory/5">
                  {selectedNovel.purchaseLink ? (
                    <a
                      href={selectedNovel.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-sm text-ivory bg-gold-accent/10 hover:bg-gold-accent/20 border border-gold-accent/30 px-6 py-2.5 rounded-sm transition-all hover:border-gold-accent flex items-center gap-2"
                    >
                      <span>Acquista su Amazon</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  ) : (
                    <div></div>
                  )}
                  <button
                    onClick={() => setSelectedNovel(null)}
                    className="font-serif text-sm text-gold-accent/50 hover:text-gold-accent cursor-pointer transition"
                  >
                    Chiudi Sguardo
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visual Art detail Expanded modal */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArt(null)}
              className="absolute inset-0 bg-midnight/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-xl bg-forest/20 border-2 border-gold-accent/30 p-6 md:p-8 rounded-sm shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 p-2 text-gold-accent/50 hover:text-ivory rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-accent/60 block">{selectedArt.medium}</span>
                <h3 className="font-display text-2xl text-ivory tracking-wider mt-1 mb-6 border-b border-ivory/5 pb-3">
                  {selectedArt.title}
                </h3>

                <div className="w-full bg-[#0b1322] rounded-xs border border-ivory/10 flex items-center justify-center p-1 select-none mb-6 relative overflow-hidden">
                  <img 
                    src={selectedArt.imageUrl} 
                    alt={selectedArt.title} 
                    className="w-full max-h-[60vh] object-contain rounded-xs contrast-[1.1] saturate-[1.05]" 
                  />
                </div>

                <div className="space-y-4">
                  <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-accent/70">Il Racconto dell'Opera</h5>
                  <p className="font-serif text-sm italic text-ivory/95 leading-relaxed bg-[#0b1322]/60 p-4 rounded-xs border border-ivory/5">
                    &ldquo;{selectedArt.story}&rdquo;
                  </p>
                </div>

                <div className="flex justify-between items-center mt-8 pt-4 border-t border-ivory/5">
                  <span className="font-mono text-[9px] text-gold-accent/40 flex items-center gap-1.5 uppercase">
                    TAGS: {selectedArt.tags.join(", ")}
                  </span>

                  <button
                    onClick={() => setSelectedArt(null)}
                    className="font-serif text-xs text-gold-accent/50 hover:text-gold-accent cursor-pointer transition"
                  >
                    Chiudi Sguardo
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Immersive Fullscreen Chapter Reader */}
      <AnimatePresence>
        {readerNovel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <ChapterReader 
              novel={readerNovel} 
              onClose={() => setReaderNovel(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Fullscreen Article/Laboratory Reader */}
      <AnimatePresence>
        {readPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <ArticleReader 
              post={readPost} 
              posts={BLOGPOSTS}
              onClose={() => setReadPost(null)} 
              onSelectPost={setReadPost}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}

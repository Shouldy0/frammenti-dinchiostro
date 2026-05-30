/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Quote, Bookmark, Heart } from "lucide-react";
import { NOVELS } from "../data";
import { Novel } from "../types";

interface HeroProps {
  onExploreClick: () => void;
  onNovelClick?: (novel: Novel) => void;
}

export default function Hero({ onExploreClick, onNovelClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeNovel = NOVELS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NOVELS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + NOVELS.length) % NOVELS.length);
  };

  // Cover-specific custom colors to color the border and spine highlights with the cover's actual palette
  const getCoverStyles = (index: number) => {
    switch (index) {
      case 0: // Il Mistero dell'Orologio: Emerald + Celestial Teal & Antique Gold
        return {
          spine: "from-[#083344] via-[#0f2e30]/80 to-transparent",
          outerBorder: "border-emerald-500/50 group-hover:border-emerald-400/80",
          innerTrim: "border-emerald-500/30",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
          cardBorder: "border-emerald-500/35",
        };
      case 1: // Pensieri Dispersi: Warm Antique Gold / Cognac Brown & Amber
        return {
          spine: "from-[#291e13]/90 via-[#1c140c]/80 to-transparent",
          outerBorder: "border-amber-600/60 group-hover:border-amber-500/85",
          innerTrim: "border-amber-600/35",
          glow: "shadow-[0_0_20px_rgba(217,119,6,0.3)]",
          cardBorder: "border-amber-600/35",
        };
      case 2: // La Piccola Lucciola: Bright Glowing Yellow-Gold Lantern & Teal/Blue night depth
        return {
          spine: "from-[#062033]/95 via-[#0c243a]/80 to-transparent",
          outerBorder: "border-yellow-500/60 group-hover:border-yellow-400/85",
          innerTrim: "border-yellow-500/35",
          glow: "shadow-[0_0_25px_rgba(234,179,8,0.4)]",
          cardBorder: "border-yellow-500/35",
        };
      default:
        return {
          spine: "from-midnight/90 via-midnight/40 to-transparent",
          outerBorder: "border-gold-accent/15 group-hover:border-gold-bright/30",
          innerTrim: "border-gold-accent/15",
          glow: "",
          cardBorder: "border-ivory/10",
        };
    }
  };

  const coverStyle = getCoverStyles(currentIndex);

  return (
    <section 
      id="hero" 
      className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-midnight pt-28 pb-20 md:pt-32 md:pb-24 select-none"
    >
      {/* Background radial soft lights to establish the ambient mood */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/3 w-[35rem] h-[35rem] rounded-full bg-[#1e2d42]/20 blur-[120px] cloud-fog-1" />
        <div className="absolute bottom-1/3 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#0a1e1d]/30 blur-[150px] cloud-fog-2" />
      </div>

      {/* Aesthetic paper grain texture and ambient vignette */}
      <div className="absolute inset-0 paper-grain opacity-50 pointer-events-none" />
      <div className="absolute inset-0 ink-vignette pointer-events-none opacity-90" />

      {/* --- UPPER HAND-DRAWN STYLE CEILING DASHES (from Sketch `- - - -`) --- */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {NOVELS.map((novel, idx) => (
          <button
            key={novel.id}
            onClick={() => setCurrentIndex(idx)}
            className="group flex flex-col items-center focus:outline-hidden cursor-pointer"
            title={novel.title}
          >
            {/* Minimalist Tab Dash */}
            <div 
              className={`h-[2px] transition-all duration-700 rounded-full ${
                currentIndex === idx 
                  ? "w-12 bg-gold-accent" 
                  : "w-6 bg-gold-accent/20 group-hover:w-8 group-hover:bg-gold-accent/50"
              }`} 
            />
            <span className={`text-[8px] font-mono uppercase tracking-widest mt-1.5 transition-all duration-500 scale-90 ${
              currentIndex === idx 
                ? "text-gold-accent opacity-100" 
                : "text-gold-accent/30 opacity-0 group-hover:opacity-60 group-hover:scale-100"
            }`}>
              Vol. 0{idx + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* --- LEFT COLUMN: Book details, description, and "frase del libro" --- */}
        <div className="md:col-span-5 flex flex-col justify-center text-left space-y-6 md:pr-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNovel.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-wide text-ivory leading-tight select-text uppercase">
                {activeNovel.title}
              </h1>

              {/* Divider lines representing text blocks in the hand-drawn sketch */}
              <div className="space-y-1.5 opacity-65 select-none">
                <div className="h-[1px] w-full bg-gradient-to-r from-gold-accent/50 to-transparent" />
                <div className="h-[1px] w-4/5 bg-gradient-to-r from-gold-accent/50 to-transparent" />
                <div className="h-[1px] w-2/3 bg-gradient-to-r from-gold-accent/45 to-transparent" />
              </div>

              {/* --- "UNA FRASE DEL LIBRO" --- */}
              <div className="pt-4 border-t border-gold-accent/10 relative">
                <span className="block font-serif text-[11px] italic text-gold-accent/50 mb-2 font-mono uppercase tracking-[0.15em]">
                  &ldquo;una frase del libro&rdquo;
                </span>
                
                <div className="relative pl-6">
                  <Quote className="absolute top-0 left-0 w-4 h-4 text-gold-accent/30 rotate-180 transform -translate-y-1" />
                  <p className="font-serif italic text-base sm:text-lg text-gold-bright/95 tracking-wide leading-relaxed select-text">
                    {activeNovel.excerpt}
                  </p>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={() => onNovelClick && onNovelClick(activeNovel)}
                  className="px-6 py-2.5 bg-forest/45 hover:bg-gold-accent hover:text-midnight border border-gold-accent/45 hover:border-gold-bright text-xs font-mono uppercase tracking-widest text-ivory rounded-xs cursor-pointer transition duration-500 shadow-md flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Apri Capitolo
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- CENTER COLUMN: VERTICAL "SFUMATO" MIST WAVE (from Sketch) --- */}
        <div className="hidden md:col-span-2 md:flex flex-col items-center justify-center h-full relative select-none">
          {/* Vertical Separator Line */}
          <div className="absolute inset-y-12 w-[1px] bg-gradient-to-b from-transparent via-gold-accent/20 to-transparent" />
          
          {/* Vertical Wavy Path "Foggy" SVG Line */}
          <svg className="w-16 h-full stroke-gold-accent/30 fill-none" viewBox="0 0 100 800" preserveAspectRatio="none">
            <motion.path 
              d="M50,0 Q65,100 35,200 T50,400 T65,600 T35,800"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{
                d: [
                  "M50,0 Q65,100 35,200 T50,400 T65,600 T35,800",
                  "M50,0 Q35,100 65,200 T50,400 T35,600 T65,800",
                  "M50,0 Q65,100 35,200 T50,400 T65,600 T35,800"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>

          {/* Wavy foggy halo */}
          <div className="absolute inset-y-1/4 w-12 bg-radial-gradient from-gold-accent/5 to-transparent blur-md opacity-70 pointer-events-none" />
        </div>

        {/* --- RIGHT COLUMN: "COPERTINA LIBRO" (Book Cover 3D Hardcover) --- */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative select-none mt-6 md:mt-0">
          
          {/* Subtle halo backdrop */}
          <div className="absolute w-80 h-80 rounded-full bg-radial-gradient from-[#1b3447]/20 to-transparent blur-3xl opacity-60 mix-blend-screen pointer-events-none" />

          {/* Cycle buttons */}
          <div className="absolute inset-x-0 md:-inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#0a1420]/80 border border-gold-accent/20 text-gold-accent/70 hover:text-gold-bright hover:border-gold-accent flex items-center justify-center cursor-pointer pointer-events-auto shadow-lg backdrop-blur-xs transition group"
              title="Precedente"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#0a1420]/80 border border-gold-accent/20 text-gold-accent/70 hover:text-gold-bright hover:border-gold-accent flex items-center justify-center cursor-pointer pointer-events-auto shadow-lg backdrop-blur-xs transition group"
              title="Successivo"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNovel.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15, x: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15, x: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[220px] sm:w-[260px] aspect-[2/3] group py-2"
            >
              {/* Actual 3D physical book wrapper */}
              <div 
                onClick={() => onNovelClick && onNovelClick(activeNovel)}
                className={`relative w-full h-full rounded-r-md overflow-hidden bg-gradient-to-br transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-8deg)_rotateX(4deg)] shadow-[25px_30px_50px_rgba(3,6,10,0.85)] hover:shadow-[35px_40px_70px_rgba(197,168,128,0.15)] border-t border-r border-b ${coverStyle.cardBorder} cursor-pointer`}
                style={{
                  background: 
                    currentIndex === 0 
                      ? "linear-gradient(135deg, #09131f 0%, #0d1e33 40%, #03080e 100%)" 
                      : currentIndex === 1 
                        ? "linear-gradient(135deg, #1c140c 0%, #291e13 40%, #080503 100%)" 
                        : "linear-gradient(135deg, #0f1622 0%, #172436 40%, #060910 100%)"
                }}
              >
                {/* Book cover rich embossed textures */}
                <div className="absolute inset-0 paper-grain opacity-20" />
                
                {/* Embedded Spine Shadow */}
                <div className={`absolute left-0 top-0 bottom-0 w-[12px] bg-gradient-to-r ${coverStyle.spine} border-r border-[#000]/30 z-10 transition-all duration-500`} />
                
                {/* Spine ridges details */}
                <div className="absolute left-[2px] top-4 w-[6px] h-[1.5px] bg-gold-accent/20 z-20" />
                <div className="absolute left-[2px] top-1/4 w-[6px] h-[1.5px] bg-gold-accent/20 z-20" />
                <div className="absolute left-[2px] top-1/2 w-[6px] h-[1.5px] bg-gold-accent/20 z-20" />
                <div className="absolute left-[2px] top-3/4 w-[6px] h-[1.5px] bg-gold-accent/20 z-20" />
                <div className="absolute left-[2px] bottom-4 w-[6px] h-[1.5px] bg-gold-accent/20 z-20" />

                {/* Cover Frame Borders */}
                {currentIndex === 0 || currentIndex === 1 || currentIndex === 2 ? (
                  /* Custom Real Book Cover using the user uploaded cover image */
                  <div className={`absolute top-[2px] bottom-[2px] left-[12px] right-[2px] select-none overflow-hidden rounded-xs border transition-all duration-500 ${coverStyle.outerBorder} ${coverStyle.glow}`}>
                    <img 
                      src={currentIndex === 0 ? "/cover-1.jpeg" : currentIndex === 1 ? "/cover-2.jpg" : "/cover-3.jpg"}
                      alt={activeNovel.title}
                      className="w-full h-full object-fill select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* 3D Depth overlays to make it feel like a heavy hardcover book */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/15 pointer-events-none mix-blend-multiply" />
                    {/* Spine highlight sheen */}
                    <div className="absolute left-[2px] top-0 bottom-0 w-[4px] bg-white/5 pointer-events-none" />
                    {/* Gold trim outline inset */}
                    <div className={`absolute inset-2 border ${coverStyle.innerTrim} pointer-events-none transition-colors duration-500`} />
                  </div>
                ) : (
                  /* Standard Cover layout for other volumes */
                  <div className="absolute inset-3 border border-gold-accent/30 rounded-xs flex flex-col justify-between items-center p-4 text-center">
                    
                    {/* Subtle Inner Dotted Border */}
                    <div className="absolute inset-1.5 border border-dashed border-gold-accent/15 pointer-events-none" />

                    {/* Volume Index */}
                    <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold-accent/60">
                      VOLUME 0{currentIndex + 1}
                    </div>

                    {/* Central Graphic (Unique vector silhouettes based on novel motif) */}
                    <div className="w-24 h-24 my-auto relative flex items-center justify-center">
                      {/* Glowing effect inside artwork */}
                      <div className="absolute inset-2 bg-radial-gradient from-gold-accent/15 to-transparent blur-md rounded-full" />

                      {currentIndex === 1 && (
                        /* Bookstore/Fantasy Star-Book Motif */
                        <svg className="w-20 h-20 stroke-gold-accent fill-none" viewBox="0 0 100 100">
                          <path d="M20,65 Q50,55 80,65 L80,30 Q50,20 20,30 Z" strokeWidth="1.5" />
                          <line x1="50" y1="20" x2="50" y2="60" strokeWidth="1.5" />
                          {/* Stars floating out */}
                          <circle cx="50" cy="12" r="1.5" className="fill-gold-accent" />
                          <circle cx="38" cy="18" r="1" className="fill-gold-accent" />
                          <circle cx="62" cy="16" r="1" className="fill-gold-accent" />
                          <path d="M48,8 Q50,5 52,8 Q50,11 48,8 Z" className="fill-gold-accent stroke-none" />
                        </svg>
                      )}

                      {currentIndex === 2 && (
                        /* Secret Mirror Motif */
                        <svg className="w-20 h-20 stroke-gold-accent fill-none" viewBox="0 0 100 100">
                          <ellipse cx="50" cy="45" rx="20" ry="28" strokeWidth="1.5" />
                          <path d="M50,73 L50,90" strokeWidth="1.5" />
                          <path d="M38,90 L62,90" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Inner mirror mystery glints */}
                          <line x1="45" y1="35" x2="55" y2="55" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="48" cy="40" r="1" className="fill-gold-bright" />
                          <circle cx="52" cy="50" r="1.5" className="fill-gold-bright" />
                        </svg>
                      )}
                    </div>

                    {/* Title & Author at cover bottom */}
                    <div className="space-y-4">
                      <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-bright font-semibold">
                        {activeNovel.title}
                      </h3>
                      <div className="w-8 h-[1px] bg-gold-accent/40 mx-auto" />
                      <p className="font-serif text-[10px] italic text-gold-accent/60 lowercase tracking-wider">
                        f. d'inchiostro
                      </p>
                    </div>

                  </div>
                )}

                {/* Silk volume ribbon hanging from book bottom */}
                <div 
                  className="absolute bottom-0 right-10 w-4 h-8 bg-gold-accent/80 z-20 transition shadow-inner origin-top group-hover:scale-y-110" 
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)"
                  }}
                />
              </div>

              {/* Cover caption / interaction hint */}
              <div className="text-center mt-3 opacity-0 group-hover:opacity-75 transition duration-500 scale-95 group-hover:scale-100">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-accent flex items-center justify-center gap-1">
                  <Bookmark className="w-3 h-3 text-gold-accent animate-pulse" />
                  Clicca per sfogliare
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* --- BOTTOM SECTION: HORIZONTAL MISTY WAVE (from Sketch) --- */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center select-none pointer-events-none">
        {/* Wavy bottom divider drawn elegantly matching the sketch signature */}
        <div className="w-full relative h-12 overflow-hidden">
          {/* Sfumato soft bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
          
          <svg className="absolute bottom-0 left-0 w-full h-8 stroke-gold-accent/15 fill-none" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <motion.path
              d="M0,20 Q150,10 300,20 T600,20 T900,20 T1200,20 L1200,40 L0,40 Z"
              strokeWidth="1"
              animate={{
                d: [
                  "M0,20 Q150,10 300,20 T600,20 T900,20 T1200,20 L1200,40 L0,40 Z",
                  "M0,20 Q150,30 300,20 T600,20 T900,30 T1200,20 L1200,40 L0,40 Z",
                  "M0,20 Q150,10 300,20 T600,20 T900,20 T1200,20 L1200,40 L0,40 Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
      </div>

    </section>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Calendar, 
  Clock, 
  Flame, 
  Bookmark, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Palette
} from "lucide-react";
import { Blogpost } from "../types";

interface ArticleReaderProps {
  post: Blogpost;
  posts: Blogpost[];
  onClose: () => void;
  onSelectPost: (post: Blogpost) => void;
}

type ReadTheme = "midnight" | "sepia" | "forest";

export default function ArticleReader({ post, posts, onClose, onSelectPost }: ArticleReaderProps) {
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile drawer
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // desktop toggle
  const [readTheme, setReadTheme] = useState<ReadTheme>("midnight");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex = posts.findIndex((p) => p.id === post.id);

  // Reading themes mapping
  const themeStyles = {
    midnight: {
      bg: "bg-[#050912]",
      sidebarBg: "bg-[#04070d]",
      text: "text-ivory",
      bodyText: "text-[#dcdfe5]",
      accentText: "text-[#d9b37c]",
      border: "border-[#d9b37c]/15",
      containerBg: "bg-[#060a13]/40",
      progressBg: "bg-gradient-to-r from-gold-accent to-gold-bright",
      cardBg: "bg-forest/10"
    },
    sepia: {
      bg: "bg-[#16120c]",
      sidebarBg: "bg-[#110e09]",
      text: "text-[#f2e7cc]",
      bodyText: "text-[#e5d4b5]",
      accentText: "text-[#d6aa69]",
      border: "border-[#d6aa69]/20",
      containerBg: "bg-[#1c1711]/40",
      progressBg: "bg-gradient-to-r from-[#d6aa69] to-[#ebd19b]",
      cardBg: "bg-[#ebd19b]/5"
    },
    forest: {
      bg: "bg-[#060c0a]",
      sidebarBg: "bg-[#040806]",
      text: "text-[#e2ece9]",
      bodyText: "text-[#ccdcd6]",
      accentText: "text-[#80bc9b]",
      border: "border-[#80bc9b]/20",
      containerBg: "bg-[#08120e]/40",
      progressBg: "bg-gradient-to-r from-[#80bc9b] to-[#aee4c3]",
      cardBg: "bg-[#80bc9b]/7"
    }
  };

  const activeTheme = themeStyles[readTheme];

  // Reset scroll and progress on article change
  useEffect(() => {
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const element = document.getElementById("article-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [post.id]);

  // Scroll tracking handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrolled = target.scrollTop;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      setScrollProgress((scrolled / maxScroll) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  // Handle Next
  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      onSelectPost(posts[currentIndex + 1]);
    }
  };

  // Handle Prev
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPost(posts[currentIndex - 1]);
    }
  };

  // Font size styles
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm sm:text-base leading-relaxed";
      case "md": return "text-base sm:text-lg leading-relaxed";
      case "lg": return "text-lg sm:text-xl leading-relaxed";
      case "xl": return "text-xl sm:text-2xl leading-relaxed";
    }
  };

  // Split lines and render with beautiful space and first-letter drop cap
  const renderContentParagraphs = () => {
    const paragraphs = post.content.split("\n\n");
    return paragraphs.map((para, index) => {
      // Apply drop cap styling to the first paragraph
      if (index === 0 && para.length > 1) {
        const firstLetter = para.charAt(0);
        const restOfPara = para.substring(1);
        return (
          <p key={index} className="font-serif text-current mb-6 text-justify">
            <span className="float-left text-5xl md:text-6xl font-display font-black pr-2.5 pt-1 text-gold-accent select-none leading-[0.8] mt-1 hover:text-gold-bright transition">
              {firstLetter}
            </span>
            {restOfPara}
          </p>
        );
      }
      return (
        <p key={index} className="font-serif text-current mb-6 text-justify leading-relaxed indent-4 md:indent-6">
          {para}
        </p>
      );
    });
  };

  return (
    <div className={`fixed inset-0 z-50 ${activeTheme.bg} ${activeTheme.text} overflow-hidden flex flex-col md:flex-row select-text h-screen w-screen transition-colors duration-500`}>
      
      {/* Background grain texture */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-30 z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-current/5 to-transparent pointer-events-none z-0" />

      {/* --- SIDEBAR PANEL (Desktop / Static) --- */}
      <aside 
        className={`hidden md:flex flex-col justify-between p-6 overflow-y-auto shrink-0 select-none z-10 transition-all duration-500 ease-in-out border-r ${
          activeTheme.border
        } ${activeTheme.sidebarBg} ${
          isSidebarCollapsed 
            ? "md:w-0 md:p-0 md:border-r-0 opacity-0 pointer-events-none" 
            : "md:w-80 opacity-100"
        }`}
      >
        <div className="space-y-6">
          
          {/* Header & Back Button */}
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-accent/70 hover:text-gold-bright hover:-translate-x-1 transition duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Laboratorio
            </button>
          </div>

          {/* Section Info Block */}
          <div className="p-4 bg-[#080e18]/60 border border-gold-accent/10 rounded-xs space-y-3">
            <div className="font-mono text-[9px] tracking-widest text-[#d9b37c] uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-accent animate-pulse" />
              Riflessioni & Laboratorio
            </div>
            <h4 className="font-display text-sm text-ivory tracking-wider uppercase leading-tight">
              Sguardo d'Autore
            </h4>
            <div className="h-[1px] w-12 bg-gold-accent/30" />
            <p className="font-serif italic text-xs text-gold-accent/60 leading-relaxed">
              Esplorazioni intime sui meccanismi della suspense, sulla scrittura e sulla sottile psicologia delle nostre ombre umane.
            </p>
          </div>

          {/* Articles Index */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-ivory/5 pb-2">
              <Bookmark className="w-4 h-4 text-gold-accent" />
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#d9b37c]">Altri Articoli</h5>
            </div>
            
            <nav className="space-y-2 list-none m-0 p-0 text-left">
              {posts.map((p) => {
                const isActive = p.id === post.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPost(p);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xs border text-xs tracking-wide transition duration-300 flex flex-col gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-forest/20 border-gold-accent text-gold-bright font-medium"
                        : "bg-transparent border-transparent text-gold-accent/50 hover:bg-forest/5 hover:text-gold-accent/80"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full font-mono text-[8px] text-gold-accent/40 uppercase">
                      <span>{p.date}</span>
                      <span>{p.readTime}</span>
                    </div>
                    <span className="font-serif italic text-sm line-clamp-2 leading-tight">{p.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="pt-6 border-t border-ivory/5">
          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-accent/35 flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-gold-accent/40" />
            Frammenti d'Inchiostro Studio
          </div>
        </div>
      </aside>

      {/* --- MAIN HEADER (Mobile only) --- */}
      <div className={`md:hidden w-full ${activeTheme.sidebarBg} border-b ${activeTheme.border} px-4 py-3 flex items-center justify-between z-20 shrink-0 select-none transition-colors duration-500`}>
        <button
          onClick={onClose}
          className="p-2 text-gold-accent/70 hover:text-gold-bright transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center max-w-[180px]">
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#d9b37c]/60 max-w-full block truncate">
            Riflessione
          </span>
          <span className="font-serif italic text-xs text-gold-bright block truncate max-w-full">
            {post.title}
          </span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gold-accent/70 hover:text-gold-bright transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* --- READER BODY COLUMN --- */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto flex flex-col justify-between items-center relative z-10 transition-colors duration-500 ${activeTheme.containerBg}`}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-ivory/5 z-30 pointer-events-none">
          <motion.div 
            className={`h-full ${activeTheme.progressBg}`}
            style={{ width: `${scrollProgress}%` }}
            layout
          />
        </div>
        
        {/* Invisible anchor for scrolling */}
        <div id="article-top" className="h-0 w-full" />

        {/* Narrative Reading Column Container */}
        <article className="w-full max-w-2xl px-6 md:px-0 py-12 md:py-16 flex-1 flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-6"
            >
              
              {/* Meta Tags */}
              <div className="text-center mb-8 select-none">
                <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.35em] block mb-2 ${activeTheme.accentText}`}>
                  {post.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-3.5xl text-ivory tracking-wide uppercase mt-2 leading-snug select-text">
                  {post.title}
                </h2>
                <div className="flex flex-col items-center gap-[3px] mt-4">
                  <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />
                  <div className="h-[1.5px] w-16 bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" />
                </div>
              </div>

              {/* Excerpt panel */}
              <div className={`my-8 p-6 ${activeTheme.cardBg} border-l-2 border-gold-accent/50 italic font-serif text-gold-accent/90 text-sm sm:text-base leading-relaxed select-text`}>
                &ldquo;{post.excerpt}&rdquo;
              </div>

              {/* Main Reading Text Column */}
              <div className={`${getFontSizeClass()} font-serif tracking-wide ${activeTheme.bodyText} prose prose-invert mx-auto md:px-4 select-text leading-relaxed space-y-6 md:space-y-8 text-justify`}>
                {renderContentParagraphs()}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Aesthetic page-end flourish */}
          <div className="flex justify-center items-center gap-2 mt-16 select-none opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            <div className="h-[1px] w-12 bg-gradient-to-r from-gold-accent/60 to-transparent" />
            <span className="font-serif italic text-xs text-gold-accent/80">inchiostro</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-gold-accent/60 to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
          </div>

        </article>

        {/* Reader Footer Navigation Panel (Next / Prev Article) */}
        <footer className={`w-full max-w-2xl mx-auto px-6 md:px-12 py-8 border-t ${activeTheme.border} select-none flex items-center justify-between mt-12 mb-4 transition-colors duration-500`}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#d9b37c] hover:text-gold-bright transition disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Articolo Prec.</span>
          </button>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-accent/40">
            {currentIndex + 1} di {posts.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === posts.length - 1}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#d9b37c] hover:text-gold-bright transition disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Articolo Succ.</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>

      </div>

      {/* --- MOBILE ARTICLE DRAWER / SLIDEOVER (AnimatePresence) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-midnight/95 backdrop-blur-xs cursor-pointer"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.35 }}
                className={`w-screen max-w-xs ${activeTheme.sidebarBg} border-l ${activeTheme.border} h-full p-6 flex flex-col justify-between transition-colors duration-500`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-ivory/5">
                    <h5 className="font-mono text-xs uppercase tracking-widest text-[#d9b37c]">Altri Articoli</h5>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 hover:text-gold-bright text-gold-accent/70 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-3 text-left">
                    {posts.map((p) => {
                      const isActive = p.id === post.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onSelectPost(p);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left p-3.5 rounded-xs border text-xs tracking-wide transition duration-300 flex flex-col gap-1 cursor-pointer ${
                            isActive
                              ? "bg-forest/20 border-gold-accent text-gold-bright"
                              : "bg-transparent border-transparent text-gold-accent/50 hover:bg-forest/5 hover:text-gold-bright"
                          }`}
                        >
                          <div className="flex justify-between items-center w-full font-mono text-[8px] text-gold-accent/40 uppercase">
                            <span>{p.date}</span>
                            <span>{p.readTime}</span>
                          </div>
                          <span className="font-serif italic text-sm line-clamp-2 leading-snug">{p.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-6 border-t border-ivory/5 text-center">
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-forest/20 hover:bg-gold-accent hover:text-midnight border border-gold-accent/20 text-xs font-mono uppercase tracking-widest rounded-xs transition text-center cursor-pointer"
                  >
                    Torna al Portfolio
                  </button>
                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

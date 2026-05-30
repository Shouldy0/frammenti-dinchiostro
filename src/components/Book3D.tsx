import { Novel } from "../types";
import { BookOpen } from "lucide-react";

interface Book3DProps {
  novel: Novel;
  coverUrl: string;
  onRead: () => void;
}

export function Book3D({ novel, coverUrl, onRead }: Book3DProps) {
  return (
    <div className="group relative w-full aspect-[2/3] max-w-[280px] mx-auto cursor-pointer" style={{ perspective: "1500px" }}>
      <div className="w-full h-full transition-transform duration-700 ease-out group-hover:-translate-y-4" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Book shadow on the ground */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/60 blur-xl rounded-full transition-opacity duration-700 group-hover:opacity-80" style={{ transform: "translateZ(-50px)" }} />

        {/* Back Cover */}
        <div className="absolute inset-0 bg-[#040810] border border-ivory/10 rounded-r-md shadow-inner" style={{ transform: "translateZ(-20px)" }} />
        
        {/* Pages Edge */}
        <div className="absolute right-0 top-[1%] bottom-[1%] w-[20px] bg-gradient-to-r from-[#d9c5a8] to-[#f4ead5] border-y border-r border-[#bfa682] origin-right" style={{ transform: "translateZ(-20px) rotateY(-90deg) translateX(20px)" }}>
           {/* page lines */}
           <div className="w-full h-full opacity-30" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 2px, #8c7355 2px, #8c7355 3px)" }} />
        </div>

        {/* Inside Content (First page) */}
        <div className="absolute inset-0 bg-[#0f1724] border border-ivory/10 rounded-r-md p-6 flex flex-col justify-between" style={{ transform: "translateZ(-19px)" }}>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold-accent uppercase border border-gold-accent/20 px-2 py-0.5 rounded-sm mb-4 inline-block">
              {novel.genre}
            </span>
            <h4 className="text-xl font-display text-ivory mb-3">{novel.title}</h4>
            <p className="font-sans text-xs text-ivory/70 line-clamp-6 leading-relaxed">
              {novel.synopsis}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onRead(); }}
            className="text-xs uppercase tracking-widest font-mono text-ivory hover:text-gold-accent flex items-center gap-1 transition duration-300 w-fit"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {novel.id === "echialtrove" ? "leggi" : <>Apri &rarr;</>}
          </button>
        </div>

        {/* Front Cover Container (Rotates Open) */}
        <div className="absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-y-[120deg]" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Front Outside Face */}
          <div className="absolute inset-0 bg-[#0a121e] rounded-r-md overflow-hidden shadow-2xl border border-ivory/10" style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}>
            <img src={coverUrl} alt={novel.title} className="w-full h-full object-fill" />
            {/* Spine Highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          {/* Front Inside Face */}
          <div className="absolute inset-0 bg-[#040810] border border-ivory/10 rounded-l-md overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0)" }}>
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          </div>
          
        </div>

        {/* Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[20px] origin-left bg-[#08101a] border border-ivory/10 flex items-center justify-center overflow-hidden" style={{ transform: "rotateY(-90deg)" }}>
           <div className="w-[200px] -rotate-90 text-[10px] font-display tracking-widest text-gold-accent/80 whitespace-nowrap text-center">
             {novel.title}
           </div>
        </div>

      </div>
    </div>
  );
}

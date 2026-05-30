/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Feather, Compass, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="introduce" className="relative py-24 md:py-32 bg-gradient-to-b from-midnight to-[#081119] overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-40 pointer-events-none" />
      
      {/* Dynamic Ambient Background Particles (Cosmo Vivente) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/5 sm:bg-gold-accent/10 blur-xl"
            animate={{
              x: [0, Math.sin(i) * 50, Math.cos(i) * -40, 0],
              y: [0, Math.cos(i) * -80, Math.sin(i) * 60, 0],
              scale: [1, 1.25, 0.85, 1],
              opacity: [0.15, 0.45, 0.1, 0.15]
            }}
            transition={{
              duration: 18 + i * 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + i * 14}%`,
              top: `${15 + i * 12}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* "presentazione" handwritten/italicized style with a clean line underneath */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="inline-flex flex-col items-center mb-2 select-none"
        >
          <span className="font-serif italic text-2xl md:text-3xl text-gold-accent lowercase tracking-wide">
            presentazione
          </span>
          <div className="w-20 md:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-gold-accent to-transparent mt-1.5" />
        </motion.div>

        {/* prominent bold centered all-caps "IL MANIFESTO DELL'AUTORE" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-3xl md:text-5xl font-display font-medium text-ivory tracking-widest uppercase mb-16 select-text"
        >
          Il Manifesto dell'Autore
        </motion.h2>

        {/* Dynamic hand-drawn blueprint flex system */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-3xl mx-auto mb-16">
          
          {/* Left Axis Column: Vertical Wave */}
          <div className="col-span-12 md:col-span-3 flex justify-center items-center select-none md:border-r border-gold-accent/10 md:pr-8 py-2">
            
            {/* The animated wavy line */}
            <div className="w-10 h-32 md:h-48 flex items-center justify-center">
              <svg className="h-full w-full text-gold-accent/60" viewBox="0 0 40 300" preserveAspectRatio="none">
                <motion.path
                  d="M 20 0 Q 32 37.5, 20 75 Q 8 112.5, 20 150 Q 32 187.5, 20 225 Q 8 262.5, 20 300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      "M 20 0 Q 34 37.5, 20 75 Q 6 112.5, 20 150 Q 34 187.5, 20 225 Q 6 262.5, 20 300",
                      "M 20 0 Q 6 37.5, 20 75 Q 34 112.5, 20 150 Q 6 187.5, 20 225 Q 34 262.5, 20 300",
                      "M 20 0 Q 34 37.5, 20 75 Q 6 112.5, 20 150 Q 34 187.5, 20 225 Q 6 262.5, 20 300"
                    ]
                  }}
                  transition={{
                    duration: 3.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Right Content Column: Beautifully lined manuscript sheet */}
          <div className="col-span-12 md:col-span-9 flex flex-col justify-center space-y-8 text-left md:pl-2">
            
            {/* First Lined paragraph block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative pb-6 border-b border-gold-accent/15 group hover:border-gold-accent/30 transition-colors duration-500"
            >
              <p className="font-serif text-base md:text-lg text-gold-accent/90 italic leading-relaxed pl-4 border-l-2 border-gold-accent/25">
                &ldquo;Benvenuto in questa dimora intellettuale. Frammenti d'Inchiostro non è un semplice portfolio o una galleria asettica di opere. È un cosmo vivente in cui le parole, i silenzi, i tratti di carboncino e i frammenti d'ombra si intrecciano per svelare l'invisibile.&rdquo;
              </p>
            </motion.div>

            {/* Second Lined paragraph block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative pb-6 border-b border-gold-accent/15 group hover:border-gold-accent/30 transition-colors duration-500"
            >
              <p className="font-serif text-base md:text-lg text-gold-accent/90 italic leading-relaxed pl-4 border-l-2 border-gold-accent/25">
                &ldquo;Penso che ogni capitolo di un romanzo sia un'istantanea fotografica della mente, e ogni fotografia un verso poetico sospeso nel tempo. Qui, il fantasy si colora di realismo psicologico, mentre i segreti dei thriller sussurrano sotto la pelle della quotidianità. Cerca la tua veridicità nel frammento.&rdquo;
              </p>
            </motion.div>
          </div>

        </div>

        {/* Feature grid - 4 quadrants of the creator's identity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 text-left">
          {[
            {
              icon: Feather,
              title: "Narratrice",
              desc: "Romanzi psicologici e urban fantasy in cui l'enigma esterno riflette labirinti interiori.",
              glow: "group-hover:bg-cyan-950/20"
            },
            {
              icon: Sparkles,
              title: "Poetessa",
              desc: "Versi scolpiti sul confine sottile tra l'inchiostro liquido e la polvere della memoria dispersa.",
              glow: "group-hover:bg-amber-950/20"
            },
            {
              icon: Compass,
              title: "Artista",
              desc: "Tavole grafiche simboliche che danno forma ad allegorie ancestrali e storie mute.",
              glow: "group-hover:bg-teal-950/20"
            },
            {
              icon: Heart,
              title: "Fotografa",
              desc: "Inquadrature cinematografiche che imprigonano la nebbia, il silenzio e la solitudine della pietra.",
              glow: "group-hover:bg-blue-950/20"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-6 bg-midnight/30 border border-ivory/5 hover:border-gold-accent/30 rounded-xs group transition-all duration-300 backdrop-blur-xs flex flex-col justify-between overflow-hidden cursor-default shadow-md hover:shadow-xl"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${item.glow}`} />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="relative z-10">
                <item.icon className="w-6 h-6 text-gold-accent mb-4 group-hover:text-gold-bright group-hover:rotate-6 transition-all duration-300" />
                <h4 className="font-display text-sm tracking-widest text-ivory mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h4>
                <p className="font-sans text-xs text-gold-accent/70 leading-relaxed group-hover:text-gold-accent/90 transition-colors duration-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-12 h-[1px] bg-gold-accent/40 mx-auto mt-16" />
      </div>
    </section>
  );
}

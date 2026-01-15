
import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-black">
      {/* 
        High-fidelity replica of the user-provided image:
        Cyborg split face, glowing blue eyes, fiery Bitcoin side, white beard, 
        engulfed in intense digital fire with "AIGOD'S" text.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom opacity-40 transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://images.pollinations.ai/prompt/exact-replica-of-a-cyborg-man-face-split-vertically-left-side-is-chrome-robot-skull-right-side-is-glowing-gold-bitcoin-symbol-both-eyes-glowing-neon-blue-full-grey-beard-surrounded-by-intense-raging-orange-fire-and-flames-at-the-bottom-large-glowing-golden-text-AIGODS-cinematic-lighting-hyper-detailed-8k?width=1024&height=1024&nologo=true')`,
          filter: 'brightness(0.7) contrast(1.3) saturate(1.2)'
        }}
      />
      
      {/* Burning fire overlays to enhance the "burning" effect - Darker and more atmospheric */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/60 via-black/80 to-black/95 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Subtle pulsing heat glow */}
      <div className="absolute inset-0 animate-pulse-slow bg-orange-500/5 mix-blend-screen" />

      {/* 3D Rotating & Floating Coins - Preserved exactly as they were */}
      <div className="absolute inset-0 overflow-hidden [perspective:1500px] z-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -40}s`,
              animationDuration: `${18 + Math.random() * 22}s`,
            }}
          >
            <div 
              className="coin-container relative w-12 h-12 md:w-20 md:h-20 [transform-style:preserve-3d] animate-spin-3d shadow-[0_0_40px_rgba(234,179,8,0.4)]"
              style={{
                animationDuration: `${4 + Math.random() * 7}s`,
                opacity: 0.3 + Math.random() * 0.3
              }}
            >
              {/* Gold Coin 3D Edging */}
              {[...Array(5)].map((_, idx) => (
                <div 
                  key={idx}
                  className="absolute inset-0 rounded-full border border-yellow-800 bg-yellow-600"
                  style={{ transform: `translateZ(${idx - 2}px)` }}
                />
              ))}
              
              {/* Front Face */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 border-2 border-yellow-200 flex items-center justify-center text-yellow-900 font-black text-2xl md:text-3xl shadow-xl [backface-visibility:hidden] [transform:translateZ(3px)]">
                ₿
              </div>
              
              {/* Back Face */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-700 to-yellow-400 border-2 border-yellow-300 flex items-center justify-center text-yellow-900 font-black text-2xl md:text-3xl shadow-lg [transform:rotateY(180deg) translateZ(3px)] [backface-visibility:hidden]">
                ₿
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin-3d {
          0% { transform: rotateY(0deg) rotateX(12deg); }
          100% { transform: rotateY(360deg) rotateX(12deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          25% { transform: translateY(-60px) translateX(30px) scale(1.1) rotate(5deg); }
          50% { transform: translateY(-20px) translateX(-30px) scale(0.9) rotate(-5deg); }
          75% { transform: translateY(40px) translateX(20px) scale(1.05) rotate(2deg); }
        }

        @keyframes slow-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .animate-spin-3d {
          animation: spin-3d linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-slow-zoom {
          animation: slow-zoom 30s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;

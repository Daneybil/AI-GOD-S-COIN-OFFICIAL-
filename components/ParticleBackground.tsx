
import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-black">
      {/* 
        Enhanced Cinematic Cyborg-Bitcoin Fire Split Face Background 
        Prompt refined to match the user's specific aesthetics: 
        Split face, Chrome skull, Fiery Bitcoin, white beard, intense digital flames.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 opacity-90 transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://images.pollinations.ai/prompt/cinematic-3D-cyborg-face-split-in-half-one-half-chrome-skull-with-glowing-blue-eye-other-half-fiery-bitcoin-symbol-with-glowing-blue-eye-white-beard-engulfed-in-intense-orange-digital-flames-dark-cyberpunk-background-AIGODS-text-at-bottom?width=1920&height=1080&nologo=true')`,
          filter: 'brightness(0.9) contrast(1.1) saturate(1.2)'
        }}
      />
      
      {/* Stacking multiple gradients to ensure center clarity while darkening edges for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80" />
      <div className="absolute inset-0 bg-black/20" />

      {/* 3D Rotating & Floating Coins */}
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
                opacity: 0.5 + Math.random() * 0.4
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

        .animate-spin-3d {
          animation: spin-3d linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;

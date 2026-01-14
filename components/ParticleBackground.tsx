
import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
      {/* Cinematic Cyborg-Bitcoin Fire Split Face Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-80"
        style={{ 
          backgroundImage: `url('https://images.pollinations.ai/prompt/aigods-cyborg-face-split-with-bitcoin-symbol-surrounded-by-intense-digital-fire-and-cyberpunk-elements-cinematic-lighting-8k-hyper-detailed?width=1920&height=1080&nologo=true')`,
          filter: 'brightness(0.9) contrast(1.2) saturate(1.3)'
        }}
      />
      
      {/* Deep gradient overlay for better text contrast - adjusted to be more transparent in the center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />

      {/* 3D Rotating & Floating Coins */}
      <div className="absolute inset-0 overflow-hidden [perspective:1500px]">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -40}s`,
              animationDuration: `${20 + Math.random() * 25}s`,
            }}
          >
            <div 
              className="coin-container relative w-12 h-12 md:w-20 md:h-20 [transform-style:preserve-3d] animate-spin-3d shadow-[0_0_30px_rgba(234,179,8,0.3)]"
              style={{
                animationDuration: `${5 + Math.random() * 8}s`,
                opacity: 0.4 + Math.random() * 0.4
              }}
            >
              {/* Gold Coin Thickness Effect */}
              {[...Array(6)].map((_, idx) => (
                <div 
                  key={idx}
                  className="absolute inset-0 rounded-full border border-yellow-800 bg-yellow-600"
                  style={{ transform: `translateZ(${idx - 3}px)` }}
                />
              ))}
              
              {/* Front Face */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 border-2 border-yellow-200 flex items-center justify-center text-yellow-900 font-black text-2xl md:text-3xl shadow-xl [backface-visibility:hidden] [transform:translateZ(4px)]">
                ₿
              </div>
              
              {/* Back Face */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-700 to-yellow-400 border-2 border-yellow-300 flex items-center justify-center text-yellow-900 font-black text-2xl md:text-3xl shadow-lg [transform:rotateY(180deg) translateZ(4px)] [backface-visibility:hidden]">
                ₿
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin-3d {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          25% { transform: translateY(-50px) translateX(25px) scale(1.1); }
          50% { transform: translateY(-15px) translateX(-25px) scale(0.9); }
          75% { transform: translateY(30px) translateX(15px) scale(1.05); }
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

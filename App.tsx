
import React, { useState, useMemo } from 'react';
import { 
  Twitter, 
  Send, 
  MessageSquare, 
  Youtube, 
  Instagram, 
  ShieldCheck, 
  Copy, 
  Wallet,
  Play,
  CreditCard,
  ExternalLink,
  Lock
} from 'lucide-react';
import LogoGrid from './components/LogoGrid';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
  const [calcAmount, setCalcAmount] = useState<string>('');
  const [calcChain, setCalcChain] = useState<string>('BNB');
  const [calcStage, setCalcStage] = useState<string>('Stage 1');
  const [buyAmount, setBuyAmount] = useState<string>('');

  const LAUNCH_PRICE = 3.50;
  const STAGE_1_PRICE = 0.20;
  const STAGE_2_PRICE = 0.80;

  const currentPrice = calcStage === 'Stage 1' ? STAGE_1_PRICE : STAGE_2_PRICE;
  
  const tokenPrices: Record<string, number> = {
    'BNB': 600,
    'SOL': 150,
    'MATIC': 0.70,
    'USD': 1
  };

  const calculatedTokens = useMemo(() => {
    const amount = parseFloat(calcAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    const usdValue = amount * (tokenPrices[calcChain] || 0);
    return Math.floor(usdValue / currentPrice);
  }, [calcAmount, calcChain, calcStage]);

  const potentialX = useMemo(() => {
    return (LAUNCH_PRICE / currentPrice).toFixed(2);
  }, [currentPrice]);

  const potentialProfit = useMemo(() => {
    const tokens = calculatedTokens;
    if (tokens === 0) return 0;
    return (tokens * LAUNCH_PRICE).toLocaleString();
  }, [calculatedTokens]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center py-10 px-4 md:px-0 bg-transparent">
      <ParticleBackground />

      {/* Hero Badge */}
      <div className="bg-gradient-cyan-magenta text-black text-[10px] md:text-sm font-black px-6 py-2 rounded-full mb-8 tracking-[0.2em] uppercase shadow-lg animate-pulse">
        LAUNCHING SOON – $1 BILLION+ BACKED
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-9xl font-black mb-2 text-gradient-magenta tracking-tighter text-center">
        AIGOD'S
      </h1>
      <p className="text-cyan-400 font-black tracking-[0.5em] text-xs md:text-sm mb-10 uppercase">The Future of AI Intelligence</p>

      {/* Description Section */}
      <div className="max-w-2xl text-center px-4 space-y-6">
        <p className="text-xl md:text-2xl font-bold text-gray-100 leading-relaxed">
          <span className="text-cyan-400">AIGODS</span> is the world's first decentralized superintelligence token, powering AI agents and autonomous economies.
        </p>
        <p className="text-sm md:text-lg text-gray-400 font-medium">
          Backed by <span className="text-white font-bold">BlackRock, Tesla, Twitter/X, OpenAI, NVIDIA, Google, Apple, Microsoft</span> and over $1 billion in committed capital.
        </p>
      </div>

      {/* Video Section */}
      <div className="mt-12 w-full max-w-4xl aspect-video bg-[#050510] rounded-[2.5rem] relative overflow-hidden border-4 border-gray-900 shadow-2xl shadow-purple-900/40 group cursor-pointer">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="AIGODS Official Showcase"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Presale Details Section */}
      <div className="mt-24 text-center w-full max-w-4xl px-4">
        <h2 className="text-4xl md:text-5xl font-black text-cyan-400 mb-12 tracking-wider">PRESALE DETAILS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-md">
            <span className="block text-gray-500 text-xs font-bold uppercase mb-3">Stage 1 Price</span>
            <span className="text-5xl font-black text-white">$0.20</span>
            <div className="mt-4 text-green-500 font-bold text-sm">Active Now</div>
          </div>
          <div className="p-8 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-md opacity-70">
            <span className="block text-gray-500 text-xs font-bold uppercase mb-3">Stage 2 Price</span>
            <span className="text-5xl font-black text-white">$0.80</span>
            <div className="mt-4 text-gray-500 font-bold text-sm italic">Next Phase</div>
          </div>
          <div className="p-8 bg-cyan-900/20 rounded-3xl border-2 border-cyan-500/50 backdrop-blur-md">
            <span className="block text-cyan-400 text-xs font-bold uppercase mb-3">Launch Price</span>
            <span className="text-5xl font-black text-white">$3.50</span>
            <div className="mt-4 text-cyan-400 font-bold text-sm">Q4 2026</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-3xl font-black">
          <div className="flex items-center gap-3 text-green-500">
            <span className="text-gray-400">→</span> Stage 1: <span className="text-white">17.5X Returns</span>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-800"></div>
          <div className="flex items-center gap-3 text-green-400">
            Stage 2: <span className="text-white">4.375X Returns</span> <span className="text-gray-400">←</span>
          </div>
        </div>
      </div>

      {/* Token Calculator Card */}
      <div className="mt-20 w-full max-w-xl bg-gray-900/70 border border-cyan-500/30 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-2xl">
        <h3 className="text-cyan-400 font-black text-center text-sm tracking-widest mb-10 uppercase">TOKEN CALCULATOR</h3>
        
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Investment Amount</label>
              <input 
                type="number" 
                placeholder="0.0"
                className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-5 text-white font-black text-xl focus:outline-none focus:border-cyan-500 transition-all"
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Asset</label>
              <select 
                className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-5 text-white font-black text-xl focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer transition-all"
                value={calcChain}
                onChange={(e) => setCalcChain(e.target.value)}
              >
                <option>BNB</option>
                <option>SOL</option>
                <option>MATIC</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Presale Phase</label>
            <select 
              className="w-full bg-black/50 border-2 border-gray-800 rounded-2xl p-5 text-white font-black text-xl focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer transition-all"
              value={calcStage}
              onChange={(e) => setCalcStage(e.target.value)}
            >
              <option value="Stage 1">Stage 1 ($0.20)</option>
              <option value="Stage 2">Stage 2 ($0.80)</option>
            </select>
          </div>
          
          <div className="bg-black/60 p-8 rounded-3xl border border-gray-800 text-center shadow-inner">
            <div className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-2">Equivalent AIGODS Tokens</div>
            <div className="text-5xl font-black text-cyan-400 tracking-tighter">{calculatedTokens.toLocaleString()}</div>
            <div className="mt-4 text-green-500 font-black text-lg animate-bounce">
              Potential Listing Value: ${potentialProfit} ({potentialX}X)
            </div>
          </div>
        </div>
      </div>

      {/* Payment Selection Buttons */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl px-4">
        <button className="bg-[#f3ba2f] text-black font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110">
          BNB CHAIN
        </button>
        <button className="bg-[#8247e5] text-white font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110">
          POLYGON
        </button>
        <button className="bg-white text-black font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110">
          SOLANA
        </button>
        <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30">
          <CreditCard size={24} /> DEBIT/CREDIT
        </button>
      </div>
      <p className="mt-6 text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">Select Payment Method to Proceed</p>

      {/* Main Buy Input */}
      <div className="mt-12 w-full max-w-2xl flex flex-col md:flex-row gap-5 px-4">
        <input 
          type="text"
          placeholder="Amount (BNB/SOL/MATIC/USD)"
          className="flex-1 bg-gray-900/50 border-2 border-gray-800 rounded-3xl py-5 px-10 text-white font-black text-lg focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
        />
        <button className="bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-black font-black py-5 px-14 rounded-3xl hover:brightness-110 hover:scale-[1.03] transition-all uppercase tracking-tighter text-2xl shadow-2xl shadow-cyan-500/20">
          BUY AIGODS NOW
        </button>
      </div>

      {/* Free Claim Button */}
      <button className="mt-16 bg-green-500 text-black font-black text-2xl py-6 px-20 rounded-[2rem] neon-glow-green hover:bg-green-400 hover:scale-105 transition-all uppercase tracking-tight shadow-2xl">
        Claim 100 AIGODS Free
      </button>

      {/* Referral Section */}
      <div className="mt-24 w-full max-w-2xl bg-gray-900/70 border border-purple-500/40 rounded-[3rem] p-12 text-center backdrop-blur-xl shadow-2xl">
        <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">50% INSTANT REWARDS</h3>
        <p className="text-gray-400 font-bold mb-10 leading-relaxed text-lg">
          Earn 50% commission on all referred purchases instantly.
        </p>
        
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 bg-black/50 border-2 border-gray-800 text-gray-600 py-5 px-8 rounded-2xl text-sm font-black flex items-center justify-between shadow-inner">
            <span>Connect wallet to generate referral link</span>
            <Lock size={20} />
          </div>
          <button 
            onClick={() => copyToClipboard('Connect wallet first')}
            className="bg-white text-black py-5 px-12 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl active:scale-95"
          >
            <Copy size={22} /> Copy Link
          </button>
        </div>
      </div>

      {/* Backed Logos */}
      <LogoGrid />

      {/* CertiK Audit Badge - Professional Footer Placement */}
      <div className="mt-24 flex flex-col items-center gap-6 bg-gray-900/40 p-10 rounded-[3rem] border-2 border-green-500/30 max-w-2xl w-full shadow-2xl">
        <div className="flex items-center gap-5 text-green-400 font-black text-2xl md:text-3xl uppercase tracking-tighter">
          <ShieldCheck size={48} className="text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          Audited by CertiK
        </div>
        <p className="text-gray-400 text-center text-base font-bold leading-relaxed">
          The AIGODS smart contract has successfully passed comprehensive security audits by CertiK, ensuring maximum safety for all investors.
        </p>
        <a href="#" className="bg-green-600/20 text-green-400 py-3 px-8 rounded-full text-xs font-black tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center gap-2">
          VIEW AUDIT REPORT <ExternalLink size={14} />
        </a>
      </div>

      {/* Footer Socials & Community Links */}
      <div className="mt-24 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t-2 border-gray-900 pt-20">
          <div className="space-y-8">
            <h4 className="text-cyan-400 font-black text-2xl uppercase tracking-[0.2em] italic">AIGODS OFFICIAL</h4>
            <div className="flex flex-wrap gap-8">
              <a href="https://x.com/AIGODSCOIN" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-all transform hover:scale-125"><Twitter size={36} /></a>
              <a href="https://t.me/AIGODSCOINOFFICIAL" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-all transform hover:scale-125"><Send size={36} /></a>
              <a href="https://t.me/AIGODSCOIN" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-all transform hover:scale-125"><MessageSquare size={36} /></a>
              <a href="https://www.youtube.com/@AIGODSCOINOFFICIAL" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-all transform hover:scale-125"><Youtube size={36} /></a>
            </div>
            <p className="text-gray-600 text-sm font-bold">Join the fastest growing decentralized AI community.</p>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[#ff00ff] font-black text-2xl uppercase tracking-[0.2em] italic">INFLUENCER HUB</h4>
            <div className="flex flex-wrap gap-8">
              <a href="https://x.com/elonmusk" target="_blank" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><Twitter size={36} /></a>
              <a href="https://www.instagram.com/elonmusk" target="_blank" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><Instagram size={36} /></a>
              <a href="#" target="_blank" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><MessageSquare size={36} /></a>
              <a href="#" target="_blank" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><ExternalLink size={36} /></a>
            </div>
            <p className="text-gray-600 text-sm font-bold">Bridging the gap between titans and the future.</p>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="mt-24 text-center space-y-4">
        <p className="text-gray-700 text-[11px] font-black tracking-[0.4em] uppercase">
          © 2026 AI GODS – THE INTELLIGENCE LAYER OF WEB3
        </p>
        <p className="text-gray-800 text-[10px] font-bold max-w-2xl px-8 leading-relaxed mx-auto uppercase">
          DISCLAIMER: CRYPTOCURRENCY INVESTMENTS CARRY HIGH RISK. ONLY INVEST WHAT YOU CAN AFFORD TO LOSE. AIGODS IS A DECENTRALIZED PROTOCOL.
        </p>
      </div>

      {/* Safe Area for Mobile */}
      <div className="h-20"></div>
    </div>
  );
};

export default App;

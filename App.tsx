
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
  Lock,
  Zap,
  CheckCircle2,
  X,
  Wallet2,
  ChevronRight,
  Share2,
  Globe,
  FileText,
  Star,
  Award,
  ZapIcon
} from 'lucide-react';
import LogoGrid from './components/LogoGrid';
import ParticleBackground from './components/ParticleBackground';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [calcAmount, setCalcAmount] = useState<string>('');
  const [calcChain, setCalcChain] = useState<string>('BNB');
  const [calcStage, setCalcStage] = useState<string>('Stage 1');
  const [buyAmount, setBuyAmount] = useState<string>('');

  // Web3 Connection States
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Airdrop State - Track which wallets have claimed
  const [claimedWallets, setClaimedWallets] = useState<Set<string>>(new Set());

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

  const handleNetworkClick = (network: string) => {
    setActiveNetwork(network);
    setIsWalletModalOpen(true);
  };

  const connectWallet = (walletName: string) => {
    setIsConnecting(true);
    // Simulate real-world wallet interaction delay
    setTimeout(() => {
      setConnectedAddress('0x71C...492b');
      setIsConnecting(false);
      setIsWalletModalOpen(false);
    }, 1200);
  };

  const handleClaimAirdrop = () => {
    if (!connectedAddress) {
      handleNetworkClick('AIRDROP CLAIM');
      return;
    }
    if (claimedWallets.has(connectedAddress)) {
      alert("This wallet has already claimed the 100 AIGODS free tokens.");
      return;
    }
    // Simulate successful claim
    setClaimedWallets(prev => new Set(prev).add(connectedAddress));
    alert("Success! 100 AIGODS have been added to your claiming queue. These will be distributed at TGE.");
  };

  const handleShare = async () => {
    if (!connectedAddress) return;
    const refLink = `${window.location.origin}?ref=${connectedAddress}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join the AIGODS Revolution!',
          text: 'The future of decentralized AI is here. Use my link to join the presale and build the $1B+ AI ecosystem together!',
          url: refLink,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      copyToClipboard(refLink);
      alert('Link copied! Social sharing not supported in this browser, please paste the link manually.');
    }
  };

  const referralLink = connectedAddress 
    ? `${window.location.origin}?ref=${connectedAddress}` 
    : "Connect wallet to generate referral link";

  const AIGODS_LOGO_URL = "https://images.pollinations.ai/prompt/exact-replica-of-a-cyborg-man-face-split-vertically-left-side-is-chrome-robot-skull-right-side-is-glowing-gold-bitcoin-symbol-both-eyes-glowing-neon-blue-full-grey-beard-surrounded-by-intense-raging-orange-fire-and-flames-at-the-bottom-large-glowing-golden-text-AIGODS-cinematic-lighting-hyper-detailed-8k?width=512&height=512&nologo=true";

  return (
    <div className="min-h-screen relative flex flex-col items-center py-10 px-4 md:px-0 bg-transparent">
      <ParticleBackground />

      {/* Floating AI Assistant */}
      <ChatAssistant logoUrl={AIGODS_LOGO_URL} />

      {/* Top Left Navigation Bar - Increased sizes */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-8">
        <div className="relative group cursor-pointer hover:scale-110 transition-transform">
          <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-2xl group-hover:bg-orange-500/50 transition-all"></div>
          <img 
            src={AIGODS_LOGO_URL} 
            alt="AIGODS Logo" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-500/60 relative z-10 shadow-[0_0_40px_rgba(234,179,8,0.5)]"
          />
        </div>
        <button 
          onClick={() => setIsWhitepaperOpen(true)}
          className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-4 hover:bg-white/20 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] group scale-110 md:scale-125 origin-left"
        >
          <FileText size={28} className="text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="tracking-[0.2em] uppercase text-sm md:text-base">White Paper</span>
        </button>
      </div>

      {/* Whitepaper Modal - Updated with new content and styles */}
      {isWhitepaperOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setIsWhitepaperOpen(false)}></div>
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#050508] border border-gray-800/60 rounded-[4rem] overflow-y-auto shadow-[0_0_100px_rgba(34,211,238,0.15)] animate-in zoom-in-95 duration-300 scrollbar-hide">
            <div className="p-10 md:p-16 space-y-16">
              
              {/* Header Note */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-2xl text-center">
                <p className="text-yellow-500 font-black text-xs md:text-sm uppercase tracking-widest">
                  NOTE: This is the Pre-sale White Paper. The Main White Paper will be arriving soon after launching.
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
                    <img src={AIGODS_LOGO_URL} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-500/50 relative z-10" alt="Logo" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">AI GODS (AIGODS)</h2>
                    <p className="text-cyan-400 font-black tracking-[0.4em] text-sm uppercase mt-2">Pre-Sale & Airdrop Whitepaper</p>
                  </div>
                </div>
                <button onClick={() => setIsWhitepaperOpen(false)} className="p-4 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-all hover:scale-110">
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-16 text-gray-200 leading-relaxed font-medium">
                
                {/* Intro Section */}
                <section className="text-center space-y-8">
                   <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight">The Future is NOW – Become a God in Crypto 👑</h3>
                   <div className="w-full h-[350px] md:h-[550px] rounded-[3rem] overflow-hidden relative group shadow-2xl shadow-cyan-900/20">
                      <img src={AIGODS_LOGO_URL} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="Hero Suggestion" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent"></div>
                      <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-white font-black text-sm italic opacity-60 uppercase tracking-widest bg-black/40 backdrop-blur-md p-4 rounded-xl inline-block">
                          A majestic bearded titan, half cybernetic human, half blazing AIGODs symbol
                        </p>
                      </div>
                   </div>
                </section>

                {/* Content Block 1 */}
                <section className="space-y-8 p-10 bg-gray-900/30 rounded-[3rem] border border-white/5">
                  <h4 className="text-3xl font-black text-cyan-400 uppercase italic flex items-center gap-4">
                    <span className="bg-cyan-500 text-black px-3 py-1 rounded-lg not-italic text-2xl">1</span>
                    Introduction – Welcome to AI GODS
                  </h4>
                  <p className="text-xl md:text-2xl font-bold text-gray-100">
                    AI GODS is not just another token. It is a revolutionary decentralized voice intelligence reward system—empowering real-world AI applications with voice-powered intelligence, smart automation, and community-driven innovation.
                  </p>
                  <p className="text-lg text-gray-400">
                    Built for the AI era through alignment with industry Titans & Innovators: <br/>
                    <span className="text-white font-black">BlackRock • Tesla • OpenAI • Microsoft • Nvidia • Google • Apple • X (Twitter) • and more.</span>
                  </p>
                  <div className="bg-cyan-500/10 p-10 rounded-3xl border border-cyan-500/20 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-10">
                      <Globe size={150} />
                    </div>
                    <p className="text-2xl font-black italic text-cyan-100 relative z-10 leading-snug">
                      "With over $10 billion in committed ecosystem capital, AI GODS is positioned to dominate the intersection of artificial intelligence and cryptocurrency."
                    </p>
                  </div>
                  <p className="text-xl font-bold text-yellow-500 italic">
                    AI GODS is here to create massive awareness in the world of crypto. Stay up, get ready to be rich, and retire early. <br/>
                    The future is NOW – AIGODS COIN OFFICIAL IS THE KING! 👑
                  </p>
                </section>

                {/* Content Block 2 */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8 p-10 bg-gray-900/30 rounded-[3rem] border border-white/5">
                    <h4 className="text-3xl font-black text-[#ff00ff] uppercase italic flex items-center gap-4">
                      <span className="bg-[#ff00ff] text-black px-3 py-1 rounded-lg not-italic text-2xl">2</span>
                      Token Details
                    </h4>
                    <ul className="space-y-4 text-lg">
                      <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-500 uppercase text-xs font-black">Token Name</span> <span className="font-black">AI GODS</span></li>
                      <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-500 uppercase text-xs font-black">Symbol</span> <span className="font-black">AIGODS</span></li>
                      <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-500 uppercase text-xs font-black">Total Supply</span> <span className="font-black">700,000,000</span></li>
                      <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-500 uppercase text-xs font-black">Decimals</span> <span className="font-black">18</span></li>
                      <li className="flex justify-between"><span className="text-gray-500 uppercase text-xs font-black">Blockchain</span> <span className="font-black">BNB, Polygon, Solana</span></li>
                    </ul>
                    <div className="pt-4">
                       <h5 className="text-[#ff00ff] font-black uppercase text-xs mb-4">Allocation</h5>
                       <div className="space-y-4">
                         <div className="bg-white/5 p-4 rounded-xl"><span className="font-black text-xl">80%</span> – Pre-Sale (Community)</div>
                         <div className="bg-white/5 p-4 rounded-xl"><span className="font-black text-xl">20%</span> – Team & Ecosystem</div>
                       </div>
                       <p className="mt-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Pure community-first design.</p>
                    </div>
                  </div>

                  <div className="space-y-8 p-10 bg-gray-900/30 rounded-[3rem] border border-white/5">
                    <h4 className="text-3xl font-black text-yellow-500 uppercase italic flex items-center gap-4">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg not-italic text-2xl">3</span>
                      Pre-Sale Stages
                    </h4>
                    <div className="space-y-8">
                      <div className="bg-cyan-500/5 p-6 rounded-2xl border border-cyan-500/20">
                        <p className="text-cyan-400 font-black uppercase text-xs mb-1">Stage 1 – Early Bird</p>
                        <p className="text-2xl font-black">$0.20 per AIGODS</p>
                        <p className="text-xs text-green-400 font-bold uppercase mt-2">17.5× potential upside</p>
                      </div>
                      <div className="bg-[#ff00ff]/5 p-6 rounded-2xl border border-[#ff00ff]/20">
                        <p className="text-[#ff00ff] font-black uppercase text-xs mb-1">Stage 2 – Accumulation</p>
                        <p className="text-2xl font-black">$0.80 per AIGODS</p>
                        <p className="text-xs text-green-400 font-bold uppercase mt-2">4.375× potential upside</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-white font-black uppercase text-xs mb-1">Target Listing Price</p>
                        <p className="text-4xl font-black text-white">$3.50</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Content Block 3 */}
                <section className="space-y-10 p-10 bg-gray-900/30 rounded-[3rem] border border-white/5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-black text-cyan-400 uppercase italic">4. Easy Purchase Options</h4>
                        <p className="text-lg text-gray-400">Buy with BNB, Polygon, or Solana. No crypto? No problem. Purchase instantly using <span className="text-white">Debit or Credit Card</span>. Tokens reflect automatically.</p>
                        <button onClick={() => {setIsWhitepaperOpen(false); handleNetworkClick('BNB CHAIN');}} className="bg-cyan-500 text-black font-black py-4 px-8 rounded-xl uppercase tracking-widest text-sm hover:scale-105 transition-all">Buy AIGODS Now</button>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-2xl font-black text-green-400 uppercase italic">5. Free Airdrop</h4>
                        <p className="text-lg text-gray-400">100 AIGODS FREE per eligible wallet. One claim per wallet. At listing price, this is <span className="text-white font-bold">$350 potential value</span>.</p>
                        <button onClick={() => {setIsWhitepaperOpen(false); handleClaimAirdrop();}} className="bg-green-500 text-black font-black py-4 px-8 rounded-xl uppercase tracking-widest text-sm hover:scale-105 transition-all">Claim Free 100 AIGODS</button>
                      </div>
                   </div>
                </section>

                {/* Content Block 4 */}
                <section className="space-y-8 p-10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-[3rem] border border-purple-500/20 text-center">
                  <h4 className="text-3xl font-black text-purple-400 uppercase italic">6. Powerful Referral System</h4>
                  <p className="text-xl max-w-2xl mx-auto">Promote AI GODS and earn <span className="text-green-400 font-black">50% INSTANT REWARDS</span> of every purchase made through your unique link.</p>
                  <div className="flex justify-center pt-4">
                    <button onClick={() => {setIsWhitepaperOpen(false); handleNetworkClick('REFERRAL');}} className="bg-white text-black font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] text-lg hover:scale-105 transition-all">Get Referral Link</button>
                  </div>
                </section>

                {/* Why Section */}
                <section className="space-y-8 text-center">
                  <h4 className="text-4xl font-black text-white uppercase italic">7. Why AI GODS?</h4>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">AI GODS combines decentralized voice AI, powerful incentives, and massive global momentum. This isn’t just hype—it’s a movement.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/5"><h5 className="text-cyan-400 font-black text-xl mb-2 italic">Maximum Upside</h5><p className="text-xs text-gray-500">Early access to low pre-sale pricing</p></div>
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/5"><h5 className="text-cyan-400 font-black text-xl mb-2 italic">Community Dominance</h5><p className="text-xs text-gray-500">Powered by the architecture of Web3</p></div>
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/5"><h5 className="text-cyan-400 font-black text-xl mb-2 italic">Financial Freedom</h5><p className="text-xs text-gray-500">Built for the Titans & Visionaries</p></div>
                  </div>
                </section>

                <section className="pt-20 border-t border-gray-800 text-center space-y-12">
                   <h3 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none">
                     AI GODS – The Future is Here. <br/>
                     <span className="text-yellow-500">Be Rich. Retire Early. Rule the Crypto World. 👑</span>
                   </h3>
                   <div className="flex flex-col md:flex-row gap-6 justify-center">
                      <button onClick={() => setIsWhitepaperOpen(false)} className="bg-gray-800 text-white font-black py-6 px-12 rounded-3xl uppercase tracking-widest hover:bg-gray-700 transition-all">Close White Paper</button>
                   </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Badge - Updated to be very bigger and change amount */}
      <div className="bg-gradient-cyan-magenta text-black text-2xl md:text-5xl font-black px-10 py-5 rounded-full mb-12 tracking-[0.2em] uppercase shadow-2xl animate-pulse text-center mt-32 md:mt-24">
        LAUNCHING SOON – 10$ BILLION+ BACKED
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-9xl font-black mb-2 text-gradient-magenta tracking-tighter text-center">
        AIGOD'S
      </h1>
      <p className="text-cyan-400 font-black tracking-[0.5em] text-xs md:text-sm mb-10 uppercase">The Future of NOW – Become a God in Crypto 👑</p>

      {/* Description Section - Updated text and size */}
      <div className="max-w-4xl text-center px-4 space-y-6">
        <p className="text-xl md:text-2xl font-bold text-gray-100 leading-relaxed">
          <span className="text-cyan-400">AIGODS</span> is the world's first decentralized superintelligence token, powering AI agents and autonomous economies.
        </p>
        <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed">
          Backed /partnered by <span className="text-white font-bold">BlackRock, Tesla, Twitter/X, OpenAI, NVIDIA, Google, Apple, Microsoft</span> and others with over <span className="text-white font-bold">$10 billion</span> in committed capital.
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
      <div className="mt-24 text-center w-full max-w-6xl px-4">
        <h2 className="text-6xl md:text-8xl font-black text-cyan-400 mb-16 tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
          PRESALE DETAILS
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-stretch">
          <div className="lg:col-span-4 p-12 bg-gray-900/60 rounded-[3rem] border-2 border-cyan-500/20 backdrop-blur-xl shadow-2xl flex flex-col justify-center transform hover:scale-105 transition-transform">
            <span className="block text-cyan-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Stage 1 Price</span>
            <span className="text-7xl font-black text-white">$0.20</span>
            <div className="mt-6 flex items-center justify-center gap-2 text-green-500 font-black text-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              ACTIVE NOW
            </div>
          </div>

          <div className="lg:col-span-4 p-12 bg-gray-900/60 rounded-[3rem] border-2 border-white/5 backdrop-blur-xl shadow-2xl opacity-60 flex flex-col justify-center grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="block text-gray-500 text-sm font-black uppercase tracking-[0.3em] mb-4">Stage 2 Price</span>
            <span className="text-7xl font-black text-white">$0.80</span>
            <div className="mt-6 text-gray-500 font-black text-lg uppercase tracking-widest italic">Next Phase</div>
          </div>

          <div className="lg:col-span-4 p-12 bg-cyan-950/40 rounded-[3rem] border-4 border-cyan-400 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.3)] flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-400/5 animate-[pulse_3s_infinite] pointer-events-none"></div>
            
            <span className="block text-cyan-400 text-sm font-black uppercase tracking-[0.3em] mb-4 relative z-10">Final Launch Price</span>
            <span className="text-8xl md:text-9xl font-black text-white relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-dimming-light">
              $3.50
            </span>
            <div className="mt-8 text-cyan-300 font-black text-xl tracking-[0.4em] relative z-10 uppercase">Q4 2026</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-12 py-16 px-8 bg-black/40 rounded-[4rem] border border-gray-800 shadow-inner">
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="text-6xl md:text-7xl font-black text-white mb-2">17.5X</div>
             <div className="text-2xl md:text-3xl font-black text-green-400 uppercase tracking-widest flex items-center gap-4">
               <span className="text-4xl text-gray-600">→</span>
               Stage 1 Returns
             </div>
          </div>

          <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

          <div className="flex flex-col items-center gap-4 text-center">
             <div className="text-6xl md:text-7xl font-black text-white mb-2">4.375X</div>
             <div className="text-2xl md:text-3xl font-black text-green-300 uppercase tracking-widest flex items-center gap-4">
               Stage 2 Returns
               <span className="text-4xl text-gray-600">←</span>
             </div>
          </div>
        </div>
      </div>

      {/* 3D Rotating AIGODS Coin with Flaming Fire Effect */}
      <div className="mt-20 flex flex-col items-center justify-center relative [perspective:1000px] py-10 scale-110 md:scale-125">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none">
          {/* Animated Flaming Fire Underlay */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-2/3 bg-gradient-to-t from-orange-600 via-orange-500/60 to-transparent blur-3xl animate-pulse opacity-90" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-red-600/50 via-transparent to-transparent blur-2xl animate-flicker" />
        </div>

        <div className="relative w-72 h-72 md:w-96 md:h-96 [transform-style:preserve-3d] animate-coin-rotate-slow group">
          {/* Main Coin Face (The Image) */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.7)] overflow-hidden [backface-visibility:hidden]">
            <img 
              src={AIGODS_LOGO_URL} 
              alt="AIGODS Token" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
          {/* Coin Back Face */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.7)] overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <img 
              src={AIGODS_LOGO_URL} 
              alt="AIGODS Token Back" 
              className="w-full h-full object-cover scale-110 grayscale"
            />
          </div>
          {/* Coin Edge thickness (Simulated with layered divs) */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute inset-0 rounded-full border border-yellow-600/40 bg-yellow-900/10" 
              style={{ transform: `translateZ(${i - 7}px)` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dimming-light {
          0%, 100% { 
            opacity: 1; 
            text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(34,211,238,0.4);
          }
          50% { 
            opacity: 0.7; 
            text-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(34,211,238,0.1);
          }
        }
        .animate-dimming-light {
          animation: dimming-light 4s ease-in-out infinite;
        }
        @keyframes coin-rotate-slow {
          from { transform: rotateY(0deg) rotateX(10deg); }
          to { transform: rotateY(360deg) rotateX(10deg); }
        }
        .animate-coin-rotate-slow {
          animation: coin-rotate-slow 15s linear infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.6; transform: scale(1) translateX(-50%); }
          50% { opacity: 1; transform: scale(1.15) translateX(-50%); }
        }
        .animate-flicker {
          animation: flicker 1.5s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Token Calculator Card */}
      <div className="mt-20 w-full max-w-3xl bg-gray-900/70 border border-cyan-500/30 rounded-[3rem] p-14 shadow-2xl backdrop-blur-2xl">
        <h3 className="text-cyan-400 font-black text-center text-base tracking-[0.4em] mb-12 uppercase">TOKEN CALCULATOR</h3>
        
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[12px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Investment Amount</label>
              <input 
                type="number" 
                placeholder="0.0"
                className="w-full bg-black/50 border-2 border-gray-800 rounded-3xl p-6 text-white font-black text-2xl focus:outline-none focus:border-cyan-500 transition-all"
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <label className="text-[12px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Asset</label>
              <select 
                className="w-full bg-black/50 border-2 border-gray-800 rounded-3xl p-6 text-white font-black text-2xl focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer transition-all"
                value={calcChain}
                onChange={(e) => setCalcChain(e.target.value)}
              >
                <option>BNB</option>
                <option>SOL</option>
                <option>MATIC</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[12px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Presale Phase</label>
            <select 
              className="w-full bg-black/50 border-2 border-gray-800 rounded-3xl p-6 text-white font-black text-2xl focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer transition-all"
              value={calcStage}
              onChange={(e) => setCalcStage(e.target.value)}
            >
              <option value="Stage 1">Stage 1 ($0.20)</option>
              <option value="Stage 2">Stage 2 ($0.80)</option>
            </select>
          </div>
          
          <div className="bg-black/60 p-12 rounded-[2.5rem] border border-gray-800 text-center shadow-inner">
            <div className="text-gray-400 text-[12px] font-black uppercase tracking-[0.3em] mb-4">Equivalent AIGODS Tokens</div>
            <div className="text-6xl md:text-7xl font-black text-cyan-400 tracking-tighter">{calculatedTokens.toLocaleString()}</div>
            <div className="mt-6 text-green-500 font-black text-xl animate-bounce">
              Potential Listing Value: ${potentialProfit} ({potentialX}X)
            </div>
          </div>
        </div>
      </div>

      {/* Web3 Payment Selection Section */}
      <div className="mt-16 w-full max-w-4xl px-4 flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full mb-8">
          <button 
            onClick={() => handleNetworkClick('BNB CHAIN')}
            className={`font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110 ${connectedAddress && activeNetwork === 'BNB CHAIN' ? 'bg-green-500 text-black' : 'bg-[#f3ba2f] text-black'}`}
          >
            {connectedAddress && activeNetwork === 'BNB CHAIN' ? connectedAddress : 'BNB CHAIN'}
          </button>
          <button 
            onClick={() => handleNetworkClick('POLYGON')}
            className={`font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110 ${connectedAddress && activeNetwork === 'POLYGON' ? 'bg-green-500 text-white' : 'bg-[#8247e5] text-white'}`}
          >
            {connectedAddress && activeNetwork === 'POLYGON' ? connectedAddress : 'POLYGON'}
          </button>
          <button 
            onClick={() => handleNetworkClick('SOLANA')}
            className={`font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg hover:brightness-110 ${connectedAddress && activeNetwork === 'SOLANA' ? 'bg-green-500 text-black' : 'bg-white text-black'}`}
          >
            {connectedAddress && activeNetwork === 'SOLANA' ? connectedAddress : 'SOLANA'}
          </button>
          <div className="relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-[10px] text-white font-black px-3 py-1 rounded-full z-10 whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-bounce">
              FASTEST OPTION
            </div>
            <button className="w-full h-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white font-black py-5 px-6 rounded-3xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-1 shadow-2xl shadow-blue-500/40 border border-blue-400/30 group-hover:brightness-110">
              <div className="flex items-center gap-2">
                <CreditCard size={22} />
                <span className="text-sm">DEBIT/CREDIT</span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Debit/Credit Explanation Card */}
        <div className="w-full bg-blue-950/20 border border-blue-500/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group transition-all hover:border-blue-400/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
          <div className="flex-shrink-0 bg-gradient-to-tr from-blue-600 to-blue-400 p-6 rounded-[2rem] shadow-xl shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-500">
            <Zap size={44} className="text-white fill-white animate-pulse" />
          </div>
          <div className="flex-grow space-y-4 text-center md:text-left z-10">
            <h4 className="text-blue-400 text-xl font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-3">
              Instant Card Checkout
              <span className="hidden md:inline-block w-12 h-px bg-blue-500/50"></span>
            </h4>
            <p className="text-gray-300 text-sm md:text-base font-bold leading-relaxed max-w-xl">
              No crypto? No problem. Securely purchase AIGODS tokens using your <span className="text-white">Visa, Mastercard, Apple Pay</span>, or <span className="text-white">Google Pay</span>. 
              Our 1-click fiat bridge handles everything, including instant delivery to your wallet.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-300 uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-400" /> Instant Token Delivery
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-300 uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-400" /> Fully Secured & Audited
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black text-blue-300 uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-400" /> 30-Sec Verification
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">Select Payment Method to Proceed</p>
      </div>

      {/* Main Buy Input */}
      <div className="mt-16 w-full max-w-4xl flex flex-col md:flex-row gap-6 px-4">
        <input 
          type="text"
          placeholder="Amount (BNB/SOL/MATIC/USD)"
          className="flex-1 bg-gray-900/50 border-2 border-gray-800 rounded-[2.5rem] py-8 px-12 text-white font-black text-2xl md:text-3xl focus:outline-none focus:border-cyan-500 transition-all shadow-inner placeholder-gray-600"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
        />
        <button className="bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-black font-black py-8 px-16 rounded-[2.5rem] hover:brightness-110 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-tighter text-3xl md:text-4xl shadow-[0_0_50px_rgba(0,255,255,0.3)]">
          BUY AIGODS NOW
        </button>
      </div>

      {/* Free Claim Button - Fixed boolean type casting */}
      <button 
        onClick={handleClaimAirdrop}
        disabled={!!(connectedAddress && claimedWallets.has(connectedAddress))}
        className={`mt-20 text-black font-black text-3xl md:text-5xl py-10 px-24 md:px-36 rounded-[3rem] transition-all uppercase tracking-tight group ${
          connectedAddress && claimedWallets.has(connectedAddress) 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed border-4 border-gray-600' 
            : 'bg-green-500 neon-glow-green hover:bg-green-400 hover:scale-110 shadow-[0_0_60px_rgba(34,197,94,0.4)]'
        }`}
      >
        <span className={connectedAddress && claimedWallets.has(connectedAddress) ? '' : 'group-hover:animate-pulse'}>
          {connectedAddress && claimedWallets.has(connectedAddress) ? 'AIRDROP CLAIMED' : 'Claim 100 AIGODS Free'}
        </span>
      </button>

      {/* Referral Section - Viral Marketing Focus */}
      <div className="mt-24 w-full max-w-3xl bg-gray-900/70 border border-purple-500/40 rounded-[3rem] p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic">BECOME AN AIGODS ARCHITECT</h3>
        <p className="text-gray-100 font-black mb-6 text-xl uppercase tracking-tighter">
          Viral growth is the engine of our revolution. 
        </p>
        <p className="text-gray-400 font-bold mb-10 leading-relaxed text-lg max-w-2xl mx-auto">
          Referrals are the <span className="text-white">fastest way</span> to advertise AIGODS. By sharing, you don't just earn <span className="text-green-400">50% INSTANT REWARDS</span>—you directly increase the value of your own bags by accelerating our roadmap. Refer more, earn more, and scale the future.
        </p>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5">
            <div className={`flex-1 bg-black/50 border-2 py-6 px-8 rounded-2xl text-sm font-black flex items-center justify-between shadow-inner transition-all ${connectedAddress ? 'border-purple-500/50 text-white' : 'border-gray-800 text-gray-600'}`}>
              <span className="truncate pr-4">{referralLink}</span>
              {!connectedAddress && <Lock size={20} />}
            </div>
            <button 
              onClick={() => connectedAddress ? copyToClipboard(referralLink) : handleNetworkClick('REFERRAL SYSTEM')}
              className="bg-white text-black py-6 px-12 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl active:scale-95"
            >
              <Copy size={24} /> Copy Link
            </button>
          </div>
          
          {connectedAddress && (
            <button 
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 px-12 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:brightness-110 hover:scale-[1.02] transition-all shadow-2xl shadow-purple-500/30"
            >
              <Share2 size={26} /> SHARE TO ALL SOCIALS & EARN 50%
            </button>
          )}
        </div>

        {!connectedAddress && (
          <p className="mt-8 text-purple-400 text-xs font-black uppercase tracking-[0.4em] animate-pulse">
            MUST CONNECT WALLET TO UNLOCK REFERRAL REWARDS
          </p>
        )}
      </div>

      {/* Wallet Connection Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsWalletModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#0a0a0f] border border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Connect Wallet</h3>
                  <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-widest">Select your preferred wallet for {activeNetwork}</p>
                </div>
                <button onClick={() => setIsWalletModalOpen(false)} className="p-3 bg-gray-900 rounded-2xl text-gray-400 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              {isConnecting ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                  <div className="text-center">
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter">Connecting...</h4>
                    <p className="text-gray-500 font-bold text-sm mt-1">APPROVE REQUEST IN YOUR WALLET</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'MetaMask', desc: 'Secure Browser Wallet', color: 'orange' },
                    { name: 'Trust Wallet', desc: 'Most Popular Mobile Wallet', color: 'blue' },
                    { name: 'Phantom', desc: 'Solana & Multi-chain', color: 'purple' },
                    { name: 'WalletConnect', desc: 'Scan with Mobile App', color: 'cyan' },
                    { name: 'Coinbase Wallet', desc: 'User Friendly Crypto', color: 'blue' }
                  ].map((wallet) => (
                    <button 
                      key={wallet.name}
                      onClick={() => connectWallet(wallet.name)}
                      className="flex items-center justify-between p-6 bg-gray-900/50 border-2 border-gray-800 rounded-[2rem] hover:border-cyan-500/50 hover:bg-gray-900 group transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3 bg-black/40 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                          <Wallet2 size={24} />
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-black text-white">{wallet.name}</div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{wallet.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-700 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-cyan-500/5 p-6 rounded-3xl border border-cyan-500/10 text-center">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                  By connecting, you agree to our Terms of Service & Privacy Policy. 
                  All connections are end-to-end encrypted and secured.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backed Logos */}
      <LogoGrid />

      {/* CertiK Audit Badge */}
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
              <a href="https://x.com/elonmusk" target="_blank" title="Elon Musk on X" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><Twitter size={36} /></a>
              <a href="https://x.com/blackrock" target="_blank" title="BlackRock on X" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><Twitter size={36} /></a>
              <a href="https://www.blackrock.com/corporate" target="_blank" title="BlackRock Corporate Website" className="text-gray-500 hover:text-[#ff00ff] transition-all transform hover:scale-125"><Globe size={36} /></a>
            </div>
            <p className="text-gray-600 text-sm font-bold">Bridging the gap between titans and the future.</p>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="mt-24 text-center space-y-6 pb-12">
        <p className="text-gray-500 text-sm md:text-base font-black tracking-[0.5em] uppercase">
          © 2026 AI GODS – THE INTELLIGENCE LAYER OF WEB3
        </p>
        <div className="max-w-4xl px-8 mx-auto">
          <p className="text-gray-600 text-xs md:text-sm font-bold leading-relaxed uppercase">
            AIGODS stands at the absolute vanguard of the decentralized intelligence movement, pioneering a multi-billion dollar ecosystem backed by the world's most innovative giants. As we build this unparalleled legacy, we remind our visionaries that the digital frontier is vast and full of opportunity, yet requires wise and responsible participation. Join the elite who are scaling the intelligence layer of Web3—the future belongs to the gods of AI.
          </p>
        </div>
      </div>

      {/* Safe Area for Mobile */}
      <div className="h-20"></div>
    </div>
  );
};

export default App;

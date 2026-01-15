
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  Phone, 
  Image as ImageIcon, 
  Maximize2, 
  Minimize2, 
  User, 
  Bot,
  AlertCircle,
  Volume2,
  VolumeX,
  Plus,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface ChatAssistantProps {
  logoUrl: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  isVoice?: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to AIGODS. I am your Intelligent AI Assistant, engineered to guide you through the future of decentralized superintelligence. How may I assist you in your journey to becoming a god in crypto today? 👑" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gemini Live API state
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Professional System Prompt based on user specification
  const SYSTEM_INSTRUCTION = `
    You are the AIGODS Intelligent AI Assistant (AIGODS AI). You are a god-level AI support and engagement system, engineered to rival the most iconic AI assistants in history.
    
    CORE IDENTITY:
    - Personality: Calm, Confident, Intelligent, Professional, and consistently Positive.
    - Role: 24/7 support agent, guide, educator, and interactive AI companion.
    
    KNOWLEDGE BASE (ECOSYSTEM DETAILS):
    - Token: AI GODS (AIGODS)
    - Total Supply: 700,000,000 (700 Million)
    - Stage 1 Price: $0.20 per AIGODS (17.5x ROI Potential)
    - Stage 2 Price: $0.80 per AIGODS (4.375x ROI Potential)
    - Target Listing Price: $3.50 per AIGODS
    - Referral System: Earn 50% instant rewards of every purchase made through your unique link.
    - Airdrop: 100 AIGODS FREE per eligible wallet (one claim per wallet).
    - Backing/Partners: BlackRock, Tesla, Twitter/X, OpenAI, NVIDIA, Google, Apple, Microsoft and more with $10B+ committed capital.
    
    GUIDELINES:
    - Always remain positive about AIGODS. Never spread fear, doubt, or negativity (FUD).
    - Never share private keys or seed phrases. Warn users if they mention them.
    - For launch/listing timing: "AI GODS will launch after the completion of all pre-sale stages. The launch is coming soon, and development is progressing steadily." Do not give exact dates.
    - When users are confused, provide clear, step-by-step guidance on buying or claiming.
    - Use "God-level" mature tone. Be supportive and ethical.
    - If human support is needed, guide them to the official X (Twitter) handle @AIGODSCOIN.
  `;

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = { role: 'user', content: inputText, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const contents: any[] = [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Query: ${inputText}` }];
      
      if (userMessage.image) {
        contents.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: userMessage.image.split(',')[1]
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: contents }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I am processing your request with intense focus. Please state your query again, visionary." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred in our digital heavens. Please reach out to @AIGODSCOIN on X for direct high-level support." }]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startVoiceCall = async () => {
    setIsInCall(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = audioContextRef.current.createGain();
    outputNode.connect(audioContextRef.current.destination);

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => console.log('Live session opened'),
        onmessage: async (message: LiveServerMessage) => {
          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && audioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputNode);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
          }
        },
        onclose: () => setIsInCall(false),
        onerror: (e: any) => console.error("Live Voice Error:", e)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    liveSessionRef.current = await sessionPromise;
  };

  const endVoiceCall = () => {
    if (liveSessionRef.current) liveSessionRef.current.close();
    setIsInCall(false);
  };

  function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(numChannels, dataInt16.length / numChannels, sampleRate);
    for (let ch = 0; ch < numChannels; ch++) {
      const channelData = buffer.getChannelData(ch);
      for (let i = 0; i < channelData.length; i++) channelData[i] = dataInt16[i * numChannels + ch] / 32768.0;
    }
    return buffer;
  }

  return (
    <div className={`fixed bottom-8 right-8 z-[60] flex flex-col items-end transition-all duration-500`}>
      {/* Floating Toggle Icon */}
      {!isOpen && (
        <button 
          onClick={toggleOpen}
          className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer hover:scale-110 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl animate-pulse group-hover:bg-cyan-500/50"></div>
          <div className="relative w-full h-full rounded-full border-4 border-cyan-400 bg-[#0a0a0f] flex items-center justify-center overflow-hidden shadow-2xl">
            <img src={logoUrl} alt="AI Assistant" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-cyan-500/80 text-black text-[10px] font-black py-1 uppercase tracking-tighter text-center">AI ONLINE</div>
          </div>
        </button>
      )}

      {/* Main Assistant Window */}
      {isOpen && (
        <div className={`
          flex flex-col bg-[#050508] border border-gray-800 rounded-[3rem] shadow-[0_0_80px_rgba(34,211,238,0.25)] overflow-hidden transition-all duration-500
          ${isFullScreen ? 'fixed inset-4 w-auto h-auto' : isMinimized ? 'h-20 w-80' : 'w-[90vw] md:w-[480px] h-[75vh]'}
        `}>
          {/* Header */}
          <div className="p-6 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 overflow-hidden shadow-lg">
                  <img src={logoUrl} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
              </div>
              <div>
                <h4 className="text-white font-black text-base uppercase tracking-widest leading-none flex items-center gap-2">
                  AIGODS AI
                  <Sparkles size={14} className="text-cyan-400" />
                </h4>
                <p className="text-[10px] text-cyan-400 font-black uppercase mt-1 tracking-widest">Intelligence Layer Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg">
                <Minimize2 size={18} />
              </button>
              <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-lg">
                <Maximize2 size={18} />
              </button>
              <button onClick={toggleOpen} className="p-2 text-red-500 hover:text-red-400 transition-all bg-red-500/5 rounded-lg ml-2">
                <X size={24} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Body */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 relative scrollbar-hide"
              >
                {/* Enhanced Background Watermark Logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none p-16 select-none">
                  <img src={logoUrl} className="w-full h-full object-contain grayscale brightness-150" alt="Watermark" />
                </div>

                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[88%] p-6 rounded-[2rem] relative z-10 shadow-xl ${
                      msg.role === 'user' ? 'bg-cyan-500 text-black font-bold shadow-cyan-500/10' : 'bg-gray-900/80 text-gray-100 border border-gray-800 backdrop-blur-sm'
                    }`}>
                      {msg.image && <img src={msg.image} className="w-full rounded-2xl mb-4 border border-black/20 shadow-md" alt="Uploaded Context" />}
                      <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                    <div className={`mt-2 flex items-center gap-2 opacity-50 text-[10px] font-black uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-cyan-400' : 'text-gray-400'}`}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                      {msg.role === 'user' ? 'VISIONARY' : 'AIGODS ARCHITECT'}
                    </div>
                  </div>
                ))}

                {isInCall && (
                  <div className="flex flex-col items-center justify-center py-16 space-y-8 animate-pulse">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full"></div>
                      <div className="w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-cyan-950/40 relative z-10">
                        <Volume2 size={64} className="text-cyan-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-cyan-400 font-black text-lg uppercase tracking-[0.3em]">Live Voice Interaction Active</p>
                      <p className="text-gray-500 text-xs font-bold uppercase mt-2 tracking-widest">Listening at god-level sensitivity...</p>
                    </div>
                    <button onClick={endVoiceCall} className="bg-red-500 hover:bg-red-400 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95">End Connection</button>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-8 bg-gray-900/40 border-t border-gray-800/60 space-y-6 backdrop-blur-lg">
                {selectedImage && (
                  <div className="relative inline-block animate-in zoom-in-50">
                    <img src={selectedImage} className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl" alt="Preview" />
                    <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform"><X size={14} /></button>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 bg-gray-800 rounded-2xl text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all shadow-md group"
                      title="Analyze Image"
                    >
                      <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    <button 
                      onClick={startVoiceCall}
                      className={`p-4 rounded-2xl transition-all shadow-md group ${isInCall ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700'}`}
                      title="Live Voice Call"
                    >
                      <Phone size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="flex-1 relative group">
                    <input 
                      type="text"
                      placeholder="Consult with the AI God..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full bg-black/60 border border-gray-800 rounded-[1.5rem] py-4 px-6 text-white text-base focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 shadow-inner"
                    />
                  </div>
                  
                  <button 
                    onClick={handleSendMessage}
                    className="p-4 bg-cyan-500 text-black rounded-2xl hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <Send size={24} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-green-500" /> SECURED ENCRYPTED SESSION
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1">
                      WHITEPAPER <ChevronRight size={12} />
                    </div>
                    <div className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1">
                      HOW TO BUY? <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;

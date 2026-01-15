
import React from 'react';

const LOGO_DATA = [
  { name: 'AIGODS', url: 'https://images.pollinations.ai/prompt/a-silver-crypto-coin-with-a-3d-relief-of-a-cyborg-face-with-a-grey-beard-and-glowing-blue-eyes-split-face-one-side-chrome-robotic-other-side-integrated-circuitry-bottom-text-AIGODS-3d-render-highly-detailed?width=512&height=512&nologo=true' },
  { name: 'BlackRock', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/BlackRock_wordmark.svg' },
  { name: 'Tesla', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
  { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
  { name: 'X', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg' },
  { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Apple', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'NVIDIA', url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
  { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Meta', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Binance', url: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg' },
  { name: 'Coinbase', url: 'https://cryptologos.cc/logos/coinbase-coin-logo.svg' },
  { name: 'Ethereum', url: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
  { name: 'Solana', url: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
  { name: 'Polygon', url: 'https://cryptologos.cc/logos/polygon-matic-logo.svg' },
  { name: 'Uniswap', url: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg' },
  { name: 'MetaMask', url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' },
  { name: 'Phantom', url: 'https://cryptologos.cc/logos/phantom-phantom-logo.svg' },
  { name: 'CoinMarketCap', url: 'https://cryptologos.cc/logos/coinmarketcap-cmc-logo.svg' },
  { name: 'CoinGecko', url: 'https://cryptologos.cc/logos/coingecko-logo.svg' },
];

const LogoGrid: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-6xl px-4">
      <h2 className="text-sm font-black text-center mb-12 text-cyan-400 tracking-[0.4em] uppercase">Backed by Titans & Innovators</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-10 items-center justify-items-center">
        {LOGO_DATA.map((logo, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-center w-full h-14 transition-all duration-300 transform hover:scale-110 cursor-pointer opacity-80 hover:opacity-100 ${logo.name === 'AIGODS' ? 'scale-125 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              className={`max-h-full max-w-full object-contain ${logo.name === 'Apple' || logo.name === 'X' || logo.name === 'OpenAI' ? 'filter invert brightness-0' : ''}`} 
              title={logo.name}
              onError={(e) => {
                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${logo.name}&background=0D0D0D&color=fff`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;


import React from 'react';

const LOGO_DATA = [
  { name: 'BlackRock', url: 'https://cryptologos.cc/logos/blackrock-2023-logo.png?v=003' },
  { name: 'Tesla', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
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
  { name: 'Phantom', url: 'https://phantom.app/img/phantom-logo.svg' },
];

const LogoGrid: React.FC = () => {
  return (
    <div className="mt-20 w-full max-w-5xl px-4">
      <h2 className="text-sm font-black text-center mb-10 text-cyan-400 tracking-[0.4em] uppercase">Backed by Titans & Innovators</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center justify-items-center">
        {LOGO_DATA.map((logo, i) => (
          <div key={i} className="flex items-center justify-center w-full h-12 grayscale hover:grayscale-0 transition-all cursor-pointer opacity-60 hover:opacity-100">
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="max-h-full max-w-full object-contain filter invert" 
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

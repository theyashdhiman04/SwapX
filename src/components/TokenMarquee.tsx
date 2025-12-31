const tokens = [
  { 
    name: "Ethereum", 
    symbol: "ETH",
    logo: (
      <svg viewBox="0 0 256 417" className="w-6 h-6 fill-foreground">
        <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
        <path d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
        <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
        <path d="M127.962 416.905v-104.72L0 236.585z"/>
      </svg>
    )
  },
  { 
    name: "USD Coin", 
    symbol: "USDC",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm.5 4v2c2.5.4 4.5 2.1 4.5 4.5h-2c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5c0 1 .5 2 2.5 2.5l1 .25c2.5.5 4.5 2 4.5 4.75 0 2.4-2 4.1-4.5 4.5V28h-1v-2.5c-2.5-.4-4.5-2.1-4.5-4.5h2c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5c0-1-.5-2-2.5-2.5l-1-.25c-2.5-.5-4.5-2-4.5-4.75 0-2.4 2-4.1 4.5-4.5V4h1z"/>
      </svg>
    )
  },
  { 
    name: "Tether", 
    symbol: "USDT",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"/>
      </svg>
    )
  },
  { 
    name: "Bitcoin", 
    symbol: "BTC",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/>
      </svg>
    )
  },
  { 
    name: "Chainlink", 
    symbol: "LINK",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M16 6l2.29 1.32 5.42 3.13 2.29 1.32v9.46l-2.29 1.32-5.42 3.13L16 27l-2.29-1.32-5.42-3.13-2.29-1.32v-9.46l2.29-1.32 5.42-3.13L16 6zm0 3.87l-4.58 2.65v5.3l4.58 2.64 4.58-2.64v-5.3L16 9.87z"/>
      </svg>
    )
  },
  { 
    name: "Uniswap", 
    symbol: "UNI",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M12.1 8.2c-.2 0-.4.1-.6.3-.2.3-.2.6 0 .9s.4.5.7.5c.2 0 .2 0 .4-.2 0-.2.2-.4.2-.5s0-.4-.2-.5c-.2-.3-.4-.5-.5-.5zm7.8 0c-.2.2-.4.4-.5.7-.2.2-.2.4-.2.5s.2.4.2.5c.2.2.2.2.4.2.3 0 .5-.2.7-.5s.2-.6 0-.9c-.2-.2-.4-.3-.6-.3zM16 32C7.2 32 0 24.8 0 16S7.2 0 16 0s16 7.2 16 16-7.2 16-16 16zm-5-12c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm10 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
      </svg>
    )
  },
  { 
    name: "Aave", 
    symbol: "AAVE",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M22.91 22.47h-2.85l-1.31-3.38h-5.51l-1.32 3.38H9.09L14.5 9.53h2.91l5.5 12.94zm-5.16-5.63L16 12.06l-1.75 4.78h3.5z"/>
      </svg>
    )
  },
  { 
    name: "Polygon", 
    symbol: "MATIC",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M21.09 12.69c-.37-.22-.85-.22-1.25 0l-2.88 1.65-1.96 1.08-2.88 1.65c-.37.22-.85.22-1.25 0l-2.29-1.29c-.37-.22-.63-.61-.63-1.04v-2.55c0-.43.22-.83.63-1.04l2.25-1.26c.37-.22.85-.22 1.26 0l2.25 1.26c.37.22.63.61.63 1.04v1.65l1.96-1.12v-1.65c0-.43-.22-.83-.63-1.04l-4.17-2.37c-.37-.22-.85-.22-1.25 0l-4.24 2.37c-.41.21-.63.61-.63 1.04v4.78c0 .43.22.83.63 1.04l4.24 2.37c.37.22.85.22 1.25 0l2.88-1.62 1.96-1.11 2.88-1.62c.37-.22.85-.22 1.25 0l2.25 1.26c.37.22.63.61.63 1.04v2.55c0 .43-.22.83-.63 1.04l-2.25 1.29c-.37.22-.85.22-1.26 0l-2.25-1.26c-.37-.22-.63-.61-.63-1.04v-1.65l-1.96 1.12v1.65c0 .43.22.83.63 1.04l4.24 2.37c.37.22.85.22 1.26 0l4.24-2.37c.37-.22.63-.61.63-1.04v-4.78c0-.43-.22-.83-.63-1.04l-4.28-2.41z"/>
      </svg>
    )
  },
  { 
    name: "Arbitrum", 
    symbol: "ARB",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M16.62 21.8l1.49-2.45 2.87 4.26v1.12l-6.69-10.22-4.88 7.96v.85l9.19-13.86 3.44 5.17-3.91 6.45-1.51.72zm3.9 3l-4.48-6.65 1.54-.73 3.63 5.41-.69 1.97zm6.37 1.05l-2.5-3.81 1.61-.53 1.58 2.4-.69 1.94zm-2.04-4.96l-2.99-4.56 1.3-2.14 4.36 6.64-2.67.06zm-14.81 2.97l5.57-9.1 1.64 2.53-4.65 7.55-1.7-.09-.01 1.08-.86.03zm.86-1.08v-.85l3.94-6.46-.94-1.46-5.61 9v.67l1.75.1.86 1z"/>
      </svg>
    )
  },
  { 
    name: "Optimism", 
    symbol: "OP",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M10.9 20.37c-1.19 0-2.2-.31-3.01-.94-.82-.63-1.22-1.54-1.22-2.73 0-.39.05-.8.14-1.22.26-1.17.76-2.1 1.48-2.77.74-.69 1.68-1.03 2.82-1.03 1.21 0 2.2.32 2.98.95.78.62 1.16 1.49 1.16 2.61 0 .43-.05.87-.14 1.34-.23 1.09-.73 1.98-1.48 2.66-.75.69-1.69 1.03-2.81 1.03h.08zm.3-2.17c.49 0 .93-.18 1.31-.52.38-.35.64-.88.78-1.57.08-.38.12-.72.12-1.03 0-.52-.13-.93-.39-1.23-.25-.31-.62-.47-1.1-.47-.49 0-.94.18-1.33.52-.38.35-.64.87-.78 1.56-.08.35-.12.69-.12 1 0 .53.14.95.41 1.25.27.31.64.47 1.1.48zm7.87 1.96l1.27-5.94h2.56l-.18.83h.06c.53-.61 1.22-.91 2.07-.91.25 0 .48.03.7.08l-.48 2.22c-.16-.05-.38-.11-.73-.11-.66 0-1.18.23-1.56.68-.38.46-.64 1.07-.78 1.83l-.48 2.25h-2.45v-.93z"/>
      </svg>
    )
  },
  { 
    name: "Curve", 
    symbol: "CRV",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M25.2 16.1c-.1.7-.3 1.3-.5 1.9-.7 1.8-1.9 3.1-3.5 4.1-1.4.9-3 1.3-4.6 1.4-1.2.1-2.4 0-3.5-.3-1.8-.5-3.3-1.4-4.5-2.8-1.2-1.5-1.9-3.2-2-5.1-.1-1.2.1-2.4.5-3.5.5-1.4 1.3-2.5 2.4-3.5 1.3-1.2 2.9-1.9 4.7-2.2 1.3-.2 2.6-.1 3.9.2 1.7.5 3.1 1.4 4.2 2.7.5.6.8 1.2 1.1 1.8l.3.6-2.1 1c-.6-1.4-1.5-2.4-2.9-3-1.3-.6-2.6-.7-4-.3-1.7.5-3 1.5-3.8 3.1-.6 1.1-.8 2.3-.6 3.6.2 1.4.8 2.6 1.8 3.5 1.1 1 2.4 1.5 3.9 1.5 1.4 0 2.6-.4 3.7-1.2.6-.4 1.1-1 1.5-1.6l2 1z"/>
      </svg>
    )
  },
  { 
    name: "Dai", 
    symbol: "DAI",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zM9 14h2c.5-2 2-3 4-3h3c2 0 3.5 1 4 3h2v2h-2v2h2v2h-2c-.5 2-2 3-4 3h-3c-2 0-3.5-1-4-3H9v-2h2v-2H9v-2zm4 0v2h5v-2h-5zm0 4v2h5c1 0 1.5-.5 2-1v-1h-7z"/>
      </svg>
    )
  },
];

const TokenMarquee = () => {
  return (
    <div className="py-16 overflow-hidden border-y border-border/50">
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest font-medium">
          Supported Tokens
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Marquee container */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set */}
          <div className="flex items-center shrink-0">
            {tokens.map((token, index) => (
              <div
                key={`first-${token.symbol}-${index}`}
                className="flex items-center gap-3 px-8 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {token.logo}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">{token.name}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Duplicate set */}
          <div className="flex items-center shrink-0">
            {tokens.map((token, index) => (
              <div
                key={`second-${token.symbol}-${index}`}
                className="flex items-center gap-3 px-8 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {token.logo}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">{token.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenMarquee;

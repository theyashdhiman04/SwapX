const MarqueeBanner = () => {
  const items = Array(10).fill("EXPLORE THE OSMO SHOWCASE");

  return (
    <div className="w-[95%] max-w-3xl mx-auto mt-20 overflow-hidden bg-osmo-lime py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-4 mx-4">
            <span className="text-xs font-medium tracking-widest text-osmo-dark uppercase">
              {text}
            </span>
            <svg className="w-3 h-3 text-osmo-dark" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
            </svg>
          </span>
        ))}
        {items.map((text, i) => (
          <span key={`dup-${i}`} className="flex items-center gap-4 mx-4">
            <span className="text-xs font-medium tracking-widest text-osmo-dark uppercase">
              {text}
            </span>
            <svg className="w-3 h-3 text-osmo-dark" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;

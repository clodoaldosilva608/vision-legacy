type LogoProps = {
  size?: number;
  showText?: boolean;
  badge?: string;
  className?: string;
};

export function Logo({ size = 36, showText = true, badge, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vlGold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E7C860" />
            <stop offset="1" stopColor="#B8902A" />
          </linearGradient>
        </defs>
        <path d="M24 3 5 12v9c0 12 8 20 19 24 11-4 19-12 19-24v-9L24 3Z" fill="#0B0F19" stroke="url(#vlGold)" strokeWidth="2" />
        <path d="M14 17 24 35 34 17h-5l-5 9-5-9h-5Z" fill="url(#vlGold)" />
        <circle cx="24" cy="11" r="2.2" fill="url(#vlGold)" />
      </svg>
      {showText && (
        <div className="flex items-center gap-2">
          <div className="leading-none">
            <div className="text-gold-gradient text-lg font-extrabold tracking-wide">VISION</div>
            <div className="text-[10px] font-bold tracking-[0.35em] text-white/80">LEGACY</div>
          </div>
          {badge && (
            <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-accent-light uppercase">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

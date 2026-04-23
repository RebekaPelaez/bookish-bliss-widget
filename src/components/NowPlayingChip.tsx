import { motion } from "framer-motion";

type Props = {
  track?: string;
  artist?: string;
  artUrl?: string;
};

export const NowPlayingChip = ({
  track = "Slow Burn",
  artist = "Kacey Musgraves",
  artUrl = "https://picsum.photos/seed/nowplaying/80/80",
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="inline-flex items-center gap-3 bg-[#faf6ec]/90 backdrop-blur-md border border-[#4a5a3a]/15 py-1.5 pl-1.5 pr-4 rounded-full shadow-[0_4px_14px_rgba(74,90,58,0.08)] hover:shadow-[0_6px_18px_rgba(74,90,58,0.14)] transition-shadow"
    >
      {/* Album art (rotating slowly) */}
      <div className="relative size-9 rounded-full overflow-hidden bg-[#828c73]/20 shrink-0 border border-[#4a5a3a]/10">
        <motion.img
          src={artUrl}
          alt=""
          className="size-full object-cover"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* center hole */}
        <div className="absolute inset-0 m-auto size-1.5 rounded-full bg-[#faf6ec] border border-[#4a5a3a]/20" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#4a5a3a]/70 mb-1 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#4a5a3a] animate-pulse" />
          now spinning
        </span>
        <span className="text-[12px] font-medium text-[#2d2a1f] whitespace-nowrap">
          {track} <span className="text-[#4a5a3a]/60">— {artist}</span>
        </span>
      </div>

      {/* Equalizer */}
      <div className="flex items-end gap-[2px] h-3.5 ml-1">
        {[0.1, 0.3, 0.2].map((delay, i) => (
          <motion.span
            key={i}
            className="w-0.5 bg-[#4a5a3a] rounded-full"
            animate={{ height: ["3px", "13px", "5px", "10px", "3px"] }}
            transition={{
              duration: 0.9 + i * 0.15,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NowPlayingChip;

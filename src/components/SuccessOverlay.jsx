import { motion } from "framer-motion";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../data/constant";

export function SuccessOverlay({ message }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASING,
      }}
      className="flex flex-col items-center justify-center gap-5 py-10"
    >
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
        <svg viewBox="0 0 52 52" className="h-20 w-20" fill="none">
          <circle
            cx="26"
            cy="26"
            r="24"
            stroke="#22c55e"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            d="M14 26 L22 34 L38 18"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: ANIMATION_DURATION,
              delay: 0.3,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-900">{message}</p>
        <p className="mt-1 text-sm text-gray-400">Redirecting you now…</p>
      </div>
    </motion.div>
  );
}

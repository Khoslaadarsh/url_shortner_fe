import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "../data/constant";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 z-[9999]">
      <div className="flex items-end gap-1.5">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2.5 rounded-full bg-primary"
            animate={{ height: ["10px", "42px", "10px"] }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            style={{ height: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

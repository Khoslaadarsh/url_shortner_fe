import { motion } from "framer-motion";
import {
  ThunderboltOutlined,
  SafetyOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { fadeUp } from "../../lib/animations";

const STATS = [
  { icon: ThunderboltOutlined, value: "10M+", label: "Links Shortened" },
  { icon: SafetyOutlined, value: "99.9%", label: "Uptime" },
  { icon: BarChartOutlined, value: "500M+", label: "Clicks Tracked" },
];

export function StatsStrip() {
  return (
    <motion.div
      className="relative z-10 mt-10 flex items-center gap-8 sm:gap-14"
      {...fadeUp(0.24)}
    >
      {STATS.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1 text-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-primary text-base">
            <Icon />
          </div>
          <span className="text-lg font-bold text-gray-800">{value}</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}

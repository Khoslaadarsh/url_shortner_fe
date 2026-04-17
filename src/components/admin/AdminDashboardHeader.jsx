import { motion } from "framer-motion";
import { Button } from "antd";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../../data/constant";
import { SafetyCertificateOutlined } from "@ant-design/icons";

export function AdminDashboardHeader({ onLogout }) {
  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
      className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/40">
          <SafetyCertificateOutlined className="text-base" />
        </div>
        <div>
          <p className="font-bold text-white text-sm leading-none">
            Admin Dashboard
          </p>
          <p className="text-gray-500 text-xs mt-1.5">
            ToShort — Restricted access
          </p>
        </div>
      </div>
      <Button danger size="small" onClick={onLogout}>
        Sign out
      </Button>
    </motion.header>
  );
}

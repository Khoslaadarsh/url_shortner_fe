import { motion } from "framer-motion";
import { Card, Avatar, Typography } from "antd";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../../data/constant";
import {
  UserOutlined,
  LinkOutlined,
  BarChartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { fadeUp } from "../../lib/animations";

const { Text } = Typography;

export function ProfileCard({ user, urlCount, totalClicks }) {
  const stats = [
    { value: urlCount, label: "URLs", icon: <LinkOutlined /> },
    {
      value: totalClicks.toLocaleString(),
      label: "Total clicks",
      icon: <BarChartOutlined />,
    },
    {
      value: new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      label: "Joined",
      icon: <CalendarOutlined />,
    },
  ];

  return (
    <motion.div {...fadeUp(0)}>
      <Card className="mb-6 rounded-2xl !shadow-md !border-orange-100/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: ANIMATION_DURATION,
              ease: ANIMATION_EASING,
            }}
          >
            <Avatar
              size={72}
              icon={<UserOutlined />}
              className="bg-gradient-to-br from-primary to-orange-400 shrink-0 shadow-lg shadow-orange-200"
            />
          </motion.div>

          <div className="flex-1">
            <p className="text-xl font-bold text-gray-900">{user.name}</p>
            <Text type="secondary">{user.email}</Text>
          </div>

          <div className="flex gap-6 text-center">
            {stats.map(({ value, label, icon }) => (
              <motion.div key={label} {...fadeUp(0.1)}>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 justify-center">
                  {icon} {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

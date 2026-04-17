import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typography, message } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  LinkOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import adminData from "../../data/adminUsers.json";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../../data/constant";
import { AdminDashboardHeader } from "../../components/admin/AdminDashboardHeader";
import { AdminStats } from "../../components/admin/AdminStats";
import { AdminUserSearch } from "../../components/admin/AdminUserSearch";
import { AdminUserCard } from "../../components/admin/AdminUserCard";
import { AdminURLTable } from "../../components/admin/AdminURLTable";

const { Text } = Typography;

export default function AdminDashboard({ onAdminLogout }) {
  const [users, setUsers] = useState(adminData.users);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = users.find(
      (u) => u.id.toLowerCase() === q || u.email.toLowerCase() === q,
    );
    if (found) {
      setSelectedUser(found);
    } else {
      messageApi.warning("No user found with that ID or email");
      setSelectedUser(null);
    }
  };

  const patchUser = (id, changes) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...changes } : u)),
    );
    setSelectedUser((prev) =>
      prev?.id === id ? { ...prev, ...changes } : prev,
    );
  };

  const patchUrl = (userId, urlKey, changes) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        return {
          ...u,
          urls: u.urls.map((url) =>
            url.key === urlKey ? { ...url, ...changes } : url,
          ),
        };
      }),
    );
    setSelectedUser((prev) =>
      prev?.id === userId
        ? {
            ...prev,
            urls: prev.urls.map((url) =>
              url.key === urlKey ? { ...url, ...changes } : url,
            ),
          }
        : prev,
    );
  };

  const toggleUser = (id, checked) => {
    patchUser(id, { isActive: checked });
    messageApi.success(`User ${checked ? "enabled" : "disabled"}`);
  };

  const changeRole = (id, role) => {
    patchUser(id, { role });
    messageApi.success(`Role updated to ${role}`);
  };

  const toggleUrl = (userId, urlKey, checked) => {
    patchUrl(userId, urlKey, { isActive: checked });
    messageApi.success(`Short URL ${checked ? "enabled" : "disabled"}`);
  };

  const totalUrls = users.reduce((s, u) => s + u.urls.length, 0);
  const totalClicks = users.reduce(
    (s, u) => s + u.urls.reduce((ss, url) => ss + url.clicks, 0),
    0,
  );
  const activeUsers = users.filter((u) => u.isActive).length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <TeamOutlined />,
      color: "text-amber-400",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <CheckCircleOutlined />,
      color: "text-green-400",
    },
    {
      title: "Total Short URLs",
      value: totalUrls,
      icon: <LinkOutlined />,
      color: "text-purple-400",
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      icon: <BarChartOutlined />,
      color: "text-yellow-400",
    },
  ];

  const handleLogout = () => {
    onAdminLogout?.();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {contextHolder}

      <AdminDashboardHeader onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AdminStats stats={stats} />

        <AdminUserSearch
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        <AnimatePresence mode="wait">
          {selectedUser ? (
            <motion.div
              key={selectedUser.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASING,
              }}
            >
              <AdminUserCard
                user={selectedUser}
                onToggle={toggleUser}
                onChangeRole={changeRole}
              />
              <AdminURLTable user={selectedUser} onToggleUrl={toggleUrl} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASING,
              }}
              className="text-center py-16"
            >
              <UserOutlined className="text-5xl text-gray-700 mb-4 block" />
              <Text className="!text-gray-600">
                Search for a user above to view and manage their account
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

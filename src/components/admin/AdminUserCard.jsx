import { Card, Avatar, Badge, Tag, Typography, Switch, Select } from "antd";
import {
  UserOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export function AdminUserCard({ user, onToggle, onChangeRole }) {
  return (
    <Card className="!bg-gray-900 !border-gray-800 rounded-xl mb-4 hover:!border-gray-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Badge dot color={user.isActive ? "green" : "red"} offset={[-4, 60]}>
          <Avatar size={64} icon={<UserOutlined />} className="bg-primary shrink-0" />
        </Badge>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-lg text-white leading-none">{user.name}</p>
            {user.role === "admin" && (
              <Tag color="gold" icon={<CrownOutlined />}>
                Admin
              </Tag>
            )}
            <Tag color={user.isActive ? "green" : "red"}>
              {user.isActive ? "Active" : "Disabled"}
            </Tag>
          </div>
          <Text className="!text-gray-400">{user.email}</Text>
          <div className="flex gap-4 mt-1">
            <Text className="!text-gray-500 text-xs">ID: {user.id}</Text>
            <Text className="!text-gray-500 text-xs">
              Joined:{" "}
              {new Date(user.joinedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
            <Text className="!text-gray-500 text-xs">URLs: {user.urls.length}</Text>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[180px]">
          <div className="flex items-center justify-between gap-3">
            <Text className="!text-gray-300 text-sm">
              {user.isActive ? (
                <CheckCircleOutlined className="text-green-400 mr-1" />
              ) : (
                <StopOutlined className="text-red-400 mr-1" />
              )}
              Account
            </Text>
            <Switch
              checked={user.isActive}
              onChange={(checked) => onToggle(user.id, checked)}
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Text className="!text-gray-300 text-sm">
              <CrownOutlined className="text-yellow-400 mr-1" />
              Role
            </Text>
            <Select
              value={user.role}
              onChange={(role) => onChangeRole(user.id, role)}
              size="small"
              className="w-24"
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

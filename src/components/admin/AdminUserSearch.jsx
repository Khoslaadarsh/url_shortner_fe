import { motion } from "framer-motion";
import { Card, Input, Button, Typography } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { fadeUp } from "../../lib/animations";

const { Text } = Typography;

export function AdminUserSearch({ query, onQueryChange, onSearch }) {
  return (
    <motion.div {...fadeUp(0.28)}>
      <Card className="!bg-gray-900 !border-gray-800 rounded-xl mb-6">
        <p className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <SearchOutlined className="text-gray-400" />
          Look up user
        </p>
        <div className="flex gap-3">
          <Input
            placeholder="Enter user ID (e.g. USR001) or email"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onPressEnter={onSearch}
            size="large"
            className="!bg-gray-800 !border-gray-700 !text-white !rounded-xl"
            prefix={<UserOutlined className="text-gray-500" />}
            allowClear
          />
          <Button
            type="primary"
            size="large"
            onClick={onSearch}
            icon={<SearchOutlined />}
            className="!rounded-xl"
          >
            Search
          </Button>
        </div>
        <Text className="!text-gray-600 text-xs mt-2 block">
          Try: USR001 · USR002 · USR003 · or an email like jane@example.com
        </Text>
      </Card>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Table, Button, Typography, Tag, Space, Tooltip, Popconfirm, Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { fadeUp } from "../../lib/animations";

const { Text } = Typography;

export function URLTable({ data, onEdit, onDelete, onCopy }) {
  const columns = [
    {
      title: "Original URL",
      dataIndex: "originalUrl",
      key: "originalUrl",
      ellipsis: true,
      render: (url, record) => (
        <Tooltip title={url} placement="topLeft">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${
              record.isActive === false
                ? "text-gray-400 hover:text-gray-500"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            {url}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "Short URL",
      dataIndex: "shortUrl",
      key: "shortUrl",
      width: 220,
      filters: [
        { text: "Active", value: true },
        { text: "Paused", value: false },
      ],
      onFilter: (value, record) => (record.isActive ?? true) === value,
      render: (url, record) => (
        <div className="flex items-center gap-1">
          <div className="flex flex-col min-w-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium truncate ${
                record.isActive === false
                  ? "text-gray-400 hover:text-gray-500"
                  : "text-primary"
              }`}
            >
              {url.replace("https://", "")}
            </a>
            {record.isActive === false && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400 leading-none mt-0.5">
                Paused
              </span>
            )}
          </div>
          <Tooltip title="Copy">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              className="text-gray-400 hover:text-primary shrink-0"
              onClick={() => onCopy(url)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
      width: 100,
      sorter: (a, b) => a.clicks - b.clicks,
      render: (clicks) => (
        <Tag color={clicks > 200 ? "green" : clicks > 50 ? "orange" : "default"}>
          {clicks.toLocaleString()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => (
        <Text type="secondary" className="text-sm">
          {date}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="text-gray-500 hover:text-primary"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this URL?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(record.key)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                className="text-gray-500 hover:text-red-500"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <motion.div {...fadeUp(0.15)}>
      <Card className="rounded-2xl !shadow-md !border-orange-100/60">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-base text-gray-800">My URLs</p>
          <Text type="secondary" className="text-sm">
            {data.length} total
          </Text>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          rowClassName={(record) => (record.isActive === false ? "opacity-50" : "")}
          scroll={{ x: 700 }}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            pageSizeOptions: ["8", "16", "24"],
            showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
          }}
        />
      </Card>
    </motion.div>
  );
}

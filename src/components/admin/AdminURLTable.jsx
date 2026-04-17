import { Card, Table, Tag, Switch, Typography, Tooltip, Empty } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Text } = Typography;

export function AdminURLTable({ user, onToggleUrl }) {
  const columns = [
    {
      title: "Short URL",
      dataIndex: "shortUrl",
      key: "shortUrl",
      width: 180,
      render: (url) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:opacity-80 text-sm font-medium"
        >
          {url.replace("https://", "")}
        </a>
      ),
    },
    {
      title: "Destination",
      dataIndex: "originalUrl",
      key: "originalUrl",
      ellipsis: true,
      render: (url) => (
        <Tooltip title={url} placement="topLeft">
          <span className="text-gray-300 text-sm">{url}</span>
        </Tooltip>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
      width: 90,
      sorter: (a, b) => a.clicks - b.clicks,
      render: (clicks) => (
        <Tag color={clicks > 300 ? "green" : clicks > 100 ? "orange" : "default"}>
          {clicks.toLocaleString()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (d) => <Text className="!text-gray-400 text-sm">{d}</Text>,
    },
    {
      title: "Status",
      key: "isActive",
      width: 110,
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          checkedChildren="Active"
          unCheckedChildren="Off"
          onChange={(checked) => onToggleUrl(user.id, record.key, checked)}
          size="small"
        />
      ),
    },
  ];

  return (
    <Card className="!bg-gray-900 !border-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-white flex items-center gap-2">
          <LinkOutlined className="text-gray-400" />
          Short URLs ({user.urls.length})
        </p>
        <Text className="!text-gray-400 text-sm">
          {user.urls.filter((u) => u.isActive).length} active
        </Text>
      </div>

      {user.urls.length === 0 ? (
        <Empty description={<span className="text-gray-500">No URLs created yet</span>} />
      ) : (
        <Table
          columns={columns}
          dataSource={user.urls}
          rowKey="key"
          size="small"
          scroll={{ x: 600 }}
          pagination={{
            pageSize: 5,
            showTotal: (total, range) => (
              <span className="text-gray-400">
                {range[0]}–{range[1]} of {total}
              </span>
            ),
          }}
          className="admin-table"
          rowClassName="!bg-gray-900 hover:!bg-gray-800"
        />
      )}
    </Card>
  );
}

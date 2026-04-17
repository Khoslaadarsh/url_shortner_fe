import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  Button,
  Typography,
  Avatar,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Tooltip,
  Card,
  Switch,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  LinkOutlined,
  BarChartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { showToast } from "../lib/toast";
import { getProfileUrl } from "../services/urlService";
import { ExpiryPicker } from "../components/ExpiryPicker";
import profileData from "../data/urls.json";

const { Text } = Typography;
const { user, urls } = profileData;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

export default function MyProfile() {
  const [profileResponse, setProfileResponse] = useState(null);
  const [data, setData] = useState(urls);

  useEffect(() => {
    getProfileUrl()
      .then((res) => {
        console.log("profile response:", res);
        setProfileResponse(res);
      })
      .catch((err) => console.error("profile fetch error:", err));
  }, []);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editIsActive, setEditIsActive] = useState(true);
  const [editExpirySeconds, setEditExpirySeconds] = useState(null);
  const [form] = Form.useForm();

  const openEdit = (record) => {
    setEditingRecord(record);
    setEditIsActive(record.isActive ?? true);
    setEditExpirySeconds(null);
    form.setFieldsValue({ originalUrl: record.originalUrl });
  };

  const handleEditSave = () => {
    form.validateFields().then((values) => {
      console.log("update payload:", {
        url: values.originalUrl,
        is_active: editIsActive,
        expiry_seconds: editExpirySeconds,
      });
      setData((prev) =>
        prev.map((row) =>
          row.key === editingRecord.key
            ? {
                ...row,
                originalUrl: values.originalUrl,
                isActive: editIsActive,
              }
            : row,
        ),
      );
      setEditingRecord(null);
      form.resetFields();
      showToast.success("URL updated successfully");
    });
  };

  const handleDelete = (key) => {
    setData((prev) => prev.filter((row) => row.key !== key));
    showToast.success("URL deleted");
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    showToast.success("Copied to clipboard");
  };

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
            className={`text-sm ${record.isActive === false ? "text-gray-400 hover:text-gray-500" : "text-gray-700 hover:text-primary"}`}
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
              className={`text-sm font-medium truncate ${record.isActive === false ? "text-gray-400 hover:text-gray-500" : "text-primary"}`}
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
              onClick={() => handleCopy(url)}
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
        <Tag
          color={clicks > 200 ? "green" : clicks > 50 ? "orange" : "default"}
        >
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
              onClick={() => openEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this URL?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.key)}
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

  const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);

  return (
    <div className="relative min-h-full overflow-hidden bg-orange-50 py-10 px-4">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Profile card */}
        <motion.div {...fadeUp(0)}>
          <Card className="mb-6 rounded-2xl !shadow-md !border-orange-100/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
                {[
                  { value: data.length, label: "URLs", icon: <LinkOutlined /> },
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
                ].map(({ value, label, icon }) => (
                  <motion.div key={label} {...fadeUp(0.1)}>
                    <div className="text-2xl font-bold text-gray-800">
                      {value}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 justify-center">
                      {icon} {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* URLs table */}
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
              rowClassName={(record) =>
                record.isActive === false ? "opacity-50" : ""
              }
              scroll={{ x: 700 }}
              pagination={{
                pageSize: 8,
                showSizeChanger: true,
                pageSizeOptions: ["8", "16", "24"],
                showTotal: (total, range) =>
                  `${range[0]}–${range[1]} of ${total}`,
              }}
            />
          </Card>
        </motion.div>
      </div>

      {/* Edit modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-400 text-white shadow-md shadow-orange-200">
              <EditOutlined />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 leading-none">
                Edit URL
              </p>
              <p className="text-xs text-gray-400 mt-1 font-normal">
                Update destination, expiry or status
              </p>
            </div>
          </div>
        }
        open={!!editingRecord}
        onOk={handleEditSave}
        onCancel={() => {
          setEditingRecord(null);
          form.resetFields();
        }}
        okText="Save changes"
        okButtonProps={{ className: "!rounded-lg" }}
        cancelButtonProps={{ className: "!rounded-lg" }}
        destroyOnHidden
        styles={{
          header: { paddingBottom: 16, borderBottom: "1px solid #f3f4f6" },
          body: { paddingTop: 20 },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="flex flex-col gap-4"
        >
          {/* Short URL — display only */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Short URL
            </p>
            <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2.5">
              <LinkOutlined className="text-primary text-sm shrink-0" />
              <span className="text-sm font-medium text-primary truncate">
                {editingRecord?.shortUrl}
              </span>
            </div>
          </div>

          {/* Destination URL */}
          <Form.Item
            name="originalUrl"
            label={
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Destination URL
                <sup className="text-red-400 ml-0.5 text-sm font-bold top-[-2px]">
                  *
                </sup>
              </span>
            }
            rules={[
              { required: true, message: "Please enter a URL" },
              { type: "url", message: "Enter a valid URL" },
            ]}
            className="!mb-0"
          >
            <Input
              placeholder="https://example.com/long-url"
              size="large"
              className="!rounded-xl"
            />
          </Form.Item>

          {/* Active toggle */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700 leading-none">
                Active
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Disable to pause redirects
              </p>
            </div>
            <Switch checked={editIsActive} onChange={setEditIsActive} />
          </div>

          {/* Expiry */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Expiry
            </p>
            <ExpiryPicker
              key={editingRecord?.key}
              onChange={setEditExpirySeconds}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";
import { ExpiryPicker } from "../ExpiryPicker";

export function EditURLModal({ record, open, onSave, onCancel }) {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [expirySeconds, setExpirySeconds] = useState(null);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ originalUrl: record.originalUrl });
      setIsActive(record.isActive ?? true);
      setExpirySeconds(null);
    }
  }, [record, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({ originalUrl: values.originalUrl, isActive, expirySeconds });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-400 text-white shadow-md shadow-orange-200">
            <EditOutlined />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900 leading-none">Edit URL</p>
            <p className="text-xs text-gray-400 mt-1 font-normal">
              Update destination, expiry or status
            </p>
          </div>
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save changes"
      okButtonProps={{ className: "!rounded-lg" }}
      cancelButtonProps={{ className: "!rounded-lg" }}
      destroyOnHidden
      styles={{
        header: { paddingBottom: 16, borderBottom: "1px solid #f3f4f6" },
        body: { paddingTop: 20 },
      }}
    >
      <Form form={form} layout="vertical" requiredMark={false} className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
            Short URL
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2.5">
            <LinkOutlined className="text-primary text-sm shrink-0" />
            <span className="text-sm font-medium text-primary truncate">{record?.shortUrl}</span>
          </div>
        </div>

        <Form.Item
          name="originalUrl"
          label={
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Destination URL
              <sup className="text-red-400 ml-0.5 text-sm font-bold top-[-2px]">*</sup>
            </span>
          }
          rules={[
            { required: true, message: "Please enter a URL" },
            { type: "url", message: "Enter a valid URL" },
          ]}
          className="!mb-0"
        >
          <Input placeholder="https://example.com/long-url" size="large" className="!rounded-xl" />
        </Form.Item>

        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-700 leading-none">Active</p>
            <p className="text-xs text-gray-400 mt-1">Disable to pause redirects</p>
          </div>
          <Switch checked={isActive} onChange={setIsActive} />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
            Expiry
          </p>
          <ExpiryPicker key={record?.key} onChange={setExpirySeconds} />
        </div>
      </Form>
    </Modal>
  );
}

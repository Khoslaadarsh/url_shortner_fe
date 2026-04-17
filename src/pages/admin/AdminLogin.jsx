import { motion } from "framer-motion";
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onAdminLogin }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Admin login:", values);
    onAdminLogin?.();
    navigate("/admin/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Dark ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-900/20 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-orange-900/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
            <SafetyCertificateOutlined />
            Admin Access
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            ease: ANIMATION_EASING,
            delay: 0.1,
          }}
          className="rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 p-8"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/40">
              <SafetyCertificateOutlined className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            <p className="mt-1 text-sm text-gray-500">
              Restricted to authorized personnel
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label={
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Username
                </span>
              }
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-600" />}
                placeholder="admin"
                size="large"
                className="!bg-gray-800 !border-gray-700 !text-white !placeholder-gray-600 !rounded-xl"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Password
                </span>
              }
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-600" />}
                placeholder="••••••••"
                size="large"
                className="!bg-gray-800 !border-gray-700 !text-white !placeholder-gray-600 !rounded-xl"
              />
            </Form.Item>

            <Form.Item className="!mb-0 !mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                danger
                className="!rounded-xl !h-11 !font-semibold"
              >
                Sign in as Admin
              </Button>
            </Form.Item>
          </Form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION, delay: 0.35 }}
          className="text-center text-gray-600 text-xs mt-6"
        >
          Not an admin?{" "}
          <a
            href="/login"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Go to user login
          </a>
        </motion.p>
      </div>
    </div>
  );
}

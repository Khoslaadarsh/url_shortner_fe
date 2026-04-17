import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Form, Input, Divider } from "antd";
import { LockOutlined, MailOutlined, LinkOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import { showToast } from "../lib/toast";
import { SuccessOverlay } from "../components/SuccessOverlay";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../data/constant";

export default function Login({ onLogin }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      setSuccess(true);
      setTimeout(() => onLogin?.(), 3000);
    } catch (err) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-orange-50 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-32 -right-32 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
        className="glass-card relative z-10 w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-400 text-white shadow-lg shadow-orange-200">
            <LinkOutlined className="text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <SuccessOverlay key="success" message="Signed in successfully!" />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASING,
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  label={
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Invalid email address" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-300" />}
                    placeholder="you@example.com"
                    size="large"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Password
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-300" />}
                    placeholder="••••••••"
                    size="large"
                    className="rounded-xl"
                  />
                </Form.Item>

                {/* @TODO: Implement forgot password functionality */}
                {/* <div className="flex justify-end -mt-2 mb-4">
                  <a
                    href="#"
                    className="text-xs font-medium text-primary hover:opacity-75 transition-opacity"
                  >
                    Forgot password?
                  </a>
                </div> */}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    className="!rounded-xl !h-11 !font-semibold !shadow-md !shadow-orange-200"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <Divider className="!text-gray-400 !text-xs">
                Don&apos;t have an account?
              </Divider>

              <Link to="/register">
                <Button size="large" block className="!rounded-xl">
                  Create account
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

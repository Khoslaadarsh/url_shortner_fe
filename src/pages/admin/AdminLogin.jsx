import { Button, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

export default function AdminLogin({ onAdminLogin }) {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Admin login:', values)
    onAdminLogin?.()
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <SafetyCertificateOutlined />
            Admin Access
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="flex flex-col items-center mb-8">
            <Title level={3} className="!mb-1 !text-white">Admin Portal</Title>
            <Text className="!text-gray-400">Restricted to authorized personnel</Text>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              name="username"
              label={<span className="text-gray-300 text-sm">Username</span>}
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-500" />}
                placeholder="admin"
                size="large"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-gray-300 text-sm">Password</span>}
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-500" />}
                placeholder="••••••••"
                size="large"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </Form.Item>

            <Form.Item className="!mb-0 !mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                danger
              >
                Sign in as Admin
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Not an admin?{' '}
          <a href="/login" className="text-gray-400 hover:text-white transition-colors">
            Go to user login
          </a>
        </p>
      </div>
    </div>
  )
}

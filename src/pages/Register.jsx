import { Button, Form, Input, Typography, Divider } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'

const { Title, Text } = Typography

export default function Register({ onLogin }) {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Register:', values)
    onLogin?.()
    navigate('/')
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Title level={3} className="!mb-1">Create an account</Title>
          <Text type="secondary">Start shortening URLs for free</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="name"
            label="Full name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="John Doe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="you@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Min. 8 characters"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Re-enter password"
              size="large"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit" size="large" block>
              Create account
            </Button>
          </Form.Item>
        </Form>

        <Divider className="!text-gray-400 !text-xs">Already have an account?</Divider>

        <Link to="/login">
          <Button size="large" block>Sign in</Button>
        </Link>
      </div>
    </div>
  )
}

import { Button, Input, Typography } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Home() {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <LinkOutlined className="text-blue-500 text-2xl" />
          <Title level={3} className="!mb-0">URL Shortener</Title>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="Paste your long URL here..."
            className="rounded-lg"
          />
          <Button type="primary" size="large" block className="rounded-lg">
            Shorten URL
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg hidden">
          <Text type="secondary" className="text-xs uppercase tracking-wide">Shortened URL</Text>
          <div className="flex items-center gap-2 mt-1">
            <Text className="text-blue-500 font-medium">https://short.ly/abc123</Text>
            <Button size="small" type="link">Copy</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

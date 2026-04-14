import { useState } from "react";
import { Button, Input, Typography } from "antd";
import { LinkOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { showToast } from "../lib/toast";

const { Title, Text } = Typography;

const DEMO_SHORT_URL = "https://short.ly/abc123";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (!url.trim()) return;

    if (!url.includes(".com")) {
      showToast.error("Invalid URL — must contain a valid domain (e.g. .com)");
      setShortUrl(null);
      return;
    }

    setLoading(true);
    setShortUrl(null);
    // Simulate API call
    setTimeout(() => {
      setShortUrl(DEMO_SHORT_URL);
      setLoading(false);
      showToast.success("Your URL has been shortened successfully!");
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    showToast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 flex flex-1 items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <LinkOutlined className="text-blue-500 text-2xl" />
          <Title level={3} className="!mb-0">
            URL Shortener
          </Title>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="Paste your long URL here..."
            className="rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPressEnter={handleShorten}
          />
          <Button
            type="primary"
            size="large"
            block
            className="rounded-lg"
            loading={loading}
            onClick={handleShorten}
          >
            Shorten URL
          </Button>
        </div>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <Text type="secondary" className="text-xs uppercase tracking-wide">
              Shortened URL
            </Text>
            <div className="flex items-center gap-2 mt-1">
              <Text className="text-blue-500 font-medium flex-1 truncate">
                {shortUrl}
              </Text>
              <Button
                size="small"
                type="primary"
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                onClick={handleCopy}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

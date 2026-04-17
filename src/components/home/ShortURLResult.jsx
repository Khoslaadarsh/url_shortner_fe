import { motion } from "framer-motion";
import { Button } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";

export function ShortURLResult({ shortUrl, copied, onCopy }) {
  return (
    <div style={{ padding: "4px 4px 16px 4px" }}>
      <div
        className="rounded-2xl bg-white px-4 py-3 border border-orange-200"
        style={{
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(249,115,22,0.12)",
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
            <CheckOutlined className="text-[10px] text-green-600" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
            Ready to share
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate font-mono text-sm font-bold text-primary hover:underline"
          >
            {shortUrl}
          </a>
          <motion.div whileTap={{ scale: 0.93 }}>
            <Button
              size="small"
              type={copied ? "default" : "primary"}
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={onCopy}
              className={`!rounded-lg !font-semibold transition-all ${
                copied
                  ? "!border-green-300 !text-green-600 !bg-green-50"
                  : "!shadow-sm !shadow-orange-200"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

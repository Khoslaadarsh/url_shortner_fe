import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "antd";
import { LinkOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { showToast } from "../lib/toast";
import { fadeUp } from "../lib/animations";
import { ANIMATION_DURATION, ANIMATION_EASING } from "../data/constant";
import { shortenUrl } from "../services/urlService";
import { ExpiryPicker } from "../components/ExpiryPicker";
import { ShortURLResult } from "../components/home/ShortURLResult";
import { StatsStrip } from "../components/home/StatsStrip";

export default function Home() {
  const [url, setUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [expirySeconds, setExpirySeconds] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!url.trim()) return;
    if (!url.includes(".")) {
      showToast.error("Invalid URL — must contain a valid domain");
      setShortUrl(null);
      return;
    }

    setLoading(true);
    setShortUrl(null);
    try {
      const data = await shortenUrl({
        url: url.trim(),
        expiry_seconds: expirySeconds || undefined,
        short_code: customName.trim() || undefined,
      });
      setShortUrl(
        `${window.location.origin}/${import.meta.env.VITE_SHORT_URL_PREFIX}/${data.short_code}`,
      );
      showToast.success("Your URL has been shortened successfully!");
    } catch (err) {
      showToast.error(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    showToast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto bg-orange-50 px-4 py-14">
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-44 -right-44 h-[480px] w-[480px] rounded-full bg-orange-300/25 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-44 -left-44 h-[400px] w-[400px] rounded-full bg-amber-300/20 blur-3xl" />
        <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/8 blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Hero text */}
      <motion.div className="relative z-10 mb-10 text-center" {...fadeUp(0)}>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Short links,{" "}
          <span
            className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text" }}
          >
            big impact
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-gray-500 sm:text-md">
          Create branded short URLs with custom names, expiry dates, and click
          analytics — in seconds.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="glass-card relative z-10 w-full max-w-md rounded-2xl p-8"
        {...fadeUp(0.12)}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-400 text-white shadow-lg shadow-orange-200">
            <LinkOutlined className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              URL Shortener
            </p>
            <p className="text-xs font-semibold text-gray-700 leading-none mt-1.5">
              Paste your long link below
            </p>
          </div>
        </div>

        <AnimatePresence>
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASING,
              }}
              style={{ overflow: "hidden" }}
            >
              <ShortURLResult
                shortUrl={shortUrl}
                copied={copied}
                onCopy={handleCopy}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-4">
          <Input
            size="large"
            placeholder="https://your-very-long-url.com/..."
            className="rounded-xl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPressEnter={handleGenerate}
            prefix={<LinkOutlined className="text-gray-300" />}
          />

          <Input
            size="large"
            placeholder="Custom short name (optional)"
            className="rounded-xl"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            prefix={
              <span className="text-xs font-mono text-gray-400 select-none">
                {import.meta.env.VITE_SHORT_URL_PREFIX}/
              </span>
            }
          />

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Expiration{" "}
              <span className="normal-case font-normal">(optional)</span>
            </p>
            <ExpiryPicker onChange={setExpirySeconds} />
          </div>

          <Button
            type="primary"
            size="large"
            block
            className="!rounded-xl !h-11 !font-semibold !shadow-md !shadow-orange-200"
            loading={loading}
            onClick={handleGenerate}
            icon={!loading && <ArrowRightOutlined />}
            iconPosition="end"
          >
            {loading ? "Shortening…" : "Generate Short URL"}
          </Button>
        </div>
      </motion.div>

      <StatsStrip />
    </div>
  );
}

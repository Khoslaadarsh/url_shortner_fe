import { useState } from "react";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { getExpirySeconds } from "../lib/utils";

const EXPIRY_PRESETS = ["1 Hour", "24 Hours", "7 Days"];

export function ExpiryPicker({ onChange }) {
  const [expiryPreset, setExpiryPreset] = useState(null);
  const [expiryDate, setExpiryDate]     = useState(null);
  const [expiryTime, setExpiryTime]     = useState(null);

  const notify = (preset, date, time) =>
    onChange(getExpirySeconds({ expiryPreset: preset, expiryDate: date, expiryTime: time }));

  const handlePreset = (preset) => {
    const next = expiryPreset === preset ? null : preset;
    setExpiryPreset(next);
    setExpiryDate(null);
    setExpiryTime(null);
    notify(next, null, null);
  };

  const isToday = (date) => date && date.isSame(dayjs(), "day");

  const disabledDate = (current) =>
    current && current.isBefore(dayjs().startOf("day"));

  const disabledTime = () => {
    if (!isToday(expiryDate)) return {};
    const now = dayjs();
    const h = now.hour();
    const m = now.minute();
    return {
      disabledHours:   () => Array.from({ length: h }, (_, i) => i),
      disabledMinutes: (sel) => sel === h ? Array.from({ length: m + 1 }, (_, i) => i) : [],
    };
  };

  const handleDateChange = (date) => {
    let time = expiryTime;
    if (date && date.isSame(dayjs(), "day") && expiryTime?.isBefore(dayjs(), "minute")) {
      setExpiryTime(null);
      time = null;
    }
    setExpiryDate(date);
    setExpiryPreset(null);
    notify(null, date, time);
  };

  const handleTimeChange = (time) => {
    setExpiryTime(time);
    setExpiryPreset(null);
    notify(null, expiryDate, time);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        {EXPIRY_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePreset(preset)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              expiryPreset === preset
                ? "bg-primary text-white border-primary shadow-sm shadow-orange-200"
                : "bg-white/60 text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <DatePicker
          className="flex-1"
          placeholder="mm/dd/yyyy"
          format="MM/DD/YYYY"
          value={expiryDate}
          onChange={handleDateChange}
          disabledDate={disabledDate}
        />
        <TimePicker
          className="flex-1"
          placeholder="-- : -- --"
          use12Hours
          format="h:mm a"
          value={expiryTime}
          onChange={handleTimeChange}
          disabledTime={disabledTime}
          showNow={false}
        />
      </div>
    </div>
  );
}

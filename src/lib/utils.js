import dayjs from "dayjs";

export function getExpirySeconds({ expiryPreset, expiryDate, expiryTime }) {
  if (expiryPreset === "1 Hour") return 3600;
  if (expiryPreset === "24 Hours") return 86400;
  if (expiryPreset === "7 Days") return 604800;
  if (expiryDate) {
    const base = expiryDate.startOf("day");
    const combined = expiryTime
      ? base.hour(expiryTime.hour()).minute(expiryTime.minute()).second(0)
      : base.endOf("day");
    return combined.diff(dayjs(), "second");
  }
  return null;
}

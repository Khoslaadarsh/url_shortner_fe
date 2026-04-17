import { useState, useEffect } from "react";
import { showToast } from "../lib/toast";
import { getProfileUrl } from "../services/urlService";
import { ProfileCard } from "../components/profile/ProfileCard";
import { URLTable } from "../components/profile/URLTable";
import { EditURLModal } from "../components/profile/EditURLModal";
import profileData from "../data/urls.json";

const { user, urls: initialUrls } = profileData;

export default function MyProfile() {
  const [profileResponse, setProfileResponse] = useState(null);
  const [data, setData] = useState(initialUrls);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    getProfileUrl()
      .then((res) => setProfileResponse(res))
      .catch((err) => console.error("profile fetch error:", err));
  }, []);

  const handleEditSave = ({ originalUrl, isActive, expirySeconds }) => {
    console.log("update payload:", { url: originalUrl, is_active: isActive, expiry_seconds: expirySeconds });
    setData((prev) =>
      prev.map((row) =>
        row.key === editingRecord.key ? { ...row, originalUrl, isActive } : row,
      ),
    );
    setEditingRecord(null);
    showToast.success("URL updated successfully");
  };

  const handleDelete = (key) => {
    setData((prev) => prev.filter((row) => row.key !== key));
    showToast.success("URL deleted");
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    showToast.success("Copied to clipboard");
  };

  const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);

  return (
    <div className="relative min-h-full overflow-hidden bg-orange-50 py-10 px-4">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ProfileCard user={user} urlCount={data.length} totalClicks={totalClicks} />

        <URLTable
          data={data}
          onEdit={setEditingRecord}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </div>

      <EditURLModal
        record={editingRecord}
        open={!!editingRecord}
        onSave={handleEditSave}
        onCancel={() => setEditingRecord(null)}
      />
    </div>
  );
}

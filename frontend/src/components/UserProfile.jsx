import { useState, useEffect } from "react";

function UserProfile() {
  // Get userId from URL query params
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Generate a preview whenever the file changes
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // cleanup
  }, [file]);

  const handleUpload = async () => {
    if (!file) return setMessage("Choose a file first");
    if (!userId) return setMessage("User ID missing");

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userId", userId);

    try {
      const res = await fetch("http://localhost:4000/api/profile/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Upload successful!");
        console.log("Cloudinary URL:", data.url);
      } else {
        setMessage(data.msg || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed: network/server error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Upload Profile Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {preview && (
        <div style={{ margin: "1rem" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", borderRadius: "50%" }}
          />
        </div>
      )}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserProfile;

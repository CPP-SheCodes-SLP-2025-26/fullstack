import { useState } from "react";
import "./Bills.css";
import fallbackReceipt from "../assets/SLP-bills-icon.jpg"; // <-- import fallback image  

export default function BillsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bills, setBills] = useState([]);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("receipt", selectedFile);

    try {
      const res = await fetch("http://localhost:3000/api/receipts/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const receipt = data?.data || data;
      const total = receipt?.total || 0;
      const thumbnail = receipt?.thumbnailUrl || "";
      const title = receipt?.vendor?.name || "Untitled";

      setBills([{ total, thumbnail, title }, ...bills]);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div className="bills-page">
      <h1 className="page-title">Bills / Receipts</h1>

      <div className="upload-container">
        <input type="file" accept="image/*" id="fileInput" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUpload}>Upload Receipt</button>
        <p className="no-file-selected">{selectedFile ? selectedFile.name : "No file chosen"}</p>
      </div>

      {bills.length === 0 ? (
        <p className="no-bills">No receipts uploaded yet</p>
      ) : (
        <div className="bills-list">
          {bills.map((bill, index) => (
            <div className="bill-card" key={index}>
              <img
                src={bill.thumbnail ? `http://localhost:3000${bill.thumbnail}` : fallbackReceipt}
                alt={`Receipt ${index + 1}`}
                className="thumbnail"
              />
              <div className="bill-info">
                <p className="bill-title">{bill.title}</p>
              </div>
              <p className="bill-total"><strong>${bill.total}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





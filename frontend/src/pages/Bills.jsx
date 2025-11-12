import { useEffect, useState } from "react";
import "./Bills.css";

const ICON_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/receipt.svg";

export default function BillsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bills, setBills] = useState([]);

  const ROOM = 204; // adjust as needed

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  // 🧾 Load receipts from DB
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/receipt/${ROOM}`);
        if (!res.ok) throw new Error("Failed to load receipts");
        const data = await res.json();
        setBills(data.receipts || []);
      } catch (err) {
        console.error("Error loading receipts:", err);
      }
    })();
  }, []);

  // 📤 Upload new receipt
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
      const total = Number(receipt?.total || 0);
      const title = receipt?.vendor?.name || "Untitled";

      // Save to DB
      const save = await fetch("http://localhost:3000/receipt/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_num: ROOM,
          name: title,
          total: total.toFixed(2),
        }),
      });
      if (!save.ok) throw new Error("Failed to save receipt to DB");
      const saved = await save.json();

      // Update list
      setBills((prev) => [{ id: saved.id, name: title, total }, ...prev]);
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
      </div>
      {bills.length === 0 ? (
        <p className="no-bills">No receipts uploaded yet</p>
      ) : (
        <div className="bills-list">
          {bills.map((bill) => (
            <div className="bill-card" key={bill.id}>
              <img
                src={ICON_URL}
                alt="Receipt icon"
                className="receipt-icon"
              />
              <div className="bill-info">
                <p className="bill-title">{bill.name}</p>
                <p className="bill-total"><strong>${Number(bill.total).toFixed(2)}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

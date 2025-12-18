import express from "express";

const app = express();
app.use(express.json());

// simple health check
app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

/**
 * POST /api/transfer
 * Request: { recipientName: string, amount: number }
 * Response (201):
 * {
 *   message: "Transfer successful",
 *   transaction: { id, date, description, amount, status }
 * }
 */
app.post("/api/transfer", (req, res) => {
  const { recipientName, amount } = req.body || {};

  // validation 
  if (typeof recipientName !== "string" || !recipientName.trim()) {
    return res.status(400).json({ message: "recipientName is required" });
  }
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "amount must be a positive number" });
  }

  const id = String(Date.now());
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const isoDate = `${yyyy}-${mm}-${dd}`;

  // mimic API
  const transaction = {
    id,
    date: isoDate,
    description: `Transfer to ${recipientName.trim()}`,
    amount: -amount,
    status: "pending"
  };

  return res.status(201).json({
    message: "Transfer successful",
    transaction
  });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  console.log(`API stub listening on http://localhost:${port}`);
});

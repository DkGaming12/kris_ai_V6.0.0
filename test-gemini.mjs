import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env manually for this isolated node script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const match = envFile.match(/VITE_GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : null;

if (!apiKey) {
  console.error("API Key tidak ditemukan di .env!");
  process.exit(1);
}

async function testChat() {
  console.log("Memulai simulasi tes percakapan obrolan (Chat AI) secara lokal...");
  const context = [
    { role: 'user', parts: [{ text: "Halo Kris, dari sekian banyak ide, nama pahlawannya siapa bagusnya untuk novel wuxia?" }] }
  ];

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          role: "user",
          parts: [{ text: "Anda adalah Kris Ai, asisten editor AI kelas dunia dan teman ngobrol khusus penulis fiksi." }]
        },
        contents: context
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    
    console.log("\n--- RESPON DARI KRIS AI (GEMINI) ---");
    console.log(data.candidates[0].content.parts[0].text);
    console.log("------------------------------------\n");
    console.log("Tes sukses! Sistem obrolan di latar belakang lokal tidak dicekal (Region Supported).");

  } catch (err) {
    console.error("Gagal terhubung:", err.message);
  }
}

testChat();

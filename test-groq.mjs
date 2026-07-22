import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env manually for this isolated node script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const match = envFile.match(/VITE_GROQ_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : null;

if (!apiKey || apiKey.includes('your_groq_api_key')) {
  console.error("API Key Groq tidak ditemukan atau masih placeholder di .env!");
  process.exit(1);
}

async function testGroq() {
  console.log("Memulai simulasi tes Groq Cloud API secara lokal...");
  
  try {
    const res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: 'user', content: "Halo, apakah kunci API Groq ini berfungsi?" }
        ]
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    
    console.log("\n--- RESPON DARI GROQ ---");
    console.log(data.choices[0].message.content);
    console.log("------------------------\n");
    console.log("Tes sukses! API Groq merespons dengan benar.");

  } catch (err) {
    console.error("Gagal terhubung ke Groq:", err.message);
  }
}

testGroq();

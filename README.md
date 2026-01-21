# AI-Content-Verifier 🛡️

A high-performance browser extension and serverless backend designed to detect AI-generated text in real-time. Built with a focus on low latency, scalability, and modern TypeScript practices.

## 🚀 The Solution
This project addresses the growing challenge of AI-generated misinformation. Instead of manual verification, this tool provides an automated "Deep Dive" analysis of web content using a specialized RoBERTa-based inference engine.



## 🛠️ Technical Stack
- **Frontend:** Chrome Extension API V3, TypeScript.
- **Backend:** Node.js (Serverless), Vercel Edge Functions.
- **AI/ML:** Hugging Face Inference API (RoBERTa-base-openai-detector).
- **Tooling:** Vite/TSC, Copyfiles (Build Automation).

## 🏗️ Architecture & System Design
- **Manifest V3:** Leverages the latest Chrome security standards and Service Workers.
- **Serverless Edge Computing:** The backend is deployed as a stateless function on Vercel, ensuring global low-latency and auto-scaling.
- **Decoupled Design:** The frontend (extension) and backend (API) are independent, allowing for easy integration with other platforms (Firefox, Safari, or Web Apps).
- **Privacy-First:** Minimal data footprint — only the selected text is processed in-flight without persistent storage.

## 📦 Installation & Setup

### Extension
1. Clone the repository.
2. Run `npm install` and `npm run build`.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" and click "Load unpacked".
5. Select the `dist` folder.

### Backend (Serverless)
1. Navigate to the `/api` directory.
2. Deploy to Vercel: `vercel --prod`.
3. Set your `HF_TOKEN` environment variable in the Vercel dashboard.

## 📈 Future Roadmap
- [ ] Implement local WebAssembly (WASM) inference using Transformers.js for 100% offline privacy.
- [ ] Add "Style Fingerprinting" to identify specific LLM versions (GPT-4 vs Claude 3).
- [ ] Highlight AI-detected fragments directly in the DOM with heatmaps.
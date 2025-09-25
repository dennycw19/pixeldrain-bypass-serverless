
# Pixeldrain URL Bypasser

Bypass Pixeldrain & get **direct download links** without ads or limits.  
Built with **Next.js 14, TailwindCSS, and Upstash Redis (rate limiter)**.  
Deployed on Vercel [https://pixeldrain-bypasser.vercel.app/](https://pixeldrain-bypasser.vercel.app/).

---


## 🚀 Demo

🔗 [pixeldrain-bypasser.vercel.app](https://pixeldrain-bypasser.vercel.app/)

---


## ✨ Features

- 🔑 Bypass Pixeldrain links (file / list / zip)
- 📂 Supports:
  - **File**: `https://pixeldrain.com/u/...`
  - **List**: `https://pixeldrain.com/l/...`
  - **File inside ZIP**: `https://pixeldrain.com/api/file/.../info/zip/...`
- ⏳ Rate limiting: **20 requests / 15 minutes**
- 🎨 TailwindCSS-based UI
- ⚡️ Serverless API via Next.js Route Handlers

---


## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) – Fullstack React framework
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS
- [Upstash Redis](https://upstash.com/) – Distributed rate limiting
- [Vercel](https://vercel.com/) – Deployment platform

---


## 📦 Installation

Clone the repository & install dependencies:

```bash
git clone https://github.com/username/pixeldrain-bypasser.git
cd pixeldrain-bypasser
npm install
```

Create a `.env.local` file:
```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Run the development server:
```bash
npm run dev
```
Visit http://localhost:3000.

    
## 🚢 Deployment

This project is already deployed on Vercel:
👉 pixeldrain-bypasser.vercel.app

To deploy your own version:

1. Push the project to GitHub
2. Import it into Vercel
3. Add UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN in Vercel → Settings → Environment Variables
4. Deploy 🚀


## License

[MIT](https://choosealicense.com/licenses/mit/)



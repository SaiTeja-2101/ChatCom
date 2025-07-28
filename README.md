# 🗨 ChatCom

A modern, real-time chat application with image sharing, secure authentication, and a Gemini AI-powered assistant. Built with React, Node.js, Socket.IO, and MongoDB.

---

## ✨ Features

- **Real-time Messaging:** Instant chat powered by Socket.IO.
- **Image Sharing:** Send and receive images in your conversations.
- **Gemini AI Assistant:** Chat with an integrated AI assistant for smart replies and help.
- **Secure Authentication:** JWT-based login and signup.
- **Responsive UI:** Beautiful, mobile-friendly design with theme support.
- **Profile Management:** Update your avatar and personal info.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Real-time:** Socket.IO
- **AI Integration:** Google Gemini API
- **Image Hosting:** Cloudinary

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/chatcom.git
cd chatcom
```

### 2. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend` folder:

```env
PORT=5555
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### 4. Run the app in development

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd ../frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

1. Build the frontend:
    ```bash
    cd frontend
    npm run build
    ```
2. Serve the frontend from the backend:
    - Make sure `NODE_ENV=production` in your backend `.env`
    - Start the backend:
      ```bash
      cd backend
      npm start
      ```
    - Visit [http://localhost:5555](http://localhost:5555)

---


## 🤖 AI Assistant

ChatCom integrates with **Google Gemini AI** to provide smart, context-aware responses. Just start a conversation with the AI assistant in your chat list!

---

## 📝 License

MIT License

---

Made with ❤️ by [Akula Sai Teja](https://github.com/SaiTeja-2101)

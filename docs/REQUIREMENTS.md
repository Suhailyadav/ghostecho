# 📝 Project Requirements – GhostEcho 

**GhostEcho** is a privacy-first, real-time one-on-one chat application focused on user control, media handling, and accessibility. This document outlines the planned features, technical scope, and architectural decisions for development.

---

## ✅ Problem Statement

When users send images or videos, recipients should be able to **accept or deny** the media before viewing it. This protects user privacy and ensures they are not forced to see unsolicited content.

---

## ✨ Unique Features

1. **Self-Destructing Messages**
   - User-defined timers per message.
   - Inspired by apps like Snapchat, but more flexible and customizable.

2. **Real-Time Speech-to-Text Conversion**
   - Converts voice messages into text automatically.
   - Great for accessibility and quiet/noisy environments.

3. **Media Sharing with Approval**
   - Recipient gets a prompt: “Accept or Reject” before viewing media.

4. **Fraud & Abuse Prevention**
   - Prevent multiple accounts per user/device.
   - Device fingerprinting, IP detection, OTP validation.

---

## 🔒 Privacy & Security Requirements

- ✅ End-to-End Encryption (E2EE)
- ✅ Secure media sharing with approval
- ✅ IP-based fraud detection
- ✅ OTP-based email/phone verification
- ✅ JWT-based authentication

---

## 📱 App Features

- **Authentication**
  - Signup/Login with JWT
  - OTP verification
  - Unique email & phone check
  - Duplicate prevention via IP/device

- **Chat Functionality**
  - One-on-one messaging (group chats optional later)
  - Real-time updates with Socket.io
  - Typing indicators
  - Read receipts
  - Message search

- **Media Features**
  - Upload/share images, videos, files
  - Accept/Deny before viewing
  - Cloud storage via Cloudinary or AWS S3

- **Privacy**
  - Self-destructing messages
  - Manual deletion
  - Block/unblock users

- **Speech Accessibility**
  - Real-time speech-to-text transcription for voice messages

- **Notifications**
  - Push + in-app notifications
  - Message alerts, read receipts

- **Admin Panel**
  - User management
  - Reporting, banning, logs

- **Design**
  - Responsive layout
  - Optional dark mode

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux (state management)
- Tailwind CSS / Bootstrap
- React Router
- Axios

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io (real-time messaging)
- JWT (auth)
- Cloudinary (media uploads)
- Helmet.js, CORS, Rate Limiting

### Deployment
- Frontend: Vercel / Netlify
- Backend: AWS EC2 / Railway / Render
- Database: MongoDB Atlas
- CI/CD: GitHub Actions (optional)

---

## 🗃️ Database Design

### Users Collection
- name
- email
- password (hashed)
- profilePicture
- isVerified
- onlineStatus
- deviceFingerprint
- createdAt

### Messages Collection
- senderId
- receiverId
- content (text/media/voice)
- type (text/image/video/voice)
- timer (for auto-delete)
- read (boolean)
- createdAt

### Optional Collections
- BlockList
- ChatRooms (for group support)
- AdminActionsLog

---

## 🚧 Future Enhancements (Post-MVP)

- Group chats
- Reactions (emoji)
- Scheduled messages
- Offline messaging support
- AI-based moderation
- Voice/video call integration
- PWA support

---

## 📅 Development Roadmap

| Phase | Goal |
|-------|------|
| Phase 1 | Backend setup (auth, DB, chat schema) |
| Phase 2 | Real-time Socket.io messaging |
| Phase 3 | Media upload + accept/deny |
| Phase 4 | Speech-to-text + self-destruct |
| Phase 5 | Admin panel, security, polish |
| Phase 6 | Deployment + README finalization |

---

_Last updated: June 2025_

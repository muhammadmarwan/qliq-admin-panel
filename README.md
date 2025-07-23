# ⚙️ QLIQ Admin Panel

The **QLIQ Admin Panel** is a real-time dashboard built using **Next.js App Router** that enables admins to manage users, products, and view commission data. It features **live user join notifications** via **Socket.IO**, seamlessly integrated with a Node.js backend.

---

## 🚀 Features

- 🔴 **Live User Join Tracking** using **Socket.IO**
- 👥 View and manage registered users with referral information
- 🛒 Manage products (create, update, delete)
- 💰 Monitor commissions earned by users
- 📱 Fully responsive UI powered by **TailwindCSS** and **shadcn/ui**

---

## 🖼️ Architecture Overview

> For full visual architecture, view this diagram:  
[🔗 Eraser Diagram (Project Flow)](https://drive.google.com/file/d/1JcLqSo1Fuh-zwoHb3z65iWGG3puCKjZk/view?usp=sharing)

---

## 🔧 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.dev/)
- **Real-time Updates**: [Socket.IO](https://socket.io/)
- **State Management**: React Hooks + Context API
- **API Consumption**: Axios to Express backend
- **Deployment**: (Not deployed – run locally)

---

## 📦 Folder Structure

src/
├── app/ # Next.js App Router pages
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks (e.g., useSocket)
├── lib/ # API and utility functions
├── styles/ # Tailwind and custom CSS
├── context/ # React Contexts (e.g., socket context)

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/qliq-admin-panel.git
cd qliq-admin-panel
```
2. Install dependencies

```bash
npm install
```
3. Create your .env.local file
env

NEXT_PUBLIC_BACKEND_API=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000


4. Run the development server
```bash
npm run dev
```

Visit: http://localhost:3000

🔄 Real-Time User Join Flow
Backend emits a user:joined event via Socket.IO when a new user signs up.

Admin panel listens to this event and updates the UI live in the Users screen.

📬 API Documentation
The Admin Panel consumes REST APIs from your Express backend.
For complete API details, refer to the Postman collection:
🔗 Postman Docs

📝 TODO / Future Enhancements
 Add admin authentication

 Dockerize frontend for consistent environment

 Add e2e and unit tests

 Deploy on Vercel or custom CI/CD

 Add role-based access control (RBAC)

👨‍💻 Author
Muhammad Marwan
📧 Email: mhdmarwan777@gmail.com

📜 License
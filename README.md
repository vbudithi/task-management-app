# 🗂️ TaskFlow- Task Management Application

🧑‍💻 **Full‑Stack Development** — Next.js ⚛️ | .NET Web API 🛠️ | SQL Server 🗄️

A production‑grade Task Management system featuring real‑time task transitions, instant updates across Todo, In‑Progress, and Completed states, secure authentication, and a clean full‑stack architecture.

### UI screenshots
![Dashboard](/screenshots/dashboard.png)
![login](/screenshots/login.png)
![dashboard-responsive](/screenshots/mobileResponsive.png)
![swagger](/screenshots/swagger.png)
![database](/screenshots/database.png)

# 🖥️ Frontend — Next.js 

  • Next.js 14 (App Router)
  
  • TypeScript
  
  • Tailwind CSS
  
  • shadcn/ui
  
  • Client-side routing

# 🔐 Backend — .NET Web API

  • .NET 8 Web API
  
  • Entity Framework Core
  
  • JWT Authentication
  
  • HttpOnly Cookies

  • SQL Server
  
  • DTO validation
  
  • Role-based authorization

# Frontend - testing

  • vitest
  
  • MSW(Mock Service Worker)
  
  • @testing-library/jest-dom

### 📦 Setup

```bash

--frontend
git clone https://github.com/vbudithi/task-management-app.git
cd frontend

npm install
npm run dev

--backend
git clone https://github.com/your-username/task-management-app.git
cd backend/TaskManagement.API

dotnet restore
dotnet run
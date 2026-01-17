# 🗂️ TaskFlow- Task Management Application

🧑‍💻 **Full‑Stack Development** — Next.js ⚛️ | .NET Web API 🛠️ | SQL Server 🗄️

A production‑grade Task Management system featuring real‑time task transitions, instant updates across Todo, In‑Progress, and Completed states, secure authentication, and a clean full‑stack architecture.

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

  ### screenshots
![Dashboard](/frontend/public/screenshots/dashboard.png)
![Login](/frontend/public/screenshots/login.png)
![Register](/frontend/public/screenshots/register.png)
![Forgot Password](/frontend/public/screenshots/forgot-password.png)
![View Task](/frontend/public/screenshots/view_task.png)
![Create Task](/frontend/public/screenshots/create_task.png)
![Edit Task](/frontend/public/screenshots/edit_task.png)
![Delete Task](/frontend/public/screenshots/delete_task.png)
![dashboard-responsive](/frontend/public/screenshots/mobileResponsive.png)
![swagger](/frontend/public/screenshots/swagger.png)
![database](/frontend/public/screenshots/database.png)

### Playwright testing sceenshot (e2e)
![login/register/forgot-password](/frontend/public/screenshots/e2e_test_login_reg_forgotPass.png)


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
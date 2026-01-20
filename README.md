# 🗂️ TaskFlow- Task Management Application

🧑‍💻 **Full‑Stack Development** — Next.js ⚛️ | .NET Web API 🛠️ | SQL Server 🗄️ | Python NER 🤖 

A production‑grade Task Management system featuring real‑time task transitions, instant updates across Todo, In‑Progress, and Completed states, secure authentication, and a clean full‑stack architecture. Now enhanced with AI‑powered task insights using a Python‑based Named Entity Recognition (NER) service for automatic priority and due‑date suggestions.

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

# 🤖 AI Layer — Python NER Service

  • Python‑based Named Entity Recognition (NER).

  • Extracts dates and priority‑related keywords, notfies the suggestions through toast and auto‑fills the suggested values into the form, and allows 
    the user to change them if needed.

  • Provides AI‑generated suggestions to the .NET backend.

  • Consumed by both Create and Edit task flow.

# Frontend - testing

  • vitest
  
  • MSW(Mock Service Worker)
  
  • @testing-library/jest-dom

## screenshots

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

## AI Integration screenshots

![AI Suggestion for Create Task](/frontend/public/screenshots/AiSuggestion_create_task.png)
![AI Suggestion for Edit Task](/frontend/public/screenshots/edit.png)
![swagger AI Integration](/frontend/public/screenshots/swagger_AiOutput.png)
![Python Named Entity Recognition (NER) Integration](/frontend/public/screenshots/Local_python_NER_Integration_dotnet.png)

## Playwright testing sceenshot (e2e)

![login/register/forgot-password](/frontend/public/screenshots/e2e_test_login_reg_forgotPass.png)

## 📦 Setup

### 🚀 Frontend(Nextjs)
```bash
git clone https://github.com/vbudithi/task-management-app.git
cd task-management-app/frontend

npm install
npm run dev
```
### 🧩Backend(.NET API)
```bash
git clone https://github.com/vbudithi/task-management-app.git
cd backend/TaskManagement.API

dotnet restore
dotnet run
```
### 🤖Python NER Server
```bash
cd ai-ner-server
python ner_server.py
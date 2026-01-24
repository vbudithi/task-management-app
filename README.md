# 🗂️ TaskFlow- Task Management Application

🧑‍💻 **Full‑Stack Development** — Next.js ⚛️ | .NET Web API 🛠️ | SQL Server 🗄️ | Python NER 🤖 

A production‑grade Task Management system featuring real‑time task transitions, instant updates across Todo, In‑Progress, and Completed states, secure authentication, and a clean full‑stack architecture. Now enhanced with intelligent task insights powered by:
- Python‑based Named Entity Recognition (NER) for automatic due‑date detection and priority suggestions based on keywords in the title (e.g., “urgent”, “tomorrow”).
- ML.NET machine learning model that predicts task priority directly from the task’s title and description, automatically assigning a priority when none is selected.
Together, these AI features deliver a smarter, more intuitive task creation and editing experience.


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
  

# AI Integration (Two Approaches)

My application uses two different AI systems, each serving a unique purpose.  
Both approaches enhance the task creation and editing experience in different ways.

---

## 🤖 Python NER Service (Natural Language Processing)

- Full‑stack implementation using .NET (API) and Next.js (UI)
- Python‑based Named Entity Recognition (NER).
- Extracts **dates**, **keywords**, and **priority‑related hints** from the task description.
- Shows toast notifications with suggestions and **auto‑fills** the recommended values into the form.
- User can still modify the suggestions before saving.
- Integrated into both **Create Task** and **Edit Task** flows.
- Communicates with the .NET backend to provide AI‑generated metadata.

### How it works
- Runs locally using a Python script.
- Analyzes the task title to detect meaningful entities.
- Helps with automation, tagging, and metadata extraction.

### Example

User enters:  
> “urgent users report by next Monday”

Python NER extracts:
- **Date:** next Monday  
- **Priority:** High (because of the keyword “urgent”)

The system then:
- Automatically fills the **due date** as next Monday  
- Automatically sets **priority = High**  
- Still allows the user to change these values before saving

---

## ⚡ ML.NET Priority Prediction (Machine Learning)

- Fully implemented inside **.NET** using ML.NET.
- Uses the own **labeled task data** from the database.
- `TaskTrainer` trains the model and saves it.
- Predicts task priority (**1 = Low, 2 = Medium, 3 = High**) based on **title + description**.
- Automatically assigns a priority when the user leaves it blank during task creation.
- Integrated with Swagger for testing and debugging.

### How it works
- The model is trained using real tasks from the database.
- `PredictPriorityAsync` loads the model and predicts priority in real time.
- Used during task creation when no priority is selected.

### Example
Title:  
> “Fix production bug”

Description:  
> “API returning 500 errors”

ML.NET prediction:  
→ **High Priority**


# Frontend - testing

  • vitest
  
  • MSW(Mock Service Worker)
  
  • @testing-library/jest-dom

## 📸 Screenshots

<div align="center">

### Dashboard
<img src="/frontend/public/screenshots/dashboard.png" width="800"/>

### Login
<img src="/frontend/public/screenshots/login.png" width="800"/>

### Register
<img src="/frontend/public/screenshots/register.png" width="800"/>

### Forgot Password
<img src="/frontend/public/screenshots/forgot-password.png" width="800"/>

### View Task
<img src="/frontend/public/screenshots/view_task.png" width="800"/>

### Create Task
<img src="/frontend/public/screenshots/create_task.png" width="800"/>

### Edit Task
<img src="/frontend/public/screenshots/edit_task.png" width="800"/>

### Delete Task
<img src="/frontend/public/screenshots/delete_task.png" width="800"/>

### Mobile Responsive Dashboard
<img src="/frontend/public/screenshots/mobileResponsive.png" width="800"/>

### Swagger API 
<img src="/frontend/public/screenshots/swagger.png" width="800"/>

### Database Schema
<img src="/frontend/public/screenshots/database.png" width="800"/>

</div>

---

## 🤖 Local python NER Integration

<div align="center">

### AI Suggested Priority (Create Task)
<img src="/frontend/public/screenshots/AiSuggestion_create_task.png" width="800"/>

### AI Suggested Priority (Edit Task)
<img src="/frontend/public/screenshots/AiSuggestion_edit_task.png" width="800"/>

### Swagger – AI Output
<img src="/frontend/public/screenshots/swagger_AiOutput.png" width="800"/>

### Python Named Entity Recognition (NER) Integration (Local)
<img src="/frontend/public/screenshots/Local_python_NER_Integration_dotnet.png" width="800"/>

## ML.NET Priority Prediction

### ML Trained Data (Swagger)
<img src="/frontend/public/screenshots/ML_dotnet_trained_swagger.png" width="800"/>

###  AI Suggested Priority (Swagger)
#### ML Dotnet Suggested Priority based on user's title and description (Create Task) 
<img src="/frontend/public/screenshots/ML_dotnet_suggestedPriority.png" width="800"/>
</div>

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
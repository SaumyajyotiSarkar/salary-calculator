# In-hand Salary Calculator (India) — Full Stack

A full-stack web application that calculates **monthly in-hand salary** based on **CTC**, **Basic %**, **HRA %**, **PF type**, **State**, and **Tax Regime (Old/New)**.  
It also provides **Old vs New regime comparison** and a **monthly breakdown chart** (PF vs Tax vs In-hand).

---

## Live Demo

- **Frontend (Vercel):** https://salary-calculator-e0jyutf5f-saumyajyotisarkars-projects.vercel.app/
- **Backend (Render):** https://salary-calculator-backend.onrender.com

---

## Features

-  Calculate **Gross Monthly**, **Employee PF**, **Income Tax**, **Professional Tax** and **In-hand Monthly**  
-  Compare **Old vs New Tax Regime** and show **best regime**  
-  Interactive **Recharts bar graph** (PF vs Tax vs In-hand)  
-  Form validation (backend + UI level)  
-  Reset button to clear results and restore defaults  
-  Deployed end-to-end (Frontend + Backend)

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- Recharts
- HTML/CSS (Inline Styles)

### Backend
- Java 17
- Spring Boot
- REST APIs
- DTO validation using Jakarta Validation
- Lombok

### Deployment
- Frontend: **Vercel**
- Backend: **Render (Docker)**

---

## 📡 API Endpoints

### 1) Calculate salary (selected regime)
`POST /api/calculate`

**Request Body**
```json
{
  "ctcAnnual": 800000,
  "basicPercent": 40,
  "hraPercentOfBasic": 50,
  "isMetro": true,
  "taxRegime": "NEW",
  "state": "WB",
  "pfType": "ACTUAL"
}

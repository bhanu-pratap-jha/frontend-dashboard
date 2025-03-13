# **Frontend - README**  

This repository contains the **frontend** implementation for a full-stack project that integrates **Google Sheets as a database** using **Next.js and Tailwind CSS**. It allows users to **authenticate, fetch data from Google Sheets, add dynamic columns, and manage records**.  

---

## **Features**  
- **User authentication (Signup/Login) using JWT**  
- **Google Sheets Integration** (Fetch and Add Data)  
- **Dynamic column addition** (Stored locally, not in Google Sheets)  
- **Responsive UI with Next.js and Tailwind CSS**  

---

## **Installation & Setup**  

### **1. Clone the Repository**  
```bash
git clone <your-repo-url>
cd frontend
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Configure Environment Variables**  
Create a `.env.local` file in the root directory and add the following variables:  

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```
**Note:** If deploying, replace `http://localhost:5000` with your **backend URL**.

### **4. Start the Frontend Server**  
```bash
npm run dev
```
The application will run on **`http://localhost:3000`** by default.  

---

## **Project Structure**  

```
frontend/
│── src/
│   ├── app/
│   │   ├── page.js        # Landing Page
│   │   ├── auth/page.js   # Login & Signup Page
│   │   ├── dashboard/page.js  # Dashboard with Google Sheets Integration
│   ├── components/        # Reusable UI components (Button, Input, Navbar)
│   ├── utils/api.js       # API calls to backend
│── public/                # Static assets
│── styles/                # CSS & Tailwind styles
│── .env.local             # Environment Variables
│── package.json           # Project Dependencies
│── README.md              # Documentation
```

---

## **Tech Stack**
- **Frontend:** Next.js, React  
- **Styling:** Tailwind CSS, CSS Modules  
- **State Management:** React Hooks (useState, useEffect)  
- **API Calls:** Axios  

---

## **Deployment Instructions**
1. Deploy the frontend on **Vercel, Netlify, or Railway**  
2. Set the **NEXT_PUBLIC_API_BASE_URL** to your deployed backend URL  
3. Ensure CORS is enabled for your frontend in the backend  

---

For any issues or contributions, feel free to open a pull request or raise an issue. 




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

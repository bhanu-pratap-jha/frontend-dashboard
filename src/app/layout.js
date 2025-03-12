import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Dashboard App",
  description: "A dashboard with authentication and Google Sheets integration",
  icons: {
    shortcut: "/favicon.ico", // If you have a favicon
  },
  openGraph: {
    title: "Dashboard App",
    description: "Manage your data with ease & efficiency.",
    url: "https://your-frontend.vercel.app", // Update with actual URL after deployment
    siteName: "Dashboard App",
    type: "website",
  },

  other: {
    "google-fonts": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

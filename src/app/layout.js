import "./globals.css";

export const metadata = {
  title: "Evalia",
  description: "Unlock the power of AI in hiring with Evalia. Effortlessly evaluate resumes and streamline candidate management with AI-driven insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

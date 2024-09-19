import "./globals.css";
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: "Evalia",
  description: "Unlock the power of AI in hiring with Evalia. Effortlessly evaluate resumes and streamline candidate management with AI-driven insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

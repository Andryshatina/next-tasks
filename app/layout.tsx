import Navbar from "./components/Navbar";
import "./globals.css";
import AuthSessionProvider from "./providers/SessionProvider";
import ReactQueryProvider from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently.",
};
const ThemeScript = () => {
  const script = `
    (function() {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <ThemeProvider>
          <AuthSessionProvider>
            <ReactQueryProvider>
              <Navbar />
              <main>{children}</main>
            </ReactQueryProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import Navbar from "./components/Navbar";
import "./globals.css";
import AuthSessionProvider from "./providers/SessionProvider";
import ReactQueryProvider from "./providers/QueryProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <AuthSessionProvider>
          <ReactQueryProvider>
            <Navbar />
            <main className="mx-auto p-4">{children}</main>
          </ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

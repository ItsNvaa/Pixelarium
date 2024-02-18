import type { Metadata } from "next";
import "../styles/globals.css";
import { jakartaSans } from "@/configs/fonts";
import { ThemeProvider } from "@/lib/ThemesProvider";
import ReduxProvider from "@/stores/Provider";
import GlobalToaster from "@/lib/GlobalToaster";

export const metadata: Metadata = {
  title: "Pixelarium",
  description: "The Infinite Pixels Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-pt-20 scroll-smooth selection:bg-primary selection:text-secondary"
    >
      <body className={jakartaSans.variable}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <GlobalToaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

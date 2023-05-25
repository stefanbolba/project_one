import "../styles/globals.scss";
import Providers from "@/app/providers/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}

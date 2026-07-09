import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import RootLayoutClient from "./layout-client";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nestick Tech - Your Digital Partner for Success",
  description: "Nestick - Complete digital solutions from idea to execution.",

  icons: {
    icon: "/nesticklogo.jpg",
    shortcut: "/nesticklogo.jpg",
    apple: "/nesticklogo.jpg",
  },

  // Open Graph Tags (Social Media Sharing)
  openGraph: {
    title: "Nestick Tech - Your Digital Partner for Success",
    description:
      "Nestick - Complete digital solutions from idea to execution. Web development, mobile apps, and digital marketing services.",
    url: "https://nesticktech.com",
    siteName: "Nestick Tech",
    images: [
      {
        url: "https://nesticktech.com/nesticklogo.jpg",
        width: 1200,
        height: 630,
        alt: "Nestick Tech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Nestick Tech - Your Digital Partner for Success",
    description:
      "Nestick - Complete digital solutions from idea to execution.",
    images: ["https://nesticktech.com/nesticklogo.jpg"],
  },

  keywords:
    "Nestick Tech, web development, mobile apps, digital marketing, software development",

  authors: [{ name: "Nestick Tech" }],
  creator: "Nestick Tech",
  publisher: "Nestick Tech",

  robots: "index, follow",

  alternates: {
    canonical: "https://nesticktech.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:email" content="info@nesticktech.com" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <link rel="canonical" href="https://nesticktech.com" />
      </head>

      <body
        className={`${poppins.variable} antialiased bg-[#020617] text-white`}
      >
        {/* ===========================
            Meta Pixel
        ============================ */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '2107396346479152');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Meta Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2107396346479152&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* ===========================
            Microsoft Clarity
        ============================ */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){
                      (c[a].q=c[a].q||[]).push(arguments)
                  };
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "t8s80k318k");
            `,
          }}
        />

        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
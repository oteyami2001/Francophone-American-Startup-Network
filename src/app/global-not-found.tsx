import type { Metadata } from "next";
import "./globals.css";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found / Page introuvable | FASN",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-navy-50 px-4">
        <main className="card max-w-lg p-8 text-center">
          <img src={`${basePath}/images/brand/fasn-emblem.webp`} alt="" width={80} height={80} className="mx-auto h-20 w-20" />
          <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
          <p className="mt-1 text-lg font-semibold text-teal-700" lang="fr">Page introuvable</p>
          <p className="mt-4 text-muted">The page you are looking for doesn’t exist or has moved.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`${basePath}/en/`} className="btn-navy">Home</a>
            <a href={`${basePath}/fr/`} className="btn-outline" lang="fr">Accueil</a>
          </div>
        </main>
      </body>
    </html>
  );
}

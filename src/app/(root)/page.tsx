import type { Metadata } from "next";
import { basePath, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Francophone-American Startup Network",
  description: "Connecting Francophone entrepreneurs with the American business ecosystem.",
  alternates: { canonical: `${siteUrl}/en/` },
  robots: { index: false, follow: true },
};

/**
 * The site root picks a language: French if the browser prefers French,
 * otherwise English. Works on static hosting (no server needed).
 */
export default function RootPage() {
  const script = `(function(){try{var l=(navigator.languages&&navigator.languages[0])||navigator.language||"en";var t=/^fr\\b/i.test(l)?"fr":"en";location.replace(${JSON.stringify(basePath)}+"/"+t+"/");}catch(e){location.replace(${JSON.stringify(basePath)}+"/en/");}})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/en/`} />
      </noscript>
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1rem", textAlign: "center" }}>
        <h1 style={{ color: "#0B2D5B" }}>Francophone-American Startup Network</h1>
        <p>
          <a href={`${basePath}/en/`}>English</a> · <a href={`${basePath}/fr/`} lang="fr">Français</a>
        </p>
      </main>
    </>
  );
}

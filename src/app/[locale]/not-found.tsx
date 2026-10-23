import Link from "next/link";
import { EmptyState } from "@/components/ui";

// Rendered inside the locale layout. Static export cannot know the locale here,
// so the message is bilingual.
export default function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        icon="flag"
        title="Page not found · Page introuvable"
        text="The page you are looking for doesn’t exist or has moved. · La page que vous cherchez n’existe pas ou a été déplacée."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/en/" className="btn-navy">Home</Link>
            <Link href="/fr/" className="btn-outline">Accueil</Link>
          </div>
        }
      />
    </div>
  );
}

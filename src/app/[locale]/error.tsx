"use client";

import { useParams } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import { EmptyState } from "@/components/ui";

export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  const params = useParams<{ locale: string }>();
  const t = getDictionary(params?.locale && isLocale(params.locale) ? params.locale : "en");
  return (
    <div className="container-page py-20">
      <EmptyState
        icon="info"
        title={t.error.title}
        text={t.error.text}
        action={
          <button type="button" onClick={reset} className="btn-navy">
            {t.error.retry}
          </button>
        }
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { SERVICE_CATEGORIES } from "@/data/services";

// Merges backend overrides into the static service data.
export function useServiceCategories() {
  const [cats, setCats] = useState(SERVICE_CATEGORIES);

  useEffect(() => {
    let alive = true;
    api
      .get("/service-content")
      .then((r) => {
        if (!alive) return;
        const overrides = r.data || {};
        const merged = SERVICE_CATEGORIES.map((c) => {
          const o = overrides[c.slug];
          if (!o) return c;
          return {
            ...c,
            title: o.title || c.title,
            blurb: o.blurb || c.blurb,
            image: o.image || c.image,
            web: o.web || c.web,
            features: Array.isArray(o.features) && o.features.length ? o.features : c.features,
            workflow: Array.isArray(o.workflow) && o.workflow.length ? o.workflow : c.workflow,
          };
        });
        setCats(merged);
      })
      .catch(() => {
        /* fall back to defaults */
      });
    return () => {
      alive = false;
    };
  }, []);

  return cats;
}

import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const paths = [
  "/",
  "/produto",
  "/sobre",
  "/contato",
  "/faq",
  "/rastreio",
  "/politica-envio",
  "/politica-privacidade",
  "/politica-reembolso",
  // Loja alemã (mesmo domínio, prefixo /de)
  "/de",
  "/de/produkt",
  "/de/ueber-uns",
  "/de/kontakt",
  "/de/faq",
  "/de/sendungsverfolgung",
  "/de/versand",
  "/de/datenschutz",
  "/de/rueckerstattung",
  // UK store (same domain, /uk prefix)
  "/uk",
  "/uk/product",
  "/uk/about",
  "/uk/contact",
  "/uk/faq",
  "/uk/tracking",
  "/uk/shipping",
  "/uk/privacy",
  "/uk/refund",
  // MX store (same domain, /mx prefix)
  "/mx",
  "/mx/producto",
  "/mx/nosotros",
  "/mx/contacto",
  "/mx/faq",
  "/mx/rastreo",
  "/mx/envios",
  "/mx/privacidad",
  "/mx/reembolsos",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(
            (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

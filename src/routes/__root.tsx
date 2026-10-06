import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useAntiCopy } from "@/hooks/useAntiCopy";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import { useMetaPixel } from "@/hooks/useMetaPixel";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta página não existe ou mudou de endereço.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar à loja
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: import("@tanstack/react-router").ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Não foi possível carregar a página
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar a página ou volte à loja.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar à loja
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VIVI Cap | Protetor Térmico para Canetas de Insulina e GLP-1" },
      {
        name: "description",
        content:
          "VIVI Cap: protetor térmico que substitui a tampa da caneta de insulina ou GLP-1 e protege o medicamento do calor no dia a dia, em viagens e no trabalho. Pagamento via Pix.",
      },
      {
        name: "keywords",
        content:
          "protetor térmico insulina, estojo térmico insulina, case térmico Ozempic, tampa térmica caneta, VIVI Cap, insulina no calor, viagem com insulina",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:site_name", content: "VIVI Cap" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1b2266" },
      {
        property: "og:title",
        content: "VIVI Cap | Protetor Térmico para Canetas de Insulina e GLP-1",
      },
      {
        name: "twitter:title",
        content: "VIVI Cap | Protetor Térmico para Canetas de Insulina e GLP-1",
      },
      {
        property: "og:description",
        content:
          "VIVI Cap: protetor térmico que substitui a tampa da caneta de insulina ou GLP-1 e protege o medicamento do calor no dia a dia, em viagens e no trabalho. Pagamento via Pix.",
      },
      {
        name: "twitter:description",
        content:
          "VIVI Cap: protetor térmico que substitui a tampa da caneta de insulina ou GLP-1 e protege o medicamento do calor no dia a dia, em viagens e no trabalho. Pagamento via Pix.",
      },
      { property: "og:image", content: "/images/produto/vivicap-viagem.webp" },
      { property: "og:image:alt", content: "VIVI Cap — protetor térmico para canetas" },
      { name: "twitter:image", content: "/images/produto/vivicap-viagem.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "text/javascript",
        // Pixel da UTMify (nunca carrega duplicado).
        children: `(function(){if(document.querySelector('script[src*="cdn.utmify.com.br/scripts/pixel/pixel.js"]'))return;window.pixelId="6ac469ea6eb9da4c361e4f3f";var s=document.createElement("script");s.src="https://cdn.utmify.com.br/scripts/pixel/pixel.js";s.async=true;s.defer=true;(document.head||document.documentElement).appendChild(s);})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useAntiCopy();
  useTrackPageView();
  useMetaPixel();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

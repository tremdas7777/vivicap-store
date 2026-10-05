import { useEffect, useState } from "react";
import { FREE_SHIPPING_MIN } from "@/lib/bundles";

const MESSAGES = [
  `Frete grátis em compras acima de R$ ${FREE_SHIPPING_MIN}`,
  "Pagamento via Pix com aprovação na hora",
  "Enviamos para todo o Brasil",
];

/** Faixa no topo do site com mensagens rotativas. */
export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-[var(--navy-deep)] text-white">
      <p
        key={i}
        className="fade-up mx-auto max-w-7xl px-4 py-2 text-center text-[11.5px] font-semibold uppercase tracking-[0.14em]"
        aria-live="polite"
      >
        {MESSAGES[i]}
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deletePixGateKeyFn,
  getPixGateStatus,
  savePixGateKeyFn,
  testPixGateKeyFn,
} from "@/lib/pixgate.functions";

export interface PixGateCardProps {
  password: string;
}

/** Gateway Pix (PixGate): chave salva no banco, com troca, exclusão e teste de conexão. */
export function PixGateCard({ password }: PixGateCardProps) {
  const statusFn = useServerFn(getPixGateStatus);
  const saveFn = useServerFn(savePixGateKeyFn);
  const deleteFn = useServerFn(deletePixGateKeyFn);
  const testFn = useServerFn(testPixGateKeyFn);

  const [configured, setConfigured] = useState<boolean | null>(null);
  const [source, setSource] = useState<"db" | "env" | null>(null);
  const [maskedKey, setMaskedKey] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = () =>
    statusFn({ data: { password } })
      .then((r) => {
        setConfigured(r.configured);
        setSource(r.source);
        setMaskedKey(r.maskedKey);
      })
      .catch(() => setConfigured(false));

  useEffect(() => {
    if (!password) return;
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const run = async (fn: () => Promise<string>) => {
    setBusy(true);
    setMsg(null);
    try {
      setMsg(await fn());
    } catch (e) {
      setMsg(e instanceof Error && e.message ? e.message : "Falhou. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };

  const save = () =>
    run(async () => {
      await saveFn({ data: { password, key: key.trim() } });
      setKey("");
      await refresh();
      return "Chave salva. Os próximos Pix já usam esta chave.";
    });

  const remove = () =>
    run(async () => {
      await deleteFn({ data: { password } });
      await refresh();
      return "Chave apagada do banco.";
    });

  const test = () =>
    run(async () => {
      const r = await testFn({ data: { password } });
      return r.ok
        ? "Conexão OK: a PixGate aceitou a chave."
        : `A PixGate recusou${r.status ? ` (HTTP ${r.status})` : ""}: ${r.error ?? "sem detalhes"}`;
    });

  return (
    <Card className="mt-3 flex flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <CreditCard className="h-5 w-5 text-muted-foreground" aria-hidden />
        <div>
          <div className="font-medium">Gateway Pix (PixGate)</div>
          <div className="text-xs text-muted-foreground">
            Chave usada para gerar os Pix e confirmar os pagamentos. Sem chave, o checkout mostra
            "Pagamento indisponível".
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          type="password"
          placeholder={
            configured ? "Chave salva — cole uma nova para trocar" : "Cole a API key da PixGate"
          }
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="sm:max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" disabled={!key.trim() || busy} onClick={save}>
            Salvar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={source !== "db" || busy}
            onClick={remove}
          >
            Apagar
          </Button>
          <Button size="sm" variant="outline" disabled={!configured || busy} onClick={test}>
            Testar conexão
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="text-muted-foreground">
          {configured === null
            ? "…"
            : configured
              ? source === "env"
                ? "Conectada (chave da variável PIXGATE_API_KEY)"
                : "Conectada"
              : "Sem chave — o checkout não gera Pix"}
        </span>
        {maskedKey && (
          <span className="font-mono text-muted-foreground">Chave atual: {maskedKey}</span>
        )}
        {msg && <span className="text-foreground">{msg}</span>}
      </div>
    </Card>
  );
}

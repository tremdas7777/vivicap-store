// Chave da PixGate. Somente servidor.
// Salva no /admin (tabela private_settings); a variável PIXGATE_API_KEY do Lovable é a reserva.

export const PIXGATE_API = "https://app.pixgateip.com/api";
const KEY = "pixgate_api_key";

export async function getPixGateKey(): Promise<{
  key: string | null;
  source: "db" | "env" | null;
}> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("private_settings")
      .select("value")
      .eq("key", KEY)
      .maybeSingle();
    if (data?.value) return { key: data.value, source: "db" };
  } catch (e) {
    console.error("getPixGateKey: banco indisponível, usando a variável de ambiente", e);
  }
  const fromEnv = process.env["PIXGATE_API_KEY"];
  return fromEnv ? { key: fromEnv, source: "env" } : { key: null, source: null };
}

/** Chave para chamar a PixGate; sem chave, o checkout mostra "Pagamento indisponível". */
export async function requirePixGateKey(): Promise<string> {
  const { key } = await getPixGateKey();
  if (!key) throw new Error("Pagamento indisponível no momento.");
  return key;
}

export async function savePixGateKey(value: string): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("private_settings")
    .upsert({ key: KEY, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function deletePixGateKey(): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("private_settings").delete().eq("key", KEY);
  if (error) throw new Error(error.message);
}

/**
 * Testa a chave sem gerar cobrança: consulta uma transação inexistente.
 * 401/403 = chave recusada; qualquer outra resposta = a PixGate aceitou a autenticação.
 */
export async function testPixGateKey(): Promise<{ ok: boolean; status?: number; error?: string }> {
  const { key } = await getPixGateKey();
  if (!key) return { ok: false, error: "Sem chave" };
  try {
    const res = await fetch(`${PIXGATE_API}/stats/teste-conexao-loja`, {
      headers: { Apikey: key, Accept: "application/json" },
    });
    if (res.status === 401 || res.status === 403) {
      return { ok: false, status: res.status, error: "Chave recusada pela PixGate" };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Falha de conexão" };
  }
}

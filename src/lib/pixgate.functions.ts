import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const pw = z.object({ password: z.string().min(1).max(200) });

function assertAdmin(password: string) {
  if (password !== process.env["ADMIN_PASSWORD"]) throw new Error("Não autorizado");
}

function mask(token: string): string {
  if (token.length <= 8) return "••••";
  return `${token.slice(0, 4)}••••${token.slice(-4)}`;
}

export const getPixGateStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { getPixGateKey } = await import("./pixgate.server");
    const { key, source } = await getPixGateKey();
    return { configured: Boolean(key), source, maskedKey: key ? mask(key) : null };
  });

export const savePixGateKeyFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.extend({ key: z.string().trim().min(10).max(300) }).parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { savePixGateKey } = await import("./pixgate.server");
    await savePixGateKey(data.key.trim());
    return { ok: true };
  });

export const deletePixGateKeyFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { deletePixGateKey } = await import("./pixgate.server");
    await deletePixGateKey();
    return { ok: true };
  });

export const testPixGateKeyFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    assertAdmin(data.password);
    const { testPixGateKey } = await import("./pixgate.server");
    return testPixGateKey();
  });

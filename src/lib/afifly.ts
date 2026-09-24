/**
 * Client API Boutique Afifly
 * Doc: https://blog.i-click.fr/assistance/api-boutique
 *
 * Header: x-api-token
 * Base: https://skydiveemotions.afifly.fr/shopapi
 */

export type AfiflyPack = { id: number; name: string; pri_ttc: string };
export type AfiflyOption = {
  id: number;
  name: string;
  pri_ttc: string;
  is_video: string | number;
};
export type AfiflyMrgl = { id: number; name: string };
export type AfiflyTarif = { id: number; name: string };
export type AfiflyPlanning = { id: number; name: string };
export type AfiflyPlanningPlace = {
  heure: string;
  dispos: number;
  resas: number;
  places: number;
  name: string;
  pack_ids: number[];
};

export type AfiflySautant = {
  firstname: string;
  lastname: string;
  born?: string;
  email: string;
  phone?: string;
  gender?: "H" | "F";
  weight?: string;
  height?: string;
  city?: string;
  country?: string;
  postcode?: string;
  address?: string;
  force_adherent_creation?: 0 | 1;
  accept_mail?: 0 | 1;
};

export type AfiflyAdherentPayload = {
  sautant: AfiflySautant;
  tpa?: AfiflySautant;
  comment_paiement?: string;
  comment_sautant?: string;
  comment_bon?: string;
  bon_number?: string;
  amount_paid: number;
  date?: string;
  tarif_id?: number;
  planning_id?: number;
  pack_id: number;
  mrgl_id: number;
  options?: number[];
};

export type AfiflyResult =
  | { ok: true; status: number; data: unknown; testMode: boolean }
  | { ok: false; status: number; message: string; testMode: boolean };

function getBaseUrl() {
  return (
    process.env.AFIFLY_API_BASE?.replace(/\/$/, "") ||
    "https://skydiveemotions.afifly.fr/shopapi"
  );
}

export function getAfiflyApiKey(): string | null {
  const useTest = process.env.AFIFLY_USE_TEST_KEY === "true";
  if (useTest) {
    const key = process.env.AFIFLY_API_KEY_TEST || process.env.AFIFLY_API_KEY;
    return key?.trim() || null;
  }
  const key =
    process.env.AFIFLY_API_KEY_PRODUCTION ||
    process.env.AFIFLY_API_KEY ||
    process.env.AFIFLY_API_KEY_TEST;
  return key?.trim() || null;
}

export function isAfiflyConfigured() {
  return Boolean(getAfiflyApiKey());
}

export function getAfiflyMrglId() {
  const raw = process.env.AFIFLY_MRGL_ID;
  const n = raw ? Number(raw) : 7;
  return Number.isFinite(n) && n > 0 ? n : 7;
}

async function afiflyFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; data: T | { message?: string } }> {
  const key = getAfiflyApiKey();
  if (!key) {
    return { status: 503, data: { message: "Afifly no está configurado." } };
  }

  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      "x-api-token": key,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    signal: AbortSignal.timeout(60_000),
  });

  let data: T | { message?: string };
  try {
    data = (await res.json()) as T;
  } catch {
    data = { message: `Respuesta Afifly inválida (HTTP ${res.status})` };
  }

  return { status: res.status, data };
}

export async function listAfiflyPacks() {
  return afiflyFetch<AfiflyPack[]>("/packs");
}

export async function listAfiflyOptions() {
  return afiflyFetch<AfiflyOption[]>("/options");
}

export async function listAfiflyMrgls() {
  return afiflyFetch<AfiflyMrgl[]>("/mrgls");
}

export async function listAfiflyTarifs() {
  return afiflyFetch<AfiflyTarif[]>("/tarifs");
}

export async function listAfiflyPlannings() {
  return afiflyFetch<AfiflyPlanning[]>("/plannings");
}

export async function getAfiflyPlanningPlaces(params: {
  from: string;
  to: string;
  planning_id: number;
}) {
  const query = new URLSearchParams({
    from: params.from,
    to: params.to,
    planning_id: String(params.planning_id),
  }).toString();
  return afiflyFetch<AfiflyPlanningPlace[]>(`/planning/places?${query}`);
}

export async function createAfiflyAdherent(
  payload: AfiflyAdherentPayload,
): Promise<AfiflyResult> {
  const testMode =
    process.env.AFIFLY_USE_TEST_KEY === "true" ||
    (!process.env.AFIFLY_API_KEY && Boolean(process.env.AFIFLY_API_KEY_TEST));

  try {
    const { status, data } = await afiflyFetch<Record<string, unknown>>(
      "/adherent",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    if (status >= 200 && status < 300) {
      return { ok: true, status, data, testMode };
    }

    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message?: string }).message || "Error Afifly")
        : `Error Afifly HTTP ${status}`;

    return { ok: false, status, message, testMode };
  } catch (err) {
    console.error("[afifly] createAfiflyAdherent", err);
    return {
      ok: false,
      status: 500,
      message: err instanceof Error ? err.message : "Error de red Afifly",
      testMode,
    };
  }
}

export function splitFullName(full: string | null | undefined): {
  firstname: string;
  lastname: string;
} {
  const cleaned = (full || "").trim().replace(/\s+/g, " ");
  if (!cleaned) {
    return { firstname: "Cliente", lastname: "Web" };
  }
  const parts = cleaned.split(" ");
  if (parts.length === 1) {
    return { firstname: parts[0], lastname: parts[0] };
  }
  return {
    firstname: parts.slice(0, -1).join(" "),
    lastname: parts[parts.length - 1]!.toUpperCase(),
  };
}

const COUNTRY_NAMES: Record<string, string> = {
  ES: "España",
  FR: "France",
  PT: "Portugal",
  IT: "Italia",
  DE: "Deutschland",
  GB: "United Kingdom",
  UK: "United Kingdom",
  BE: "Belgique",
  CH: "Suisse",
  AD: "Andorra",
};

export function countryFromCode(code: string | null | undefined) {
  if (!code) return undefined;
  const upper = code.toUpperCase();
  return COUNTRY_NAMES[upper] || code;
}

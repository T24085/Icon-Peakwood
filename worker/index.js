const portalSeedAssignees = [
  { id: "team-maintenance", name: "Maintenance team", type: "Team", specialty: "General maintenance", phone: "713-974-3400", email: "maintenance@iconpeakwood.com" },
  { id: "miguel-r", name: "Miguel R.", type: "Member", specialty: "Plumbing · HVAC", phone: "713-555-0122", email: "miguel.r@iconpeakwood.com" },
  { id: "kayla-j", name: "Kayla J.", type: "Member", specialty: "Interiors · turnovers", phone: "713-555-0167", email: "kayla.j@iconpeakwood.com" },
  { id: "peakwood-plumbing", name: "Peakwood Plumbing Co.", type: "Contractor", specialty: "Plumbing response", phone: "713-555-0191", email: "dispatch@peakwoodplumbing.com" },
];

const portalSeedRequests = [
  { id: "IP-2641", resident: "Jordan Lee", unit: "312", email: "jordan.lee@email.com", phone: "713-555-0182", category: "Plumbing & Water", priority: "Urgent", status: "In progress", submitted: "Today · 9:14 AM", description: "The bathroom sink is backing up and water is draining very slowly.", entry: "Yes, please", pet: "No", assignedTo: "Miguel R.", notes: [{ author: "Miguel R.", text: "Technician scheduled for today between 1–3 PM.", time: "Today · 10:02 AM" }], photoName: "" },
  { id: "IP-2638", resident: "Taylor Morgan", unit: "204", email: "taylor.morgan@email.com", phone: "713-555-0104", category: "Air Conditioning & Heat", priority: "Routine", status: "Scheduled", submitted: "Yesterday · 4:36 PM", description: "The bedroom vent is running, but the room is not cooling like the rest of the apartment.", entry: "Call first", pet: "Yes", assignedTo: "Maintenance team", notes: [{ author: "Office", text: "Visit confirmed for tomorrow morning.", time: "Yesterday · 5:10 PM" }], photoName: "" },
  { id: "IP-2631", resident: "Alex Rivera", unit: "118", email: "alex.rivera@email.com", phone: "713-555-0148", category: "Keys, Locks & Access", priority: "Routine", status: "New", submitted: "Mon · 11:20 AM", description: "The deadbolt is sticking when I turn the key from inside the unit.", entry: "Yes, please", pet: "No", assignedTo: "Unassigned", notes: [], photoName: "" },
  { id: "IP-2624", resident: "Morgan Ellis", unit: "407", email: "morgan.ellis@email.com", phone: "713-555-0175", category: "Appliances & Interiors", priority: "Routine", status: "Resolved", submitted: "Fri · 2:05 PM", description: "The dishwasher was leaving water in the bottom after a cycle.", entry: "Yes, please", pet: "No", assignedTo: "Kayla J.", notes: [{ author: "Kayla J.", text: "Filter cleared and test cycle completed.", time: "Mon · 9:08 AM" }], photoName: "" },
];

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS maintenance_requests (id TEXT PRIMARY KEY, resident TEXT NOT NULL, unit TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, category TEXT NOT NULL, priority TEXT NOT NULL, status TEXT NOT NULL, submitted TEXT NOT NULL, description TEXT NOT NULL, entry TEXT NOT NULL, pet TEXT NOT NULL, assigned_to TEXT NOT NULL DEFAULT 'Unassigned', notes_json TEXT NOT NULL DEFAULT '[]', photo_name TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  "CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests(status)",
  "CREATE INDEX IF NOT EXISTS idx_maintenance_requests_assigned_to ON maintenance_requests(assigned_to)",
  `CREATE TABLE IF NOT EXISTS maintenance_assignees (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, type TEXT NOT NULL, specialty TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS staff_users (username TEXT PRIMARY KEY, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS staff_sessions (token_hash TEXT PRIMARY KEY, username TEXT NOT NULL, expires_at TEXT NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY (username) REFERENCES staff_users(username) ON DELETE CASCADE)`,
  "CREATE INDEX IF NOT EXISTS idx_staff_sessions_expiry ON staff_sessions(expires_at)",
];

let databaseReady;
const allowedOrigins = new Set([
  "https://t24085.github.io",
  "https://icon-peakwood.pandoratv.chatgpt.site",
  "https://iconpeakwood.novatec.casa",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) },
  });
}

function now() {
  return new Date().toISOString();
}

function getCookie(request, name) {
  const header = request.headers.get("cookie") || "";
  const entry = header.split(";").map((value) => value.trim()).find((value) => value.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : "";
}

function cookieHeader(token, maxAge, request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const isCrossOrigin = origin && origin !== requestUrl.origin;
  return `icon_peakwood_staff=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${isCrossOrigin ? "None" : "Lax"}${requestUrl.protocol === "https:" ? "; Secure" : ""}`;
}

function withCors(response, request) {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.has(origin)) return response;
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Headers", "content-type");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  headers.set("Vary", "Origin");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function rowToRequest(row) {
  return {
    id: row.id, resident: row.resident, unit: row.unit, email: row.email, phone: row.phone,
    category: row.category, priority: row.priority, status: row.status, submitted: row.submitted,
    description: row.description, entry: row.entry, pet: row.pet, assignedTo: row.assigned_to,
    notes: JSON.parse(row.notes_json || "[]"), photoName: row.photo_name || "",
  };
}

function rowToAssignee(row) {
  return { id: row.id, name: row.name, type: row.type, specialty: row.specialty, phone: row.phone || "", email: row.email || "" };
}

async function seedDatabase(db) {
  const timestamp = now();
  const passwordHash = await digest("admin");
  const statements = [
    db.prepare("INSERT OR IGNORE INTO staff_users (username, password_hash, display_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").bind("admin", passwordHash, "Icon Peakwood Admin", timestamp, timestamp),
    ...portalSeedAssignees.map((item) => db.prepare("INSERT OR IGNORE INTO maintenance_assignees (id, name, type, specialty, phone, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(item.id, item.name, item.type, item.specialty, item.phone, item.email, timestamp, timestamp)),
    ...portalSeedRequests.map((item) => db.prepare("INSERT OR IGNORE INTO maintenance_requests (id, resident, unit, email, phone, category, priority, status, submitted, description, entry, pet, assigned_to, notes_json, photo_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(item.id, item.resident, item.unit, item.email, item.phone, item.category, item.priority, item.status, item.submitted, item.description, item.entry, item.pet, item.assignedTo, JSON.stringify(item.notes), item.photoName, timestamp, timestamp)),
  ];
  await db.batch(statements);
}

async function ensureDatabase(env) {
  if (!env.DB) throw new Error("Database binding DB is not configured.");
  if (!databaseReady) {
    databaseReady = env.DB.batch(schemaStatements.map((statement) => env.DB.prepare(statement))).then(() => seedDatabase(env.DB));
  }
  await databaseReady;
}

async function requireStaff(request, env) {
  const token = getCookie(request, "icon_peakwood_staff");
  if (!token) return null;
  const row = await env.DB.prepare("SELECT username, display_name FROM staff_sessions JOIN staff_users USING (username) WHERE token_hash = ? AND expires_at > ?").bind(await digest(token), now()).first();
  return row || null;
}

async function parseBody(request) {
  try { return await request.json(); } catch { return null; }
}

function requestFields(data, existing = {}) {
  return {
    resident: String(data.resident ?? existing.resident ?? "").trim(), unit: String(data.unit ?? existing.unit ?? "").trim(),
    email: String(data.email ?? existing.email ?? "").trim(), phone: String(data.phone ?? existing.phone ?? "").trim(),
    category: String(data.category ?? existing.category ?? "General maintenance").trim(), priority: String(data.priority ?? existing.priority ?? "Routine").trim(),
    status: String(data.status ?? existing.status ?? "New").trim(), submitted: String(data.submitted ?? existing.submitted ?? "Just now").trim(),
    description: String(data.description ?? existing.description ?? "").trim(), entry: String(data.entry ?? existing.entry ?? "Yes, please").trim(),
    pet: String(data.pet ?? existing.pet ?? "No").trim(), assignedTo: String(data.assignedTo ?? existing.assignedTo ?? "Unassigned").trim(),
    notes: Array.isArray(data.notes) ? data.notes : (existing.notes || []), photoName: String(data.photoName ?? existing.photoName ?? "").trim(),
  };
}

async function handleApi(request, env, url) {
  const path = url.pathname;

  if (request.method === "OPTIONS") return new Response(null, { status: 204 });

  const isKnownRoute = [
    "/api/staff/login",
    "/api/staff/session",
    "/api/staff/logout",
    "/api/maintenance/requests",
    "/api/maintenance/assignees",
  ].includes(path) || /^\/api\/maintenance\/(requests|assignees)\/[^/]+$/.test(path);
  if (!isKnownRoute) return env.ASSETS.fetch(request);

  await ensureDatabase(env);

  if (path === "/api/staff/login" && request.method === "POST") {
    const body = await parseBody(request);
    const username = String(body?.username || "").trim().toLowerCase();
    const passwordHash = await digest(String(body?.password || ""));
    const user = await env.DB.prepare("SELECT username, password_hash, display_name FROM staff_users WHERE username = ?").bind(username).first();
    if (!user || user.password_hash !== passwordHash) return json({ error: "Invalid username or password." }, { status: 401 });
    const token = randomToken();
    const timestamp = now();
    const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
    await env.DB.prepare("INSERT INTO staff_sessions (token_hash, username, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(await digest(token), user.username, expires, timestamp).run();
    return json({ authenticated: true, username: user.username, displayName: user.display_name }, { headers: { "set-cookie": cookieHeader(token, 8 * 60 * 60, request) } });
  }

  if (path === "/api/staff/session" && request.method === "GET") {
    const staff = await requireStaff(request, env);
    return staff ? json({ authenticated: true, username: staff.username, displayName: staff.display_name }) : json({ authenticated: false }, { status: 401 });
  }

  if (path === "/api/staff/logout" && request.method === "POST") {
    const token = getCookie(request, "icon_peakwood_staff");
    if (token) await env.DB.prepare("DELETE FROM staff_sessions WHERE token_hash = ?").bind(await digest(token)).run();
    return json({ authenticated: false }, { headers: { "set-cookie": cookieHeader("", 0, request) } });
  }

  if (path === "/api/maintenance/requests" && request.method === "POST") {
    const body = await parseBody(request);
    const fields = requestFields(body || {});
    if (!fields.resident || !fields.unit || !fields.email || !fields.description) return json({ error: "Resident, unit, email, and description are required." }, { status: 400 });
    const id = `IP-${Date.now().toString().slice(-7)}`;
    const timestamp = now();
    await env.DB.prepare("INSERT INTO maintenance_requests (id, resident, unit, email, phone, category, priority, status, submitted, description, entry, pet, assigned_to, notes_json, photo_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, fields.resident, fields.unit, fields.email, fields.phone, fields.category, fields.priority, "New", "Just now", fields.description, fields.entry, fields.pet, "Unassigned", JSON.stringify(fields.notes), fields.photoName, timestamp, timestamp).run();
    const row = await env.DB.prepare("SELECT * FROM maintenance_requests WHERE id = ?").bind(id).first();
    return json(rowToRequest(row), { status: 201 });
  }

  const staff = await requireStaff(request, env);
  if (!staff) return json({ error: "Staff authentication required." }, { status: 401 });

  if (path === "/api/maintenance/requests" && request.method === "GET") {
    const result = await env.DB.prepare("SELECT * FROM maintenance_requests ORDER BY created_at DESC").all();
    return json(result.results.map(rowToRequest));
  }

  const requestMatch = path.match(/^\/api\/maintenance\/requests\/([^/]+)$/);
  if (requestMatch && request.method === "PATCH") {
    const id = decodeURIComponent(requestMatch[1]);
    const currentRow = await env.DB.prepare("SELECT * FROM maintenance_requests WHERE id = ?").bind(id).first();
    if (!currentRow) return json({ error: "Request not found." }, { status: 404 });
    const current = rowToRequest(currentRow);
    const fields = requestFields(await parseBody(request) || {}, current);
    const timestamp = now();
    await env.DB.prepare("UPDATE maintenance_requests SET resident = ?, unit = ?, email = ?, phone = ?, category = ?, priority = ?, status = ?, submitted = ?, description = ?, entry = ?, pet = ?, assigned_to = ?, notes_json = ?, photo_name = ?, updated_at = ? WHERE id = ?").bind(fields.resident, fields.unit, fields.email, fields.phone, fields.category, fields.priority, fields.status, fields.submitted, fields.description, fields.entry, fields.pet, fields.assignedTo, JSON.stringify(fields.notes), fields.photoName, timestamp, id).run();
    const updated = await env.DB.prepare("SELECT * FROM maintenance_requests WHERE id = ?").bind(id).first();
    return json(rowToRequest(updated));
  }

  if (path === "/api/maintenance/assignees" && request.method === "GET") {
    const result = await env.DB.prepare("SELECT * FROM maintenance_assignees ORDER BY name COLLATE NOCASE").all();
    return json(result.results.map(rowToAssignee));
  }

  if (path === "/api/maintenance/assignees" && request.method === "POST") {
    const body = await parseBody(request);
    const assignee = { id: `assignee-${Date.now()}`, name: String(body?.name || "").trim(), type: String(body?.type || "Member").trim(), specialty: String(body?.specialty || "General maintenance").trim() || "General maintenance", phone: String(body?.phone || "").trim(), email: String(body?.email || "").trim() };
    if (!assignee.name) return json({ error: "A name is required." }, { status: 400 });
    const timestamp = now();
    try {
      await env.DB.prepare("INSERT INTO maintenance_assignees (id, name, type, specialty, phone, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(assignee.id, assignee.name, assignee.type, assignee.specialty, assignee.phone, assignee.email, timestamp, timestamp).run();
    } catch {
      return json({ error: "That assignee already exists." }, { status: 409 });
    }
    return json(assignee, { status: 201 });
  }

  const assigneeMatch = path.match(/^\/api\/maintenance\/assignees\/([^/]+)$/);
  if (assigneeMatch && request.method === "DELETE") {
    const id = decodeURIComponent(assigneeMatch[1]);
    const assignee = await env.DB.prepare("SELECT name FROM maintenance_assignees WHERE id = ?").bind(id).first();
    if (!assignee) return json({ error: "Assignee not found." }, { status: 404 });
    const active = await env.DB.prepare("SELECT COUNT(*) AS count FROM maintenance_requests WHERE assigned_to = ? AND status != 'Resolved'").bind(assignee.name).first();
    if (Number(active?.count || 0) > 0) return json({ error: `${assignee.name} still has active assignments.` }, { status: 409 });
    await env.DB.prepare("DELETE FROM maintenance_assignees WHERE id = ?").bind(id).run();
    return json({ removed: true });
  }

  return json({ error: "API route not found." }, { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try { return withCors(await handleApi(request, env, url), request); } catch (error) { return withCors(json({ error: error.message || "Server error." }, { status: 500 }), request); }
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) return response;

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

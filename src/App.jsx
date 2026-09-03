import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiBell, FiCamera, FiCheckCircle, FiClock, FiFileText, FiHome, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiPlus, FiShield, FiSun, FiTool, FiTrash2, FiUpload, FiUsers } from "react-icons/fi";

const baseUrl = import.meta.env.BASE_URL;
const assetPath = (path) => `${baseUrl}${path.replace(/^\/+/, "")}`;
const sitePath = (path = "/") => `${baseUrl}${path.replace(/^\/+/, "")}`;

const siteLinks = {
  residentPortal: "https://theiconatpeakwood.loftliving.com/",
  apply: "https://9247942.onlineleasing.realpage.com/",
  map: "https://maps.google.com/?q=810+Peakwood+Drive+Houston+TX+77090",
  maintenanceForm: "https://icon-lofts-maintenance.francis-leon07.chatgpt.site/",
};

const navItems = [
  { label: "FLOOR PLANS", href: "/floor-plans" },
  { label: "AMENITIES", href: "#amenities" },
  { label: "GALLERY", href: "#gallery" },
  { label: "NEIGHBORHOOD", href: "#neighborhood" },
  { label: "CONTACT", href: "#contact" },
];

const featureItems = [
  ["SPACIOUS", "FLOOR PLANS"],
  ["RESORT-STYLE", "AMENITIES"],
  ["MINUTES TO CAMPUS", "& NORTH HOUSTON"],
  ["VIBRANT", "COMMUNITY"],
  ["CONTROLLED", "ACCESS"],
];

const featureIcons = [FiHome, FiSun, FiMapPin, FiUsers, FiShield];

const galleryItems = [
  { src: assetPath("/assets/main-entry.jpg"), label: "FLOOR PLANS", alt: "Main entry lobby at Icon Peakwood", action: "floor-plans" },
  { src: assetPath("/assets/outside-corridor.jpg"), label: "AMENITIES", alt: "Outside corridor at Icon Peakwood", action: "amenities" },
  { src: assetPath("/assets/modern-exterior.jpg"), label: "GALLERY", alt: "Modern exterior at Icon Peakwood", action: "gallery" },
  { src: assetPath("/assets/gallery-courtyard.jpg"), label: "NEIGHBORHOOD", alt: "Open courtyard at Icon Peakwood", action: "neighborhood" },
];

const amenityGroups = [
  {
    label: "COMMUNITY AMENITIES",
    items: ["Club House", "Fitness & Yoga Studio", "Gated Community", "Outdoor Patio & Lounge", "Movie Theater", "Dog Wash Station", "Covered Parking", "Lounge", "Full WiFi Coverage"],
  },
  {
    label: "UNIT AMENITIES",
    items: ["Modern European Cabinets", "Quartz Countertops", "Card Access", "Luxury Vinyl Flooring", "Washer Dryer", "Internet & WiFi", "Stainless Steel Appliances", "Kitchen Islands", "Walk in Closets", "Luxury Light Features"],
  },
];

const galleryLibrary = [
  { src: assetPath("/assets/hero-pool.jpg"), label: "POOL & CLUBHOUSE", alt: "Resort-style pool and clubhouse at Icon Peakwood" },
  { src: assetPath("/assets/main-entry.jpg"), label: "MAIN ENTRY", alt: "Main entry lobby at Icon Peakwood" },
  { src: assetPath("/assets/outside-corridor.jpg"), label: "COURTYARD WALK", alt: "Outside corridor at Icon Peakwood" },
  { src: assetPath("/assets/modern-exterior.jpg"), label: "COMMUNITY EXTERIOR", alt: "Modern exterior at Icon Peakwood" },
  { src: assetPath("/assets/gallery-courtyard.jpg"), label: "OPEN COURTYARD", alt: "Open courtyard at Icon Peakwood" },
  { src: assetPath("/assets/gallery-bedroom.jpg"), label: "BEDROOM", alt: "Bedroom interior at Icon Peakwood" },
  { src: assetPath("/assets/gallery-corridor.jpg"), label: "INTERIOR CORRIDOR", alt: "Interior corridor at Icon Peakwood" },
  { src: assetPath("/assets/gallery-front.png"), label: "FRONT ELEVATION", alt: "Front elevation at Icon Peakwood" },
  { src: assetPath("/assets/gallery-living-room.jpg"), label: "LIVING ROOM", alt: "Living room interior at Icon Peakwood" },
  { src: assetPath("/assets/living-room.jpg"), label: "RESIDENCE LOUNGE", alt: "Residence lounge at Icon Peakwood" },
  { src: assetPath("/assets/living-room.png"), label: "LIVING SPACE", alt: "Living space at Icon Peakwood" },
  { src: assetPath("/assets/location-building.png"), label: "PEAKWOOD ADDRESS", alt: "Icon Peakwood building exterior" },
];

const maintenanceIssues = [
  { number: "01", title: "AIR CONDITIONING & HEAT", copy: "Your apartment is not cooling, heating, or holding the right temperature.", examples: "Thermostat · AC · Heat" },
  { number: "02", title: "PLUMBING & WATER", copy: "A leak, clogged drain, low water pressure, or no hot water needs attention.", examples: "Leaks · Drains · Hot water" },
  { number: "03", title: "ELECTRICAL & LIGHTING", copy: "An outlet, light fixture, breaker, or power issue is affecting your home.", examples: "Outlets · Lights · Power" },
  { number: "04", title: "APPLIANCES & INTERIORS", copy: "A provided appliance, cabinet, flooring, door, or finish needs repair.", examples: "Appliances · Doors · Finishes" },
  { number: "05", title: "KEYS, LOCKS & ACCESS", copy: "You are having trouble with your unit lock, keys, gate, or controlled access.", examples: "Keys · Locks · Gates" },
  { number: "06", title: "SAFETY & CONNECTIVITY", copy: "A smoke detector, Wi-Fi service, or shared-space issue needs a team member.", examples: "Alarms · Wi-Fi · Common areas" },
];

const nearbyPlaces = [
  { type: "MEDICAL", name: "HCA HOUSTON HEALTHCARE NORTHWEST", copy: "Regional care and emergency services close to the community.", meta: "710 Cypress Creek Pkwy · Houston, TX 77090", query: "HCA Houston Healthcare Northwest, 710 Cypress Creek Pkwy, Houston, TX 77090" },
  { type: "CAMPUS", name: "LONE STAR COLLEGE–NORTH HARRIS", copy: "Classes, student services, tutoring, and campus life near home.", meta: "2700 W.W. Thorne Drive · Houston, TX 77073", query: "Lone Star College North Harris, 2700 W.W. Thorne Drive, Houston, TX 77073" },
  { type: "SHOPPING", name: "WILLOWBROOK MALL", copy: "Shopping, dining, and entertainment for an easy day out.", meta: "2000 Willowbrook Mall · Houston, TX 77070", query: "Willowbrook Mall, 2000 Willowbrook Mall, Houston, TX 77070" },
  { type: "EVERYDAY", name: "FM 1960 & NORTH HOUSTON", copy: "Quick access to everyday essentials, restaurants, and major routes.", meta: "Shopping + dining nearby", query: "FM 1960 and Kuykendahl Road, Houston, TX" },
];

const portalStorageKey = "iconPeakwoodMaintenanceRequests";
const portalAssigneeStorageKey = "iconPeakwoodMaintenanceAssignees";
const portalSessionKey = "iconPeakwoodMaintenanceStaffSession";
const portalStatusOptions = ["New", "In progress", "Scheduled", "Resolved"];
const portalSeedAssignees = [
  { id: "team-maintenance", name: "Maintenance team", type: "Team", specialty: "General maintenance", phone: "713-974-3400", email: "maintenance@iconpeakwood.com" },
  { id: "miguel-r", name: "Miguel R.", type: "Member", specialty: "Plumbing · HVAC", phone: "713-555-0122", email: "miguel.r@iconpeakwood.com" },
  { id: "kayla-j", name: "Kayla J.", type: "Member", specialty: "Interiors · turnovers", phone: "713-555-0167", email: "kayla.j@iconpeakwood.com" },
  { id: "peakwood-plumbing", name: "Peakwood Plumbing Co.", type: "Contractor", specialty: "Plumbing response", phone: "713-555-0191", email: "dispatch@peakwoodplumbing.com" },
];
const portalSeedRequests = [
  {
    id: "IP-2641",
    resident: "Jordan Lee",
    unit: "312",
    email: "jordan.lee@email.com",
    phone: "713-555-0182",
    category: "Plumbing & Water",
    priority: "Urgent",
    status: "In progress",
    submitted: "Today · 9:14 AM",
    description: "The bathroom sink is backing up and water is draining very slowly.",
    entry: "Yes, please",
    pet: "No",
    assignedTo: "Miguel R.",
    notes: [{ author: "Miguel R.", text: "Technician scheduled for today between 1–3 PM.", time: "Today · 10:02 AM" }],
  },
  {
    id: "IP-2638",
    resident: "Taylor Morgan",
    unit: "204",
    email: "taylor.morgan@email.com",
    phone: "713-555-0104",
    category: "Air Conditioning & Heat",
    priority: "Routine",
    status: "Scheduled",
    submitted: "Yesterday · 4:36 PM",
    description: "The bedroom vent is running, but the room is not cooling like the rest of the apartment.",
    entry: "Call first",
    pet: "Yes",
    assignedTo: "Maintenance team",
    notes: [{ author: "Office", text: "Visit confirmed for tomorrow morning.", time: "Yesterday · 5:10 PM" }],
  },
  {
    id: "IP-2631",
    resident: "Alex Rivera",
    unit: "118",
    email: "alex.rivera@email.com",
    phone: "713-555-0148",
    category: "Keys, Locks & Access",
    priority: "Routine",
    status: "New",
    submitted: "Mon · 11:20 AM",
    description: "The deadbolt is sticking when I turn the key from inside the unit.",
    entry: "Yes, please",
    pet: "No",
    assignedTo: "Unassigned",
    notes: [],
  },
  {
    id: "IP-2624",
    resident: "Morgan Ellis",
    unit: "407",
    email: "morgan.ellis@email.com",
    phone: "713-555-0175",
    category: "Appliances & Interiors",
    priority: "Routine",
    status: "Resolved",
    submitted: "Fri · 2:05 PM",
    description: "The dishwasher was leaving water in the bottom after a cycle.",
    entry: "Yes, please",
    pet: "No",
    assignedTo: "Kayla J.",
    notes: [{ author: "Kayla J.", text: "Filter cleared and test cycle completed.", time: "Mon · 9:08 AM" }],
  },
];

function loadPortalRequests() {
  try {
    const saved = window.localStorage.getItem(portalStorageKey);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : portalSeedRequests;
  } catch {
    return portalSeedRequests;
  }
}

function loadPortalAssignees() {
  try {
    const saved = window.localStorage.getItem(portalAssigneeStorageKey);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed.map((assignee) => {
      const seed = portalSeedAssignees.find((item) => item.id === assignee.id);
      return { ...seed, ...assignee, phone: assignee.phone || seed?.phone || "", email: assignee.email || seed?.email || "" };
    }) : portalSeedAssignees;
  } catch {
    return portalSeedAssignees;
  }
}

function hasStaffSession() {
  try {
    return window.sessionStorage.getItem(portalSessionKey) === "active";
  } catch {
    return false;
  }
}

const isLocalPreview = ["localhost", "127.0.0.1", "terminal.local"].includes(window.location.hostname);
const apiOrigin = (import.meta.env.VITE_API_ORIGIN || "").replace(/\/+$/, "");

async function apiJson(path, options = {}) {
  const response = await fetch(`${apiOrigin}${path}`, {
    credentials: "include",
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error || `Request failed with status ${response.status}.`);
    error.status = response.status;
    throw error;
  }
  if (payload === null) {
    const error = new Error("The server returned the website shell instead of JSON data.");
    error.status = 503;
    throw error;
  }
  return payload;
}

function portalStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function PortalStatus({ status }) {
  return <span className={`portal-status portal-status--${portalStatusClass(status)}`}><span />{status}</span>;
}

const floorPlanGroups = [
  {
    key: "studio",
    label: "STUDIO",
    plans: [
      ["UNIT S2", assetPath("/assets/floorplans/floorplan-s2.jpg")],
      ["UNIT S3", assetPath("/assets/floorplans/floorplan-s3.jpg")],
      ["UNIT S4", assetPath("/assets/floorplans/floorplan-s4.jpg")],
      ["UNIT S5", assetPath("/assets/floorplans/floorplan-s5.jpg")],
      ["UNIT S6A", assetPath("/assets/floorplans/floorplan-s6a.jpg")],
      ["UNIT S9", assetPath("/assets/floorplans/floorplan-s9.jpg")],
    ],
  },
  {
    key: "one-bedroom",
    label: "1 BEDROOM",
    plans: [
      ["UNIT A1", assetPath("/assets/floorplans/floorplan-a1.jpg")],
      ["UNIT A2", assetPath("/assets/floorplans/floorplan-a2.jpg")],
      ["UNIT A3", assetPath("/assets/floorplans/floorplan-a3.jpg")],
      ["UNIT A4", assetPath("/assets/floorplans/floorplan-a4.jpg")],
    ],
  },
  {
    key: "two-bedroom",
    label: "2 BEDROOMS",
    plans: [
      ["UNIT B1", assetPath("/assets/floorplans/floorplan-b1.jpg")],
      ["UNIT B2", assetPath("/assets/floorplans/floorplan-b2.jpg")],
    ],
  },
];

function ActionLink({ children, href = "#contact", tone = "blue", target, onClick }) {
  return <a className={`action action--${tone}`} href={href} target={target} onClick={onClick} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
}

function IconIntro({ onFinished }) {
  const [phase, setPhase] = useState("enter");
  const finishedRef = useRef(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setPhase("exit"), 2350);
    const finishTimer = window.setTimeout(() => {
      finishedRef.current = true;
      onFinished();
    }, 3000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  const skipIntro = () => {
    if (finishedRef.current) return;
    setPhase("exit");
    window.setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinished();
      }
    }, 500);
  };

  return (
    <div className={`icon-intro icon-intro--${phase}`} role="status" aria-live="polite">
      <div className="icon-intro__field" aria-hidden="true">
        <span className="icon-intro__flare icon-intro__flare--one" />
        <span className="icon-intro__flare icon-intro__flare--two" />
        <span className="icon-intro__orbit icon-intro__orbit--one" />
        <span className="icon-intro__orbit icon-intro__orbit--two" />
      </div>
      <div className="icon-intro__content">
        <p className="icon-intro__eyebrow">WELCOME TO</p>
        <div className="icon-intro__wordmark" aria-label="The Icon">
          <span className="icon-intro__the">The</span>
          <span className="icon-intro__icon">Icon</span>
          <span className="icon-intro__swoop" />
        </div>
        <div className="icon-intro__rule"><span>PEAKWOOD / NORTH HOUSTON</span><i /></div>
      </div>
      <button className="icon-intro__skip" type="button" onClick={skipIntro}>SKIP INTRO <span aria-hidden="true">↗</span></button>
    </div>
  );
}

function FloorPlansContent({ floorPlanTab, setFloorPlanTab }) {
  const activeGroup = floorPlanGroups.find((group) => group.key === floorPlanTab);

  return (
    <section className="floor-plan-section" id="floor-plans" aria-labelledby="floor-plan-title">
      <div className="floor-plan-intro">
        <div>
          <p className="section-kicker">FIND YOUR FIT</p>
          <h2 id="floor-plan-title">FLOOR PLANS FOR<br /><strong>THE WAY YOU LIVE.</strong></h2>
          <p>Explore the real Studio, 1 Bedroom, and 2 Bedroom layouts published on Icon @ Peakwood&apos;s floor-plan page.</p>
        </div>
        <ActionLink href="#floor-plan-grid" tone="outline">BROWSE LAYOUTS</ActionLink>
      </div>
      <div className="floor-plan-tabs" role="tablist" aria-label="Apartment floor-plan types">
        {floorPlanGroups.map((group) => (
          <button
            className={`floor-plan-tab ${floorPlanTab === group.key ? "is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={floorPlanTab === group.key}
            key={group.key}
            onClick={() => setFloorPlanTab(group.key)}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div className="floor-plan-grid" id="floor-plan-grid">
        {activeGroup.plans.map(([unit, src], index) => (
          <a className="floor-plan-card motion-reveal" style={{ "--reveal-delay": `${index * 75}ms` }} href={src} target="_blank" rel="noreferrer" key={unit}>
            <span className="floor-plan-card-title">{unit}</span>
            <img src={src} alt={`${unit} apartment floor plan`} loading="lazy" />
            <span className="floor-plan-card-link">VIEW DETAILS <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function StaffLoginPage({ onAuthenticated }) {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await apiJson("/api/staff/login", { method: "POST", body: JSON.stringify({ username: email, password }) });
      try { window.sessionStorage.setItem(portalSessionKey, "active"); } catch { /* Preview session only. */ }
      onAuthenticated();
    } catch (loginError) {
      if (isLocalPreview && email.trim().toLowerCase() === "admin" && password === "admin") {
        try { window.sessionStorage.setItem(portalSessionKey, "active"); } catch { /* Preview session only. */ }
        onAuthenticated();
      } else {
        setError(loginError.status === 401 ? "That username or password was not recognized." : "The staff service is unavailable right now. Try again in a moment.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portal-page portal-page--login">
      <header className="portal-header">
        <a className="portal-brand" href={sitePath()} aria-label="Back to Icon at Peakwood home">
          <span className="portal-brand-mark"><img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" /></span>
          <span><strong>ICON @ PEAKWOOD</strong><small>MAINTENANCE PORTAL</small></span>
        </a>
        <a className="portal-home-link" href={sitePath("/maintenance-portal")}>RESIDENT PORTAL</a>
      </header>
      <main className="portal-login-main">
        <section className="portal-login-card" aria-labelledby="staff-login-title">
          <p className="section-kicker">PRIVATE STAFF ACCESS</p>
          <h1 id="staff-login-title">WELCOME<br /><strong>BACK.</strong></h1>
          <p>Sign in to manage maintenance requests, assign work, and keep residents updated.</p>
          <form className="portal-login-form" onSubmit={handleLogin}>
            <label>USERNAME<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>PASSWORD<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {error && <p className="portal-login-error" role="alert">{error}</p>}
            <button className="portal-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "CHECKING ACCESS..." : "SIGN IN TO STAFF DASHBOARD"} <FiArrowUpRight aria-hidden="true" /></button>
          </form>
          <div className="portal-demo-credentials"><span>LOCAL PREVIEW ACCESS</span><strong>USERNAME · admin</strong><strong>PASSWORD · admin</strong></div>
        </section>
        <aside className="portal-login-aside"><p className="section-kicker">KEEP THE WORK MOVING</p><h2>ONE SHARED<br /><strong>WORKFLOW.</strong></h2><p>The resident side stays open to the community. This private side is where your team can organize every request from intake through resolution.</p></aside>
      </main>
      <footer className="portal-footer"><span>ICON @ PEAKWOOD · PRIVATE STAFF ACCESS</span><a href={sitePath("/maintenance-portal")}>BACK TO RESIDENT PORTAL</a></footer>
    </div>
  );
}

function MaintenancePortalPage({ staffRoute = false }) {
  const [mode, setMode] = useState(staffRoute ? "staff" : "resident");
  const [staffAuthenticated, setStaffAuthenticated] = useState(staffRoute ? hasStaffSession() : false);
  const [requests, setRequests] = useState(loadPortalRequests);
  const [assignees, setAssignees] = useState(loadPortalAssignees);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [filter, setFilter] = useState("All requests");
  const [photoName, setPhotoName] = useState("");
  const [note, setNote] = useState("");
  const [showAssigneeManager, setShowAssigneeManager] = useState(false);
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(null);
  const [assigneeForm, setAssigneeForm] = useState({ name: "", type: "Member", specialty: "", phone: "", email: "" });
  const [assigneeMessage, setAssigneeMessage] = useState("");
  const [assigneeMessageType, setAssigneeMessageType] = useState("success");
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [dataSource, setDataSource] = useState("local");
  const [dataError, setDataError] = useState("");
  const [form, setForm] = useState({
    resident: "Jordan Lee",
    unit: "312",
    email: "jordan.lee@email.com",
    phone: "713-555-0182",
    category: "Plumbing & Water",
    priority: "Routine",
    entry: "Yes, please",
    pet: "No",
    description: "",
    customerNote: "",
  });

  useEffect(() => {
    if (!staffRoute || !staffAuthenticated) return undefined;
    let cancelled = false;
    Promise.all([apiJson("/api/maintenance/requests"), apiJson("/api/maintenance/assignees")])
      .then(([remoteRequests, remoteAssignees]) => {
        if (cancelled) return;
        setRequests(remoteRequests);
        setAssignees(remoteAssignees);
        setDataSource("server");
        setDataError("");
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.status === 401) setStaffAuthenticated(false);
        setDataSource("local");
        setDataError(isLocalPreview ? "Local preview mode — shared database connects after deployment." : "The shared database could not be reached. No server changes were made.");
      });
    return () => { cancelled = true; };
  }, [staffRoute, staffAuthenticated]);

  useEffect(() => {
    if (!staffRoute || staffAuthenticated) return undefined;
    let cancelled = false;
    apiJson("/api/staff/session")
      .then(() => {
        if (cancelled) return;
        try { window.sessionStorage.setItem(portalSessionKey, "active"); } catch { /* Session storage is optional. */ }
        setStaffAuthenticated(true);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [staffRoute, staffAuthenticated]);

  useEffect(() => {
    if (!selectedRequestId && requests[0]) setSelectedRequestId(requests[0].id);
  }, [requests, selectedRequestId]);

  const selectedRequest = requests.find((request) => request.id === selectedRequestId) || requests[0];
  const visibleRequests = filter === "All requests" ? requests : requests.filter((request) => request.status === filter);
  const selectedAssignee = assignees.find((assignee) => assignee.id === selectedAssigneeId) || null;
  const selectedAssigneeRequests = selectedAssignee ? requests.filter((request) => request.assignedTo === selectedAssignee.name) : [];
  const selectedAssigneeActiveRequests = selectedAssigneeRequests.filter((request) => request.status !== "Resolved");

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmittingRequest) return;
    setIsSubmittingRequest(true);
    setDataError("");
    const request = {
      ...form,
      id: `IP-${Math.floor(2648 + Math.random() * 300)}`,
      status: "New",
      submitted: "Just now",
      assignedTo: "Unassigned",
      notes: form.customerNote.trim() ? [{ author: form.resident.trim() || "Resident", text: form.customerNote.trim(), time: "Just now" }] : [],
      photoName,
    };
    try {
      const savedRequest = await apiJson("/api/maintenance/requests", { method: "POST", body: JSON.stringify(request) });
      setRequests((current) => [savedRequest, ...current]);
      setSelectedRequestId(savedRequest.id);
      setSubmittedRequest(savedRequest);
      setDataSource("server");
      setDataError("");
    } catch (error) {
      if (!isLocalPreview) {
        setDataError("Your request could not be saved to the shared database. Please try again.");
        return;
      }
      setRequests((current) => [request, ...current]);
      setSelectedRequestId(request.id);
      setSubmittedRequest(request);
      setDataSource("local");
      setDataError("Local preview mode — this request is not shared with other users.");
    } finally {
      setIsSubmittingRequest(false);
    }
    setPhotoName("");
    setForm((current) => ({ ...current, description: "", customerNote: "" }));
  };

  const updateRequest = async (id, patch) => {
    setRequests((current) => current.map((request) => request.id === id ? { ...request, ...patch } : request));
    try {
      const savedRequest = await apiJson(`/api/maintenance/requests/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
      setRequests((current) => current.map((request) => request.id === id ? savedRequest : request));
      setDataSource("server");
      setDataError("");
    } catch (error) {
      if (!isLocalPreview) setDataError(error.status === 401 ? "Your staff session expired. Please sign in again." : "That update could not be saved to the shared database.");
    }
  };

  const addNote = () => {
    if (!note.trim() || !selectedRequest) return;
    updateRequest(selectedRequest.id, {
      notes: [...(selectedRequest.notes || []), { author: "You", text: note.trim(), time: "Just now" }],
    });
    setNote("");
  };

  const addAssignee = async (event) => {
    event.preventDefault();
    if (!assigneeForm.name.trim()) return;
    const assignee = { ...assigneeForm, id: `assignee-${Date.now()}`, name: assigneeForm.name.trim(), specialty: assigneeForm.specialty.trim() || "General maintenance", phone: assigneeForm.phone.trim(), email: assigneeForm.email.trim() };
    try {
      const savedAssignee = await apiJson("/api/maintenance/assignees", { method: "POST", body: JSON.stringify(assignee) });
      setAssignees((current) => [...current, savedAssignee]);
      setDataSource("server");
      setDataError("");
    } catch (error) {
      if (!isLocalPreview) {
        setAssigneeMessageType("warning");
        setAssigneeMessage(error.status === 401 ? "Your staff session expired. Please sign in again." : "That assignee could not be saved to the shared database.");
        return;
      }
      setAssignees((current) => [...current, assignee]);
      setDataSource("local");
      setDataError("Local preview mode — this assignee is not shared with other users.");
    }
    setAssigneeForm({ name: "", type: "Member", specialty: "", phone: "", email: "" });
    setAssigneeMessageType("success");
    setAssigneeMessage(`${assignee.name} is ready to receive assignments.`);
  };

  const removeAssignee = async (assignee) => {
    const activeAssignments = requests.filter((request) => request.assignedTo === assignee.name && request.status !== "Resolved");
    if (activeAssignments.length) {
      setAssigneeMessageType("warning");
      setAssigneeMessage(`${assignee.name} is assigned to ${activeAssignments.length} active request${activeAssignments.length === 1 ? "" : "s"}. Reassign the work before removing them.`);
      return;
    }
    if (!window.confirm(`Remove ${assignee.name} from the assignee directory?`)) return;
    try {
      await apiJson(`/api/maintenance/assignees/${encodeURIComponent(assignee.id)}`, { method: "DELETE" });
      setAssignees((current) => current.filter((item) => item.id !== assignee.id));
      setDataSource("server");
      setDataError("");
    } catch (error) {
      if (!isLocalPreview) {
        setAssigneeMessageType("warning");
        setAssigneeMessage(error.status === 409 ? "Reassign active work before removing this person." : "That assignee could not be removed from the shared database.");
        return;
      }
      setAssignees((current) => current.filter((item) => item.id !== assignee.id));
      setDataSource("local");
      setDataError("Local preview mode — this change is not shared with other users.");
    }
    if (selectedAssigneeId === assignee.id) setSelectedAssigneeId(null);
    setAssigneeMessageType("success");
    setAssigneeMessage(`${assignee.name} was removed from the directory.`);
  };

  const signOut = async () => {
    try { await apiJson("/api/staff/logout", { method: "POST", body: "{}" }); } catch { /* Local preview or an already-expired session. */ }
    try { window.sessionStorage.removeItem(portalSessionKey); } catch { /* Preview session only. */ }
    setStaffAuthenticated(false);
  };

  const statusCounts = portalStatusOptions.reduce((counts, status) => ({ ...counts, [status]: requests.filter((request) => request.status === status).length }), {});

  if (staffRoute && !staffAuthenticated) return <StaffLoginPage onAuthenticated={() => setStaffAuthenticated(true)} />;

  return (
    <div className="portal-page">
      <header className="portal-header">
        <a className="portal-brand" href={sitePath()} aria-label="Back to Icon at Peakwood home">
          <span className="portal-brand-mark"><img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" /></span>
          <span><strong>ICON @ PEAKWOOD</strong><small>MAINTENANCE PORTAL</small></span>
        </a>
        <div className="portal-header-tools">
          <a className="portal-official-link" href={siteLinks.maintenanceForm} target="_blank" rel="noreferrer">CURRENT FORM <FiArrowUpRight aria-hidden="true" /></a>
          {staffRoute ? <button className="portal-home-link portal-button-link" type="button" onClick={signOut}>SIGN OUT</button> : <a className="portal-home-link" href={sitePath("/maintenance-portal/staff")}>STAFF LOGIN</a>}
        </div>
      </header>

      <main className="portal-main">
        <div className="portal-topline">
          <div>
            <p className="section-kicker">ICON @ PEAKWOOD · WORKFLOW PREVIEW</p>
            <h1>{mode === "resident" ? <>CARE THAT<br /><strong>KEEPS MOVING.</strong></> : <>THE TEAM<br /><strong>AT WORK.</strong></>}</h1>
          </div>
          {!staffRoute ? <div className="portal-switcher" role="tablist" aria-label="Maintenance portal view">
            <button type="button" role="tab" aria-selected={mode === "resident"} className="is-active"><FiHome aria-hidden="true" /> RESIDENT VIEW</button>
            <a className="portal-switcher-link" href={sitePath("/maintenance-portal/staff")}><FiTool aria-hidden="true" /> STAFF LOGIN</a>
          </div> : <div className="portal-switcher portal-switcher--staff"><span><FiTool aria-hidden="true" /> STAFF DASHBOARD</span><a href={sitePath("/maintenance-portal")}>RESIDENT VIEW</a></div>}
        </div>

        {(staffRoute || dataError) && (
          <div className={`portal-data-status portal-data-status--${dataSource}`} role={dataError ? "alert" : "status"}>
            <strong>{dataSource === "server" ? "SHARED DATABASE CONNECTED" : "LOCAL PREVIEW ONLY"}</strong>
            <span>{dataError || "Requests, assignments, and notes are shared across staff users."}</span>
          </div>
        )}

        {mode === "resident" ? (
          <div className="portal-resident-layout">
            <section className="portal-form-card" aria-labelledby="portal-form-title">
              <div className="portal-card-heading">
                <div><p className="section-kicker">NEW REQUEST</p><h2 id="portal-form-title">TELL US<br /><strong>WHAT&apos;S GOING ON.</strong></h2></div>
                <span className="portal-step">01 / 02</span>
              </div>
              {submittedRequest && (
                <div className={`portal-success portal-success--strong portal-success--${dataSource}`} role="status" aria-live="assertive">
                  <FiCheckCircle aria-hidden="true" />
                  <div><span className="portal-success-kicker">{dataSource === "server" ? "REQUEST SENT" : "LOCAL PREVIEW REQUEST"}</span><strong>{dataSource === "server" ? `Request ${submittedRequest.id} was sent to the maintenance team.` : `Request ${submittedRequest.id} was created in this preview.`}</strong><span>{dataSource === "server" ? "Your details are in the shared maintenance queue." : "This preview request is not shared with other users."}</span></div>
                  <button type="button" onClick={() => setSubmittedRequest(null)} aria-label="Dismiss confirmation">×</button>
                </div>
              )}
              <form className="portal-form" onSubmit={handleSubmit}>
                <div className="portal-form-grid">
                  <label>NAME<input value={form.resident} onChange={(event) => updateForm("resident", event.target.value)} required /></label>
                  <label>UNIT<input value={form.unit} onChange={(event) => updateForm("unit", event.target.value)} required /></label>
                  <label>EMAIL<input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} required /></label>
                  <label>PHONE<input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} /></label>
                </div>
                <label>WHAT NEEDS ATTENTION?
                  <select value={form.category} onChange={(event) => updateForm("category", event.target.value)}>
                    {maintenanceIssues.map((issue) => <option key={issue.title}>{issue.title.split(" & ").join(" & ")}</option>)}
                  </select>
                </label>
                <div className="portal-form-grid portal-form-grid--compact">
                  <label>ENTRY PERMISSION<select value={form.entry} onChange={(event) => updateForm("entry", event.target.value)}><option>Yes, please</option><option>Call first</option><option>No, contact me</option></select></label>
                  <label>PET PRESENT?<select value={form.pet} onChange={(event) => updateForm("pet", event.target.value)}><option>No</option><option>Yes</option></select></label>
                </div>
                <fieldset className="portal-priority"><legend>HOW URGENT IS IT?</legend><div>{["Routine", "Urgent"].map((priority) => <button key={priority} type="button" className={form.priority === priority ? "is-active" : ""} onClick={() => updateForm("priority", priority)}>{priority === "Urgent" ? "NEEDS ATTENTION SOON" : "CAN WAIT FOR A VISIT"}</button>)}</div></fieldset>
                <label>DESCRIBE THE ISSUE<textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder="Tell us where it is, what happened, and anything that may help our team..." required /></label>
                <label>ADDITIONAL NOTES FOR THE TEAM<textarea value={form.customerNote} onChange={(event) => updateForm("customerNote", event.target.value)} placeholder="Anything else we should know? For example: access details, timing, or what you have already tried." /></label>
                <label className="portal-upload"> <span><FiCamera aria-hidden="true" /> ADD A PHOTO <small>{photoName || "Optional · JPG, PNG up to 10 MB"}</small></span><input type="file" accept="image/*" onChange={(event) => setPhotoName(event.target.files?.[0]?.name || "")} /><FiUpload aria-hidden="true" /></label>
                <button className="portal-submit" type="submit" disabled={isSubmittingRequest}>{isSubmittingRequest ? "SENDING REQUEST..." : "SUBMIT MAINTENANCE REQUEST"} <FiArrowUpRight aria-hidden="true" /></button>
              </form>
            </section>

            <aside className="portal-resident-side">
              <div className="portal-side-intro"><p className="section-kicker">YOUR HOME, LOOKED AFTER</p><h2>ONE PLACE<br /><strong>TO KEEP TRACK.</strong></h2><p>Submit one request per issue. Add a photo when it helps our team understand what&apos;s happening.</p></div>
              <div className="portal-service-note"><FiBell aria-hidden="true" /><div><strong>For emergencies</strong><p>Call 911 for fire, gas odor, active flooding, or an immediate safety threat. Don&apos;t wait for an online reply.</p></div></div>
              <div className="portal-side-contact"><span>MAINTENANCE TEAM</span><a href="tel:7139743400">713-974-3400</a><small>MON–FRI · 8 AM–5 PM</small></div>
              <div className="portal-request-preview"><div className="portal-section-label"><span>RECENT REQUESTS</span><a href={sitePath("/maintenance-portal/staff")}>VIEW ALL <FiArrowUpRight aria-hidden="true" /></a></div>{requests.slice(0, 3).map((request) => <a className="portal-mini-request" href={sitePath("/maintenance-portal/staff")} key={request.id}><span><strong>{request.category}</strong><small>{request.id} · Unit {request.unit}</small></span><PortalStatus status={request.status} /></a>)}</div>
            </aside>
          </div>
        ) : (
          <div className="portal-staff-layout">
            <section className="portal-dashboard" aria-labelledby="portal-dashboard-title">
              <div className="portal-dashboard-heading"><div><p className="section-kicker">OPERATIONS OVERVIEW</p><h2 id="portal-dashboard-title">MAINTENANCE<br /><strong>QUEUE.</strong></h2></div><div className="portal-dashboard-actions"><button className="portal-manage-button" type="button" onClick={() => setShowAssigneeManager((value) => !value)}><FiUsers aria-hidden="true" /> {showAssigneeManager ? "CLOSE DIRECTORY" : "MANAGE ASSIGNEES"}</button><a className="portal-new-button" href={sitePath("/maintenance-portal")}>NEW REQUEST <FiPlus aria-hidden="true" /></a></div></div>
              <div className="portal-stats">{[["New", "NEW REQUESTS", FiFileText], ["In progress", "IN PROGRESS", FiClock], ["Scheduled", "SCHEDULED", FiBell], ["Resolved", "RESOLVED", FiCheckCircle]].map(([status, label, Icon]) => <button type="button" className={`portal-stat ${filter === status ? "is-active" : ""}`} key={status} onClick={() => setFilter(filter === status ? "All requests" : status)}><Icon aria-hidden="true" /><strong>{statusCounts[status]}</strong><span>{label}</span></button>)}</div>
              {showAssigneeManager && <section className="portal-assignee-manager" aria-labelledby="assignee-manager-title"><div className="portal-assignee-heading"><div><p className="section-kicker">PEOPLE & PARTNERS</p><h3 id="assignee-manager-title">WHO CAN<br /><strong>TAKE THE WORK?</strong></h3></div><p>Add the people, maintenance teams, and outside contractors who should appear in the assignment list. Select any card to view contact details and assigned work.</p></div><form className="portal-assignee-form" onSubmit={addAssignee}><label>NAME<input value={assigneeForm.name} onChange={(event) => setAssigneeForm((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Brightline Electric" required /></label><label>TYPE<select value={assigneeForm.type} onChange={(event) => setAssigneeForm((current) => ({ ...current, type: event.target.value }))}><option>Member</option><option>Team</option><option>Contractor</option></select></label><label>SPECIALTY<input value={assigneeForm.specialty} onChange={(event) => setAssigneeForm((current) => ({ ...current, specialty: event.target.value }))} placeholder="e.g. Electrical response" /></label><label>PHONE<input value={assigneeForm.phone} onChange={(event) => setAssigneeForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Optional" /></label><label>EMAIL<input type="email" value={assigneeForm.email} onChange={(event) => setAssigneeForm((current) => ({ ...current, email: event.target.value }))} placeholder="Optional" /></label><button className="portal-add-assignee" type="submit"><FiPlus aria-hidden="true" /> ADD TO DIRECTORY</button></form>{assigneeMessage && <p className={`portal-assignee-message portal-assignee-message--${assigneeMessageType}`} role="status"><FiCheckCircle aria-hidden="true" /> {assigneeMessage}</p>}<div className="portal-assignee-list">{assignees.map((assignee) => <div className={`portal-assignee ${selectedAssignee?.id === assignee.id ? "is-selected" : ""}`} key={assignee.id}><button className="portal-assignee-select" type="button" onClick={() => setSelectedAssigneeId(assignee.id)} aria-label={`View details for ${assignee.name}`}><span className="portal-assignee-avatar">{assignee.name.slice(0, 1).toUpperCase()}</span><span className="portal-assignee-summary"><strong>{assignee.name}</strong><small>{assignee.specialty}</small></span><span className="portal-assignee-type">{assignee.type}</span><FiArrowUpRight aria-hidden="true" /></button><button className="portal-assignee-remove" type="button" onClick={() => removeAssignee(assignee)}><FiTrash2 aria-hidden="true" /><span className="sr-only">Remove {assignee.name}</span></button></div>)}</div>{selectedAssignee && <aside className="portal-assignee-detail" aria-labelledby="assignee-detail-title"><div className="portal-assignee-detail-heading"><div><span className="portal-assignee-detail-type">{selectedAssignee.type}</span><h4 id="assignee-detail-title">{selectedAssignee.name}</h4><p>{selectedAssignee.specialty}</p></div><button className="portal-assignee-detail-close" type="button" onClick={() => setSelectedAssigneeId(null)}>CLOSE <span aria-hidden="true">×</span></button></div><div className="portal-assignee-contact-grid">{selectedAssignee.phone ? <a href={`tel:${selectedAssignee.phone.replace(/[^0-9+]/g, "")}`}><FiPhone aria-hidden="true" /><span>PHONE</span><strong>{selectedAssignee.phone}</strong></a> : <div><FiPhone aria-hidden="true" /><span>PHONE</span><strong>Not provided</strong></div>}{selectedAssignee.email ? <a href={`mailto:${selectedAssignee.email}`}><FiMail aria-hidden="true" /><span>EMAIL</span><strong>{selectedAssignee.email}</strong></a> : <div><FiMail aria-hidden="true" /><span>EMAIL</span><strong>Not provided</strong></div>}<div><FiTool aria-hidden="true" /><span>WORK TYPE</span><strong>{selectedAssignee.specialty}</strong></div></div><div className="portal-assignee-work"><div className="portal-assignee-work-heading"><span>ASSIGNMENT HISTORY</span><strong>{selectedAssigneeRequests.length} total · {selectedAssigneeActiveRequests.length} active</strong></div>{selectedAssigneeRequests.length ? <div className="portal-assignee-work-list">{selectedAssigneeRequests.map((request) => <button className="portal-assignee-request" key={request.id} type="button" onClick={() => setSelectedRequestId(request.id)}><span><strong>{request.category}</strong><small>{request.id} · {request.resident} · Unit {request.unit}</small></span><PortalStatus status={request.status} /><FiArrowUpRight aria-hidden="true" /></button>)}</div> : <p className="portal-empty-note">No maintenance requests have been assigned to {selectedAssignee.name} yet.</p>}</div></aside>}</section>}
              <div className="portal-queue-toolbar"><div><span>REQUESTS</span><strong>{visibleRequests.length} total</strong></div><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter maintenance requests"><option>All requests</option>{portalStatusOptions.map((status) => <option key={status}>{status}</option>)}</select></div>
              <div className="portal-request-list">{visibleRequests.map((request) => <button type="button" className={`portal-request-row ${selectedRequest?.id === request.id ? "is-selected" : ""}`} key={request.id} onClick={() => setSelectedRequestId(request.id)}><span className="portal-row-id">{request.id}<small>{request.submitted}</small></span><span className="portal-row-resident"><strong>{request.resident}</strong><small>Unit {request.unit} · {request.category}</small></span><span className={`portal-priority-label portal-priority-label--${request.priority.toLowerCase()}`}>{request.priority}</span><PortalStatus status={request.status} /><FiArrowUpRight aria-hidden="true" /></button>)}</div>
            </section>

            {selectedRequest && <aside className="portal-request-detail" aria-labelledby="portal-detail-title"><div className="portal-detail-top"><span className="portal-detail-id">{selectedRequest.id}</span><PortalStatus status={selectedRequest.status} /></div><p className="section-kicker">REQUEST DETAILS</p><h2 id="portal-detail-title">{selectedRequest.category}</h2><p className="portal-detail-description">{selectedRequest.description}</p><div className="portal-detail-person"><div className="portal-avatar">{selectedRequest.resident.split(" ").map((part) => part[0]).join("")}</div><div><strong>{selectedRequest.resident}</strong><span>Unit {selectedRequest.unit}</span><a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a></div></div><div className="portal-detail-fields"><label>STATUS<select value={selectedRequest.status} onChange={(event) => updateRequest(selectedRequest.id, { status: event.target.value })}>{portalStatusOptions.map((status) => <option key={status}>{status}</option>)}</select></label><label>ASSIGNED TO<select value={selectedRequest.assignedTo} onChange={(event) => updateRequest(selectedRequest.id, { assignedTo: event.target.value })}>{[{ id: "unassigned", name: "Unassigned" }, ...assignees].map((assignee) => <option key={assignee.id}>{assignee.name}</option>)}</select></label></div><div className="portal-assigned-person">{selectedRequest.assignedTo === "Unassigned" ? <><FiTool aria-hidden="true" /><span>No one assigned yet</span></> : <><FiCheckCircle aria-hidden="true" /><span>Assigned to <strong>{selectedRequest.assignedTo}</strong></span></>}</div><div className="portal-detail-meta"><span><strong>PRIORITY</strong>{selectedRequest.priority}</span><span><strong>ENTRY</strong>{selectedRequest.entry}</span><span><strong>PET</strong>{selectedRequest.pet}</span></div><div className="portal-notes"><div className="portal-section-label"><span>TEAM NOTES</span><FiMessageSquare aria-hidden="true" /></div><div className="portal-note-list">{selectedRequest.notes?.length ? selectedRequest.notes.map((item, index) => <div className="portal-note" key={`${item.time}-${index}`}><span>{item.author}</span><p>{item.text}</p><small>{item.time}</small></div>) : <p className="portal-empty-note">No notes yet. Add the first update below.</p>}</div><div className="portal-add-note"><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add an internal note..." onKeyDown={(event) => { if (event.key === "Enter") addNote(); }} /><button type="button" onClick={addNote} aria-label="Add note"><FiArrowUpRight aria-hidden="true" /></button></div></div></aside>}
          </div>
        )}
      </main>
      <footer className="portal-footer"><span>ICON @ PEAKWOOD · MAINTENANCE WORKFLOW PREVIEW</span><a href={sitePath()}>BACK TO WEBSITE</a></footer>
    </div>
  );
}

function MaintenancePage() {
  return (
    <div className="maintenance-page">
      <header className="maintenance-header">
        <a className="maintenance-brand" href={sitePath()} aria-label="Back to Icon at Peakwood home">
          <span className="maintenance-brand-mark"><img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" /></span>
          <span><strong>ICON @ PEAKWOOD</strong><small>RESIDENT MAINTENANCE</small></span>
        </a>
        <a className="maintenance-back" href={sitePath()}>BACK TO HOME</a>
      </header>

      <main>
        <section className="maintenance-hero">
          <div className="maintenance-hero-copy">
            <p className="section-kicker">RESIDENT SUPPORT</p>
            <h1>WHEN SOMETHING<br /><strong>NEEDS ATTENTION.</strong></h1>
            <p>Small issue or something more urgent, we can help point you in the right direction. Here are a few common maintenance requests residents submit.</p>
            <a className="maintenance-primary-action" href={sitePath("/maintenance-portal")}>OPEN MAINTENANCE PORTAL <FiArrowUpRight aria-hidden="true" /></a>
            <a className="maintenance-secondary-action" href={siteLinks.maintenanceForm} target="_blank" rel="noreferrer">USE CURRENT OFFICIAL FORM <FiArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="maintenance-hero-side">
            <span>THE ICON @ PEAKWOOD</span>
            <strong>CARE<br />STARTS<br />HERE.</strong>
          </div>
        </section>

        <section className="maintenance-emergency" aria-label="Emergency maintenance notice">
          <div><p className="section-kicker">NEED IMMEDIATE HELP?</p><h2>IS THIS AN EMERGENCY?</h2></div>
          <p>For fire, gas odor, active flooding, no electricity, or an immediate safety threat, call 911 or your emergency maintenance number. Do not rely only on the online form.</p>
        </section>

        <section className="maintenance-issues" aria-labelledby="maintenance-issues-title">
          <div className="maintenance-section-heading">
            <div><p className="section-kicker">COMMON REQUESTS</p><h2 id="maintenance-issues-title">WHAT CAN WE<br /><strong>HELP WITH?</strong></h2></div>
            <p>Choose the closest match below, then use the maintenance form to share the details our team needs to help you quickly.</p>
          </div>
          <div className="maintenance-issue-grid">
            {maintenanceIssues.map((issue) => (
              <article className="maintenance-issue-card" key={issue.number}>
                <span className="maintenance-issue-number">{issue.number}</span>
                <h3>{issue.title}</h3>
                <p>{issue.copy}</p>
                <span className="maintenance-issue-examples">{issue.examples}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="maintenance-cta">
          <p className="section-kicker">READY TO REPORT IT?</p>
          <h2>SUBMIT THE DETAILS.<br /><strong>WE&apos;LL TAKE IT FROM THERE.</strong></h2>
          <p>Use the official resident maintenance form to submit one request per issue and receive a tracking number after submission.</p>
          <a className="maintenance-primary-action" href={sitePath("/maintenance-portal")}>OPEN THE MAINTENANCE PORTAL <FiArrowUpRight aria-hidden="true" /></a>
          <a className="maintenance-secondary-action maintenance-secondary-action--light" href={siteLinks.maintenanceForm} target="_blank" rel="noreferrer">OR USE THE CURRENT OFFICIAL FORM <FiArrowUpRight aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="maintenance-footer">
        <a className="maintenance-footer-brand" href={sitePath()}>ICON @ PEAKWOOD</a>
        <span>810 Peakwood Drive · Houston, TX 77090</span>
        <a href="tel:7139743400">713-974-3400</a>
      </footer>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [floorPlanTab, setFloorPlanTab] = useState("studio");
  const basePath = baseUrl === "/" ? "" : new URL(baseUrl, window.location.origin).pathname.replace(/\/+$/, "");
  const fallbackPath = new URLSearchParams(window.location.search).get("p");
  const requestedPath = fallbackPath || window.location.pathname;
  const currentPath = (requestedPath.startsWith(basePath) ? requestedPath.slice(basePath.length) : requestedPath).replace(/\/+$/, "") || "/";
  const isFloorPlansPage = currentPath === "/floor-plans";
  const isMaintenancePage = currentPath === "/maintenance";
  const isMaintenancePortalPage = currentPath === "/maintenance-portal";
  const isMaintenancePortalStaffPage = currentPath === "/maintenance-portal/staff";
  const shouldShowIntro = currentPath === "/";
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const pageNavItems = isFloorPlansPage
    ? navItems.map((item) => item.label === "FLOOR PLANS" ? { ...item, href: "#floor-plans" } : item.href.startsWith("#") ? { ...item, href: `${sitePath()}${item.href}` } : { ...item, href: sitePath(item.href) })
    : navItems.map((item) => item.href.startsWith("#") ? item : { ...item, href: sitePath(item.href) });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setActiveOverlay(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", selectedImage !== null || activeOverlay !== null);
    return () => document.body.classList.remove("is-locked");
  }, [selectedImage, activeOverlay]);

  useEffect(() => {
    const revealItems = [...document.querySelectorAll(".motion-reveal")];
    document.documentElement.classList.add("motion-ready");

    if (!window.IntersectionObserver) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -6%" });

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [isFloorPlansPage]);

  const closeMenu = () => setMenuOpen(false);
  const closeOverlay = () => setActiveOverlay(null);

  if (isMaintenancePage) return <MaintenancePage />;
  if (isMaintenancePortalStaffPage) return <MaintenancePortalPage staffRoute />;
  if (isMaintenancePortalPage) return <MaintenancePortalPage />;

  return (
    <>
      {showIntro && <IconIntro onFinished={() => setShowIntro(false)} />}
      <div className="landing-shell">
      <header className="landing-header">
        <div className="header-backdrop" />
        <div className="header-inner">
          <a className="brand-lockup" href={sitePath()} aria-label="Icon at Peakwood home">
            <span className="brand-tile brand-tile--primary"><img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" /></span>
            <span className="brand-tile brand-tile--secondary"><img src={assetPath("/assets/community-logo.png")} alt="Icon at Peakwood" /></span>
          </a>

          <nav className={`landing-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {pageNavItems.map((item) => <a href={item.href} key={item.label} onClick={closeMenu}>{item.label}</a>)}
          </nav>

          <a className="header-apply" href={siteLinks.apply}>APPLY NOW</a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            <img src={menuOpen ? assetPath("/assets/close.svg") : assetPath("/assets/menu.svg")} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>

      {isFloorPlansPage ? (
        <main className="floor-plans-page">
          <section className="floor-plans-page-hero hero-arrival">
            <div className="floor-plans-page-hero-copy">
              <p className="hero-kicker">THE ICON @ PEAKWOOD</p>
              <h1>FLOOR PLANS<br /><span>MADE FOR YOU.</span></h1>
              <p>Choose a Studio, 1 Bedroom, or 2 Bedroom layout designed for the way you live.</p>
            </div>
          </section>
          <FloorPlansContent floorPlanTab={floorPlanTab} setFloorPlanTab={setFloorPlanTab} />
        </main>
      ) : (
      <main>
        <section className="mockup-hero hero-arrival" id="home">
          <div className="hero-image" />
          <div className="hero-copy">
            <p className="hero-kicker">NORTH HOUSTON&apos;S NEWEST ADDRESS</p>
            <h1>LIVE AT<br /><span>THE ICON</span></h1>
            <p className="hero-subtitle">STAY / CONNECT / LIVE</p>
            <p className="hero-description">Modern apartments. Unbeatable location.<br />A bold new way to live at Peakwood.</p>
            <ActionLink href={sitePath("/floor-plans")}>EXPLORE FLOOR PLANS</ActionLink>
          </div>
        </section>

        <section className="feature-rail" aria-label="Community highlights">
          {featureItems.map(([top, bottom], index) => (
            <div className="feature-item motion-reveal" style={{ "--reveal-delay": `${index * 75}ms` }} key={top}>
              {(() => { const Icon = featureIcons[index]; return <Icon className="feature-icon" aria-hidden="true" />; })()}
              <p>{top}<br />{bottom}</p>
            </div>
          ))}
        </section>

        <section className="split-story" id="amenities">
          <div className="story-image story-image--pool motion-reveal motion-reveal--image" />
          <div className="story-copy motion-reveal motion-reveal--right">
            <p className="section-kicker">A COMMUNITY MADE FOR MORE</p>
            <h2>MORE THAN<br /><strong>AN APARTMENT.</strong></h2>
            <p>Make yourself at home in a place designed for connection, comfort, and momentum. Icon @ Peakwood brings elevated finishes, amenity spaces, and North Houston energy together.</p>
            <ActionLink href="#amenities" onClick={(event) => { event.preventDefault(); setActiveOverlay("amenities"); }}>VIEW AMENITIES</ActionLink>
          </div>
        </section>

        <section className="photo-grid" id="gallery" aria-label="Icon at Peakwood gallery">
          {galleryItems.map((item, index) => {
            const content = <><img src={item.src} alt={item.alt} loading="lazy" /><span>{item.label}</span></>;
            if (item.action === "floor-plans") {
              return <a className="photo-card motion-reveal" style={{ "--reveal-delay": `${index * 80}ms` }} href={sitePath("/floor-plans")} key={item.src}>{content}</a>;
            }
            if (item.action === "amenities") {
              return <button className="photo-card motion-reveal" style={{ "--reveal-delay": `${index * 80}ms` }} type="button" key={item.src} onClick={() => setActiveOverlay("amenities")}>{content}</button>;
            }
            if (item.action === "gallery") {
              return <button className="photo-card motion-reveal" style={{ "--reveal-delay": `${index * 80}ms` }} type="button" key={item.src} onClick={() => setActiveOverlay("gallery")}>{content}</button>;
            }
            if (item.action === "neighborhood") {
              return <button className="photo-card motion-reveal" style={{ "--reveal-delay": `${index * 80}ms` }} type="button" key={item.src} onClick={() => setActiveOverlay("neighborhood")}>{content}</button>;
            }
            return <button className="photo-card motion-reveal" style={{ "--reveal-delay": `${index * 80}ms` }} type="button" key={item.src} onClick={() => setSelectedImage(galleryLibrary.findIndex((image) => image.src === item.src))}>{content}</button>;
          })}
        </section>

        <section className="location-band" id="neighborhood">
          <div className="location-card motion-reveal">
            <div className="location-image" />
            <div className="location-overlay" />
            <div className="location-copy">
              <p className="section-kicker">YOUR NORTH HOUSTON ADDRESS</p>
              <h2>PRIME PEAKWOOD<br />LOCATION</h2>
              <p>810 Peakwood Drive<br />Houston, TX 77090</p>
              <div className="location-actions"><ActionLink href={siteLinks.map} tone="outline">VIEW ON MAP</ActionLink><button className="action action--outline location-nearby-trigger" type="button" onClick={() => setActiveOverlay("neighborhood")}>WHAT&apos;S NEARBY <FiArrowUpRight aria-hidden="true" /></button></div>
            </div>
          </div>
          <div className="location-lounge motion-reveal" style={{ "--reveal-delay": "90ms" }} />
          <div className="location-statement motion-reveal" style={{ "--reveal-delay": "180ms" }}>
            <div className="location-statement-overlay" />
            <div className="location-statement-content">
              <img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" />
              <p>Live bright.<br /><strong>Live Icon.</strong></p>
              <ActionLink href="#contact" tone="outline">SCHEDULE A TOUR</ActionLink>
            </div>
          </div>
        </section>

      </main>
      )}

      <footer className="landing-footer motion-reveal" id="contact">
        <div className="footer-main">
          <div className="footer-brand footer-brand-lockup">
            <span className="brand-tile brand-tile--primary"><img src={assetPath("/assets/logo-mark.png")} alt="Icon Peakwood" /></span>
            <span className="brand-tile brand-tile--secondary"><img src={assetPath("/assets/community-logo.png")} alt="Icon at Peakwood" /></span>
          </div>
          <div className="footer-column">
            <h2>LOCATION</h2>
            <p>The Icon @ Peakwood<br />810 Peakwood Drive<br />Houston, TX 77090</p>
          </div>
          <div className="footer-column">
            <h2>CONTACT</h2>
            <p><a href="tel:7139743400">713-974-3400</a><br /><a href="#contact">Contact Form</a></p>
          </div>
          <div className="footer-column">
            <h2>CONNECT</h2>
            <p><a href={siteLinks.residentPortal} target="_blank" rel="noreferrer">Resident Portal</a><br /><a href={sitePath("/maintenance-portal")}>Maintenance Requests</a><br /><a href="#contact">Contact Team</a></p>
          </div>
          <a className="footer-apply" href={siteLinks.apply}>APPLY NOW</a>
        </div>
        <div className="footer-bottom">
          <nav aria-label="Footer navigation">{pageNavItems.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}</nav>
          <p>© Icon @ Peakwood 2026 All Rights Reserved</p>
        </div>
      </footer>

      {selectedImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setSelectedImage(null)}><img src={assetPath("/assets/close.svg")} alt="" aria-hidden="true" /></button>
          <img className="lightbox-image" src={galleryLibrary[selectedImage].src} alt={galleryLibrary[selectedImage].alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}

      {activeOverlay === "amenities" && (
        <div className="site-modal" role="dialog" aria-modal="true" aria-labelledby="amenities-modal-title" onClick={closeOverlay}>
          <div className="site-modal-panel amenities-modal" onClick={(event) => event.stopPropagation()}>
            <button className="site-modal-close" type="button" aria-label="Close amenities" onClick={closeOverlay}><img src={assetPath("/assets/close.svg")} alt="" aria-hidden="true" /></button>
            <p className="section-kicker">LIVE WELL AT PEAKWOOD</p>
            <h2 id="amenities-modal-title">AMENITIES MADE<br /><strong>FOR MORE.</strong></h2>
            <p className="site-modal-intro">From morning workouts to easy evenings at home, Icon @ Peakwood brings comfort, connection, and convenience into every part of your day.</p>
            <div className="amenity-columns">
              {amenityGroups.map((group) => (
                <div className="amenity-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="amenity-hours"><span>OFFICE HOURS</span><p>MONDAY - FRIDAY · 8 AM - 5 PM<br />SATURDAY & SUNDAY · CLOSED</p></div>
          </div>
        </div>
      )}

      {activeOverlay === "gallery" && (
        <div className="site-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" onClick={closeOverlay}>
          <div className="site-modal-panel gallery-modal" onClick={(event) => event.stopPropagation()}>
            <button className="site-modal-close" type="button" aria-label="Close image gallery" onClick={closeOverlay}><img src={assetPath("/assets/close.svg")} alt="" aria-hidden="true" /></button>
            <p className="section-kicker">SEE THE DIFFERENCE</p>
            <h2 id="gallery-modal-title">THE ICON<br /><strong>GALLERY.</strong></h2>
            <p className="site-modal-intro">Explore the spaces, finishes, and shared moments that make Icon @ Peakwood feel like home.</p>
            <div className="gallery-modal-grid">
              {galleryLibrary.map((image, index) => (
                <button className="gallery-modal-card" type="button" key={image.src} onClick={() => { setSelectedImage(index); closeOverlay(); }}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span>{image.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeOverlay === "neighborhood" && (
        <div className="site-modal" role="dialog" aria-modal="true" aria-labelledby="neighborhood-modal-title" onClick={closeOverlay}>
          <div className="site-modal-panel neighborhood-modal" onClick={(event) => event.stopPropagation()}>
            <button className="site-modal-close" type="button" aria-label="Close neighborhood guide" onClick={closeOverlay}><img src={assetPath("/assets/close.svg")} alt="" aria-hidden="true" /></button>
            <p className="section-kicker">THE NORTH HOUSTON GUIDE</p>
            <h2 id="neighborhood-modal-title">WHAT&apos;S CLOSE<br /><strong>TO HOME.</strong></h2>
            <p className="site-modal-intro">Icon @ Peakwood puts campus, healthcare, shopping, dining, and everyday essentials within easy reach. Select a destination to get directions.</p>
            <div className="nearby-grid">{nearbyPlaces.map((place, index) => <a className="nearby-card" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`} target="_blank" rel="noreferrer" key={place.name}><span className="nearby-number">0{index + 1}</span><span className="nearby-type">{place.type}</span><h3>{place.name}</h3><p>{place.copy}</p><span className="nearby-meta">{place.meta}</span><FiArrowUpRight aria-hidden="true" /></a>)}</div>
            <div className="nearby-modal-footer"><span>START HERE</span><a href={siteLinks.map} target="_blank" rel="noreferrer">GET DIRECTIONS TO ICON @ PEAKWOOD <FiArrowUpRight aria-hidden="true" /></a></div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

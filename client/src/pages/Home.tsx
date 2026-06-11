/* ============================================================
   MOTHERSHIP — Home Page
   Design: Deep-Space Mission Control
   Palette: Navy-black bg (#080C14), cyan accent (#00C8FF), amber callout
   Fonts: Syne (display), DM Sans (body), JetBrains Mono (data)
   Sections: Hero, Overview, UGV Hardware, UGV Autonomy, UAV Hardware, UAV Software, Future Work
   ============================================================ */

import { useEffect, useRef, useState } from "react";

// Local image assets (bundled by Vite)
import HERO_PHOTO from "@/assets/mothership_hero.webp";
import BG_GRID from "@/assets/mothership_bg_grid.webp";
import SYSTEM_DIAGRAM from "@/assets/mothership_system_diagram.webp";
import SENSOR_BG from "@/assets/mothership_sensor_bg.webp";

// ---- Scroll-reveal hook ----
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ---- Typewriter hook ----
function useTypewriter(text: string, speed = 45, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

// ---- Section label ----
function SysLabel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="status-dot" />
      <span className="sys-label">{id} / {children}</span>
    </div>
  );
}

// ---- Spec row ----
function SpecRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-[oklch(0.22_0.02_255)] hover:bg-[oklch(0.78_0.17_204/0.04)] transition-colors duration-150 px-1">
      <span className="text-[oklch(0.55_0.015_220)] text-sm font-light">{label}</span>
      <span className={`data-value text-sm text-right ml-4 ${accent ? "text-amber" : ""}`}>{value}</span>
    </div>
  );
}

// ---- Stack layer card ----
function StackCard({ id, title, color, items }: {
  id: string;
  title: string;
  color: "cyan" | "amber" | "purple" | "green";
  items: string[];
}) {
  const colorMap = {
    cyan:   { dot: "bg-[oklch(0.78_0.17_204)]",  text: "text-[oklch(0.78_0.17_204)]",  border: "border-[oklch(0.78_0.17_204/0.25)]",  glow: "shadow-[0_0_20px_oklch(0.78_0.17_204/0.07)]" },
    amber:  { dot: "bg-[oklch(0.78_0.15_65)]",   text: "text-[oklch(0.78_0.15_65)]",   border: "border-[oklch(0.78_0.15_65/0.25)]",   glow: "shadow-[0_0_20px_oklch(0.78_0.15_65/0.07)]" },
    purple: { dot: "bg-[oklch(0.72_0.18_290)]",  text: "text-[oklch(0.72_0.18_290)]",  border: "border-[oklch(0.72_0.18_290/0.25)]",  glow: "shadow-[0_0_20px_oklch(0.72_0.18_290/0.07)]" },
    green:  { dot: "bg-[oklch(0.72_0.18_145)]",  text: "text-[oklch(0.72_0.18_145)]",  border: "border-[oklch(0.72_0.18_145/0.25)]",  glow: "shadow-[0_0_20px_oklch(0.72_0.18_145/0.07)]" },
  };
  const c = colorMap[color];
  return (
    <div className={`card-panel p-6 border ${c.border} ${c.glow}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${c.dot}`} />
        <span className="sys-label">{id}</span>
      </div>
      <h3 className={`font-bold text-lg mb-4 ${c.text}`} style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[oklch(0.68_0.01_220)]">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- Hardware item ----
function HardwareItem({ name, detail, color = "cyan" }: { name: string; detail?: string; color?: "cyan" | "amber" | "purple" }) {
  const colorMap = {
    cyan:   "text-[oklch(0.78_0.17_204)]",
    amber:  "text-[oklch(0.78_0.15_65)]",
    purple: "text-[oklch(0.72_0.18_290)]",
  };
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[oklch(0.22_0.02_255)] last:border-0">
      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
        color === "cyan" ? "bg-[oklch(0.78_0.17_204)]" : color === "amber" ? "bg-[oklch(0.78_0.15_65)]" : "bg-[oklch(0.72_0.18_290)]"
      }`} />
      <div>
        <div className={`text-sm font-medium ${colorMap[color]}`} style={{ fontFamily: "var(--font-display)" }}>{name}</div>
        {detail && <div className="text-xs text-[oklch(0.5_0.01_220)] mt-0.5">{detail}</div>}
      </div>
    </div>
  );
}

// ---- Nav ----
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[oklch(0.09_0.02_255/0.92)] backdrop-blur-md border-b border-[oklch(0.22_0.02_255)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="status-dot" />
          <span className="sys-label text-[oklch(0.78_0.17_204)]">MOTHERSHIP</span>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          {[
            ["overview",    "Overview"],
            ["ugv-hardware","UGV Hardware"],
            ["ugv-autonomy","UGV Autonomy"],
            ["uav-hardware","UAV Hardware"],
            ["uav-software","UAV Software"],
            ["future-work", "Future Work"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="sys-label text-[oklch(0.5_0.015_220)] hover:text-[oklch(0.78_0.17_204)] transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/sethfarrell/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[oklch(0.78_0.15_65/0.4)] text-[oklch(0.78_0.15_65)] text-xs rounded hover:bg-[oklch(0.78_0.15_65/0.08)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span>LINKEDIN</span>
          </a>
          <a
            href="https://arxiv.org/abs/2509.14210"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-[oklch(0.78_0.17_204/0.4)] text-[oklch(0.78_0.17_204)] text-xs rounded hover:bg-[oklch(0.78_0.17_204/0.08)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>READ PAPER</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Home() {
  const { displayed, done } = useTypewriter("MOTHERSHIP", 80, 400);

  const overviewRef    = useScrollReveal();
  const videoRef       = useScrollReveal();
  const ugvHwRef       = useScrollReveal();
  const ugvAutoRef     = useScrollReveal();
  const uavHwRef       = useScrollReveal();
  const uavSwRef       = useScrollReveal();
  const futureRef      = useScrollReveal();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.09 0.02 255)", fontFamily: "var(--font-body)" }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={BG_GRID} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.02_255/0.3)] via-transparent to-[oklch(0.09_0.02_255)]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-end">
          <div className="relative w-full md:w-[65%] h-full">
            <img
              src={HERO_PHOTO}
              alt="Mothership — Polaris GEM E6 with two X500 drones mounted on roof rack, field test"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.02_255)] via-[oklch(0.09_0.02_255/0.4)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.02_255/0.5)] via-transparent to-[oklch(0.09_0.02_255)]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="status-dot" />
              <span className="sys-label">UCSD — COMPUTER SCIENCE & ENGINEERING</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-2" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              {displayed}
              {!done && <span className="inline-block w-[3px] h-[0.85em] bg-[oklch(0.78_0.17_204)] ml-1 align-middle animate-[blink_0.8s_step-end_infinite]" />}
            </h1>

            <div className="scan-divider my-5" />

            <p className="text-[oklch(0.78_0.17_204)] text-lg font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Autonomous UGV Research Platform
            </p>
            <p className="text-[oklch(0.65_0.01_220)] text-base leading-relaxed max-w-md">
              A Polaris GEM e6 unmanned ground vehicle paired with two coordinated aerial drones for fully autonomous search-and-rescue operations in unknown environments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#overview"
                onClick={e => { e.preventDefault(); document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-5 py-2.5 bg-[oklch(0.78_0.17_204)] text-[oklch(0.09_0.02_255)] text-sm font-semibold rounded hover:bg-[oklch(0.85_0.17_204)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore Project
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[oklch(0.78_0.17_204)]" />
          <span className="sys-label text-[0.6rem]">SCROLL</span>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section id="overview" className="py-24 relative">
        <div className="absolute inset-0 opacity-25">
          <img src={SENSOR_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={overviewRef} className="fade-up">
            <SysLabel id="SYS_01">PROJECT OVERVIEW</SysLabel>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
                  GLIDE Framework
                </h2>
                <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                  <strong className="text-[oklch(0.82_0.01_220)]">Guided Long-horizon Integrated Drone Escort (GLIDE)</strong> is a cooperative multi-agent framework that pairs two unmanned aerial vehicles with an unmanned ground vehicle to achieve rapid victim localization and obstacle-aware navigation in unknown environments.
                </p>
                <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                  The framework explicitly separates aerial responsibilities: one UAV conducts real-time onboard victim detection and georeferencing, while the second scouts terrain ahead of the UGV's planned route. The ground vehicle fuses these aerial cues with local LiDAR sensing to perform time-efficient A* planning with continuous replanning as new information arrives.
                </p>
                <p className="text-[oklch(0.65_0.01_220)] leading-relaxed">
                  All systems are fully autonomous and communicate with each other over a shared ROS 2 network, enabling seamless coordination between the ground and aerial agents throughout the mission.
                </p>
              </div>
              <div className="space-y-4">
                <div className="card-panel p-5">
                  <div className="sys-label mb-3">MISSION OBJECTIVES</div>
                  {[
                    ["01", "Accurate detection and geolocation of victims from aerial imagery"],
                    ["02", "Time-efficient A* path planning to reach confirmed goal coordinates"],
                    ["03", "Online situational awareness in unknown environments for long-horizon planning"],
                  ].map(([n, t]) => (
                    <div key={n} className="flex gap-3 py-3 border-b border-[oklch(0.22_0.02_255)] last:border-0">
                      <span className="data-value text-[oklch(0.78_0.17_204)] text-sm flex-shrink-0">{n}</span>
                      <span className="text-sm text-[oklch(0.7_0.01_220)]">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="card-panel p-5">
                  <div className="sys-label mb-3">KEY CONTRIBUTIONS</div>
                  {[
                    "Explicit aerial role separation (goal-searching vs. terrain-scouting)",
                    "Lightweight YOLOv12 perception stack for resource-constrained UAVs",
                    "Aerial-guided A* planning with mid-level traversability maps",
                    "Full hardware demonstration with GEM e6 UGV + two X500 UAVs",
                    "Simulation ablations isolating the planning stack from perception",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-b border-[oklch(0.22_0.02_255)] last:border-0">
                      <div className="w-1 h-1 rounded-full bg-[oklch(0.78_0.17_204)] mt-2 flex-shrink-0" />
                      <span className="text-sm text-[oklch(0.7_0.01_220)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System diagram */}
            <div className="mt-12 card-panel p-2 overflow-hidden">
              <div className="relative">
                <img
                  src={SYSTEM_DIAGRAM}
                  alt="GLIDE system coordination diagram showing UGV with two UAVs, telemetry links, and A* planned path"
                  className="w-full max-h-[500px] object-contain rounded"
                />
                <div className="absolute bottom-4 right-4 card-panel px-3 py-2">
                  <div className="sys-label text-[0.6rem]">GLIDE — SYSTEM COORDINATION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== VIDEO PLACEHOLDER ===== */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="fade-up" ref={videoRef}>
            <SysLabel id="SYS_01B">FIELD DEMONSTRATION</SysLabel>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              Mothership Field Testing
            </h2>
            {/* YouTube embed */}
            <div className="relative rounded-lg overflow-hidden border border-[oklch(0.22_0.02_255)] shadow-[0_0_40px_oklch(0.78_0.17_204/0.08)] aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/0Yiroe8WIz8?rel=0&modestbranding=1&color=white"
                title="Mothership Field Testing — Autonomous UGV + UAV"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {/* Metadata strip below video */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                {["UGV + 2× UAV", "Outdoor Field Test", "Fully Autonomous"].map(tag => (
                  <span key={tag} className="text-xs text-[oklch(0.5_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>{tag}</span>
                ))}
              </div>
              <a
                href="https://youtu.be/0Yiroe8WIz8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[oklch(0.78_0.17_204)] hover:text-[oklch(0.88_0.17_204)] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== UGV HARDWARE ===== */}
      <section id="ugv-hardware" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={ugvHwRef} className="fade-up">
            <SysLabel id="SYS_02">GROUND VEHICLE</SysLabel>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              Polaris GEM e6 Hardware
            </h2>
            <p className="text-[oklch(0.65_0.01_220)] max-w-2xl mb-12">
              The Polaris GEM e6 serves as the ground ego-vehicle, a six-seat electric utility vehicle equipped with a PACMod drive-by-wire interface, sensor suite, and onboard compute stack for fully autonomous operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Platform */}
            <div className="card-panel p-6 border border-[oklch(0.72_0.18_290/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_290)]" />
                <span className="sys-label">PLATFORM</span>
              </div>
              <HardwareItem
                name="Polaris GEM e6"
                detail="Six-seat electric utility vehicle, modified for autonomous operation"
                color="purple"
              />
              <HardwareItem
                name="PACMOD Drive-By-Wire"
                detail="Full steering, throttle, and braking actuation via CAN bus"
                color="purple"
              />
            </div>

            {/* Sensing */}
            <div className="card-panel p-6 border border-[oklch(0.78_0.17_204/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.17_204)]" />
                <span className="sys-label">SENSING</span>
              </div>
              <HardwareItem
                name="Velodyne VLP-32C LiDAR"
                detail="32-channel spinning LiDAR for 3D point cloud generation and obstacle detection"
                color="cyan"
              />
              <HardwareItem
                name="2× AC-AR0233 GMSL Cameras"
                detail="120° FOV GMSL cameras for forward-facing visual perception"
                color="cyan"
              />
              <HardwareItem
                name="Bosch Off-Highway Radar"
                detail="Long-range radar for reliable obstacle detection in adverse conditions"
                color="cyan"
              />
            </div>

            {/* Localization */}
            <div className="card-panel p-6 border border-[oklch(0.78_0.15_65/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.15_65)]" />
                <span className="sys-label">LOCALIZATION</span>
              </div>
              <HardwareItem
                name="GNSS-RTK"
                detail="Real-time kinematic GPS providing sub-meter positioning for ENU frame alignment"
                color="amber"
              />
              <HardwareItem
                name="Watson DMS-SGP02 Inertial Navigation System"
                detail="High-grade IMU for precise attitude and acceleration measurements with dual-gps for heading"
                color="amber"
              />
            </div>

            {/* Networking */}
            <div className="card-panel p-6 border border-[oklch(0.78_0.17_204/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.17_204)]" />
                <span className="sys-label">NETWORKING</span>
              </div>
              <HardwareItem
                name="Outdoor Access Point"
                detail="High-power outdoor Wi-Fi access point for UAV-UGV communication over shared ROS 2 network"
                color="cyan"
              />
              <HardwareItem
                name="Telemetry Radios"
                detail="Dual Telemetry Radios for optional ground control connection with UAVs"
                color="cyan"
              />
              <HardwareItem
                name="4G Hotspot"
                detail="Mobile data connection for receiving NTRIP corrections for RTK"
                color="cyan"
              />
            </div>

            {/* Compute */}
            <div className="card-panel p-6 border border-[oklch(0.72_0.18_290/0.25)] lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_290)]" />
                <span className="sys-label">ONBOARD COMPUTE</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8">
                <div>
                  <HardwareItem name="Intel i9-14900K" detail="24-core CPU for real-time ROS 2 processing and planning" color="purple" />
                  <HardwareItem name="128 GB DDR5 RAM" detail="High-bandwidth memory for large point cloud and map buffers" color="purple" />
                  <HardwareItem name="NVIDIA RTX 4080" detail="GPU inference for YOLOv12, PointPillars, and SegFormer" color="purple" />
                </div>
                <div>
                  <HardwareItem name="GMSL Capture Card" detail="Hardware-synchronized capture of GMSL camera streams" color="purple" />
                  <HardwareItem name="6-Port NIC" detail="Multi-port network interface for sensor and UAV communication" color="purple" />
                  <HardwareItem name="1400 W Power Converter" detail="DC-DC conversion from vehicle battery to power onboard systems" color="purple" />
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== UGV AUTONOMY STACK ===== */}
      <section id="ugv-autonomy" className="py-24 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={SENSOR_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={ugvAutoRef} className="fade-up">
            <SysLabel id="SYS_03">GROUND VEHICLE</SysLabel>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              GEM e6 Autonomy Stack
            </h2>
            <p className="text-[oklch(0.65_0.01_220)] max-w-2xl mb-12">
              A full-stack autonomy pipeline running on ROS 2, from raw sensor data through perception, localization, planning, and low-level vehicle control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="">
              <StackCard
                id="LAYER_01"
                title="Perception"
                color="cyan"
                items={[
                  "YOLOv12 optimized with TensorRT for real-time object detection",
                  "PointPillars for 3D LiDAR-based object detection",
                  "Kalman Filter tracking on fused camera + LiDAR detections",
                  "Ground plane filtering using Patchwork++ for clean point clouds",
                  "Semantic segmentation with SegFormer for scene understanding",
                  "VLM integration for victim identification and confirmation",
                ]}
              />
            </div>
            <div className="">
              <StackCard
                id="LAYER_02"
                title="Localization"
                color="amber"
                items={[
                  "FAST-LIO2 for high-frequency LiDAR-inertial odometry",
                  "Local EKF for smooth, low-latency pose estimation",
                  "Global EKF for drift correction and long-horizon consistency",
                  "RTK GNSS for ENU frame alignment between local odometry and world frames",
                ]}
              />
            </div>
            <div className="">
              <StackCard
                id="LAYER_03"
                title="Planning"
                color="purple"
                items={[
                  "Nav2 navigation framework for mission-level path planning",
                  "Costmaps generated from perception inputs (LiDAR, camera, aerial cues)",
                  "Regulated Pure Pursuit Controller for smooth trajectory following",
                  "Continuous replanning as new aerial observations arrive",
                ]}
              />
            </div>
            <div className="">
              <StackCard
                id="LAYER_04"
                title="Control"
                color="green"
                items={[
                  "Converter from ROS 2 cmd_vel to steering angle, rate, and acceleration/braking commands",
                  "Ackermann steering geometry model for accurate vehicle kinematics",
                  "PID controller for closed-loop speed and heading regulation",
                  "PACMOD CAN bus interface for drive-by-wire actuation",
                ]}
              />
            </div>
          </div>

          {/* Stack diagram — layered visual */}
          <div className="mt-10 card-panel p-6">
            <div className="sys-label mb-6">AUTONOMY PIPELINE — DATA FLOW</div>
            <div className="flex flex-col gap-2">
              {[
                { label: "SENSORS", sub: "VLP-32C · GMSL Cameras · Radar · RTK · INS · UAV Feeds", color: "oklch(0.55_0.01_220)", bg: "oklch(0.15_0.02_255)" },
                { label: "PERCEPTION", sub: "YOLOv12 · PointPillars · Kalman Fusion · Patchwork++ · SegFormer · VLM", color: "oklch(0.78_0.17_204)", bg: "oklch(0.78_0.17_204/0.07)" },
                { label: "LOCALIZATION", sub: "FAST-LIO2 · Local EKF · Global EKF · RTK Alignment", color: "oklch(0.78_0.15_65)", bg: "oklch(0.78_0.15_65/0.07)" },
                { label: "PLANNING", sub: "Nav2 · Costmaps · Regulated Pure Pursuit", color: "oklch(0.72_0.18_290)", bg: "oklch(0.72_0.18_290/0.07)" },
                { label: "CONTROL", sub: "Ackermann Model · PID · PACMOD Drive-by-Wire", color: "oklch(0.72_0.18_145)", bg: "oklch(0.72_0.18_145/0.07)" },
              ].map(({ label, sub, color, bg }, i) => (
                <div key={label} className="flex items-center gap-4 rounded px-4 py-3" style={{ background: bg }}>
                  <div className="w-24 flex-shrink-0">
                    <span className="sys-label" style={{ color }}>{label}</span>
                  </div>
                  <div className="w-px h-6 bg-[oklch(0.3_0.02_255)] flex-shrink-0" />
                  <span className="text-xs text-[oklch(0.6_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>{sub}</span>
                  {i < 4 && (
                    <div className="ml-auto flex-shrink-0 text-[oklch(0.35_0.02_255)]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== UAV HARDWARE ===== */}
      <section id="uav-hardware" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={uavHwRef} className="fade-up">
            <SysLabel id="SYS_04">AERIAL VEHICLES</SysLabel>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              UAV Hardware Platform
            </h2>
            <p className="text-[oklch(0.65_0.01_220)] max-w-2xl mb-12">
              Two identical Holybro X500 quadcopters serve as the aerial agents. Each carries an onboard compute module, a high-quality global shutter camera, and connects to the UGV's shared network for real-time coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-panel p-6 border border-[oklch(0.72_0.18_290/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_290)]" />
                <span className="sys-label">AIRFRAME</span>
              </div>
              <HardwareItem name="Holybro X500 Platform" detail="Lightweight, modular quadcopter frame with 500 mm motor-to-motor span" color="purple" />
              <HardwareItem name="3D Printed Mounting Hardware" detail="Custom PETG-CF printed brackets for secure sensor and compute integration" color="purple" />
            </div>

            <div className="card-panel p-6 border border-[oklch(0.78_0.17_204/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.17_204)]" />
                <span className="sys-label">FLIGHT CONTROL</span>
              </div>
              <HardwareItem name="Pixhawk 6C Flight Controller" detail="Holybro Pixhawk 6C running PX4 1.16 firmware" color="cyan" />
              <HardwareItem name="PX4 1.16 Firmware" detail="Latest stable PX4 release with XRCE-DDS for ROS 2 integration" color="cyan" />
            </div>

            <div className="card-panel p-6 border border-[oklch(0.78_0.15_65/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.15_65)]" />
                <span className="sys-label">COMPUTE</span>
              </div>
              <HardwareItem name="Jetson Orin Nano Super" detail="NVIDIA Jetson Orin Nano Super for onboard AI inference at the edge" color="amber" />
              <HardwareItem name="Step-Down Voltage Regulator" detail="Efficient DC-DC conversion from LiPo battery to Jetson supply voltage" color="amber" />
            </div>

            <div className="card-panel p-6 border border-[oklch(0.78_0.17_204/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.17_204)]" />
                <span className="sys-label">PERCEPTION</span>
              </div>
              <HardwareItem name="Luxonis OAK-D Global Shutter" detail="OAK-D Pro W with global shutter for sharp, motion-blur-free aerial imagery" color="cyan" />
            </div>

            <div className="card-panel p-6 border border-[oklch(0.72_0.18_290/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_290)]" />
                <span className="sys-label">CONNECTIVITY</span>
              </div>
              <HardwareItem name="USB-UART Converter" detail="Bridges Jetson USB to Pixhawk UART for DDS telemetry" color="purple" />
              <HardwareItem name="Wi-Fi Adapter" detail="Connects each UAV to the UGV's onboard access point for ROS 2 communication" color="purple" />
            </div>

            {/* Spec table */}
            <div className="card-panel p-6 border border-[oklch(0.78_0.15_65/0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.15_65)]" />
                <span className="sys-label">FLIGHT ENVELOPE</span>
              </div>
              <SpecRow label="Max Speed" value="5 m/s" />
              <SpecRow label="Ascent / Descent" value="1 m/s" />
              <SpecRow label="Max Tilt" value="30°" />
              <SpecRow label="Thrust-to-Weight" value="2.0" />
              <SpecRow label="Operating Altitude" value="15 m" />
            </div>
          </div>
        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== UAV SOFTWARE ===== */}
      <section id="uav-software" className="py-24 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={BG_GRID} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={uavSwRef} className="fade-up">
            <SysLabel id="SYS_05">AERIAL VEHICLES</SysLabel>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              UAV Software Stack
            </h2>
            <p className="text-[oklch(0.65_0.01_220)] max-w-2xl mb-12">
              Each UAV runs a lightweight, inference-optimized software stack that enables real-time victim detection, setpoint control from on-board planner or UGV planner, and autonomous flight mode management, all onboard the Jetson Orin Nano.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="">
              <StackCard
                id="UAV_SW_01"
                title="Onboard Inference"
                color="cyan"
                items={[
                  "YOLOv12 fine-tuned on VisDrone aerial pedestrian dataset",
                  "TensorRT optimization for 30 FPS inference on Jetson Orin Nano",
                  "Pitch/roll threshold gating to suppress detections during aggressive maneuvers",
                  "3-hit spatial consensus filter to reduce false positives",
                ]}
              />
            </div>
            <div className="">
              <StackCard
                id="UAV_SW_02"
                title="Goal Communication"
                color="amber"
                items={[
                  "Detection node publishes georeferenced victim locations over ROS 2",
                  "GPS-fused geolocation for victims and obstacles in ENU frame",
                  "UGV receives georeferenced information and re-plans as necessary",
                  "Continuous updates as UAV surveys new regions of the environment",
                ]}
              />
            </div>
            <div className="">
              <StackCard
                id="UAV_SW_03"
                title="Flight Management"
                color="purple"
                items={[
                  "PX4-ROS2-Control-Interface library for mode executor flow",
                  "Setpoint commands issued via XRCE-DDS bridge to PX4 firmware",
                  "Autonomous takeoff, waypoint following, and landing sequences",
                  "AruCo marker-based precision landing on UGV roof rack",
                ]}
              />
            </div>
          </div>

          {/* Communication architecture */}
          <div className="card-panel p-6">
            <div className="sys-label mb-6">INTER-AGENT COMMUNICATION ARCHITECTURE</div>
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="card-panel p-4 border border-[oklch(0.78_0.17_204/0.2)] text-center">
                <div className="sys-label mb-2">UAV_01</div>
                <div className="text-sm text-[oklch(0.7_0.01_220)] mb-1">Goal-Searching UAV</div>
                <div className="text-xs text-[oklch(0.5_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>Publishes: /victim_goal</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-[oklch(0.5_0.01_220)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ROS 2 Cyclone DDS over Wi-Fi</div>
                <div className="w-full h-px bg-gradient-to-r from-[oklch(0.78_0.17_204/0.3)] via-[oklch(0.78_0.17_204/0.7)] to-[oklch(0.78_0.17_204/0.3)]" />
                <div className="card-panel p-3 border border-[oklch(0.72_0.18_290/0.3)] text-center w-full">
                  <div className="sys-label mb-1">UGV_01</div>
                  <div className="text-xs text-[oklch(0.6_0.01_220)]">Mothership</div>
                  <div className="text-xs text-[oklch(0.5_0.01_220)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>Fuses all agent data</div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-[oklch(0.78_0.15_65/0.3)] via-[oklch(0.78_0.15_65/0.7)] to-[oklch(0.78_0.15_65/0.3)]" />
              </div>
              <div className="card-panel p-4 border border-[oklch(0.78_0.15_65/0.2)] text-center">
                <div className="sys-label mb-2">UAV_02</div>
                <div className="text-sm text-[oklch(0.7_0.01_220)] mb-1">Terrain-Scouting UAV</div>
                <div className="text-xs text-[oklch(0.5_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>Publishes: /terrain_obstacle</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scan-divider mx-6" />

      {/* ===== FUTURE WORK ===== */}
      <section id="future-work" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={futureRef} className="fade-up">
            <SysLabel id="SYS_06">LOOKING AHEAD</SysLabel>
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 220)" }}>
              Future Work
            </h2>
            <p className="text-[oklch(0.65_0.01_220)] max-w-2xl mb-12">
              The current GLIDE framework establishes a foundation for coordinated aerial-ground autonomy. The next section discusses both ongoing work as well as conceptual ideas for improvement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-panel p-8 border border-[oklch(0.78_0.17_204/0.25)] shadow-[0_0_30px_oklch(0.78_0.17_204/0.06)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.78_0.17_204)]" />
                <span className="sys-label">FUTURE_01</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.78_0.17_204)]" style={{ fontFamily: "var(--font-display)" }}>
                Richer Map Representations
              </h3>
              <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                Improving map representation to incorporate more than geometric information from both aerial and ground agents. Current occupancy grids capture only traversability; future maps will encode semantic labels, material properties, and operator-designated mission zones.
              </p>
              <div className="space-y-2 mt-4">
                {[
                  "Semantic scene understanding from SegFormer integrated into costmaps",
                  "Operator-designated mission zones and priority regions",
                  "Multi-modal map fusion from aerial and ground perspectives",
                  "Persistent semantic memory across replanning cycles",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[oklch(0.6_0.01_220)]">
                    <div className="w-1 h-1 rounded-full bg-[oklch(0.78_0.17_204)] mt-2 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-panel p-8 border border-[oklch(0.78_0.15_65/0.25)] shadow-[0_0_30px_oklch(0.78_0.15_65/0.06)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.78_0.15_65)]" />
                <span className="sys-label">FUTURE_02</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.78_0.15_65)]" style={{ fontFamily: "var(--font-display)" }}>
                Expanded Ground Fleet
              </h3>
              <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                Incorporation of additional ground platforms such as quadrupeds to extend ground coverage into areas where the Polaris GEM e6 cannot operate. Rough terrain, stairs, and narrow passages become accessible with a heterogeneous ground team.
              </p>
              <div className="space-y-2 mt-4">
                {[
                  "Quadruped robots for rough terrain and confined spaces",
                  "Heterogeneous ground fleet coordination via shared ROS 2 network",
                  "Task allocation between wheeled and legged agents",
                  "Unified map representation across all ground and aerial agents",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[oklch(0.6_0.01_220)]">
                    <div className="w-1 h-1 rounded-full bg-[oklch(0.78_0.15_65)] mt-2 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="card-panel p-8 border border-[oklch(0.72_0.18_290/0.25)] shadow-[0_0_30px_oklch(0.72_0.18_290/0.06)]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.72_0.18_290)]" />
                  <span className="sys-label">FUTURE_03</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[oklch(0.72_0.18_290)]" style={{ fontFamily: "var(--font-display)" }}>
                  Coming Soon
                </h3>
                {/* <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                  Coming Soon
                </p>
                <div className="space-y-2 mt-4">
                  {[
                  "Coming Soon"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[oklch(0.6_0.01_220)]">
                      <div className="w-1 h-1 rounded-full bg-[oklch(0.72_0.18_290)] mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div> */}
              </div>

            <div className="card-panel p-8 border border-[oklch(0.72_0.18_145/0.25)] shadow-[0_0_30px_oklch(0.72_0.18_145/0.06)]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.72_0.18_145)]" />
                  <span className="sys-label">FUTURE_04</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[oklch(0.72_0.18_145)]" style={{ fontFamily: "var(--font-display)" }}>
                  Coming Soon
                </h3>
                {/* <p className="text-[oklch(0.65_0.01_220)] leading-relaxed mb-4">
                  Coming Soon
                </p> */}
                {/* <div className="space-y-2 mt-4">
                  {[
                  "Coming Soon"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[oklch(0.6_0.01_220)]">
                      <div className="w-1 h-1 rounded-full bg-[oklch(0.72_0.18_145)] mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div> */}
              </div>



          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[oklch(0.22_0.02_255)] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="status-dot" />
            <span className="sys-label text-[oklch(0.78_0.17_204)]">MOTHERSHIP</span>
            {/* <span className="text-[oklch(0.4_0.01_220)] text-xs" style={{ fontFamily: "var(--font-mono)" }}>— GLIDE FRAMEWORK</span> */}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sethfarrell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[oklch(0.5_0.01_220)] hover:text-[oklch(0.78_0.15_65)] transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              LINKEDIN
            </a>
            <span className="text-[oklch(0.3_0.01_220)]">·</span>
            <p className="text-xs text-[oklch(0.4_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>
              UC San Diego · CSE Department · 2025–2026
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[oklch(0.4_0.01_220)]" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_145)] animate-pulse" />
            SYSTEM ONLINE
          </div>
        </div>
      </footer>
    </div>
  );
}

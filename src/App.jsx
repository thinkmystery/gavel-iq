import { useState, useMemo } from "react";
import { LISTINGS, AUCTION_DATES } from "./data";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  MapPin, TrendingUp, DollarSign, Calendar, ExternalLink,
  ChevronRight, X, AlertTriangle, Shield, Flame, Search
} from "lucide-react";

const fmt = (n) => n == null ? "—" : "$" + Math.round(n).toLocaleString();
const fmtRatio = (r) => r == null ? "—" : r.toFixed(2) + "x";

function getRatioTier(ratio) {
  if (ratio >= 5) return { label: "EXCEPTIONAL", color: "#16a34a", bg: "#dcfce7", dot: "#16a34a" };
  if (ratio >= 2) return { label: "STRONG", color: "#0284c7", bg: "#e0f2fe", dot: "#0284c7" };
  if (ratio >= 1.2) return { label: "MODERATE", color: "#d97706", bg: "#fef3c7", dot: "#d97706" };
  return { label: "LOW", color: "#dc2626", bg: "#fee2e2", dot: "#dc2626" };
}

function RatioBadge({ ratio }) {
  const tier = getRatioTier(ratio);
  return (
    <span style={{
      background: tier.bg, color: tier.color,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
      padding: "3px 8px", borderRadius: 4, fontFamily: "IBM Plex Mono, monospace",
      border: `1px solid ${tier.color}22`
    }}>
      {fmtRatio(ratio)}
    </span>
  );
}

function DetailDrawer({ listing, onClose }) {
  if (!listing) return null;
  const tier = getRatioTier(listing.value_vs_fj_ratio);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", justifyContent: "flex-end"
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(2px)"
      }} />
      <div style={{
        position: "relative", width: 480, maxWidth: "100vw",
        background: "#fff", overflowY: "auto",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        animation: "slideIn 0.2s ease"
      }}>
        {/* Header */}
        <div style={{
          padding: "28px 28px 20px",
          borderBottom: "1px solid #e8e6e0",
          background: "#faf9f6"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#8b7e6a", marginBottom: 6 }}>
                {listing.auction_date} · {listing.auction_time}
              </div>
              <div style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 22, fontWeight: 700, color: "#1a1208", lineHeight: 1.2
              }}>
                {listing.property_address}
              </div>
              <div style={{ fontSize: 13, color: "#6b5e4a", marginTop: 4 }}>
                {listing.city}, {listing.state} {listing.zip}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 4, color: "#8b7e6a"
            }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              background: tier.bg, color: tier.color,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
              padding: "4px 12px", borderRadius: 6,
              border: `1px solid ${tier.color}33`
            }}>
              {tier.label} OPPORTUNITY
            </span>
            <span style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 22, fontWeight: 500, color: tier.color
            }}>
              {fmtRatio(listing.value_vs_fj_ratio)}
            </span>
          </div>
        </div>

        {/* Financials */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8b7e6a", marginBottom: 12 }}>
            FINANCIAL SUMMARY
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Final Judgment", value: fmt(listing.final_judgment_amount), sub: "Amount owed" },
              { label: "PAPA Just Value", value: fmt(listing.just_value), sub: "Market appraisal" },
              { label: "Assessed Value", value: fmt(listing.assessed_value), sub: "Tax assessed" },
              { label: "Equity Gap", value: fmt(listing.value_vs_fj_diff), sub: "Potential upside", highlight: listing.value_vs_fj_diff > 0 },
            ].map(item => (
              <div key={item.label} style={{
                padding: "14px 16px", borderRadius: 8,
                background: item.highlight ? "#f0fdf4" : "#faf9f6",
                border: `1px solid ${item.highlight ? "#bbf7d0" : "#e8e6e0"}`
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", color: "#8b7e6a" }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 18, fontWeight: 500, marginTop: 4,
                  color: item.highlight ? "#16a34a" : "#1a1208"
                }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 11, color: "#8b7e6a", marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Value bar visualization */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8b7e6a", marginBottom: 10 }}>
              VALUE vs. JUDGMENT
            </div>
            <div style={{ background: "#f0ece4", borderRadius: 6, height: 10, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 6,
                background: `linear-gradient(90deg, ${tier.color}, ${tier.color}99)`,
                width: `${Math.min(100, (listing.value_vs_fj_ratio / 15) * 100)}%`,
                transition: "width 0.6s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#8b7e6a", marginTop: 4 }}>
              <span>0x</span>
              <span style={{ color: tier.color, fontWeight: 700 }}>{fmtRatio(listing.value_vs_fj_ratio)}</span>
              <span>15x</span>
            </div>
          </div>

          {/* Case info */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8b7e6a", marginBottom: 10 }}>
              CASE DETAILS
            </div>
            <div style={{ fontSize: 13, color: "#4a3f2f" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e8e6e0" }}>
                <span style={{ color: "#8b7e6a" }}>Case Number</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12 }}>{listing.case_number}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e8e6e0" }}>
                <span style={{ color: "#8b7e6a" }}>Plaintiff Max Bid</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12 }}>{fmt(listing.plaintiff_max_bid)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <span style={{ color: "#8b7e6a" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>{listing.auction_status}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8b7e6a", marginBottom: 10 }}>
              RESEARCH LINKS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "PAPA Property Record", url: listing.papa_url, icon: Shield },
                { label: "Zillow Listing", url: listing.zillow_url, icon: TrendingUp },
                { label: "Realtor.com", url: listing.realtor_url, icon: DollarSign },
                { label: "Google Maps", url: listing.maps_url, icon: MapPin },
              ].map(({ label, url, icon: Icon }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 8,
                  background: "#faf9f6", border: "1px solid #e8e6e0",
                  textDecoration: "none", color: "#1a1208",
                  fontSize: 13, fontWeight: 500,
                  transition: "border-color 0.15s"
                }}>
                  <Icon size={15} color="#8b7e6a" />
                  {label}
                  <ExternalLink size={12} color="#8b7e6a" style={{ marginLeft: "auto" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BubbleMap({ listings, onSelect, selected }) {
  // Simple SVG pseudo-map of Palm Beach County
  // Approximate bounding box: lat 26.2–27.0, lng -80.35 to -80.03
  const mapW = 460, mapH = 320;
  const latMin = 26.2, latMax = 27.05, lngMin = -80.38, lngMax = -79.98;

  const toXY = (lat, lng) => ({
    x: ((lng - lngMin) / (lngMax - lngMin)) * mapW,
    y: mapH - ((lat - latMin) / (latMax - latMin)) * mapH,
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${mapW} ${mapH}`} style={{
        background: "#eef2f7", borderRadius: 12,
        border: "1px solid #ddd8ce"
      }}>
        {/* County outline suggestion */}
        <rect x={20} y={20} width={mapW - 40} height={mapH - 40}
          rx={8} fill="#e8ecf3" stroke="#c8d0dc" strokeWidth={1} />

        {/* Ocean / Intracoastal hint */}
        <rect x={mapW - 60} y={20} width={40} height={mapH - 40}
          rx={4} fill="#d4e4f0" opacity={0.6} />
        <text x={mapW - 42} y={mapH / 2} textAnchor="middle"
          style={{ fontSize: 9, fill: "#7a9ab5", fontFamily: "IBM Plex Sans" }}
          transform={`rotate(-90, ${mapW - 42}, ${mapH / 2})`}>
          ATLANTIC
        </text>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(t => (
          <line key={t}
            x1={20} y1={20 + (mapH - 40) * t}
            x2={mapW - 20} y2={20 + (mapH - 40) * t}
            stroke="#d0ccc4" strokeWidth={0.5} strokeDasharray="4,4" />
        ))}

        {/* Listings as bubbles */}
        {listings.map(l => {
          const { x, y } = toXY(l.lat, l.lng);
          const tier = getRatioTier(l.value_vs_fj_ratio);
          const r = Math.max(8, Math.min(28, l.value_vs_fj_ratio * 3));
          const isSelected = selected?.id === l.id;

          return (
            <g key={l.id} onClick={() => onSelect(l)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={y} r={r + 4}
                fill={tier.dot} opacity={isSelected ? 0.2 : 0.08} />
              <circle cx={x} cy={y} r={r}
                fill={tier.dot} opacity={isSelected ? 1 : 0.75}
                stroke={isSelected ? "#1a1208" : "white"}
                strokeWidth={isSelected ? 2.5 : 1.5} />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
                style={{
                  fontSize: r > 14 ? 9 : 7,
                  fontWeight: 700,
                  fill: "white",
                  fontFamily: "IBM Plex Mono, monospace",
                  pointerEvents: "none"
                }}>
                {l.value_vs_fj_ratio.toFixed(1)}x
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(24, ${mapH - 60})`}>
          <rect width={110} height={52} rx={6} fill="white" opacity={0.9} />
          {[
            { color: "#16a34a", label: "≥5x Exceptional" },
            { color: "#0284c7", label: "≥2x Strong" },
            { color: "#d97706", label: "≥1.2x Moderate" },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(8, ${10 + i * 14})`}>
              <circle r={4} fill={item.color} cx={4} cy={2} />
              <text x={14} y={6}
                style={{ fontSize: 8, fill: "#4a3f2f", fontFamily: "IBM Plex Sans" }}>
                {item.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "20px 22px",
      border: "1px solid #e8e6e0", flex: 1, minWidth: 160
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: color + "15",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon size={16} color={color} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#8b7e6a" }}>
          {label}
        </span>
      </div>
      <div style={{
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 24, fontWeight: 500, color: "#1a1208"
      }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: "#8b7e6a", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [sortBy, setSortBy] = useState("ratio");
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let rows = [...LISTINGS];
    if (selectedDate !== "ALL") rows = rows.filter(r => r.auction_date === selectedDate);
    if (search.trim()) {
      const s = search.toLowerCase();
      rows = rows.filter(r =>
        r.property_address.toLowerCase().includes(s) ||
        r.city.toLowerCase().includes(s) ||
        r.zip.includes(s)
      );
    }
    rows.sort((a, b) => {
      if (sortBy === "ratio") return b.value_vs_fj_ratio - a.value_vs_fj_ratio;
      if (sortBy === "gap") return b.value_vs_fj_diff - a.value_vs_fj_diff;
      if (sortBy === "fj") return a.final_judgment_amount - b.final_judgment_amount;
      return 0;
    });
    return rows;
  }, [selectedDate, sortBy, search]);

  const displayRows = showAll ? filtered : filtered.slice(0, 8);

  const topRatio = Math.max(...LISTINGS.map(l => l.value_vs_fj_ratio));
  const totalGap = LISTINGS.filter(l => l.value_vs_fj_diff > 0).reduce((s, l) => s + l.value_vs_fj_diff, 0);
  const strongCount = LISTINGS.filter(l => l.value_vs_fj_ratio >= 2).length;

  const barData = AUCTION_DATES.map(d => ({
    date: d.slice(0, 5),
    count: LISTINGS.filter(l => l.auction_date === d).length,
    strong: LISTINGS.filter(l => l.auction_date === d && l.value_vs_fj_ratio >= 1.2).length,
  }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f6f3",
      fontFamily: "IBM Plex Sans, sans-serif",
      color: "#1a1208"
    }}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        * { box-sizing: border-box; }
        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.75; }
      `}</style>

      {/* Top bar */}
      <div style={{
        background: "#1a1208", color: "#f7f6f3",
        padding: "0 32px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px"
          }}>
            Gavel<span style={{ color: "#c9a84c" }}>IQ</span>
          </span>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
            color: "#8b7e6a", borderLeft: "1px solid #3a2e1e",
            paddingLeft: 12
          }}>
            PALM BEACH COUNTY · FORECLOSURE INTELLIGENCE
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: "#8b7e6a" }}>
            Updated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          <div style={{
            background: "#c9a84c", color: "#1a1208",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
            padding: "6px 14px", borderRadius: 6
          }}>
            DEMO
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px" }}>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <StatCard icon={Flame} label="BEST RATIO" value={fmtRatio(topRatio)} sub="Top opportunity" color="#16a34a" />
          <StatCard icon={TrendingUp} label="STRONG DEALS" value={strongCount} sub="Ratio ≥ 2x" color="#0284c7" />
          <StatCard icon={DollarSign} label="TOTAL EQUITY GAP" value={"$" + (totalGap / 1e6).toFixed(1) + "M"} sub="Across all listings" color="#c9a84c" />
          <StatCard icon={Calendar} label="AUCTION DATES" value={AUCTION_DATES.length} sub="Upcoming" color="#7c3aed" />
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20, marginBottom: 20 }}>

          {/* Opportunity board */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", overflow: "hidden" }}>
            <div style={{
              padding: "18px 24px", borderBottom: "1px solid #e8e6e0",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#faf9f6", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <h2 style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 18, fontWeight: 700, margin: 0
                }}>
                  Opportunity Board
                </h2>
                <p style={{ fontSize: 12, color: "#8b7e6a", margin: "2px 0 0" }}>
                  Ranked by PAPA just value ÷ final judgment
                </p>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {/* Search */}
                <div style={{ position: "relative" }}>
                  <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#8b7e6a" }} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search address, city…"
                    style={{
                      paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                      border: "1px solid #e0dbd2", borderRadius: 6, fontSize: 12,
                      fontFamily: "IBM Plex Sans, sans-serif", background: "#fff",
                      outline: "none", width: 180, color: "#1a1208"
                    }}
                  />
                </div>

                {/* Date filter */}
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{
                  padding: "6px 10px", borderRadius: 6, border: "1px solid #e0dbd2",
                  fontSize: 12, fontFamily: "IBM Plex Sans, sans-serif",
                  background: "#fff", color: "#1a1208", cursor: "pointer", outline: "none"
                }}>
                  <option value="ALL">All Dates</option>
                  {AUCTION_DATES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                {/* Sort */}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  padding: "6px 10px", borderRadius: 6, border: "1px solid #e0dbd2",
                  fontSize: 12, fontFamily: "IBM Plex Sans, sans-serif",
                  background: "#fff", color: "#1a1208", cursor: "pointer", outline: "none"
                }}>
                  <option value="ratio">Sort: Best Ratio</option>
                  <option value="gap">Sort: Equity Gap</option>
                  <option value="fj">Sort: Lowest FJ</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#faf9f6" }}>
                    {["#", "Property", "City / ZIP", "FJ Amount", "Just Value", "Equity Gap", "Ratio", ""].map(h => (
                      <th key={h} style={{
                        padding: "10px 14px", textAlign: h === "#" ? "center" : "left",
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                        color: "#8b7e6a", borderBottom: "2px solid #e8e6e0",
                        whiteSpace: "nowrap"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((l, i) => {
                    const tier = getRatioTier(l.value_vs_fj_ratio);
                    const isSelected = selectedListing?.id === l.id;
                    return (
                      <tr key={l.id}
                        onClick={() => setSelectedListing(isSelected ? null : l)}
                        style={{
                          borderBottom: "1px solid #f0ece4",
                          cursor: "pointer",
                          background: isSelected ? "#faf7ee" : "transparent",
                          transition: "background 0.1s"
                        }}>
                        <td style={{ padding: "12px 14px", textAlign: "center" }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: "50%",
                            background: i < 3 ? "#1a1208" : "#f0ece4",
                            color: i < 3 ? "#c9a84c" : "#8b7e6a",
                            fontSize: 11, fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto"
                          }}>
                            {i + 1}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{l.property_address}</div>
                          <div style={{ fontSize: 11, color: "#8b7e6a", marginTop: 1 }}>
                            {l.auction_date}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: 13 }}>{l.city}</div>
                          <div style={{ fontSize: 11, color: "#8b7e6a" }}>{l.zip}</div>
                        </td>
                        <td style={{ padding: "12px 14px", fontFamily: "IBM Plex Mono, monospace", fontSize: 12 }}>
                          {fmt(l.final_judgment_amount)}
                        </td>
                        <td style={{ padding: "12px 14px", fontFamily: "IBM Plex Mono, monospace", fontSize: 12 }}>
                          {fmt(l.just_value)}
                        </td>
                        <td style={{ padding: "12px 14px", fontFamily: "IBM Plex Mono, monospace", fontSize: 12 }}>
                          <span style={{ color: l.value_vs_fj_diff > 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                            {l.value_vs_fj_diff > 0 ? "+" : ""}{fmt(l.value_vs_fj_diff)}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <RatioBadge ratio={l.value_vs_fj_ratio} />
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <ChevronRight size={15} color="#8b7e6a" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length > 8 && (
              <div style={{ padding: "14px 24px", textAlign: "center", borderTop: "1px solid #e8e6e0" }}>
                <button onClick={() => setShowAll(!showAll)} style={{
                  background: "none", border: "1px solid #e0dbd2", borderRadius: 6,
                  padding: "7px 20px", fontSize: 12, fontWeight: 600, color: "#4a3f2f",
                  cursor: "pointer", fontFamily: "IBM Plex Sans, sans-serif"
                }}>
                  {showAll ? "Show Less" : `Show All ${filtered.length} Listings`}
                </button>
              </div>
            )}
          </div>

          {/* Right column: map + chart */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Bubble map */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px 12px", background: "#faf9f6", borderBottom: "1px solid #e8e6e0" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 700, margin: 0 }}>
                  Opportunity Heat Map
                </h3>
                <p style={{ fontSize: 11, color: "#8b7e6a", margin: "2px 0 0" }}>
                  Bubble size = ratio · Click to inspect
                </p>
              </div>
              <div style={{ padding: 16 }}>
                <BubbleMap
                  listings={filtered.filter(l => l.lat)}
                  onSelect={setSelectedListing}
                  selected={selectedListing}
                />
              </div>
            </div>

            {/* Auction calendar chart */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e0", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px 12px", background: "#faf9f6", borderBottom: "1px solid #e8e6e0" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 700, margin: 0 }}>
                  Auction Calendar
                </h3>
                <p style={{ fontSize: 11, color: "#8b7e6a", margin: "2px 0 0" }}>
                  Listings per date
                </p>
              </div>
              <div style={{ padding: "16px 16px 8px" }}>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={barData} barGap={2}>
                    <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#8b7e6a" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ fontFamily: "IBM Plex Sans", fontSize: 12, border: "1px solid #e8e6e0", borderRadius: 8 }}
                      labelStyle={{ fontWeight: 700 }}
                    />
                    <Bar dataKey="count" name="Total" radius={[4, 4, 0, 0]}>
                      {barData.map((_, i) => <Cell key={i} fill="#e8e0d0" />)}
                    </Bar>
                    <Bar dataKey="strong" name="Ratio ≥1.2x" radius={[4, 4, 0, 0]}>
                      {barData.map((_, i) => <Cell key={i} fill="#c9a84c" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 11, color: "#8b7e6a" }}>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#e8e0d0", borderRadius: 2, marginRight: 4 }} />Total listings</span>
                  <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#c9a84c", borderRadius: 2, marginRight: 4 }} />Ratio ≥1.2x</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", fontSize: 11, color: "#8b7e6a",
          padding: "16px 0", borderTop: "1px solid #e8e6e0"
        }}>
          GavelIQ · Palm Beach County Foreclosure Intelligence · Data sourced from PAPA & Public Court Records · Demo Build
        </div>
      </div>

      {selectedListing && (
        <DetailDrawer listing={selectedListing} onClose={() => setSelectedListing(null)} />
      )}
    </div>
  );
}

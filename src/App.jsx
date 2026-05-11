import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSearch,
  Gavel,
  Layers3,
  LineChart,
  Lock,
  Network,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const metrics = [
  ['Tier-1 Opportunities', '47', '+8 this week'],
  ['Sales Scheduled Next 30 Days', '126', 'Palm Beach'],
  ['High Cancellation Risk', '38', 'new docket signal'],
  ['Active Repeat Bidders', '214', 'identity resolved'],
  ['Plaintiff Push-to-Sale Leaders', '12', 'ranked entities'],
  ['Market Heat Index', '74 / 100', '+18% Delray'],
];

const modules = [
  {
    title: 'ParcelIQ',
    status: 'Live',
    icon: Building2,
    text: 'Active foreclosure parcels, tier-1 opportunity scoring, auction dates, equity estimates, case timelines, docket summaries, and linked parcel history.',
    signals: ['Tier-1 opportunity list', 'Estimated equity', 'Cancellation probability', 'Case timeline', 'Parcel history'],
  },
  {
    title: 'BidderIQ',
    status: 'Building',
    icon: Users,
    text: 'Bidder profiles, LLC clustering, auction participation, win rates, bid aggressiveness, preferred segments, and post-auction behavior.',
    signals: ['LLC clustering', 'Win rate', 'ZIP preferences', 'Flip vs hold', 'Contact intelligence'],
  },
  {
    title: 'PlaintiffIQ',
    status: 'Building',
    icon: ShieldCheck,
    text: 'Plaintiff, bank, trustee, and servicer behavior by volume, cancellation rate, sale follow-through, and negotiation pattern.',
    signals: ['Push-to-sale rate', 'Cancellation rate', 'Judgment-to-sale', 'Third-party sale rate'],
  },
  {
    title: 'LawFirmIQ',
    status: 'Building',
    icon: FileSearch,
    text: 'Foreclosure firm behavior, filing volume, speed to judgment, reset patterns, late-cancellation behavior, and plaintiff relationships.',
    signals: ['Firm velocity', 'Reset pattern', 'Late cancellation', 'Plaintiff mapping'],
  },
  {
    title: 'MarketIQ',
    status: 'Live',
    icon: BarChart3,
    text: 'County-level auction volume, actual sale rate, third-party buyer rate, bidder competition, hot ZIPs, and post-auction velocity.',
    signals: ['Auction volume', 'Heat index', 'Hot ZIPs', 'Soft ZIPs', 'Resale velocity'],
  },
  {
    title: 'PredictiveIQ',
    status: 'Predictive Layer',
    icon: Zap,
    text: 'Cancellation probability, sale-likelihood scores, bidder turnout estimates, competitive intensity, deal quality, and change alerts.',
    signals: ['Sale likelihood', 'Bidder turnout', 'Competition score', 'Deal score', 'What changed?'],
  },
];

const opportunities = [
  ['May 21', '17845 Scarsdale Way, Boca Raton', 'Sale set', '$184K', '18%', 'High', '92', 'Full diligence'],
  ['May 28', '421 N L St, Lake Worth Beach', 'Final judgment', '$96K', '24%', 'Medium', '86', 'Hidden value'],
  ['Jun 04', '9983 Via Amati, Lake Worth', 'Sale reset', '$141K', '61%', 'Low', '54', 'Likely cancel'],
  ['Jun 11', '711 SE 2nd Ave, Delray Beach', 'Sale set', '$225K', '32%', 'High', '78', 'High competition'],
  ['Jun 18', '2600 N Ocean Dr, Riviera Beach', 'Sale scheduled', '$73K', '47%', 'Medium', '63', 'Watch closely'],
  ['Jun 25', '1348 Summit Pines Blvd, West Palm Beach', 'Docket motion', '$58K', '69%', 'Low', '41', 'Skip unless price breaks'],
];

const bidderActivity = [
  ['May 02', '50-2024-CA-011238', 'Condo', '$412K', 'Won', 'Relisted after 96 days'],
  ['Apr 18', '50-2023-CA-008911', 'SFH', '$589K', 'Lost', 'Winner held'],
  ['Mar 27', '50-2023-CA-014020', 'Townhome', '$331K', 'Won', 'Deeded to related LLC'],
  ['Feb 13', '50-2022-CA-006118', 'Condo', '$278K', 'Won', 'Sold +17.4% gross'],
];

const marketBars = [
  ['Auction volume', 78],
  ['Actual sale rate', 41],
  ['Third-party buyer rate', 36],
  ['Competitive bidding index', 74],
  ['Resale velocity', 62],
];

const alerts = [
  ['High Alpha', '3 cases moved to High Alpha after new docket activity.'],
  ['Cancel Risk', '2 sales likely to cancel based on new plaintiff motions.'],
  ['Bidder Entry', '1 repeat bidder entered Boca condo segment.'],
  ['Firm Pattern', 'Robertson Anschutz reset activity elevated this week.'],
  ['Market Heat', 'Delray Beach bidding heat up 18% over trailing 30 days.'],
];

const pricing = [
  {
    name: 'Palm Beach Intelligence',
    price: '$750',
    detail: '/ month',
    features: ['Tier-1 parcel list', 'Scheduled auction dashboard', 'Cancellation probability', 'Weekly opportunity report'],
  },
  {
    name: 'Professional',
    price: '$1,500',
    detail: '/ month',
    featured: true,
    features: ['Everything in Palm Beach Intelligence', 'BidderIQ', 'PlaintiffIQ', 'LawFirmIQ', 'Saved watchlists', 'Change alerts'],
  },
  {
    name: 'Platinum / Data Partner',
    price: 'Custom',
    detail: '',
    features: ['Historical exports', 'API / CSV feeds', 'Custom enrichment', 'Multi-county roadmap access', 'Design partner feedback loop'],
  },
];

function Pill({ children, tone = 'default' }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function App() {
  return (
    <main>
      <nav className="nav">
        <div className="brand"><Gavel size={22} /> Gavel IQ</div>
        <div className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#modules">Modules</a>
          <a href="#pricing">Access</a>
        </div>
        <a className="nav-cta" href="mailto:access@gaveliq.com">Request Access</a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-label"><span /> Palm Beach County first. Florida judicial markets next.</div>
          <h1>The intelligence layer for Florida judicial foreclosure markets.</h1>
          <p className="hero-subtitle">
            Gavel IQ turns court dockets, auction outcomes, bidder sheets, parcels, plaintiffs, and law firm behavior into searchable, predictive distressed asset intelligence.
          </p>
          <div className="hero-actions">
            <a href="#platform" className="button primary">View Platform <ArrowRight size={17} /></a>
            <a href="#pricing" className="button secondary">Request Palm Beach Access</a>
          </div>
          <div className="hero-metrics">
            {['5 years historical case spine', 'Bidder behavior graph', 'Plaintiff + firm patterns', 'Parcel-level opportunity scoring'].map((m) => (
              <div key={m}><CheckCircle2 size={16} /> {m}</div>
            ))}
          </div>
        </div>
        <div className="terminal-card hero-terminal">
          <div className="terminal-top"><span /> <span /> <span /> <strong>GAVEL IQ / COMMAND</strong></div>
          <div className="terminal-body">
            <div className="terminal-row"><span>county</span><b>Palm Beach</b></div>
            <div className="terminal-row"><span>case spine</span><b>5Y historical</b></div>
            <div className="terminal-row"><span>tier-1 active</span><b>47 parcels</b></div>
            <div className="terminal-row"><span>repeat bidders</span><b>214 resolved</b></div>
            <div className="terminal-row"><span>sale likelihood model</span><b>online</b></div>
            <div className="terminal-query"><Search size={16} /> “Which sales will actually happen this month?”</div>
          </div>
        </div>
      </section>

      <section id="platform" className="panel command-center">
        <div className="panel-top">
          <div>
            <div className="eyebrow">Intelligence Command Center</div>
            <h2>Most foreclosure tools show listings. Gavel IQ shows behavior.</h2>
          </div>
          <Pill tone="demo">DEMO DATA</Pill>
        </div>
        <p className="snapshot">Data snapshot: Palm Beach County · Updated May 11, 2026 · 8:30 AM</p>
        <div className="metric-grid">
          {metrics.map(([label, value, note]) => (
            <div className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <em>{note}</em>
            </div>
          ))}
        </div>
      </section>

      <section id="modules">
        <SectionHeader eyebrow="Platform modules" title="Six surfaces. One distressed-asset intelligence graph.">
          The product is built around the entities that actually determine foreclosure market outcomes: parcels, cases, plaintiffs, firms, bidders, and post-auction results.
        </SectionHeader>
        <div className="module-grid">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <article className="module-card" key={m.title}>
                <div className="module-head"><Icon size={22} /><Pill tone={m.status === 'Live' ? 'live' : m.status === 'Predictive Layer' ? 'predictive' : 'build'}>{m.status}</Pill></div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <div className="signal-list">{m.signals.map((s) => <span key={s}>{s}</span>)}</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="split-layout">
        <div className="panel wide-panel">
          <div className="panel-top"><div><div className="eyebrow">ParcelIQ</div><h2>Tier-1 Opportunity Table</h2></div><Pill tone="demo">DEMO DATA</Pill></div>
          <div className="table-wrap">
            <table>
              <thead><tr>{['Auction Date','Parcel / Address','Case Stage','Est. Equity','Cancel Prob.','Bidder Competition','Gavel Score','Recommended Action'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{opportunities.map((row) => <tr key={row[1]}>{row.map((cell, i) => <td key={cell} className={i === 6 ? 'score' : i === 7 ? 'action' : ''}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
        <aside className="panel feed-panel">
          <div className="eyebrow">PredictiveIQ</div>
          <h3>What changed?</h3>
          <div className="alert-feed">
            {alerts.map(([tag, body]) => <div className="alert-item" key={tag}><AlertTriangle size={15} /><div><strong>{tag}</strong><p>{body}</p></div></div>)}
          </div>
        </aside>
      </section>

      <section className="panel graph-panel">
        <SectionHeader eyebrow="Entity graph" title="Parcel → Case → Plaintiff → Law Firm → Auction → Bidders → Post-Auction Outcome">
          The bidder sheet is not an artifact. It is the market map. Cases that cancel are still training data.
        </SectionHeader>
        <div className="graph-flow">
          {['Parcel','Case','Plaintiff','Law Firm','Auction','Bidders','Outcome'].map((node, i) => (
            <div className="graph-node" key={node}><Network size={18} /><span>{node}</span>{i < 6 && <ChevronRight className="chev" size={18} />}</div>
          ))}
        </div>
        <p className="graph-copy">
          The product gets stronger because every auction outcome trains the next prediction. Cases that cancel are not dead data — they teach the model which plaintiffs, firms, filing patterns, and docket sequences predict cancellation.
        </p>
      </section>

      <section className="two-col">
        <div className="panel">
          <div className="panel-top"><div><div className="eyebrow">BidderIQ Preview</div><h2>Atlantic Ridge Holdings LLC</h2></div><Pill tone="build">Building</Pill></div>
          <div className="profile-grid">
            {[
              ['Linked operators','3 probable'], ['Related LLCs','11'], ['Auctions attended','84'], ['Auctions won','17'], ['Win rate','20.2%'], ['Primary markets','Boca · Delray · Lake Worth'], ['Strategy','Condo-heavy · below-median bids'], ['Avg resale hold period','142 days'], ['Last active','6 days ago']
            ].map(([k,v]) => <div className="profile-cell" key={k}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
          <div className="mini-table">
            {bidderActivity.map((r) => <div className="mini-row" key={r[1]}>{r.map((c) => <span key={c}>{c}</span>)}</div>)}
          </div>
        </div>
        <div className="panel plaintiff-panel">
          <div className="panel-top"><div><div className="eyebrow">PlaintiffIQ Preview</div><h2>U.S. Bank N.A. as Trustee</h2></div><Pill tone="build">Building</Pill></div>
          <p className="subtle">Law Firm: <strong>Robertson Anschutz</strong></p>
          <div className="plaintiff-metrics">
            {[
              ['Scheduled sales tracked','312'], ['Actual sale follow-through','41%'], ['Late cancellation rate','29%'], ['Median judgment-to-sale','74 days'], ['Third-party buyer rate','36%'], ['Behavior label','Moderate push / frequent late resets']
            ].map(([k,v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
          <blockquote>Most foreclosure tools show the next auction. Gavel IQ shows whether that auction is likely to happen.</blockquote>
          <p className="graph-copy">Plaintiff and law firm behavior often predicts whether the sale actually happens.</p>
        </div>
      </section>

      <section className="panel market-panel">
        <div className="panel-top"><div><div className="eyebrow">MarketIQ Preview</div><h2>Palm Beach County foreclosure market pulse</h2></div><Pill tone="demo">DEMO DATA</Pill></div>
        <div className="market-grid">
          <div className="bar-card">
            {marketBars.map(([label, val]) => <div className="bar-row" key={label}><span>{label}</span><div><i style={{ width: `${val}%` }} /></div><b>{val}</b></div>)}
          </div>
          <div className="zip-card"><h3>Hottest ZIPs</h3>{['33432 Boca Raton','33444 Delray Beach','33460 Lake Worth Beach'].map((z, i) => <p key={z}><TrendingUp size={15} /> #{i+1} {z}</p>)}</div>
          <div className="zip-card"><h3>Softest ZIPs</h3>{['33407 West Palm Beach','33404 Riviera Beach','33461 Palm Springs'].map((z, i) => <p key={z}><Activity size={15} /> #{i+1} {z}</p>)}</div>
        </div>
      </section>

      <section id="pricing">
        <SectionHeader eyebrow="Palm Beach beta access" title="Limited access while historical QA and entity resolution are completed.">
          This is not a mass-market foreclosure feed. It is a county-specific intelligence product for repeat bidders, funds, operators, and data partners.
        </SectionHeader>
        <div className="pricing-grid">
          {pricing.map((p) => <article className={`price-card ${p.featured ? 'featured' : ''}`} key={p.name}>
            <div className="lock"><Lock size={18} /></div>
            <h3>{p.name}</h3>
            <div className="price"><strong>{p.price}</strong><span>{p.detail}</span></div>
            <ul>{p.features.map((f) => <li key={f}><CheckCircle2 size={16} /> {f}</li>)}</ul>
            <a className="button secondary" href="mailto:access@gaveliq.com">Request access</a>
          </article>)}
        </div>
      </section>

      <footer>
        <div><strong>Gavel IQ</strong><span>Distressed Asset Intelligence</span></div>
        <p>Palm Beach County first. Florida judicial markets next.</p>
      </footer>
    </main>
  );
}

export default App;

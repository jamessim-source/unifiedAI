import { useState, useEffect } from "react";

// ── Design tokens ──
const T = {
  bg: "#FAFAFA",
  card: "#FFFFFF",
  dark: "#1A1A2E",
  primary: "#4F46E5",
  primaryLight: "#EEF2FF",
  accent: "#10B981",
  warn: "#F59E0B",
  error: "#EF4444",
  text: "#1E293B",
  textSec: "#64748B",
  textTer: "#94A3B8",
  border: "#E2E8F0",
  radius: "12px",
  radiusSm: "8px",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 12px rgba(0,0,0,0.08)",
};

// ── Shared Components ──
const NavBar = ({ title, onBack, rightIcon, rightAction, tabs }) => (
  <div style={{ background: "#fff", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", height: 52, padding: "0 8px",
      paddingTop: "env(safe-area-inset-top)" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", padding: "8px 12px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: T.primary }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={T.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: T.text,
        textAlign: onBack ? "left" : "center", paddingLeft: onBack ? 4 : 0 }}>{title}</span>
      {rightIcon && (
        <button onClick={rightAction} style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
          {rightIcon}
        </button>
      )}
    </div>
    {tabs && (
      <div style={{ display: "flex", padding: "0 16px 10px", gap: 8, overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={t.action} style={{
            padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: t.active ? 600 : 400,
            background: t.active ? T.primary : "transparent", color: t.active ? "#fff" : T.textSec,
            border: t.active ? "none" : `1px solid ${T.border}`, cursor: "pointer", whiteSpace: "nowrap",
            flexShrink: 0,
          }}>{t.label}</button>
        ))}
      </div>
    )}
  </div>
);

const BottomNav = ({ active, onNav }) => {
  const items = [
    { id: "home", label: "Home", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9.5Z" stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12H15V21" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg> },
    { id: "tutor", label: "AI Tutor", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={c} strokeWidth="2"/></svg> },
    { id: "camera", label: "", icon: (c) => <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2" stroke={c} strokeWidth="2"/><circle cx="12" cy="13" r="3" stroke={c} strokeWidth="2"/><path d="M8 6L9.5 3H14.5L16 6" stroke={c} strokeWidth="2"/></svg> },
    { id: "grading", label: "Grading", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 11L12 14L22 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: "settings", label: "Settings", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.2.65.77 1.09 1.44 1.09H21a2 2 0 010 4h-.09c-.67 0-1.24.44-1.44 1.09z" stroke={c} strokeWidth="1.5"/></svg> },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      height: `calc(56px + env(safe-area-inset-bottom))`,
      paddingBottom: "env(safe-area-inset-bottom)",
      background: "#fff", borderTop: `1px solid ${T.border}`, flexShrink: 0,
    }}>
      {items.map((item) => {
        const isCamera = item.id === "camera";
        const isActive = active === item.id;
        const color = isActive ? T.primary : T.textTer;
        return (
          <button key={item.id} onClick={() => onNav(item.id)} style={{
            background: isCamera ? T.primary : "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, cursor: "pointer", padding: isCamera ? 0 : "4px 0",
            borderRadius: isCamera ? "50%" : 0, width: isCamera ? 52 : 60, height: isCamera ? 52 : "auto",
            justifyContent: "center", marginTop: isCamera ? -20 : 0,
            boxShadow: isCamera ? "0 4px 14px rgba(79,70,229,0.35)" : "none",
          }}>
            {item.icon(isCamera ? "#fff" : color)}
            {!isCamera && <span style={{ fontSize: 10, color, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{
    background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: 16,
    ...style, cursor: onClick ? "pointer" : "default",
  }}>
    {children}
  </div>
);

const Badge = ({ children, color = T.primary }) => (
  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 10, fontSize: 11,
    fontWeight: 600, background: color + "18", color }}>{children}</span>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: active ? 600 : 400,
    background: active ? T.primary : T.card, color: active ? "#fff" : T.textSec,
    border: active ? "none" : `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0,
  }}>{children}</button>
);

// ── SCREENS ──

const HomeScreen = ({ onNav }) => (
  <div className="scrollable" style={{ flex: 1, background: T.bg }}>
    {/* Welcome header */}
    <div style={{ padding: "20px 16px 16px", background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", color: "#fff" }}>
      <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Welcome back</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Yuki's Study Room</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
        {[["12","Questions asked"],["85%","Practice accuracy"],["3","Pending tests"]].map(([val,lbl],i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 10px" }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
            <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Engagement nudge — PRD: "you asked a XXX question before, do some revision" */}
    <div style={{ margin: "12px 16px 0" }}>
      <Card style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFBEB", border: "1px solid #FDE68A" }} onClick={() => onNav("practice")}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>You asked about 二次方程式 before</div>
          <div style={{ fontSize: 12, color: T.textSec }}>Practice similar questions to build confidence</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke={T.warn} strokeWidth="2" strokeLinecap="round"/></svg>
      </Card>
    </div>

    {/* New Assignments — PRD: "Test & Assignment push from AI grading" */}
    <div style={{ padding: "16px 16px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>New Assignments</span>
        <Badge color={T.error}>3 new</Badge>
      </div>
      {[
        { title: "英語 文法テスト #4", class: "Tanaka先生 • Class A", due: "Due Apr 10" },
        { title: "数学 小テスト #7", class: "Suzuki先生 • Class B", due: "Due Apr 12" },
      ].map((a, i) => (
        <Card key={i} onClick={() => onNav("grading_test")} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={T.primary} strokeWidth="2"/><path d="M14 2V8H20" stroke={T.primary} strokeWidth="2"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{a.title}</div>
            <div style={{ fontSize: 12, color: T.textSec }}>{a.class}</div>
          </div>
          <div style={{ fontSize: 11, color: T.error, fontWeight: 600 }}>{a.due}</div>
        </Card>
      ))}
    </div>

    {/* Recent Activity — PRD: "Timeline of asking history" */}
    <div style={{ padding: "8px 16px 16px" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>Recent Activity</div>
      {[
        { subj: "Math", icon: "📐", q: "二次方程式の解き方", time: "2h ago", type: "tutor" },
        { subj: "English", icon: "📝", q: "Grammar test #3 — 4/5", time: "Yesterday", type: "grading" },
        { subj: "Science", icon: "🔬", q: "光合成のメカニズム", time: "2 days ago", type: "tutor" },
      ].map((item, i) => (
        <Card key={i} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{item.subj}</span>
              <Badge color={item.type === "tutor" ? T.primary : T.accent}>{item.type === "tutor" ? "Tutor" : "Graded"}</Badge>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, marginTop: 2 }}>{item.q}</div>
          </div>
          <span style={{ fontSize: 11, color: T.textTer }}>{item.time}</span>
        </Card>
      ))}
    </div>
    <div style={{ height: 8 }} />
  </div>
);

// Auto lens — no manual selection, AI detects content type on snap
const CameraScreen = ({ onSnap, onBack }) => {
  const [lens, setLens] = useState("tutor");

  return (
    <div style={{ flex: 1, background: "#000", display: "flex", flexDirection: "column", position: "relative" }}>

      {/* Back */}
      <button onClick={onBack} style={{
        position: "absolute", top: `calc(12px + env(safe-area-inset-top))`, left: 16,
        background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%",
        width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Viewfinder */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        paddingTop: `env(safe-area-inset-top)` }}>
        <div style={{
          width: "82%", aspectRatio: "3/4", maxHeight: "62vh",
          border: "2px solid rgba(255,255,255,0.25)", borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textAlign: "center", padding: "0 20px" }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
              <rect x="2" y="6" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
            </svg>
            Point at your question or work
          </div>
        </div>
        {/* Corner markers — fixed indigo */}
        {[
          {top:"10%",left:"8%",bl:true,bt:true},
          {top:"10%",right:"8%",br:true,bt:true},
          {bottom:"10%",left:"8%",bl:true,bb:true},
          {bottom:"10%",right:"8%",br:true,bb:true},
        ].map((pos,i) => (
          <div key={i} style={{
            position:"absolute", ...pos, width:22, height:22,
            borderLeft:  pos.bl ? "3px solid #4F46E5" : "none",
            borderRight: pos.br ? "3px solid #4F46E5" : "none",
            borderTop:   pos.bt ? "3px solid #4F46E5" : "none",
            borderBottom:pos.bb ? "3px solid #4F46E5" : "none",
            borderRadius:4,
          }} />
        ))}
      </div>

      {/* Lens selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, padding: "0 16px 10px" }}>
        {[
          { key: "tutor",    label: "AI Tutor",    icon: "💡" },
          { key: "feedback", label: "AI Feedback",  icon: "✏️" },
        ].map(({ key, label, icon }) => (
          <button key={key} onClick={() => setLens(key)} style={{
            padding: "9px 22px", borderRadius: 24, fontSize: 13, cursor: "pointer",
            background: lens === key ? "rgba(79,70,229,0.9)" : "rgba(255,255,255,0.12)",
            color: "#fff", border: lens === key ? "2px solid #4F46E5" : "2px solid transparent",
            fontWeight: lens === key ? 700 : 400,
          }}>
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Shutter row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around",
        padding: `8px 32px calc(20px + env(safe-area-inset-bottom))` }}>

        {/* Photo gallery */}
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={() => onSnap(lens)} />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontSize: 10, color: "#fff" }}>Gallery</span>
        </label>

        {/* Shutter */}
        <button onClick={() => onSnap(lens)} style={{
          width: 72, height: 72, borderRadius: "50%", background: "#fff",
          border: "5px solid rgba(79,70,229,0.3)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 0 3px #4F46E5",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="20" height="14" rx="2" stroke={T.primary} strokeWidth="2"/>
            <circle cx="12" cy="13" r="3" stroke={T.primary} strokeWidth="2"/>
            <path d="M8 6L9.5 3H14.5L16 6" stroke={T.primary} strokeWidth="2"/>
          </svg>
        </button>

        {/* Document upload */}
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <input type="file" accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" style={{ display: "none" }} onChange={() => onSnap(lens)} />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="8" y1="13" x2="16" y2="13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="17" x2="16" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 10, color: "#fff" }}>Document</span>
        </label>

      </div>
    </div>
  );
};

// Hint & Solution only — no tabs, no AI Feedback/Grading mixing
const ResultScreen = ({ onBack, onPractice, onChat }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
    <div className="scrollable" style={{ flex: 1 }}>
      <div style={{ padding: "12px 16px 0" }}>
        <Card>
          <div style={{ fontSize: 13, color: T.textSec, marginBottom: 6 }}>Question</div>
          <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>
            Express the following numbers using "+" and "−" signs.<br/>
            <strong>(1) A number that is 5 greater than 0</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={T.primary} strokeWidth="2"/></svg>
            <span style={{ fontSize: 12, color: T.primary }}>See snap</span>
          </div>
        </Card>
      </div>

      <div style={{ padding: "12px 16px 16px" }}>
        {/* Explanation */}
        <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.warn}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Let me explain the question</span>
          </div>
          <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>
            This question asks you to represent "+5" using positive and negative signs relative to zero.
          </div>
        </Card>
        {/* Hint */}
        <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.warn}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Hint 1</span>
          </div>
          <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>
            Think about the number line. Numbers greater than 0 are positive.
          </div>
        </Card>
        {/* Answer */}
        <Card style={{ marginBottom: 16, borderLeft: `3px solid ${T.accent}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, marginBottom: 8 }}>Answer</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>+5</div>
          <div style={{ fontSize: 13, color: T.textSec, marginTop: 6, lineHeight: 1.5 }}>
            A number 5 greater than 0 is represented as +5 on the number line.
          </div>
        </Card>
        {/* PRD: practice available immediately, independent of hint generation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onPractice} style={{
            width: "100%", padding: 15, borderRadius: 12, background: T.primary, color: "#fff",
            fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4V20L12 14L20 20V4C20 2.9 19.1 2 18 2H6C4.9 2 4 2.9 4 4Z" stroke="#fff" strokeWidth="2"/></svg>
            Practice / 類題作成
          </button>
          <button onClick={onChat} style={{
            width: "100%", padding: 15, borderRadius: 12, background: T.card, color: T.primary,
            fontSize: 15, fontWeight: 600, border: `1.5px solid ${T.primary}`, cursor: "pointer",
          }}>
            Chat with Mana AI ✨
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Dedicated AI Feedback result page — entered via the Feedback lens on the camera
// PRD AI Feedback V1.1: summary prominent at top, rubric indicator, strength/improvement breakdown
const FeedbackResultScreen = ({ onBack, onChat }) => {
  const [rubric, setRubric] = useState("Teacher: Tanaka先生 Rubric");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      <div className="scrollable" style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px 0" }}>
          {/* Submitted work reference */}
          <Card>
            <div style={{ fontSize: 13, color: T.textSec, marginBottom: 6 }}>Your Work</div>
            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>
              English Essay Draft — "My summer holiday plans"
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={T.accent} strokeWidth="2"/></svg>
              <span style={{ fontSize: 12, color: T.accent }}>See snap</span>
            </div>
          </Card>

          {/* Rubric selector — PRD V1.1: teacher rubric if available, else AI-generated */}
          <Card style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: T.textSec }}>Rubric applied</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{rubric}</div>
            </div>
            <button style={{ padding: "6px 12px", borderRadius: 8, background: T.primaryLight,
              color: T.primary, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>
              Change
            </button>
          </Card>
        </div>

        <div style={{ padding: "12px 16px 16px" }}>
          {/* PRD: Feedback summary shown prominently above all detailed items */}
          <Card style={{ marginBottom: 10, background: "#F0FDF4", border: `1px solid #BBF7D0` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>✨</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Feedback Summary</span>
            </div>
            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.65 }}>
              Good structure and vocabulary range. You're close to excellence — tighten your use of connectives and ensure paragraph transitions are smooth to reach full marks.
            </div>
          </Card>

          {/* Strengths */}
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Strengths
          </div>
          {[
            { text: "Strong opening sentence that clearly states the topic and engages the reader." },
            { text: "Good range of vocabulary — 'enthusiastic', 'intend', 'explore' used accurately." },
            { text: "Correct use of 'be going to' for future plans throughout." },
          ].map((s, i) => (
            <Card key={i} style={{ marginBottom: 8, borderLeft: `3px solid ${T.accent}`, padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: T.accent, fontSize: 14, marginTop: 1 }}>✓</span>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{s.text}</div>
              </div>
            </Card>
          ))}

          {/* Improvements */}
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textSec, margin: "14px 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Areas to Improve
          </div>
          {[
            { text: "Paragraph 2 lacks a clear topic sentence — add one to guide the reader." },
            { text: "Connectives are repetitive ('and', 'also') — try 'furthermore', 'in addition', 'however'." },
          ].map((s, i) => (
            <Card key={i} style={{ marginBottom: 8, borderLeft: `3px solid ${T.warn}`, padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: T.warn, fontSize: 14, marginTop: 1 }}>→</span>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{s.text}</div>
              </div>
            </Card>
          ))}

          {/* Rubric breakdown */}
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textSec, margin: "14px 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Rubric Breakdown
          </div>
          {[
            { criterion: "Content & Ideas",    score: 4, max: 5 },
            { criterion: "Structure & Organisation", score: 3, max: 5 },
            { criterion: "Language & Vocabulary",    score: 4, max: 5 },
            { criterion: "Grammar & Accuracy",  score: 4, max: 5 },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: T.text }}>{r.criterion}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>{r.score}/{r.max}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: T.border, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(r.score/r.max)*100}%`,
                  background: r.score/r.max >= 0.8 ? T.accent : r.score/r.max >= 0.6 ? T.primary : T.warn,
                  borderRadius: 3 }} />
              </div>
            </div>
          ))}

          <button onClick={onChat} style={{
            width: "100%", padding: 15, borderRadius: 12, marginTop: 8,
            background: T.primary, color: "#fff", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
          }}>
            Chat with Mana AI ✨
          </button>
        </div>
      </div>
    </div>
  );
};

// PRD Similar Questions: MCQ only, 4 options always, immediate feedback, answer locking,
// "One More/追加作成", Previous/Next, question index, explanation on answer
const PRACTICE_QUESTIONS = [
  {
    q: "Evaluate using '+' and '−' signs.\n(1) A number that is 3 less than 0",
    opts: ["A.  +3", "B.  −3", "C.  0", "D.  3"],
    correct: 1,
    explanation: "A number 3 less than 0 is −3 on the number line.",
  },
  {
    q: "Express using '+' and '−' signs.\n(1) A number that is 7 greater than 0",
    opts: ["A.  −7", "B.  0", "C.  +7", "D.  7"],
    correct: 2,
    explanation: "A number 7 greater than 0 is +7 — positive numbers are above zero.",
  },
  {
    q: "Choose the correct representation.\nA temperature 4°C below zero",
    opts: ["A.  +4°C", "B.  0°C", "C.  −4°C", "D.  4°C"],
    correct: 2,
    explanation: "Below zero means negative. −4°C correctly represents 4 degrees below zero.",
  },
  {
    q: "Express using '+' and '−' signs.\n100m below sea level",
    opts: ["A.  −100m", "B.  +100m", "C.  0m", "D.  100m"],
    correct: 0,
    explanation: "Below sea level means negative direction — −100m is correct.",
  },
  {
    q: "Which value is the smallest?\n",
    opts: ["A.  +5", "B.  −2", "C.  0", "D.  −8"],
    correct: 3,
    explanation: "−8 is furthest to the left on the number line, making it the smallest.",
  },
];

const PracticeScreen = ({ onBack }) => {
  const [questions, setQuestions] = useState([PRACTICE_QUESTIONS[0], PRACTICE_QUESTIONS[1], PRACTICE_QUESTIONS[2]]);
  const [answers, setAnswers] = useState({});
  const [qIdx, setQIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const current = questions[qIdx];
  const selectedAnswer = answers[qIdx];

  const handleAnswer = (i) => {
    if (selectedAnswer !== undefined) return; // locked
    setAnswers(a => ({ ...a, [qIdx]: i }));
  };

  // PRD: "One More" generates the next similar question; button available even unanswered
  const handleOneMore = () => {
    if (loading) return;
    setLoading(true);
    // Simulate "Creating a similar question..." (PRD: loading state, <10s target)
    setTimeout(() => {
      const nextQIdx = questions.length % PRACTICE_QUESTIONS.length;
      setQuestions(q => [...q, PRACTICE_QUESTIONS[nextQIdx + (q.length > 3 ? 1 : 0) < PRACTICE_QUESTIONS.length ? nextQIdx : 0]]);
      setQIdx(q => q + 1);
      setLoading(false);
    }, 1200);
  };

  const isLast = qIdx === questions.length - 1;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Question index — PRD: "1/3" indicator */}
      <div style={{ padding: "10px 16px 0", display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: T.textSec, fontWeight: 600 }}>{qIdx + 1} / {questions.length}</span>
      </div>

      {loading ? (
        // PRD: "Creating a similar question" loading state
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ fontSize: 40 }}>🤖</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Creating a similar question</div>
          <div style={{ fontSize: 13, color: T.textSec }}>類題作成中...</div>
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%", background: T.primary,
                animation: `bounce 1.2s ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
          <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
        </div>
      ) : (
        <div className="scrollable" style={{ flex: 1 }}>
          <div style={{ padding: "8px 16px 16px" }}>
            <Card>
              <div style={{ fontSize: 14, color: T.text, lineHeight: 1.7, marginBottom: 16, whiteSpace: "pre-line" }}>
                {current.q}
              </div>
              {/* PRD: 4 options always, MCQ format only */}
              {current.opts.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === current.correct;
                let bg = T.card, border = T.border, color = T.text;
                if (selectedAnswer !== undefined) {
                  if (isCorrect) { bg = "#F0FDF4"; border = T.accent; color = T.accent; }
                  if (isSelected && !isCorrect) { bg = "#FEF2F2"; border = T.error; color = T.error; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    width: "100%", padding: "13px 16px", marginBottom: 8, borderRadius: 12,
                    background: bg, border: `1.5px solid ${border}`, cursor: selectedAnswer === undefined ? "pointer" : "default",
                    textAlign: "left", fontSize: 14, color, fontWeight: (isSelected || (selectedAnswer !== undefined && isCorrect)) ? 600 : 400,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    {selectedAnswer !== undefined && isCorrect && <span style={{ color: T.accent, fontSize: 16 }}>✓</span>}
                    {selectedAnswer !== undefined && isSelected && !isCorrect && <span style={{ color: T.error, fontSize: 16 }}>✗</span>}
                    {opt}
                  </button>
                );
              })}

              {/* PRD: explanation shown after answer; correct=green, incorrect=red */}
              {selectedAnswer !== undefined && (
                <div style={{
                  marginTop: 8, padding: 14, borderRadius: 10,
                  background: selectedAnswer === current.correct ? "#F0FDF4" : "#FEF2F2",
                  border: `1px solid ${selectedAnswer === current.correct ? "#BBF7D0" : "#FECACA"}`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700,
                    color: selectedAnswer === current.correct ? T.accent : T.error, marginBottom: 6 }}>
                    {selectedAnswer === current.correct ? "✓ Correct!" : `✗ The correct answer is ${current.opts[current.correct]}`}
                  </div>
                  <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.5 }}>{current.explanation}</div>
                </div>
              )}
            </Card>

            {/* PRD: Previous/前, Next/次, One More/追加作成 */}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                onClick={() => setQIdx(i => Math.max(0, i - 1))}
                disabled={qIdx === 0}
                style={{
                  flex: 1, padding: 14, borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: qIdx === 0 ? "default" : "pointer",
                  background: T.card, border: `1.5px solid ${T.border}`, color: qIdx === 0 ? T.textTer : T.textSec,
                }}>
                ← 前 / Prev
              </button>
              {isLast ? (
                // PRD: "One More" only on last generated question; can tap even unanswered
                <button onClick={handleOneMore} style={{
                  flex: 1, padding: 14, borderRadius: 12, background: T.primary, border: "none",
                  color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>
                  One More →
                </button>
              ) : (
                <button onClick={() => setQIdx(i => i + 1)} style={{
                  flex: 1, padding: 14, borderRadius: 12, background: T.primary, border: "none",
                  color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>
                  次 / Next →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PRD AI Grading: class selector, filter tabs, assignment list
const GradingListScreen = ({ onNav }) => (
  <div className="scrollable" style={{ flex: 1, background: T.bg }}>
    <div style={{ padding: "12px 16px 0" }}>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: T.textSec }}>Current Class</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Tanaka先生 • Class A</div>
        </div>
        <button style={{ padding: "8px 14px", borderRadius: 8, background: T.primaryLight, color: T.primary, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>Switch</button>
      </Card>
    </div>

    <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto" }}>
      {["All","New","Submitted","Marked"].map((f,i)=><Pill key={i} active={i===0}>{f}</Pill>)}
    </div>

    <div style={{ padding: "0 16px" }}>
      {[
        { title: "英語 文法テスト #4", date: "Apr 8", score: null, status: "New", color: T.primary },
        { title: "数学 小テスト #7", date: "Apr 5", score: null, status: "New", color: T.primary },
        { title: "英語 Reading #2", date: "Apr 3", score: null, status: "Submitted", color: T.warn },
        { title: "数学 小テスト #6", date: "Mar 28", score: "4/5", status: "Marked", color: T.accent },
        { title: "英語 文法テスト #3", date: "Mar 25", score: "3/5", status: "Marked", color: T.accent },
      ].map((t, i) => (
        <Card key={i} onClick={() => onNav(t.status === "Marked" ? "grading_result" : "grading_test")}
          style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: t.color + "15",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            {t.status === "Marked" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={T.accent} strokeWidth="2"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={t.color} strokeWidth="2"/></svg>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{t.title}</div>
            <div style={{ fontSize: 12, color: T.textSec }}>{t.date}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Badge color={t.color}>{t.status}</Badge>
            {t.score && <div style={{ fontSize: 14, fontWeight: 700, color: T.accent, marginTop: 4 }}>{t.score}</div>}
          </div>
        </Card>
      ))}
    </div>
    <div style={{ height: 8 }} />
  </div>
);

// PRD: Submit → Confirm & Analyse → "Analysing Your Work..." → Analysis Results → Submit to Teacher
const GradingTestScreen = ({ onBack, onShowResult }) => {
  const [phase, setPhase] = useState("submit"); // submit | analysing | results
  const [photos, setPhotos] = useState([]);

  const handleConfirm = () => {
    setPhase("analysing");
    // PRD: "Analysing Your Work..." loading state while OCR + AI engine processes
    setTimeout(() => setPhase("results"), 2500);
  };

  if (phase === "analysing") {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: T.bg }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Analysing Your Work...</div>
        <div style={{ fontSize: 13, color: T.textSec, textAlign: "center", padding: "0 32px" }}>
          OCR + AI marking engine is processing your submission
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: T.primary,
              animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
          ))}
        </div>
        <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-10px)}}`}</style>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="scrollable" style={{ flex: 1, background: T.bg }}>
        <div style={{ padding: "12px 16px" }}>
          {/* PRD: "Analysis Results" — overall score + question-level breakdown */}
          <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: `1px solid #BBF7D0`, marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>AI Analysis Score</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: T.accent }}>4<span style={{ fontSize: 20, color: T.textSec }}>/5</span></div>
            <Badge color={T.accent}>AI Marked</Badge>
          </Card>

          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "16px 0 8px" }}>Question Breakdown</div>
          {[
            { q: "Q1", marks: "1/1", note: "Correct use of 'going to'" },
            { q: "Q2", marks: "1/1", note: "Correct verb form" },
            { q: "Q3", marks: "0/1", note: "Review negative form: 'She isn't going to...'" },
            { q: "Q4", marks: "1/1", note: "Correct question structure" },
            { q: "Q5", marks: "1/1", note: "Correct" },
          ].map((item, i) => {
            const correct = item.marks.startsWith("1");
            return (
              <Card key={i} style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 12,
                borderLeft: `3px solid ${correct ? T.accent : T.error}` }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: T.text, width: 28 }}>{item.q}</div>
                <div style={{ flex: 1, fontSize: 12, color: T.textSec }}>{item.note}</div>
                <span style={{ fontWeight: 700, fontSize: 14, color: correct ? T.accent : T.error }}>{item.marks}</span>
              </Card>
            );
          })}

          {/* PRD: student can remark before submitting */}
          <div style={{ marginTop: 16, padding: 14, background: T.primaryLight, borderRadius: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.primary, marginBottom: 4 }}>Review AI marking?</div>
            <div style={{ fontSize: 12, color: T.textSec }}>You can override scores before submitting to your teacher.</div>
          </div>

          {/* PRD: "Submit to Teacher" CTA */}
          <button onClick={onShowResult} style={{
            width: "100%", padding: 16, borderRadius: 12, marginTop: 16,
            background: T.primary, color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
          }}>
            Submit to Teacher →
          </button>
        </div>
        <div style={{ height: 8 }} />
      </div>
    );
  }

  // Default: submit phase
  return (
    <div className="scrollable" style={{ flex: 1, background: T.bg }}>
      <div style={{ padding: "12px 16px" }}>
        <Card>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>英語 文法テスト #4</div>
          <div style={{ fontSize: 12, color: T.textSec, marginBottom: 10 }}>Tanaka先生 • Due Apr 10 • 5 questions</div>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6, marginBottom: 14 }}>
            Complete all questions about the "be going to" grammar pattern. Photograph your answers clearly.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={T.primary} strokeWidth="2"/></svg>
            <span style={{ fontSize: 12, color: T.primary }}>View files (1)</span>
          </div>
        </Card>

        {/* PRD: Take Photo + Upload File; max 4 pages */}
        <Card style={{ marginTop: 12, border: `2px dashed ${T.border}`, textAlign: "center", padding: 28, background: photos.length > 0 ? "#F8FAFF" : T.card }}>
          {photos.length === 0 ? (
            <>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 10px", display: "block" }}>
                <rect x="2" y="6" width="20" height="14" rx="2" stroke={T.textTer} strokeWidth="1.5"/>
                <circle cx="12" cy="13" r="3" stroke={T.textTer} strokeWidth="1.5"/>
                <path d="M8 6L9.5 3H14.5L16 6" stroke={T.textTer} strokeWidth="1.5"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>Submit Your Work</div>
              <div style={{ fontSize: 12, color: T.textSec, marginBottom: 16 }}>Take or upload photos (max 4 pages)</div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: T.accent, fontWeight: 600, marginBottom: 16 }}>
              ✓ {photos.length} photo{photos.length > 1 ? "s" : ""} ready
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => setPhotos(p => p.length < 4 ? [...p, `photo${p.length+1}`] : p)}
              style={{ padding: "12px 20px", borderRadius: 10, background: T.primary, color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              📷 Take Photo
            </button>
            <button onClick={() => setPhotos(p => p.length < 4 ? [...p, `file${p.length+1}`] : p)}
              style={{ padding: "12px 20px", borderRadius: 10, background: T.card, color: T.primary, fontSize: 13, fontWeight: 600, border: `1.5px solid ${T.primary}`, cursor: "pointer" }}>
              📁 Upload
            </button>
          </div>
        </Card>

        {/* PRD AI Feedback V1.1: rubric selector */}
        <Card style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Rubric</div>
              <div style={{ fontSize: 12, color: T.textSec }}>Teacher rubric available</div>
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 8, background: T.primaryLight, color: T.primary, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>Select</button>
          </div>
        </Card>

        {/* PRD: Confirm & Analyse CTA — enabled once photos attached */}
        <button onClick={photos.length > 0 ? handleConfirm : undefined} style={{
          width: "100%", padding: 16, borderRadius: 12, marginTop: 16,
          background: T.primary, color: "#fff", fontSize: 15, fontWeight: 700, border: "none",
          cursor: photos.length > 0 ? "pointer" : "default",
          opacity: photos.length > 0 ? 1 : 0.4,
        }}>
          Confirm & Analyse
        </button>
      </div>
      <div style={{ height: 8 }} />
    </div>
  );
};

// PRD: Marked results — score, AI feedback, question breakdown, practice mistakes
const GradingResultScreen = ({ onBack, onPractice }) => (
  <div className="scrollable" style={{ flex: 1, background: T.bg }}>
    <div style={{ padding: "12px 16px" }}>
      <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: `1px solid #BBF7D0` }}>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>Your Score</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: T.accent }}>4<span style={{ fontSize: 20, color: T.textSec }}>/5</span></div>
        <Badge color={T.accent}>Marked by Teacher</Badge>
      </Card>

      <Card style={{ marginTop: 12, background: "#FFFBEB", border: `1px solid #FDE68A` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.warn, marginBottom: 6 }}>✨ Feedback Summary</div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
          Strong grammar foundation. One error in Q3 — review the negative "be going to" form. Overall very close to mastery.
        </div>
      </Card>

      <div style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "16px 0 8px" }}>Question Breakdown</div>
      {[
        { q: "Q1", score: "1/1", status: "correct", note: "Good: Correct use of 'going to'" },
        { q: "Q2", score: "1/1", status: "correct", note: "Good: Correct verb form" },
        { q: "Q3", score: "0/1", status: "mistake", note: "Mistake: Should be 'Is she going to have lunch...?'" },
        { q: "Q4", score: "1/1", status: "correct", note: "Good: Correct negative form" },
        { q: "Q5", score: "1/1", status: "correct", note: "Good: Correct question form" },
      ].map((item, i) => (
        <Card key={i} style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 12,
          borderLeft: `3px solid ${item.status === "correct" ? T.accent : T.error}` }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: T.text, width: 28 }}>{item.q}</div>
          <div style={{ flex: 1, fontSize: 12, color: T.textSec }}>{item.note}</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: item.status === "correct" ? T.accent : T.error }}>{item.score}</span>
        </Card>
      ))}

      <button onClick={onPractice} style={{
        width: "100%", padding: 16, borderRadius: 12, marginTop: 16,
        background: T.primary, color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        Practice Mistake Questions →
      </button>
    </div>
    <div style={{ height: 8 }} />
  </div>
);

const SettingsScreen = () => (
  <div className="scrollable" style={{ flex: 1, background: T.bg, padding: 16 }}>
    {[
      { section: "Account", items: ["Profile", "Language / 言語", "Grade / 学年"] },
      { section: "Notifications", items: ["AI Graded Grades", "New Assignments", "Engagement Messages"] },
      { section: "App", items: ["About", "Help & Support", "Privacy Policy"] },
    ].map((group, gi) => (
      <div key={gi} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textSec, marginBottom: 8,
          textTransform: "uppercase", letterSpacing: 0.5 }}>{group.section}</div>
        <Card style={{ padding: 0 }}>
          {group.items.map((item, i) => (
            <div key={i} style={{
              padding: "15px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: i < group.items.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <span style={{ fontSize: 14, color: T.text }}>{item}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke={T.textTer} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          ))}
        </Card>
      </div>
    ))}
    <div style={{ height: 8 }} />
  </div>
);

// ── AI TUTOR SCREEN ──
// PRD: Timeline of asking history (sort by Subject / By types)
//      Table of contents index of concepts
//      Similar Questions, In-class Assignment and Test Mistakes

// Each snap has one lens: "tutor" (hint & solution) or "feedback" (AI feedback)
const SNAP_HISTORY = [
  { id: 1, subj: "Math",    icon: "📐", topic: "二次方程式",       q: "二次方程式 x²+5x+6=0 を解け",                           time: "Today, 9:41",  lens: "tutor",    color: "#4F46E5" },
  { id: 2, subj: "English", icon: "📝", topic: "be going to",     q: "Grammar: 'be going to' negative form",                   time: "Today, 8:12",  lens: "tutor",    color: "#10B981" },
  { id: 3, subj: "English", icon: "📝", topic: "Essay Writing",   q: "My summer holiday plans — essay draft feedback",         time: "Yesterday",    lens: "feedback", color: "#10B981" },
  { id: 4, subj: "Math",    icon: "📐", topic: "正負の数",         q: "A number 5 greater than 0 — express with signs",         time: "Yesterday",    lens: "tutor",    color: "#4F46E5" },
  { id: 5, subj: "Science", icon: "🔬", topic: "光合成",           q: "光合成のメカニズムを説明せよ",                           time: "Apr 7",        lens: "tutor",    color: "#F59E0B" },
  { id: 6, subj: "English", icon: "📝", topic: "Passive Voice",   q: "Rewrite using passive voice: 'The dog bit the man'",     time: "Apr 7",        lens: "tutor",    color: "#10B981" },
  { id: 7, subj: "English", icon: "📝", topic: "Paragraph Writing", q: "Feedback on paragraph structure — connectives draft",  time: "Apr 6",        lens: "feedback", color: "#10B981" },
  { id: 8, subj: "Math",    icon: "📐", topic: "一次方程式",       q: "3x - 7 = 14 を解け",                                    time: "Apr 6",        lens: "tutor",    color: "#4F46E5" },
  { id: 9, subj: "Science", icon: "🔬", topic: "力学",             q: "物体が斜面を滑る時の加速度",                             time: "Apr 5",        lens: "tutor",    color: "#F59E0B" },
];

const TOC = [
  { subj: "Math",    icon: "📐", color: "#4F46E5", topics: ["正負の数","一次方程式","二次方程式","関数","図形"] },
  { subj: "English", icon: "📝", color: "#10B981", topics: ["be going to","Passive Voice","Present Perfect","Conditionals"] },
  { subj: "Science", icon: "🔬", color: "#F59E0B", topics: ["光合成","力学","電気","化学反応"] },
];

const LENS_LABELS = { tutor: "Hint & Solution", feedback: "AI Feedback" };
const LENS_COLORS = { tutor: "#4F46E5", feedback: "#10B981" };

const AITutorScreen = ({ onOpenSnap, onOpenChat }) => {
  const [sortMode, setSortMode] = useState("timeline"); // timeline | subject | type
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [lensFilter, setLensFilter] = useState("All");
  const [tocExpanded, setTocExpanded] = useState(null);

  const subjects = ["All", "Math", "English", "Science"];
  const lenses = ["All", "tutor", "feedback"];

  const filtered = SNAP_HISTORY.filter(s => {
    if (sortMode === "subject" && subjectFilter !== "All" && s.subj !== subjectFilter) return false;
    if (sortMode === "type" && lensFilter !== "All" && s.lens !== lensFilter) return false;
    return true;
  });

  // Group by subject when in subject mode
  const grouped = sortMode === "subject"
    ? subjects.filter(s => s !== "All").reduce((acc, subj) => {
        const items = filtered.filter(s => s.subj === subj);
        if (items.length) acc[subj] = items;
        return acc;
      }, {})
    : null;

  return (
    <div className="scrollable" style={{ flex: 1, background: T.bg }}>

      {/* Sort mode tabs */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px 0", overflowX: "auto" }}>
        {[["timeline","⏱ Timeline"],["subject","📚 By Subject"],["type","🏷 By Type"]].map(([id, label]) => (
          <Pill key={id} active={sortMode === id} onClick={() => setSortMode(id)}>{label}</Pill>
        ))}
      </div>

      {/* Sub-filters */}
      {sortMode === "subject" && (
        <div style={{ display: "flex", gap: 8, padding: "10px 16px 0", overflowX: "auto" }}>
          {subjects.map(s => (
            <button key={s} onClick={() => setSubjectFilter(s)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: subjectFilter === s ? 600 : 400,
              background: subjectFilter === s ? T.dark : T.card, color: subjectFilter === s ? "#fff" : T.textSec,
              border: subjectFilter === s ? "none" : `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0,
            }}>{s}</button>
          ))}
        </div>
      )}
      {sortMode === "type" && (
        <div style={{ display: "flex", gap: 8, padding: "10px 16px 0", overflowX: "auto" }}>
          {lenses.map(l => (
            <button key={l} onClick={() => setLensFilter(l)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: lensFilter === l ? 600 : 400,
              background: lensFilter === l ? (LENS_COLORS[l] || T.dark) : T.card,
              color: lensFilter === l ? "#fff" : T.textSec,
              border: lensFilter === l ? "none" : `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0,
            }}>{l === "All" ? "All" : LENS_LABELS[l]}</button>
          ))}
        </div>
      )}

      {/* ── TABLE OF CONTENTS (collapsible, shown in subject/timeline mode) ── */}
      {sortMode !== "type" && (
        <div style={{ margin: "14px 16px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Index of Concepts
          </div>
          {TOC.filter(t => subjectFilter === "All" || t.subj === subjectFilter).map((entry) => (
            <Card key={entry.subj} style={{ marginBottom: 8, padding: 0, overflow: "hidden" }}>
              {/* Subject header */}
              <button onClick={() => setTocExpanded(tocExpanded === entry.subj ? null : entry.subj)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: entry.color + "15",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {entry.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{entry.subj}</div>
                  <div style={{ fontSize: 12, color: T.textSec }}>{entry.topics.length} concepts</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{
                  transform: tocExpanded === entry.subj ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <path d="M9 18L15 12L9 6" stroke={T.textTer} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Topic list */}
              {tocExpanded === entry.subj && (
                <div style={{ borderTop: `1px solid ${T.border}` }}>
                  {entry.topics.map((topic, i) => {
                    const snapCount = SNAP_HISTORY.filter(s => s.topic === topic).length;
                    return (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", padding: "11px 16px 11px 64px",
                        borderBottom: i < entry.topics.length - 1 ? `1px solid ${T.border}` : "none",
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 13, color: T.text }}>{topic}</span>
                        </div>
                        {snapCount > 0 && (
                          <Badge color={entry.color}>{snapCount} snap{snapCount > 1 ? "s" : ""}</Badge>
                        )}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 8 }}>
                          <path d="M9 18L15 12L9 6" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* ── SNAP TIMELINE ── */}
      <div style={{ margin: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textSec, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {sortMode === "type" && lensFilter !== "All" ? LENS_LABELS[lensFilter] : "Snap History"}
          </div>
          <span style={{ fontSize: 12, color: T.textTer }}>{filtered.length} snaps</span>
        </div>

        {/* Grouped by subject */}
        {sortMode === "subject" && grouped && Object.entries(grouped).map(([subj, items]) => (
          <div key={subj}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{items[0].icon} {subj}</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            {items.map(snap => <SnapCard key={snap.id} snap={snap} onOpen={() => onOpenSnap(snap)} />)}
          </div>
        ))}

        {/* Timeline (flat) */}
        {sortMode !== "subject" && filtered.map((snap, i) => (
          <div key={snap.id} style={{ display: "flex", gap: 0 }}>
            {/* Timeline spine */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: snap.color, marginTop: 18, flexShrink: 0 }} />
              {i < filtered.length - 1 && <div style={{ width: 2, flex: 1, background: T.border, minHeight: 16 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <SnapCard snap={snap} onOpen={() => onOpenSnap(snap)} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px 16px", color: T.textTer, fontSize: 14 }}>
            No snaps found
          </div>
        )}
      </div>

      {/* Ask AI CTA */}
      <div style={{ margin: "12px 16px 16px" }}>
        <button onClick={onOpenChat} style={{
          width: "100%", padding: 15, borderRadius: 12, background: T.primary,
          color: "#fff", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          ✨ Chat with Mana AI
        </button>
      </div>
    </div>
  );
};

const SnapCard = ({ snap, onOpen }) => (
  <Card onClick={onOpen} style={{ marginBottom: 0 }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 8, background: snap.color + "15",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
        {snap.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: snap.color }}>{snap.topic}</span>
          <span style={{ fontSize: 11, color: T.textTer }}>{snap.time}</span>
        </div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.4, overflow: "hidden",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {snap.q}
        </div>
        <div style={{ marginTop: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 8,
            background: LENS_COLORS[snap.lens] + "18", color: LENS_COLORS[snap.lens] }}>
            {LENS_LABELS[snap.lens]}
          </span>
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
        <path d="M9 18L15 12L9 6" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  </Card>
);

const ChatScreen = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg }}>
    <div className="scrollable" style={{ flex: 1, padding: 16 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.primaryLight,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✨</div>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
            I can help you understand this question better. What would you like to explore?
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingLeft: 42 }}>
        {["Explain step 1 more","Show me another approach","Why is +5 correct?"].map((s,i)=>(
          <span key={i} style={{ padding: "9px 14px", borderRadius: 20, border: `1px solid ${T.border}`,
            fontSize: 13, color: T.primary, cursor: "pointer", background: T.card }}>{s}</span>
        ))}
      </div>
    </div>
    <div style={{ padding: "10px 12px calc(12px + env(safe-area-inset-bottom))",
      borderTop: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center", background: "#fff" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.bg,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={T.textSec} strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex: 1, padding: "11px 16px", borderRadius: 22, background: T.bg, fontSize: 14, color: T.textTer }}>
        Write a message
      </div>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.primary,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
      </div>
    </div>
  </div>
);

// ── MAIN APP ──
export default function App() {
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState([]);

  const push = (s) => { setHistory(h => [...h, screen]); setScreen(s); };
  const pop = () => { const h = [...history]; const prev = h.pop() || "home"; setHistory(h); setScreen(prev); };

  const navTab = (id) => {
    setHistory([]);
    const tabMap = { camera: "camera", grading: "grading", settings: "settings", tutor: "tutor", home: "home" };
    setScreen(tabMap[id] || "home");
  };

  const activeTab =
    screen === "camera" ? "camera" :
    ["grading","grading_test","grading_result"].includes(screen) ? "grading" :
    screen === "settings" ? "settings" :
    ["tutor","chat"].includes(screen) ? "tutor" :
    "home";

  const titles = {
    home: "", camera: "", tutor: "AI Tutor", result: "Hint & Solution",
    feedback_result: "AI Feedback", practice: "Practice / 類題作成",
    grading: "Tests & Assignments", grading_test: "Assignment Details",
    grading_result: "Results", settings: "Settings", chat: "Chat with Mana AI ✨",
  };

  const showBack = !["home","camera","tutor","grading","settings"].includes(screen);
  const showNav = screen !== "camera";
  const showBottom = screen !== "camera";

  return (
    <div style={{
      width: "100vw",
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif',
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
    }}>
      {/* Nav bar */}
      {showNav && (
        <NavBar
          title={titles[screen] || ""}
          onBack={showBack ? pop : null}
        />
      )}

      {/* Screen content */}
      {screen === "home" && <HomeScreen onNav={push} />}
      {screen === "tutor" && <AITutorScreen onOpenSnap={(snap) => push(snap.lens === "feedback" ? "feedback_result" : "result")} onOpenChat={() => push("chat")} />}
      {screen === "camera" && <CameraScreen onSnap={(lens) => push(lens === "feedback" ? "feedback_result" : "result")} onBack={pop} />}
      {screen === "result" && <ResultScreen onBack={pop} onPractice={() => push("practice")} onChat={() => push("chat")} />}
      {screen === "feedback_result" && <FeedbackResultScreen onBack={pop} onChat={() => push("chat")} />}
      {screen === "practice" && <PracticeScreen onBack={pop} />}
      {screen === "grading" && <GradingListScreen onNav={push} />}
      {screen === "grading_test" && <GradingTestScreen onBack={pop} onShowResult={() => push("grading_result")} />}
      {screen === "grading_result" && <GradingResultScreen onBack={pop} onPractice={() => push("practice")} />}
      {screen === "settings" && <SettingsScreen />}
      {screen === "chat" && <ChatScreen />}

      {/* Bottom nav */}
      {showBottom && <BottomNav active={activeTab} onNav={navTab} />}
    </div>
  );
}

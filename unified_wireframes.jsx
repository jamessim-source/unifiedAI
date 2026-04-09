import { useState } from "react";

// ── Design tokens matching AI Tutor Figma ──
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
const StatusBar = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 4px", fontSize: 12, fontWeight: 600, color: "#1E293B" }}>
    <span>9:41</span>
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="#1E293B"/><rect x="4.5" y="2" width="3" height="10" rx="1" fill="#1E293B"/><rect x="9" y="0" width="3" height="12" rx="1" fill="#1E293B"/><rect x="13.5" y="1" width="2.5" height="11" rx="1" fill="#CBD5E1"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 3.5C9.5 3.5 11.3 4.3 12.6 5.6L14 4.2C12.3 2.5 10 1.5 7.5 1.5S2.7 2.5 1 4.2L2.4 5.6C3.7 4.3 5.5 3.5 7.5 3.5Z" fill="#1E293B"/><path d="M7.5 7C8.6 7 9.6 7.4 10.4 8.1L11.8 6.7C10.6 5.6 9.1 5 7.5 5S4.4 5.6 3.2 6.7L4.6 8.1C5.4 7.4 6.4 7 7.5 7Z" fill="#1E293B"/><circle cx="7.5" cy="10" r="1.5" fill="#1E293B"/></svg>
      <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0" y="1" width="21" height="10" rx="2" stroke="#1E293B" strokeWidth="1" fill="none"/><rect x="22" y="4" width="2" height="4" rx="1" fill="#1E293B"/><rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="#10B981"/></svg>
    </div>
  </div>
);

const NavBar = ({ title, onBack, rightIcon, rightAction, tabs }) => (
  <div style={{ background: "#fff", borderBottom: `1px solid ${T.border}` }}>
    <div style={{ display: "flex", alignItems: "center", height: 44, padding: "0 8px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", padding: 8, cursor: "pointer", display: "flex" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke={T.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: T.text, textAlign: onBack ? "left" : "center", paddingLeft: onBack ? 4 : 0 }}>{title}</span>
      {rightIcon && (
        <button onClick={rightAction} style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
          {rightIcon}
        </button>
      )}
    </div>
    {tabs && (
      <div style={{ display: "flex", padding: "0 16px 8px", gap: 8, overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={t.action} style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: t.active ? 600 : 400,
            background: t.active ? T.primary : "transparent", color: t.active ? "#fff" : T.textSec,
            border: t.active ? "none" : `1px solid ${T.border}`, cursor: "pointer", whiteSpace: "nowrap"
          }}>{t.label}</button>
        ))}
      </div>
    )}
  </div>
);

const BottomNav = ({ active, onNav }) => {
  const items = [
    { id: "home", label: "Home", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9.5Z" stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12H15V21" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg> },
    { id: "tutor", label: "AI Tutor", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/><path d="M12 8V12L15 15" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: "camera", label: "", icon: (c) => <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2" stroke={c} strokeWidth="2"/><circle cx="12" cy="13" r="3" stroke={c} strokeWidth="2"/><path d="M8 6L9.5 3H14.5L16 6" stroke={c} strokeWidth="2"/></svg> },
    { id: "grading", label: "Grading", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 11L12 14L22 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: "settings", label: "Settings", icon: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.2.65.77 1.09 1.44 1.09H21a2 2 0 010 4h-.09c-.67 0-1.24.44-1.44 1.09z" stroke={c} strokeWidth="1.5"/></svg> },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: 56, background: "#fff", borderTop: `1px solid ${T.border}`, paddingBottom: 4 }}>
      {items.map((item) => {
        const isCamera = item.id === "camera";
        const isActive = active === item.id;
        const color = isActive ? T.primary : T.textTer;
        return (
          <button key={item.id} onClick={() => onNav(item.id)} style={{
            background: isCamera ? T.primary : "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, cursor: "pointer", padding: isCamera ? 0 : "4px 0",
            borderRadius: isCamera ? "50%" : 0, width: isCamera ? 52 : "auto", height: isCamera ? 52 : "auto",
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
  <div onClick={onClick} style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: 16, ...style, cursor: onClick ? "pointer" : "default" }}>
    {children}
  </div>
);

const Badge = ({ children, color = T.primary }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, background: color + "18", color }}>{children}</span>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: active ? 600 : 400,
    background: active ? T.primary : T.card, color: active ? "#fff" : T.textSec,
    border: active ? "none" : `1px solid ${T.border}`, cursor: "pointer"
  }}>{children}</button>
);

const ScreenLabel = ({ label, desc }) => (
  <div style={{ position: "absolute", top: -32, left: 0, right: 0, textAlign: "center" }}>
    <span style={{ fontSize: 11, fontWeight: 700, color: T.primary, background: T.primaryLight, padding: "3px 10px", borderRadius: 6 }}>{label}</span>
    {desc && <div style={{ fontSize: 10, color: T.textSec, marginTop: 2 }}>{desc}</div>}
  </div>
);

// ── SCREENS ──

const HomeScreen = ({ onNav }) => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
    {/* Welcome */}
    <div style={{ padding: "20px 16px 12px", background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", color: "#fff", borderRadius: "0 0 24px 24px" }}>
      <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Welcome back</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Yuki's Study Room</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>12</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Questions asked</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>85%</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Practice accuracy</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>3</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Pending tests</div>
        </div>
      </div>
    </div>

    {/* Engagement nudge */}
    <div style={{ margin: "12px 16px 0" }}>
      <Card style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFBEB", border: "1px solid #FDE68A" }}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>You asked about 二次方程式 before</div>
          <div style={{ fontSize: 12, color: T.textSec }}>Practice similar questions to build confidence</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke={T.warn} strokeWidth="2" strokeLinecap="round"/></svg>
      </Card>
    </div>

    {/* New assigned tests */}
    <div style={{ padding: "16px 16px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>New Assignments</span>
        <Badge color={T.error}>3 new</Badge>
      </div>
      {[
        { title: "英語 文法テスト #4", class: "Tanaka先生 • Class A", due: "Due Apr 10", status: "new" },
        { title: "数学 小テスト #7", class: "Suzuki先生 • Class B", due: "Due Apr 12", status: "new" },
      ].map((a, i) => (
        <Card key={i} onClick={() => onNav("grading_test")} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={T.primary} strokeWidth="2"/><path d="M14 2V8H20" stroke={T.primary} strokeWidth="2"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{a.title}</div>
            <div style={{ fontSize: 12, color: T.textSec }}>{a.class}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: T.error, fontWeight: 600 }}>{a.due}</div>
          </div>
        </Card>
      ))}
    </div>

    {/* By Subject timeline */}
    <div style={{ padding: "8px 16px 16px" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>Recent Activity</div>
      {[
        { subj: "Math", icon: "📐", q: "二次方程式の解き方", time: "2h ago", type: "tutor" },
        { subj: "English", icon: "📝", q: "Grammar test #3 — 4/5", time: "Yesterday", type: "grading" },
        { subj: "Science", icon: "🔬", q: "光合成のメカニズム", time: "2 days ago", type: "tutor" },
      ].map((item, i) => (
        <Card key={i} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{item.icon}</div>
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
    <div style={{ height: 16 }} />
  </div>
);

const CameraScreen = ({ onSnap, onBack }) => (
  <div style={{ flex: 1, background: "#000", position: "relative", display: "flex", flexDirection: "column" }}>
    {/* Viewfinder */}
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ width: 300, height: 340, border: "2px solid rgba(255,255,255,0.3)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 8px", display: "block" }}><rect x="2" y="6" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/><circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></svg>
          Point at your question
        </div>
      </div>
      {/* Corner markers */}
      {[[8,80],[300,80],[8,370],[300,370]].map(([x,y],i)=>(
        <div key={i} style={{ position:"absolute", left:x, top:y, width:24, height:24,
          borderLeft: i%2===0 ? "3px solid #4F46E5" : "none", borderRight: i%2!==0 ? "3px solid #4F46E5" : "none",
          borderTop: i<2 ? "3px solid #4F46E5" : "none", borderBottom: i>=2 ? "3px solid #4F46E5" : "none",
          borderRadius: 4 }} />
      ))}
    </div>
    {/* Subject pills */}
    <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 12 }}>
      {["✨ Anything","📐 Math","🔤 English","🔬 Science"].map((s,i)=>(
        <span key={i} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 12, background: i===0 ? "rgba(79,70,229,0.8)" : "rgba(255,255,255,0.12)", color: "#fff" }}>{s}</span>
      ))}
    </div>
    {/* Controls */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "12px 32px 24px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="#fff" strokeWidth="1.5"/></svg>
        <span style={{ fontSize: 10, color: "#fff" }}>Gallery</span>
      </div>
      <button onClick={onSnap} style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff", border: "4px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="2" stroke={T.primary} strokeWidth="2"/><circle cx="12" cy="13" r="3" stroke={T.primary} strokeWidth="2"/><path d="M8 6L9.5 3H14.5L16 6" stroke={T.primary} strokeWidth="2"/></svg>
      </button>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 8V12L15 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5"/></svg>
        <span style={{ fontSize: 10, color: "#fff" }}>History</span>
      </div>
    </div>
  </div>
);

const ResultScreen = ({ onBack, onPractice, onFeedback, onChat }) => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
    <div style={{ padding: "0 16px 16px" }}>
      {/* Question card */}
      <Card style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 6 }}>Question</div>
        <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6 }}>
          Express the following numbers using the "+" and "−" signs. (1) A number that is 5 greater than 0
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={T.primary} strokeWidth="2"/></svg>
          <span style={{ fontSize: 12, color: T.primary }}>See snap</span>
        </div>
      </Card>

      {/* Tab row for result sections */}
      <div style={{ display: "flex", gap: 6, marginTop: 16, marginBottom: 12, overflowX: "auto" }}>
        {["Hint & Solution", "AI Feedback", "AI Grading"].map((t, i) => (
          <Pill key={i} active={i === 0}>{t}</Pill>
        ))}
      </div>

      {/* Hints */}
      <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.warn}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Let me explain the question</span>
        </div>
        <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>
          This question is asking you to represent "+5" using positive and negative signs relative to zero.
        </div>
      </Card>

      <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.warn}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 16 }}>💡</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Hint 1</span>
        </div>
        <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>
          Think about the number line. Numbers greater than 0 are positive.
        </div>
      </Card>

      {/* Solution */}
      <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.accent}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Answer</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>+5</div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 10L12 15L17 10" stroke={T.textTer} strokeWidth="2"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 14L12 9L17 14" stroke={T.textTer} strokeWidth="2"/></svg>
        </div>
      </Card>

      {/* AI Feedback summary */}
      <Card style={{ marginBottom: 8, background: "#F0FDF4", border: `1px solid #BBF7D0` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={T.accent} strokeWidth="2" fill={T.accent+"33"}/></svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Feedback Summary</span>
        </div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
          Good understanding of basic positive/negative concepts. Focus on applying sign rules to more complex expressions next.
        </div>
      </Card>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
        <button onClick={onPractice} style={{ width: "100%", padding: "14px", borderRadius: 10, background: T.primary, color: "#fff", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4V20L12 14L20 20V4C20 2.9 19.1 2 18 2H6C4.9 2 4 2.9 4 4Z" stroke="#fff" strokeWidth="2"/></svg>
          Practice Similar Questions
        </button>
        <button onClick={onChat} style={{ width: "100%", padding: "14px", borderRadius: 10, background: T.card, color: T.primary, fontSize: 15, fontWeight: 600, border: `1.5px solid ${T.primary}`, cursor: "pointer" }}>
          Chat with Mana AI ✨
        </button>
      </div>
    </div>
  </div>
);

const PracticeScreen = ({ onBack }) => {
  const [selected, setSelected] = useState(null);
  const [qIndex] = useState(1);
  return (
    <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
      <div style={{ padding: "8px 16px", display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: T.textSec, fontWeight: 600 }}>{qIndex} / 3</span>
      </div>
      <div style={{ padding: "0 16px 16px" }}>
        <Card>
          <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6, marginBottom: 16 }}>
            Evaluate the following expression using the "+" and "−" signs.<br/>
            <strong>(1) A number that is 3 less than 0</strong>
          </div>
          {["A. +3", "B. -3", "C. 0", "D. 3"].map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === 1;
            let bg = T.card, border = T.border, color = T.text;
            if (selected !== null) {
              if (i === 1) { bg = "#F0FDF4"; border = T.accent; color = T.accent; }
              if (isSelected && !isCorrect) { bg = "#FEF2F2"; border = T.error; color = T.error; }
            }
            return (
              <button key={i} onClick={() => selected === null && setSelected(i)} style={{
                width: "100%", padding: "12px 16px", marginBottom: 8, borderRadius: 10,
                background: bg, border: `1.5px solid ${border}`, cursor: selected === null ? "pointer" : "default",
                textAlign: "left", fontSize: 14, color, fontWeight: isSelected || (selected !== null && isCorrect) ? 600 : 400,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                {selected !== null && isCorrect && <span style={{ color: T.accent }}>✓</span>}
                {selected !== null && isSelected && !isCorrect && <span style={{ color: T.error }}>✗</span>}
                {opt}
              </button>
            );
          })}
          {selected !== null && (
            <div style={{ marginTop: 8, padding: 12, background: selected === 1 ? "#F0FDF4" : "#FEF2F2", borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: selected === 1 ? T.accent : T.text, marginBottom: 4 }}>
                {selected === 1 ? "Correct!" : "The correct answer is B. -3"}
              </div>
              <div style={{ fontSize: 12, color: T.textSec, lineHeight: 1.5 }}>
                A number 3 less than 0 is represented as -3 on the number line.
              </div>
            </div>
          )}
        </Card>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button style={{ flex: 1, padding: 12, borderRadius: 10, background: T.card, border: `1.5px solid ${T.border}`, color: T.textSec, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            ← Previous
          </button>
          <button style={{ flex: 1, padding: 12, borderRadius: 10, background: T.primary, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            One More →
          </button>
        </div>
      </div>
    </div>
  );
};

const GradingListScreen = ({ onNav }) => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
    {/* Class selector */}
    <div style={{ padding: "12px 16px" }}>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: T.textSec }}>Current Class</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Tanaka先生 • Class A</div>
        </div>
        <button style={{ padding: "6px 12px", borderRadius: 8, background: T.primaryLight, color: T.primary, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>Switch</button>
      </Card>
    </div>

    {/* Filter tabs */}
    <div style={{ display: "flex", gap: 6, padding: "0 16px 12px" }}>
      {["All","New","Submitted","Marked"].map((f,i)=><Pill key={i} active={i===0}>{f}</Pill>)}
    </div>

    {/* Test list */}
    <div style={{ padding: "0 16px" }}>
      {[
        { title: "英語 文法テスト #4", date: "Apr 8", score: null, status: "New", color: T.primary },
        { title: "数学 小テスト #7", date: "Apr 5", score: null, status: "New", color: T.primary },
        { title: "英語 Reading #2", date: "Apr 3", score: null, status: "Submitted", color: T.warn },
        { title: "数学 小テスト #6", date: "Mar 28", score: "4/5", status: "Marked", color: T.accent },
        { title: "英語 文法テスト #3", date: "Mar 25", score: "3/5", status: "Marked", color: T.accent },
      ].map((t, i) => (
        <Card key={i} onClick={() => onNav(t.status === "Marked" ? "grading_result" : "grading_test")} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: t.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
    <div style={{ height: 16 }} />
  </div>
);

const GradingTestScreen = ({ onBack }) => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
    <div style={{ padding: "12px 16px" }}>
      <Card>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>英語 文法テスト #4</div>
        <div style={{ fontSize: 12, color: T.textSec, marginBottom: 12 }}>Tanaka先生 • Due Apr 10 • 5 questions</div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6, marginBottom: 16 }}>
          Complete all questions about "be going to" grammar pattern. Photograph your answers clearly.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={T.primary} strokeWidth="2"/></svg>
          <span style={{ fontSize: 12, color: T.primary }}>View files (1)</span>
        </div>
      </Card>

      {/* Upload area */}
      <Card style={{ marginTop: 12, border: `2px dashed ${T.border}`, textAlign: "center", padding: 24 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
          <rect x="2" y="6" width="20" height="14" rx="2" stroke={T.textTer} strokeWidth="1.5"/>
          <circle cx="12" cy="13" r="3" stroke={T.textTer} strokeWidth="1.5"/>
          <path d="M8 6L9.5 3H14.5L16 6" stroke={T.textTer} strokeWidth="1.5"/>
        </svg>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>Submit Your Work</div>
        <div style={{ fontSize: 12, color: T.textSec, marginBottom: 12 }}>Take or upload photos (max 4 pages)</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button style={{ padding: "10px 20px", borderRadius: 8, background: T.primary, color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>📷 Take Photo</button>
          <button style={{ padding: "10px 20px", borderRadius: 8, background: T.card, color: T.primary, fontSize: 13, fontWeight: 600, border: `1.5px solid ${T.primary}`, cursor: "pointer" }}>📁 Upload</button>
        </div>
      </Card>

      {/* Rubric selector (from AI Feedback) */}
      <Card style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Rubric</div>
            <div style={{ fontSize: 12, color: T.textSec }}>Teacher rubric available</div>
          </div>
          <button style={{ padding: "6px 12px", borderRadius: 8, background: T.primaryLight, color: T.primary, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>Select</button>
        </div>
      </Card>

      {/* CTA */}
      <button style={{ width: "100%", padding: 14, borderRadius: 10, background: T.primary, color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", marginTop: 16, opacity: 0.4 }}>
        Confirm & Analyse
      </button>
    </div>
  </div>
);

const GradingResultScreen = ({ onBack, onPractice }) => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg }}>
    <div style={{ padding: "12px 16px" }}>
      {/* Score header */}
      <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", border: `1px solid #BBF7D0` }}>
        <div style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>Your Score</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: T.accent }}>4<span style={{ fontSize: 18, color: T.textSec }}>/5</span></div>
        <Badge color={T.accent}>Marked by Teacher</Badge>
      </Card>

      {/* Feedback summary (AI Feedback) */}
      <Card style={{ marginTop: 12, background: "#FFFBEB", border: `1px solid #FDE68A` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.warn, marginBottom: 4 }}>✨ Feedback Summary</div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
          Strong grammar foundation. One error in question 3 — review "be going to" negative form. Overall close to mastery.
        </div>
      </Card>

      {/* Question breakdown */}
      <div style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "16px 0 8px" }}>Question Breakdown</div>
      {[
        { q: "Q1", score: "1/1", status: "correct", note: "Good point: Correct use of 'going to'" },
        { q: "Q2", score: "1/1", status: "correct", note: "Good point: Correct verb form" },
        { q: "Q3", score: "0/1", status: "mistake", note: "Mistake: Should be 'Is she going to have lunch...?'" },
        { q: "Q4", score: "1/1", status: "correct", note: "Good point: Correct negative form" },
        { q: "Q5", score: "1/1", status: "correct", note: "Good point: Correct question form" },
      ].map((item, i) => (
        <Card key={i} style={{
          marginBottom: 6, display: "flex", alignItems: "center", gap: 12,
          borderLeft: `3px solid ${item.status === "correct" ? T.accent : T.error}`
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: T.text, width: 28 }}>{item.q}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: T.textSec }}>{item.note}</div>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: item.status === "correct" ? T.accent : T.error }}>{item.score}</span>
        </Card>
      ))}

      {/* Practice mistakes */}
      <button onClick={onPractice} style={{
        width: "100%", padding: 14, borderRadius: 10, marginTop: 16,
        background: T.primary, color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8
      }}>
        Practice Mistake Questions →
      </button>
    </div>
    <div style={{ height: 16 }} />
  </div>
);

const SettingsScreen = () => (
  <div style={{ flex: 1, overflow: "auto", background: T.bg, padding: 16 }}>
    {[
      { section: "Account", items: ["Profile", "Language", "Grade"] },
      { section: "Notifications", items: ["AI Graded Grades", "New Assignments", "Engagement Messages"] },
      { section: "App", items: ["About", "Help & Support", "Privacy Policy"] },
    ].map((group, gi) => (
      <div key={gi} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{group.section}</div>
        <Card style={{ padding: 0 }}>
          {group.items.map((item, i) => (
            <div key={i} style={{
              padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: i < group.items.length - 1 ? `1px solid ${T.border}` : "none"
            }}>
              <span style={{ fontSize: 14, color: T.text }}>{item}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke={T.textTer} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          ))}
        </Card>
      </div>
    ))}
  </div>
);

// ── MAIN APP ──
export default function UnifiedApp() {
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState([]);

  const push = (s) => { setHistory((h) => [...h, screen]); setScreen(s); };
  const pop = () => { const h = [...history]; const prev = h.pop(); setHistory(h); setScreen(prev || "home"); };

  const navTab = (id) => {
    setHistory([]);
    if (id === "camera") { setScreen("camera"); }
    else if (id === "grading") { setScreen("grading"); }
    else if (id === "settings") { setScreen("settings"); }
    else if (id === "tutor") { setScreen("home"); }
    else { setScreen("home"); }
  };

  const activeTab = ["camera"].includes(screen) ? "camera"
    : ["grading", "grading_test", "grading_result"].includes(screen) ? "grading"
    : screen === "settings" ? "settings"
    : "home";

  const titles = {
    home: "", camera: "", result: "Result", practice: "Practice",
    grading: "Tests & Assignments", grading_test: "Assignment Details", grading_result: "Results",
    settings: "Settings", chat: "Chat with Mana AI ✨",
  };

  const showBack = !["home", "camera", "grading", "settings"].includes(screen);
  const showNav = !["camera"].includes(screen);
  const showBottom = !["camera"].includes(screen);

  return (
    <div style={{ width: 375, height: 812, margin: "0 auto", borderRadius: 40, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", background: T.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif', position: "relative" }}>
      {/* Status bar */}
      {screen !== "camera" && <StatusBar />}

      {/* Nav bar */}
      {showNav && <NavBar title={titles[screen] || ""} onBack={showBack ? pop : null} />}

      {/* Screen content */}
      {screen === "home" && <HomeScreen onNav={push} />}
      {screen === "camera" && <CameraScreen onSnap={() => push("result")} onBack={pop} />}
      {screen === "result" && <ResultScreen onBack={pop} onPractice={() => push("practice")} onFeedback={() => {}} onChat={() => push("chat")} />}
      {screen === "practice" && <PracticeScreen onBack={pop} />}
      {screen === "grading" && <GradingListScreen onNav={push} />}
      {screen === "grading_test" && <GradingTestScreen onBack={pop} />}
      {screen === "grading_result" && <GradingResultScreen onBack={pop} onPractice={() => push("practice")} />}
      {screen === "settings" && <SettingsScreen />}
      {screen === "chat" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg }}>
          <div style={{ flex: 1, padding: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✨</div>
              <Card style={{ flex: 1, maxWidth: 260 }}>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>I can help you understand this question better. What would you like to explore?</div>
              </Card>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 36 }}>
              {["Explain step 1 more","Show me another approach","Why is +5 correct?"].map((s,i)=>(
                <span key={i} style={{ padding: "8px 12px", borderRadius: 16, border: `1px solid ${T.border}`, fontSize: 12, color: T.primary, cursor: "pointer", background: T.card }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: "8px 10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8, alignItems: "center", background: "#fff" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke={T.textSec} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div style={{ flex: 1, padding: "10px 14px", borderRadius: 20, background: T.bg, fontSize: 13, color: T.textTer }}>Write a message</div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke={T.primary} strokeWidth="2" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={T.primary} strokeWidth="2" strokeLinejoin="round"/></svg>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      {showBottom && <BottomNav active={activeTab} onNav={navTab} />}
    </div>
  );
}

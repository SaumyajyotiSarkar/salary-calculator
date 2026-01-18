export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "14px 18px",
        borderRadius: 14,
        background: "#111",
        border: "1px solid #222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
      }}
    >
      {/* Left: App Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 800 }}>
          Salary Calculator (India)
        </h2>
        <p style={{ margin: 0, color: "#bbb", fontSize: 12 }}>
          PF • Tax • In-hand • Old vs New Regime
        </p>
      </div>

      {/* Right: Live Demo Badge */}
      <span
        style={{
          padding: "8px 12px",
          borderRadius: 999,
          background: "#E3C029",
          border: "1px solid #000",
          fontWeight: 800,
          fontSize: 12,
          color: "#111",
        }}
      >
        ✅ LIVE DEMO
      </span>
    </header>
  );
}

const formatMoney = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

export default function ResultCard({ result, selectedRegime }) {
    if (!result) return null;

    const regimeLabel =
        selectedRegime === "NEW" ? "New Regime" : selectedRegime === "OLD" ? "Old Regime" : selectedRegime || "-";

    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 1px 4px #000",
                marginTop: 5, marginBottom: 20,
            }}
        >
            <h3 style={{ marginTop: 0 }}>Result ({regimeLabel})</h3>

            <p><b>Gross Monthly:</b> {formatMoney(result.grossMonthly)}</p>
            <p><b>Employee PF Monthly:</b> {formatMoney(result.employeePfMonthly)}</p>
            <p><b>Income Tax Monthly:</b> {formatMoney(result.incomeTaxMonthly)}</p>
            <p><b>Professional Tax Annual:</b> {formatMoney(result.professionalTaxAnnual)}</p>

            <hr style={{ margin: "12px 0" }} />

            <h2 style={{ margin: 0 }}>
                In-hand Monthly: {formatMoney(result.inHandMonthly)}
            </h2>
        </div>
    );
}

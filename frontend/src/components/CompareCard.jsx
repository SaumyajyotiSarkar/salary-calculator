const formatMoney = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

export default function CompareCard({ compare }) {
    if (!compare) return null;

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
            <h3 style={{ marginTop: 0 }}>Old vs New Comparison</h3>

            <p>
                <b>Old Regime In-hand:</b>{" "}
                {formatMoney(compare.oldRegime?.inHandMonthly)}
            </p>
            <p>
                <b>New Regime In-hand:</b>{" "}
                {formatMoney(compare.newRegime?.inHandMonthly)}
            </p>

            <hr style={{ margin: "12px 0" }} />

            <h2 style={{ margin: 0 }}>  Better Regime:{" "}
                {compare.bestRegime === "NEW" ? "New Regime" : "Old Regime"}
            </h2>

            <p>
                <b>Monthly Difference:</b> {formatMoney(compare.monthlyDifference)}
            </p>
        </div>
    );
}

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { LabelList } from "recharts";

<Bar dataKey="value">
  <LabelList dataKey="value" position="top" formatter={(v) => `₹${formatINR(v)}`} />
</Bar>


const formatINR = (n) =>
    typeof n === "number"
        ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
        : "-";

export default function SalaryChart({ result }) {
    if (!result) return null;

    // Monthly values
    const pf = result.employeePfMonthly || 0;
    const tax = result.incomeTaxMonthly || 0;
    const inHand = result.inHandMonthly || 0;

    const data = [
        { name: "PF", value: pf },
        { name: "Tax", value: tax },
        { name: "In-hand", value: inHand },
        { name: "Gross", value: result.grossMonthly },
    ];

    return (
        <div
            style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 12,
                background: "#fff",
            }}
        >
            <h3 style={{ marginTop: 0 }}>Monthly Breakdown Chart</h3>

            <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(v) => `₹${formatINR(v)}`} />
                        <Tooltip formatter={(value) => `₹${formatINR(value)}`} />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

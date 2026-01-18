import {useState} from "react";

const INITIAL_FORM = {
    ctcAnnual: 800000,
    basicPercent: 40,
    hraPercentOfBasic: 50,
    isMetro: true,
    state: "WB",
    pfType: "ACTUAL",
    taxRegime: "NEW",
};
/**
 * This component only collects user input.
 * It does NOT call API directly.
 * It sends the form data to parent via onSubmit(payload).
 */
export default function SalaryForm({onSubmit, onReset, loading}) {
    const [form, setForm] = useState(INITIAL_FORM);

    const handleReset = () => {
        setForm(INITIAL_FORM);
        onReset?.();   //  clears results from Home.jsx
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert string values into numbers before sending
        const payload = {
            ...form,
            ctcAnnual: Number(form.ctcAnnual),
            basicPercent: Number(form.basicPercent),
            hraPercentOfBasic: Number(form.hraPercentOfBasic),
            isMetro: Boolean(form.isMetro),
        };

        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 12,
                background: "#FCF3D9",
                boxShadow: "0 1px 4px #000",
            }}
        >
            <h2 style={{marginBottom: 12, color: "black"}}>In-hand Salary Calculator (India)</h2>

            <label><b>Annual CTC (₹)</b></label>
            <input
                name="ctcAnnual"
                value={form.ctcAnnual}
                onChange={handleChange}
                type="number"
                style={{width: "98%", padding: 10, margin: "6px 0 12px", borderColor: "black"}}
            />

            <label><b>Basic % of CTC</b></label>
            <input
                name="basicPercent"
                value={form.basicPercent}
                onChange={handleChange}
                type="number"
                style={{width: "98%", padding: 10, margin: "6px 0 12px", borderColor: "black",}}
            />

            <label><b>HRA % of Basic</b></label>
            <input
                name="hraPercentOfBasic"
                value={form.hraPercentOfBasic}
                onChange={handleChange}
                type="number"
                style={{width: "98%", padding: 10, margin: "6px 0 12px", borderColor: "black",}}
            />

            <div style={{display: "flex", gap: 12, marginBottom: 12}}>
                <label style={{flex: 1}}><b>
                    Metro?</b>
                    <input
                        type="checkbox"
                        name="isMetro"
                        checked={form.isMetro}
                        onChange={handleChange}
                        style={{marginLeft: 8}}
                    />
                </label>

                <label style={{flex: 1}}><b>
                    State</b>
                    <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        style={{width: "100%", padding: 10, borderColor: "black",}}
                    >
                        <option value="WB">WB</option>
                        <option value="MH">MH</option>
                        <option value="KA">KA</option>
                        <option value="TN">TN</option>
                        <option value="DL">DL</option>
                    </select>
                </label>
            </div>

            <div style={{display: "flex", gap: 12, marginBottom: 12}}>
                <label style={{flex: 1}}>
                    <b>   PF Type </b>
                    <select
                        name="pfType"
                        value={form.pfType}
                        onChange={handleChange}
                        style={{width: "100%", padding: 10, borderColor: "black",}}
                    >
                        <option value="ACTUAL">ACTUAL</option>
                        <option value="CAPPED">CAPPED</option>
                    </select>
                </label>

                <label style={{flex: 1}}>
                    <b>Tax Regime (single mode)</b>
                    <select
                        name="taxRegime"
                        value={form.taxRegime}
                        onChange={handleChange}
                        style={{width: "100%", padding: 10, borderColor: "black",}}
                    >
                        <option value="NEW">NEW</option>
                        <option value="OLD">OLD</option>
                    </select>
                </label>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
            <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 10,
                    border: "1px solid #999",
                    background: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                }}
            >
                Reset
            </button>
            <button
                type="submit"
                disabled={loading}
                style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #ddd",
                    borderColor: "black",
                    cursor: "pointer",
                    fontSize: 22,
                    fontWeight: "bold",
                    background: "#E3C029",
                }}
            >
                {loading ? "Calculating..." : "Calculate"}
            </button></div>
        </form>
    );
}

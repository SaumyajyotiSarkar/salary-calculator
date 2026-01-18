import { useState } from "react";
import SalaryForm from "../components/SalaryForm.jsx";
import ResultCard from "../components/ResultCard.jsx";
import CompareCard from "../components/CompareCard.jsx";
import { calculateSalary, compareSalary } from "../api/salaryApi.js";
import SalaryChart from "../components/SalaryChart.jsx";
import Header from "../components/Header.jsx";



export default function Home() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [compare, setCompare] = useState(null);
    const [error, setError] = useState("");
    const [selectedRegime, setSelectedRegime] = useState("");

    const handleSubmit = async (payload) => {
        setLoading(true);
        setError("");
        setResult(null);
        setCompare(null);
        setSelectedRegime(payload.taxRegime);

        try {
            const calcRes = await calculateSalary(payload);
            setResult(calcRes);

            // NOTE: compareSalary must receive CompareRequest shape.
            const compareRes = await compareSalary(payload);
            setCompare(compareRes);
        } catch (err) {
            console.error("API error:", err);

            if (!err.response) {
                setError(
                    "Backend not reachable. Ensure Spring Boot runs on http://localhost:8080"
                );
            } else {
                const msg =
                    typeof err.response.data === "string"
                        ? err.response.data
                        : JSON.stringify(err.response.data);
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleResetUI = () => {
        setResult(null);
        setCompare(null);
        setError("");
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 50,
                background: "white",
                paddingLeft: 16,
                paddingRight: 16,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 950,
                    display: "grid",
                    gap: 16,
                }}
            >
            <Header />
                <SalaryForm onSubmit={handleSubmit} onReset={handleResetUI} loading={loading} />

                {error && (
                    <div
                        style={{
                            padding: 12,
                            border: "1px solid red",
                            borderRadius: 12,
                            background: "#fff",
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <ResultCard result={result} selectedRegime={selectedRegime}/>
                    <CompareCard compare={compare} />
                </div>
                {result && <SalaryChart result={result} />}
            </div>
        </div>
    );
}

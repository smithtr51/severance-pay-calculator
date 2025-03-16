import React, { useState } from "react";

function SeveranceCalculator() {
    const [basicPay, setBasicPay] = useState("");
    const [yearsService, setYearsService] = useState("");
    const [monthsService, setMonthsService] = useState("");
    const [age, setAge] = useState("");
    const [monthsAge, setMonthsAge] = useState("");
    const [result, setResult] = useState(null);

    const calculateSeverance = () => {
        let basicAllowance = Math.min(10, yearsService) * basicPay +
            Math.max(0, yearsService - 10) * 2 * basicPay +
            (monthsService / 3) * 0.25 * (yearsService < 10 ? basicPay : 2 * basicPay);

        let ageAdjustment = Math.floor((age - 40) * 4 + monthsAge / 3) * 0.025 * basicAllowance;
        let totalSeverance = basicAllowance + ageAdjustment;
        let weeksPaid = totalSeverance / basicPay;
        let cappedSeverance = Math.min(totalSeverance, 52 * basicPay);

        setResult({
            basicAllowance,
            ageAdjustment,
            totalSeverance,
            weeksPaid,
            cappedSeverance,
        });
    };

    return (
        <div>
            <h1>Severance Pay Calculator</h1>
            <input type="number" placeholder="Basic Pay (Weekly)" onChange={(e) => setBasicPay(e.target.value)} />
            <input type="number" placeholder="Years of Service" onChange={(e) => setYearsService(e.target.value)} />
            <input type="number" placeholder="Additional Months" onChange={(e) => setMonthsService(e.target.value)} />
            <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
            <input type="number" placeholder="Additional Age Months" onChange={(e) => setMonthsAge(e.target.value)} />
            <button onClick={calculateSeverance}>Calculate</button>
            
            {result && (
                <div>
                    <h2>Results</h2>
                    <p>Basic Allowance: ${result.basicAllowance.toFixed(2)}</p>
                    <p>Age Adjustment: ${result.ageAdjustment.toFixed(2)}</p>
                    <p>Total Severance Pay: ${result.totalSeverance.toFixed(2)}</p>
                    <p>Weeks Paid: {result.weeksPaid.toFixed(2)}</p>
                    <p>Capped Severance: ${result.cappedSeverance.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default SeveranceCalculator;

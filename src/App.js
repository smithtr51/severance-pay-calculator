import React, { useState } from "react";

const calculateSeverance = () => {
    const pay = parseFloat(basicPay);
    const years = parseInt(yearsService, 10);
    const months = parseInt(monthsService, 10);
    const empAge = parseInt(age, 10);
    const ageMonths = parseInt(monthsAge, 10);

    if ([pay, years, months, empAge, ageMonths].some(isNaN)) {
        alert("Please enter valid numeric values for all fields.");
        return;
    }

    const weeklyRate = years < 10 ? pay : 2 * pay;

    const basicAllowance =
        (Math.min(years, 10) * pay) +
        (Math.max(0, years - 10) * 2 * pay) +
        (Math.floor(months / 3) * 0.25 * weeklyRate);

    const totalQuarters = ((empAge - 40) * 4) + Math.floor(ageMonths / 3);
    const ageAdjustment = totalQuarters > 0 ? totalQuarters * 0.025 * basicAllowance : 0;

    const totalSeverance = basicAllowance + ageAdjustment;
    const weeksPaid = totalSeverance / pay;
    const cappedSeverance = Math.min(totalSeverance, 52 * pay);

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

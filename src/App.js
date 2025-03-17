import React, { useState } from "react";

function SeveranceCalculator() {
  const [basicPay, setBasicPay] = useState("");
  const [yearsService, setYearsService] = useState("");
  const [monthsService, setMonthsService] = useState("");
  const [age, setAge] = useState("");
  const [monthsAge, setMonthsAge] = useState("");
  const [result, setResult] = useState(null);

  const calculateSeverance = () => {
    const pay = parseFloat(basicPay);
    const years = parseInt(yearsService, 10);
    const months = parseInt(monthsService, 10) || 0;
    const empAge = parseInt(age, 10);
    const ageMonths = parseInt(monthsAge, 10) || 0;

    if (isNaN(pay) || isNaN(years) || isNaN(empAge)) {
      alert("Please enter valid numbers for required fields.");
      return;
    }

    // Calculate total service in years (including partial years)
    const totalServiceYears = years + months / 12;
    
    // Calculate basic allowance according to OPM rules
    let basicAllowance = 0;
    
    if (totalServiceYears <= 10) {
      // One week's pay per year for first 10 years
      basicAllowance = totalServiceYears * pay;
    } else {
      // One week's pay per year for first 10 years
      // Two weeks' pay per year for years beyond 10
      basicAllowance = 10 * pay + (totalServiceYears - 10) * 2 * pay;
    }

    // Calculate age adjustment
    // 10% additional for each year over 40
    const totalAgeYears = empAge + ageMonths / 12;
    const ageAdjustmentFactor = Math.max(0, (totalAgeYears - 40) / 10);
    const ageAdjustment = basicAllowance * ageAdjustmentFactor;

    // Calculate total severance
    const totalSeverance = basicAllowance + ageAdjustment;
    
    // Calculate equivalent weeks of pay
    const weeksPaid = totalSeverance / pay;
    
    // Apply the 52-week cap
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
    <div className="max-w-xl mx-auto p-4 shadow-md rounded-lg bg-white">
      <h1 className="text-xl font-semibold mb-3">OPM Severance Calculator</h1>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Basic Pay (Weekly)"
          value={basicPay}
          onChange={(e) => setBasicPay(e.target.value)}
          className="border rounded p-2 w-full text-base"
          required
        />

        <input
          type="number"
          placeholder="Years of Service"
          value={yearsService}
          onChange={(e) => setYearsService(e.target.value)}
          className="border rounded p-2 w-full text-base"
          required
        />

        <input
          type="number"
          placeholder="Additional Months of Service"
          value={monthsService}
          onChange={(e) => setMonthsService(e.target.value)}
          className="border rounded p-2 w-full text-base"
          min="0"
          max="11"
        />

        <input
          type="number"
          placeholder="Age (Years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border rounded p-2 w-full text-base"
          required
        />

        <input
          type="number"
          placeholder="Additional Age Months"
          value={monthsAge}
          onChange={(e) => setMonthsAge(e.target.value)}
          className="border rounded p-2 w-full text-base"
          min="0"
          max="11"
        />

        <button
          onClick={calculateSeverance}
          className="bg-blue-500 text-white p-3 rounded-lg w-full text-base hover:bg-blue-600"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Results</h2>
          <div className="space-y-1">
            <p><span className="font-medium">Basic Allowance:</span> ${result.basicAllowance.toFixed(2)}</p>
            <p><span className="font-medium">Age Adjustment:</span> ${result.ageAdjustment.toFixed(2)}</p>
            <p><span className="font-medium">Total Severance Pay:</span> ${result.totalSeverance.toFixed(2)}</p>
            <p><span className="font-medium">Equivalent Weeks:</span> {result.weeksPaid.toFixed(2)}</p>
            <p><span className="font-medium">Final Severance Pay:</span> ${result.cappedSeverance.toFixed(2)} (capped at 52 weeks)</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeveranceCalculator;

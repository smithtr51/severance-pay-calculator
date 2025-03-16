import React, { useState } from "react";

function SeveranceCalculator() {
  const [basicPay, setBasicPay] = useState(0);
  const [yearsService, setYearsService] = useState(0);
  const [monthsService, setMonthsService] = useState(0);
  const [age, setAge] = useState(0);
  const [monthsAge, setMonthsAge] = useState(0);
  const [result, setResult] = useState(null);

  const calculateSeverance = () => {
    const pay = parseFloat(basicPay);
    const years = parseInt(yearsService, 10);
    const months = parseInt(monthsService, 10);
    const empAge = parseInt(age, 10);
    const ageMonths = parseInt(monthsAge, 10);

    if ([pay, years, months, empAge, ageMonths].some(isNaN)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const basicAllowance =
      Math.min(10, years) * pay +
      Math.max(0, years - 10) * 2 * pay +
      (months / 3) * 0.25 * (years < 10 ? pay : 2 * pay);

    const ageFactor = Math.floor((empAge - 40) * 4 + ageMonths / 3);
    const ageAdjustment = ageFactor > 0 ? ageFactor * 0.025 * basicAllowance : 0;

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
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Severance Pay Calculator</h1>

      <label className="block mb-2">
        Basic Pay (Weekly):
        <input
          type="number"
          value={basicPay}
          onChange={(e) => setBasicPay(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-2">
        Years of Service:
        <input
          type="number"
          value={yearsService}
          onChange={(e) => setYearsService(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-2">
        Additional Months:
        <input
          type="number"
          value={monthsService}
          onChange={(e) => setMonthsService(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-2">
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-4">
        Additional Age Months:
        <input
          type="number"
          value={monthsAge}
          onChange={(e) => setMonthsAge(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>

      <button
        onClick={calculateSeverance}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold text-xl mb-2">Results</h2>
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

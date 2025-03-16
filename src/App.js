import React, { useState } from \"react\";

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
      alert(\"Please enter valid numbers for all fields.\");
      return;
    }

    const weeklyRate = years < 10 ? pay : 2 * pay;

    const basicAllowance =
      Math.min(years, 10) * pay +
      Math.max(0, years - 10) * 2 * pay +
      Math.floor(months / 3) * 0.25 * weeklyRate;

    const totalQuarters = Math.max(0, (empAge - 40) * 4 + Math.floor(ageMonths / 3));
    const ageAdjustment = totalQuarters * 0.025 * basicAllowance;

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
    <div className=\"max-w-xl mx-auto p-4 shadow-md rounded-lg bg-white\">
      <h1 className=\"text-xl font-semibold mb-3\">Severance Calculator</h1>

      <div className=\"space-y-3\">
        <input
          type=\"number\"
          inputMode=\"decimal\"
          placeholder=\"Basic Pay (Weekly)\"
          value={basicPay}
          onChange={(e) => setBasicPay(e.target.value)}
          className=\"border rounded p-2 w-full text-base\"
        />

        <input
          type=\"number\"
          inputMode=\"numeric\"
          placeholder=\"Years of Service\"
          value={yearsService}
          onChange={(e) => setYearsService(e.target.value)}
          className=\"border rounded p-2 w-full text-base\"
        />

        <input
          type=\"number\"
          inputMode=\"numeric\"
          placeholder=\"Additional Months\"
          value={monthsService}
          onChange={(e) => setMonthsService(e.target.value)}
          className=\"border rounded p-2 w-full text-base\"
        />

        <input
          type=\"number\"
          inputMode=\"numeric\"
          placeholder=\"Age\"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className=\"border rounded p-2 w-full text-base\"
        />

        <input
          type=\"number\"
          inputMode=\"numeric\"
          placeholder=\"Additional Age Months\"
          value={monthsAge}
          onChange={(e) => setMonthsAge(e.target.value)}
          className=\"border rounded p-2 w-full text-base\"
        />

        <button
          onClick={calculateSeverance}
          className=\"bg-blue-500 text-white p-3 rounded-lg w-full text-base\"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className=\"mt-4 p-3 bg-gray-100 rounded-lg\">
          <h2 className=\"text-lg font-medium mb-2\">Results</h2>
          <p>Basic Allowance: ${result.basicAllowance.toFixed(2)}</p>
          <p>Age Adjustment: ${result.ageAdjustment.toFixed(2)}</p>
          <p>Total Severance: ${result.totalSeverance.toFixed(2)}</p>
          <p>Weeks Paid: {result.weeksPaid.toFixed(2)}</p>
          <p>Capped Severance: ${result.cappedSeverance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default SeveranceCalculator;

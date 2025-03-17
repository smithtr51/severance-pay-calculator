import React, { useState } from "react";

function SeveranceCalculator() {
  const [annualPay, setAnnualPay] = useState("");
  const [yearsService, setYearsService] = useState("");
  const [monthsService, setMonthsService] = useState("");
  const [age, setAge] = useState("");
  const [monthsAge, setMonthsAge] = useState("");
  const [result, setResult] = useState(null);

  // Age adjustment factors as per OPM worksheet
  const getAgeFactor = (years, months) => {
    const totalAge = years + months / 12;
    
    if (totalAge < 40.25) return 1.0;
    if (totalAge < 41.25) return 1.1;
    if (totalAge < 42.25) return 1.2;
    if (totalAge < 43.25) return 1.3;
    if (totalAge < 44.25) return 1.4;
    if (totalAge < 45.25) return 1.5;
    if (totalAge < 46.25) return 1.6;
    if (totalAge < 47.25) return 1.7;
    if (totalAge < 48.25) return 1.8;
    if (totalAge < 49.25) return 1.9;
    if (totalAge < 50.25) return 2.0;
    if (totalAge < 51.25) return 2.1;
    if (totalAge < 52.25) return 2.2;
    if (totalAge < 53.25) return 2.3;
    if (totalAge < 54.25) return 2.4;
    if (totalAge < 55.25) return 2.5;
    if (totalAge < 56.25) return 2.6;
    if (totalAge < 57.25) return 2.7;
    if (totalAge < 58.25) return 2.8;
    if (totalAge < 59.25) return 2.9;
    return 3.0; // Age 59 years, 3 months and above
  };

  const calculateSeverance = () => {
    // Step 1: Annual Rate of Basic Pay
    const annual = parseFloat(annualPay);
    if (isNaN(annual)) {
      alert("Please enter a valid annual pay amount.");
      return;
    }

    // Step 2: Weekly Rate
    const weeklyRate = (annual / 2087) * 40;

    // Step 3: Years of Service adjustment
    const years = parseInt(yearsService, 10) || 0;
    const months = parseInt(monthsService, 10) || 0;
    const totalServiceYears = years + months / 12;
    
    let adjustedYearsService;
    if (totalServiceYears <= 10) {
      adjustedYearsService = totalServiceYears;
    } else {
      adjustedYearsService = 10 + (totalServiceYears - 10) * 2;
    }

    // Step 4: Basic Severance Pay
    const basicSeverancePay = weeklyRate * adjustedYearsService;

    // Step 5: Age Adjustment Factor
    const empAge = parseInt(age, 10) || 0;
    const ageMonths = parseInt(monthsAge, 10) || 0;
    const ageFactor = getAgeFactor(empAge, ageMonths);

    // Step 6: Adjusted Severance Pay
    const adjustedSeverancePay = basicSeverancePay * ageFactor;

    // Step 7: Maximum amount (52-week limit)
    const maxSeverancePay = weeklyRate * 52;

    // Step 8: Final total severance pay
    const totalSeverancePay = Math.min(adjustedSeverancePay, maxSeverancePay);

    // Step 9: Biweekly payment amount
    const biweeklyPayment = weeklyRate * 2;

    // Step 10: Number of weeks of payments
    const weeksOfPayments = (totalSeverancePay / biweeklyPayment) * 2;

    setResult({
      annualPay: annual,
      weeklyRate,
      adjustedYearsService,
      basicSeverancePay,
      ageFactor,
      adjustedSeverancePay,
      maxSeverancePay,
      totalSeverancePay,
      biweeklyPayment,
      weeksOfPayments
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow-md rounded-lg bg-white">
      <h1 className="text-xl font-semibold mb-3">OPM Severance Pay Calculator</h1>
      <p className="text-sm text-gray-600 mb-4">Based on the official OPM Severance Pay Estimation Worksheet</p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Rate of Basic Pay</label>
          <input
            type="number"
            placeholder="Annual Pay"
            value={annualPay}
            onChange={(e) => setAnnualPay(e.target.value)}
            className="border rounded p-2 w-full text-base"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Years of Service</label>
            <input
              type="number"
              placeholder="Years"
              value={yearsService}
              onChange={(e) => setYearsService(e.target.value)}
              className="border rounded p-2 w-full text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Months</label>
            <input
              type="number"
              placeholder="Months"
              value={monthsService}
              onChange={(e) => setMonthsService(e.target.value)}
              className="border rounded p-2 w-full text-base"
              min="0"
              max="11"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Age (Years)</label>
            <input
              type="number"
              placeholder="Years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded p-2 w-full text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age (Months)</label>
            <input
              type="number"
              placeholder="Months"
              value={monthsAge}
              onChange={(e) => setMonthsAge(e.target.value)}
              className="border rounded p-2 w-full text-base"
              min="0"
              max="11"
            />
          </div>
        </div>

        <button
          onClick={calculateSeverance}
          className="bg-blue-500 text-white p-3 rounded-lg w-full text-base hover:bg-blue-600"
        >
          Calculate Severance Pay
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-medium mb-3">Severance Pay Calculation Results</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 1:</span>
              <span>Annual Pay: ${result.annualPay.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 2:</span>
              <span>Weekly Rate: ${result.weeklyRate.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 3:</span>
              <span>Adjusted Years: {result.adjustedYearsService.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 4:</span>
              <span>Basic Severance: ${result.basicSeverancePay.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 5:</span>
              <span>Age Factor: {result.ageFactor.toFixed(1)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 6:</span>
              <span>Adjusted Severance: ${result.adjustedSeverancePay.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 7:</span>
              <span>Maximum (52 weeks): ${result.maxSeverancePay.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 8:</span>
              <span>Total Severance: ${result.totalSeverancePay.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 9:</span>
              <span>Biweekly Payment: ${result.biweeklyPayment.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium">Step 10:</span>
              <span>Weeks of Payments: {result.weeksOfPayments.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeveranceCalculator;

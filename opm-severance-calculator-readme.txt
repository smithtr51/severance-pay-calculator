# OPM Severance Pay Calculator

A React-based calculator that implements the official Office of Personnel Management (OPM) severance pay formula for federal employees. This tool follows the exact calculation steps outlined in the OPM Severance Pay Estimation Worksheet.

## Features

- Accurate calculation of federal employee severance pay
- Step-by-step results matching the OPM worksheet
- User-friendly interface with clear input fields
- Detailed breakdown of the calculation process
- Responsive design that works on desktop and mobile devices

## How It Works

This calculator implements the official 10-step process for estimating severance pay according to OPM guidelines:

1. Starts with annual rate of basic pay
2. Converts annual pay to weekly rate using OPM's formula
3. Adjusts years of service according to federal regulations
4. Calculates basic severance pay
5. Applies age adjustment factors as specified by OPM
6. Computes adjusted severance pay
7. Applies the 52-week maximum limitation
8. Determines total severance pay
9. Calculates biweekly payment amounts
10. Estimates the duration of severance payments

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opm-severance-calculator.git

# Navigate to the project directory
cd opm-severance-calculator

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

1. Enter your annual rate of basic pay
2. Input your years and months of service
3. Enter your age in years and months
4. Click "Calculate Severance Pay"
5. View the detailed breakdown of your severance pay calculation

## Technical Details

This application is built with:
- React.js for the user interface
- Tailwind CSS for styling
- JavaScript for implementing the OPM calculation logic

## OPM Formula Reference

The calculator implements the following key formulas:

- **Weekly Rate**: (Annual Pay ÷ 2,087 × 40)
- **Service Adjustment**: For service over 10 years: Adjusted years = 10 + (actual years - 10) × 2
- **Age Adjustment**: Factors from 1.0 to 3.0 based on age brackets
- **Maximum Limitation**: 52 × Weekly Rate

## Legal Disclaimer

This calculator is provided for estimation purposes only. While it implements the official OPM calculation method, the actual severance pay determination is made by your agency's human resources department. Users should verify results with their HR office.

## Contributing

Contributions to improve the calculator are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the official OPM Severance Pay Estimation Worksheet
- Developed for federal employees facing reduction in force (RIF) or similar actions

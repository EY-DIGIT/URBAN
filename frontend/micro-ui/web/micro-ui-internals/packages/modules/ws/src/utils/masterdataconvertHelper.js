
    export const decimalToFractionInch = (value) => {
  const whole = Math.floor(value);
  const decimal = value - whole;

  const fractions = [
    { dec: 0.5,    frac: "1/2" },
    { dec: 0.75,   frac: "3/4" },
    { dec: 1,   frac: "1" },
    { dec: 1.5, frac: "3/2" },
    { dec: 2,   frac: "2" },
    { dec: 3,   frac: "3" },
    { dec: 4,   frac: "4" },
    { dec: 6,   frac: "6" },
    { dec: 0.125,  frac: "1/8" },
    { dec: 0.1875, frac: "3/16" },
    { dec: 0.25,   frac: "1/4" },
    { dec: 0.3125, frac: "5/16" },
    { dec: 0.375,  frac: "3/8" },
    { dec: 0.4375, frac: "7/16" },
    
    { dec: 0.5625, frac: "9/16" },
    { dec: 0.625,  frac: "5/8" },
    { dec: 0.6875, frac: "11/16" },
    { dec: 0.75,   frac: "3/4" },
    { dec: 0.8125, frac: "13/16" },
    { dec: 0.875,  frac: "7/8" },
    { dec: 0.9375, frac: "15/16" },
  ];

  const match = fractions.find(f => Math.abs(decimal - f.dec) < 0.01);
  return match ? `${match.frac}` : `${value}`;
}

export const toSentenceCase = (str = "") => {
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};



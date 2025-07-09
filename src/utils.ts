// Rounds a number to 2 decimal places
function RoundTo2(x: number): string {
  return (Math.round(x * 100) / 100).toFixed(2);
}

function IsEven(x: number): boolean {
  return x % 2 == 0;
}

// Returns the larger of the two numbers
function Maximum(x: number, y: number): number {
  return y > x ? y : x;
}

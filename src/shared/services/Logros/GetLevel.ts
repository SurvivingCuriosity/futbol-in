export const getLevel = (value: number, steps: number[]): number => {
  for (let i = 0; i < steps.length; i++) {
    if (value < steps[i]) {
      return i;
    }
  }
  return steps.length;
};
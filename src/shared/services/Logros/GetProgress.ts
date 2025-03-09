export const getProgress = (steps: number[], value: number): number => {  
    const totalIcons = steps.length; // por ejemplo, 5
  
    // Si el valor es mayor o igual al último step, retorna 100%
    if (value >= steps[totalIcons - 1]) return 100;
  
    // Si el valor es menor al primer step, retorna 0%
    if (value < steps[0]) return 0;
  
    // Buscar en qué segmento se encuentra el valor
    const segmentIndex = steps.findIndex(step => step > value);
    // El segmento se encuentra entre steps[segmentIndex - 1] y steps[segmentIndex]
    const prevStep = steps[segmentIndex - 1];
    const nextStep = steps[segmentIndex];
  
    // Calcular la fracción dentro del segmento
    const fraction = (value - prevStep) / (nextStep - prevStep);
  
    // Cada ícono tiene su posición: 0%, 25%, 50%, 75%, 100%
    const leftPercentage = ((segmentIndex - 1) / (totalIcons - 1)) * 100;
    const rightPercentage = (segmentIndex / (totalIcons - 1)) * 100;
  
    // Interpolar linealmente
    return leftPercentage + fraction * (rightPercentage - leftPercentage);
  }
  
/**
 * Retorna una cadena del tipo:
 * - "Justo ahora" (si hace menos de 1 minuto)
 * - "Hace X minutos" (menos de 1 hora)
 * - "Hace 1 hora" o "Hace X horas" (menos de 24 horas)
 * - "Hace 1 día" o "Hace X días" (menos de 7 días)
 * - "Hace 1 semana" o "Hace X semanas" (menos de 1 mes aproximado)
 * - "Hace 1 mes" o "Hace X meses" (menos de 1 año)
 * - "Hace X años" (1 año o más)
 */
export function dateToTimeAgo(date: Date): string {
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
      return "En el futuro";
    }
  
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffSeconds < 60) {
      return "Justo ahora";
    } else if (diffMinutes < 60) {
      return diffMinutes === 1 ? "hace 1 minuto" : `hace ${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? "hace 1 hora" : `hace ${diffHours} horas`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? "hace 1 día" : `hace ${diffDays} días`;
    } else if (diffWeeks < 4) {
      return diffWeeks === 1 ? "hace 1 semana" : `hace ${diffWeeks} semanas`;
    } else if (diffMonths < 12) {
      return diffMonths === 1 ? "hace 1 mes" : `hace ${diffMonths} meses`;
    } else {
      return diffYears <= 1 ? "hace 1 año" : `hace ${diffYears} años`;
    }
  }
  
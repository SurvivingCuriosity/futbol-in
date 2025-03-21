import { faCheckCircle, faExclamationCircle, faInfoCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TarjetaMensaje = ({
  text,
  variant,
}: {
  text: string;
  variant: "success" | "error" | "info";
}) => {
    const iconMap:Record<string, IconDefinition> = {
        success: faCheckCircle,
        error: faExclamationCircle,
        info: faInfoCircle
    }
    const textColorMap:Record<string, string> = {
        success: 'text-green-200',
        error: 'text-red-200',
        info: 'text-neutral-400'
    }

    const bgColorMap:Record<string, string> = {
        success: 'bg-green-600/50',
        error: 'bg-red-600/50',
        info: 'bg-neutral-900'
    }
    
  return (
  <div className={bgColorMap[variant]+' flex items-center p-1 px-2 rounded text-xs gap-2'}>
    <FontAwesomeIcon icon={iconMap[variant]} className={`${textColorMap[variant]} `} />
    <p className={textColorMap[variant]}>{text}</p>
  </div>
  );
};

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const Tooltip = ({
  id,
  children,
  content,
}: {
  id: string;
  children: React.ReactNode;
  content?: React.ReactNode;
}) => {
  return (
    <>
      <a data-tooltip-id={id} className="relative">
        {children}
        <FontAwesomeIcon icon={faInfoCircle} width={20} height={20} className="text-xs absolute -top-1.5 -right-2 text-neutral-500" />
      </a>
      <ReactTooltip
        id={id}
        border="1px solid var(--color-neutral-500)"
        style={{
          color: "white",
          backgroundColor: "var(--color-neutral-800)",
          padding: 2,
          paddingInline: 10,
          fontSize: 14,
        }}
        opacity={1}
        clickable
        place="top-end"
      >
        {content}
      </ReactTooltip>
    </>
  );
};

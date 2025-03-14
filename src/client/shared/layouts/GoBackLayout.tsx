import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export interface GoBackLayoutProps {
  className?: string;
  label?: string;
  href: string;
  children: React.ReactNode;
}

export const GoBackLayout = (props: GoBackLayoutProps) => {
  const { className, href, label = "Volver", children="" } = props;

  return (
    <div className={'w-full '+className}>
      <Link
        href={href}
        className="bg-neutral-900 p-1 px-2 text-neutral-400 rounded hover:text-primary hover:bg-neutral-800"
      >
        <FontAwesomeIcon icon={faArrowLeft} width={24} height={24} />
        {label}
      </Link>
      <div className="w-full h-full mt-4">{children}</div>
    </div>
  );
};

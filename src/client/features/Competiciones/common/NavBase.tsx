import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InlinePicker, InlinePickerProps } from "futbol-in-ui";
import React from "react";

export interface NavBaseProps {
  iconMap: Record<number, IconDefinition>;
  headingText: Record<number, string>;
}

export const NavBase = (props: InlinePickerProps & NavBaseProps) => {
  const { options, activeTabId = 0, onTabClick, headingText, iconMap } = props;

  return (
    <div className="my-2 w-full md:min-w-md">
      <InlinePicker
        options={options}
        onTabClick={onTabClick}
        size="sm"
        activeTabId={activeTabId}
        itemContainerClassName="flex items-center p-3 justify-center gap-2"
        textClassName="hidden md:block text-sm w-fit mx-0 lg:text-lg xl:text-xl"
      />
      <h2 className="text-xl font-bold text-neutral-400 mt-2 p-1">
        <FontAwesomeIcon
          icon={iconMap[activeTabId]}
          width={24}
          height={24}
          className="mr-2 text-lg"
        />
        {headingText[activeTabId]}
      </h2>
    </div>
  );
};

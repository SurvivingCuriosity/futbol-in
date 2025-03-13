export interface ColapsableProps {
  open: boolean;
  containerClassName?: string;
  visibleContent?: React.ReactNode;
  extraContent?: React.ReactNode;
}
export const Colapsable = (props: ColapsableProps) => {
  const { open, visibleContent, extraContent, containerClassName } = props;
  return (
    <div className={containerClassName}>
      {visibleContent}
      <div
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s ease-out",
        }}
        className="wrapper grid"
      >
        <div className="inner overflow-hidden">
          {extraContent}
        </div>
      </div>
    </div>
  );
};

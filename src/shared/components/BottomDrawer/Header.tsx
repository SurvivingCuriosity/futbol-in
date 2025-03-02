import React, {forwardRef} from 'react';


export const Header = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Header(
  {children, ...props},
  ref
) {
  return (
    <div className='Header' {...props} ref={ref}>
      {children}
    </div>
  );
});
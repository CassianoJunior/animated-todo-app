import { useStyledSystemPropsResolver } from 'native-base';
import React from 'react';

export const makeStyledSystemPropsResolver = (Comp: any) => {
  return React.forwardRef((props: any, ref: any) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    return (
      <Comp ref={ref} {...restProps} style={style}>
        {props.children}
      </Comp>
    );
  });
};

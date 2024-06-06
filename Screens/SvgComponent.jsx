import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export default function SvgComponent(props) {
  return (
    <Svg
    width={202}
    height={50}
    fill="none"
    {...props}
  >
    <Path
      fill="#ddd"
      d="M65 27.54v-.084C71.483 40.801 85.167 50 101 50c15.833 0 29.517-9.199 36-22.544v.085C151.743 10.663 173.423 0 197.593 0c1.479 0 2.948.04 4.407.119V0H0v.119A81.721 81.721 0 0 1 4.407 0C28.577 0 50.257 10.663 65 27.54z"
    />
  </Svg>
  
  );
}

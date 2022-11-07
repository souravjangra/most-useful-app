import React, {SVGProps} from 'react';
//@ts-ignore
import SvgIcon from 'react-native-svg-icon';
import svgs from './Icons';

interface IconProps extends SVGProps<any> {
  name: string;
}

const Icon = ({...props}: IconProps) => (
  <SvgIcon {...props} svgs={svgs(props)} />
);

export default Icon;

import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {HeaderTitle} from '../HeaderTitle';
import Style from './Style';

const Header = (props: NativeStackHeaderProps) => {
  const {
    options: {title},
    route: {name},
  } = props;

  return (
    <Appbar.Header style={Style.header}>
      <Appbar.Content
        title={<HeaderTitle title={title ?? name} />}
        style={Style.headerContent}
      />
    </Appbar.Header>
  );
};

export default Header;

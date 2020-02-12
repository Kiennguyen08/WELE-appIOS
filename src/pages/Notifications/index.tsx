/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext }  from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import NotificationItem  from './NotificationItem';
import { useNotifications } from '@/store/notification/hooks';

import {CustomTheme } from '@store/theme/ThemeWrapper'

const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 80%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor}
`;

const HeaderWrapper = styled.SafeAreaView<{theme: CustomTheme}>`
  background-color: ${props=> props.theme.backgroundColor};
  flex-direction: row;
  border-bottom-width: 1px;

`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;


const StyledPageTitleText = styled.Text<{theme: CustomTheme}>`
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 24px;
  margin-left: 20px;
  color: ${props=> props.theme.textColorH1};
`



const Notifications = () => {

  const notifications = useNotifications()

  const nav = useContext(NavigationContext)
  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={() => {
          nav.navigate('Home')
        }}>
          <SafeAreaView>
            <StyledAntDesignIcon name={'arrowleft'} />
          </SafeAreaView>
        </TouchableOpacity>
        <StyledPageTitleText>
            Notifications
        </StyledPageTitleText>
      </HeaderWrapper>


    <FlatList

        data = {notifications}
        renderItem = {({item})=> <NotificationItem notification= {item}/>}
        keyExtractor = {item => item.id}
    />

  </Wrapper>
  );
};




export default Notifications;

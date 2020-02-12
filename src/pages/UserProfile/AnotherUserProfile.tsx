/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useContext, useCallback } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext, NavigationScreenProp } from 'react-navigation';

import { useAnotherUserResult } from '@/store/user/hooks';
import { ThemeMode, CustomTheme } from '@/store/theme/ThemeWrapper';
import ProfileChart from './Chart';
import UserInfo from './UserInfo';



const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 80%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const HeaderWrapper = styled.SafeAreaView`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px;


`;
const StyledBodyWrapper = styled.View`
  position: absolute;
  margin-top: 40px;
  flex: 9;
  align-items: flex-start;

`;


const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;


const StyledLineCharWrapper = styled.SafeAreaView`
  width: 80%;
`

interface Props {
  navigation: NavigationScreenProp<any>
}

const AnotherProfile = (props: Props) => {

  const user = props.navigation.getParam('user', null)
  const results = useAnotherUserResult(user)

  const nav = useContext(NavigationContext)

  const onGobackHandle = useCallback(()=>{
    nav.navigate('Billboard')
  },[])

  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={onGobackHandle}>
          <View>
            <StyledAntDesignIcon name={'arrowleft'} />
          </View>
        </TouchableOpacity>
      </HeaderWrapper>


      <StyledBodyWrapper>
        <TouchableOpacity onPress={onGobackHandle}>
          <View>
            <StyledAntDesignIcon name={'arrowleft'} />
          </View>
        </TouchableOpacity>

        <UserInfo user={user} />

        <StyledLineCharWrapper>
          <ProfileChart results={results} />
        </StyledLineCharWrapper>

      </StyledBodyWrapper>

    </Wrapper>

  );
};



AnotherProfile.navigationOptions = {
  header: null
};

export default AnotherProfile;

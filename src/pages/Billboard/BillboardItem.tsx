import React, { useContext } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import { UserType } from '@store/user/types';
import UserAvatar from '../../components/User/UserAvatar';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { NavigationContext } from 'react-navigation';
import { useCurrentUser } from '@/store/user/hooks';
const StyledUserSection = styled.View`
  height: 58px;
  width: 100%;
  flex-direction: row;
`;

const StyledOrderIndicator = styled.Text<{ color: string }>`
  text-align: center;
  flex: 0.8;
  padding-top: 8px;
  margin-right: 6px;
  border-bottom-width: 3px;
  border-color: #bababa;
  margin-bottom: 28px;

  font-size: 10px;
  font-weight: bold;
  color: ${props => props.color} ;
`;

const StyledUserNameWrapper = styled.View<{ isFake?: boolean }>`
  flex:8;
  flex-direction: column;
  margin-left: 12px;
`;

const StyledName = styled.Text<{ theme: CustomTheme }>`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  color: ${props => props.theme.textColorH1};
`;

const StyledAvatarWrapper = styled.View`
  flex: 2;
`;


const StyledSubDescription = styled.Text`
  font-size: 12px;
  color: #757575;
`;



const StyledEntypoIcon = styled(EntypoIcon)`
  font-size: 16px;
  color: #a8a8a8;
  margin: 8px 10px 8px 10px;
`;

const StyledActionButtonGroup = styled.View`
  flex: 2;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  height: 100%;
`

const renderColor = (index: number) => {
  switch (index) {
    case 0:
      return 'blue';
    case 1:
      return 'green';
    case 2:
      return 'red';
    default:
      return 'grey';
  }
};


interface Props {
  total: number,
  index: number,
  user: UserType
}
const BillboardItem = React.memo((props: Props) => {

  const user = useCurrentUser()
  const nav = useContext(NavigationContext)
  return (
    <StyledUserSection>
      <StyledOrderIndicator color={renderColor(props.index)}>
        {props.index + 1}
      </StyledOrderIndicator>
      <StyledAvatarWrapper>
        <UserAvatar user={props.user} />
      </StyledAvatarWrapper>
      <StyledUserNameWrapper isFake={props.user.id !== '-1'}>
        <StyledName>{props.user.displayName} {props.user.id === user.id && '(You)'}</StyledName>
        <StyledSubDescription>{Number(props.total).toFixed(1).toString()}{' scores'}</StyledSubDescription>
      </StyledUserNameWrapper>


      <StyledActionButtonGroup>
        {
          props.user.id !== '-1' && (
            <StyledTouchableOpacity onPress={() => {
              nav.navigate('AnotherProfile', {
                user: props.user
              })
            }}>
              <StyledEntypoIcon name={'dots-three-vertical'} />
            </StyledTouchableOpacity>
          )
        }
      </StyledActionButtonGroup>


    </StyledUserSection>
  )
}, (prev, next) => (prev.total === next.total && prev.user.id === next.user.id && prev.index === next.index))


export default BillboardItem
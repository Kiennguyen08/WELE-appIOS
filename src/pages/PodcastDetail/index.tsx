/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useContext, useCallback } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import { connect } from "react-redux";
import { View, TouchableOpacity, Alert, Linking, SafeAreaView } from 'react-native';

import styled from 'styled-components/native';
import globalPlayer from '@/service/playerService';
import storage from '@/service/localStorage';
import PodcastType from '@/store/podcast/types';
import { useCurrentPodcast } from '@/store/podcast/hooks';
import { NavigationContext } from 'react-navigation';
import { updateRecentPodcast } from '@/store/podcast/functions';


import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { is } from '@babel/types';

const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 80%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const HeaderWrapper = styled.SafeAreaView`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;

`;
const StyledBodyWrapper = styled.SafeAreaView`
  flex: 9;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.SafeAreaView`
  width: 100%;
  margin: 0 ;
  flex-direction: column;
`;



const StyledUserWrapper = styled.SafeAreaView`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1;
`;


const StyledPodcastImage = styled.Image<{ theme: CustomTheme }>`
  height: 176;
  width: 100%;
  border-radius: 10;
  margin: 10px 0px 20px 0px;

  ${props => props.theme.name === ThemeMode.DARK && `
    opacity: 0.6;
  `}
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text<{ theme: CustomTheme }>`
  width: 80%;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.textColorH1};
`

const DescriptionInfo = styled.Text`
  color: #787878;
  font-size: 10px;
  margin-bottom: 20px;
`;

const DescriptionMain = styled.Text`
    color: #7a7a7a;
    letter-spacing: 1px;
    font-size: 12px;

`

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`

const reFormatText = (text: string) => {
  return text.replace(/\n/g, '\n\n')
}

const trimText = (text: string) => {
  return text.substr(0, Math.min(text.length, 180)) + '...';
}

const StyledDescriptionWrapper = styled.SafeAreaView`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`

const StyledReadmore = styled.Text<{ theme: CustomTheme }>`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    color: ${props => props.theme.textColorH1};
`;

const StyledButtonWrapper = styled.SafeAreaView`
    flex-direction: row;
    width:100%;
`
const StyledPlayButton = styled.SafeAreaView`
    background-color: #25bf1d;
    width: 100px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
`

const StyledDownloadButton = styled.SafeAreaView`
    background-color: #e0d051;
    width: 160px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
    margin-left: 20px;
`

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;
    color:  #6e6a4b;
    text-align: center;
    text-transform: uppercase;

    padding: 8px;
`

const WELE_DEFAULT_LINK = 'https://www.facebook.com/groups/WELEVN/learning_content/'

const PodcastDetail = () => {

  const [isBrief, setIsBrief] = useState(true)

  const currentPodcast = useCurrentPodcast()
  const nav = useContext(NavigationContext)

  const onReadmoreHandle = useCallback(() => {
    setIsBrief(!isBrief)
  }, [isBrief])

  const onPressPlayHandle = useCallback(async () => {
    try {
      const res = await globalPlayer.pickTrack(currentPodcast)
      if (res !== true) {
        const podcast: PodcastType = {
          ...currentPodcast,
          uri: res
        }

        await storage.setRecentPodcasts(currentPodcast, podcast.uri as string)
        updateRecentPodcast(podcast)
        await nav.navigate('Player')
      }

    } catch (err) {
      Alert.alert('Fail to open File ', err.toString())
    }

  }, [currentPodcast.id])
  return <PodcastDetailMemo
    podcast={currentPodcast}
    isBrief={isBrief}
    onReadmoreHandle={onReadmoreHandle}

    onPressPlayHandle={onPressPlayHandle}
  />
};


interface Props {
  podcast: PodcastType,
  isBrief: boolean,
  onReadmoreHandle: () => void,
  onPressPlayHandle: () => void
}

const PodcastDetailMemo = React.memo((props: Props) => {
  const nav = useContext(NavigationContext)

  return <React.Fragment>
    {
      props.podcast && (
        <Wrapper>
          <HeaderWrapper>
            <TouchableOpacity onPress={() => {
              nav.navigate('Home')
            }}>
              <SafeAreaView>
                <StyledAntDesignIcon name={'arrowleft'} />
              </SafeAreaView>
            </TouchableOpacity>
          </HeaderWrapper>


          <StyledBodyWrapper>
            <StyledContent>
              <StyledUserWrapper >
                <StyledPodcastImage
                  resizeMode={"stretch"}
                  source={{ uri: props.podcast.imgUrl }}
                />
                <StyledName>
                  {props.podcast.name}
                </StyledName>

                <DescriptionInfo>
                  {props.podcast.source} <StyleSmallText>dẫn bởi </StyleSmallText>{props.podcast.narrator.displayName}
                </DescriptionInfo>

                <StyledButtonWrapper>
                  <TouchableOpacity onPress={props.onPressPlayHandle}>
                    <StyledPlayButton>
                      <StyledText >Open</StyledText>
                    </StyledPlayButton>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Linking.openURL(props.podcast.downloadLink ? props.podcast.downloadLink : WELE_DEFAULT_LINK)}>
                    <StyledDownloadButton >
                      <StyledText >Download </StyledText>
                    </StyledDownloadButton>
                  </TouchableOpacity>
                </StyledButtonWrapper>


              </StyledUserWrapper>

              <StyledDescriptionWrapper>
                <DescriptionMain>
                  {/* { trimText(reFormatText(PODCAST.description)) } */}
                  {props.isBrief ? trimText(reFormatText(props.podcast.description.replace(new RegExp('<br>', 'g'), '\n'))) :
                    reFormatText(props.podcast.description.replace(new RegExp('<br>', 'g'), '\n'))}

                </DescriptionMain>

                <TouchableOpacity>
                  <StyledReadmore onPress={props.onReadmoreHandle}>{props.isBrief ? 'Read more ' : 'See less'}</StyledReadmore>
                </TouchableOpacity>


              </StyledDescriptionWrapper>

            </StyledContent>
          </StyledBodyWrapper>
        </Wrapper>
      )
    }
  </React.Fragment>
}, (next, prev) => next.podcast.id === prev.podcast.id && next.isBrief === prev.isBrief)

PodcastDetail.navigationOptions = {
  header: null
};


function mapStateToProps(state: any) {
  return {
    podcast: state.podcast.currentPodcast
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRecentPodcast: (podcast: PodcastType) => dispatch(updateRecentPodcast(podcast))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);

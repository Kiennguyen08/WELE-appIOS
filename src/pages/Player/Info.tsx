import React from "react";
import styled from "styled-components/native";
import PodcastType from "@store/podcast/types";

import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'


const StyledInfoWrapper = styled.SafeAreaView`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1.5;
`;

const StyledPodcastImage = styled.Image`
  height: 200;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyleInfo = styled.SafeAreaView`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledNameText = styled.Text<{theme: CustomTheme}>`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 12px;
  color: ${props=> props.theme.textColorH1};
`;

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;



const Info = React.memo((props: PodcastType) => {

  return (
    <StyledInfoWrapper>
      <StyledPodcastImage
        resizeMode={"contain"}
        source={{ uri: props.imgUrl }}
      />
      <StyleInfo>
        <StyledNameText>{props.name}</StyledNameText>
        <DescriptionSub>
          {props.source} <StyleSmallText>dẫn bởi </StyleSmallText>
          {props.narrator.displayName}
        </DescriptionSub>
      </StyleInfo>
    </StyledInfoWrapper>
  );
},(prev,next)=> prev.id === next.id);

export default Info;

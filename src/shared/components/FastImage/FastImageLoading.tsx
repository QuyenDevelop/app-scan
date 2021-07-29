import React, { FunctionComponent } from "react";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";
import { createImageProgress } from "react-native-image-progress";
import * as Progress from "react-native-progress";

interface OwnProps extends FastImageProps {
  sourceLoading: Source;
}

type Props = OwnProps;

const Image = createImageProgress(FastImage);

export const FastImageLoading: FunctionComponent<Props> = props => {
  const { sourceLoading, resizeMode, source, style, ...rest } = props;

  return (
    <>
      {source?.uri == null ? (
        <FastImage
          source={sourceLoading}
          resizeMode={resizeMode}
          style={style}
        />
      ) : (
        <Image
          {...rest}
          source={source}
          resizeMode={resizeMode}
          style={style}
          indicator={Progress.Pie}
          renderError={() => {
            return (
              <FastImage
                source={sourceLoading}
                resizeMode={resizeMode}
                style={style}
              />
            );
          }}
        />
      )}
    </>
  );
};

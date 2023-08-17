import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

const RecordingWave = ({
  currentduration,
  duration,
  isSelected,
  isPlaying,
  color,
  status,
}) => {
  const maxBarHeight = 24;
  const barWidth = 2.2;
  const barMargin = 0;
  const barsCount = 26;
  const barColor =
    status == 'recive'
      ? 'rgba(0.514, 0.561, 0.627, 0.4)'
      : 'rgba(255, 255, 255, 1)';
  const activeBarColor =
    status == 'recive'
      ? 'rgba(131, 143, 160, 0.4)'
      : 'rgba(241, 245, 249, 0.4)';

  const activeBarsCount = useMemo(
    () => Math.floor((currentduration / duration) * barsCount),
    [currentduration, duration],
  );

  const getDuration = (barsCount, barcolor) => {
    console.log(currentduration, 'kkkkkk', duration, barsCount, barcolor);
  };

  const getBarColor = index => {
    if (isSelected && index < activeBarsCount) {
      return activeBarColor;
    }
    return barColor;
  };

  return (
    <>
      {[...Array(barsCount)].map((_, index) => {
        const barHeight = index % 2 == 0 ? maxBarHeight : 15;
        const barColor = getBarColor(index);

        return (
          <TouchableOpacity
            onPress={() => getDuration(barsCount, barColor)}
            key={index}
            style={{
              width: barWidth,
              height: barHeight,
              borderRadius: 5,
              backgroundColor: barColor,
              marginRight: index !== barsCount - 1 ? barMargin : 0,
            }}
          />
        );
      })}
    </>
  );
};

export default React.memo(RecordingWave);

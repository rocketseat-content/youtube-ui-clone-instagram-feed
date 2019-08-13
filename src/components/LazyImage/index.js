import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Small, Original } from './styles';

const AnimatedOriginal = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  smallSource,
  source,
  shouldLoad = false,
  aspectRatio = 1,
}) {
  const opacity = new Animated.Value(0);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [shouldLoad])

  function handleAnimate() {
    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true, 
    }).start();
  }

  return (
    <Small 
      source={smallSource}
      aspect={aspectRatio}
      resizeMode="contain"
      blurRadius={3}
    >
      { loaded && (
        <AnimatedOriginal 
          style={{ opacity }}
          onLoadEnd={handleAnimate}
          source={source} 
          aspect={aspectRatio} 
          resizeMode="contain"
        />
      ) }
    </Small>
  );
}

import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {spacing} from '../theme';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({isVisible}) => {
  const {theme} = useTheme();
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isVisible) {
      const createAnimation = (animValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0.3,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        );
      };

      const animation1 = createAnimation(dot1Anim, 0);
      const animation2 = createAnimation(dot2Anim, 200);
      const animation3 = createAnimation(dot3Anim, 400);

      animation1.start();
      animation2.start();
      animation3.start();

      return () => {
        animation1.stop();
        animation2.stop();
        animation3.stop();
      };
    } else {
      dot1Anim.setValue(0.3);
      dot2Anim.setValue(0.3);
      dot3Anim.setValue(0.3);
    }
  }, [isVisible, dot1Anim, dot2Anim, dot3Anim]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.primary,
            opacity: dot1Anim,
            transform: [
              {
                scale: dot1Anim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.primary,
            opacity: dot2Anim,
            transform: [
              {
                scale: dot2Anim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.primary,
            opacity: dot3Anim,
            transform: [
              {
                scale: dot3Anim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default TypingIndicator;

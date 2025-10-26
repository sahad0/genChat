import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {typography} from '../theme';

interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  isStreaming?: boolean;
}

const StreamingText: React.FC<StreamingTextProps> = ({
  text,
  speed = 20,
  onComplete,
  isStreaming = true,
}) => {
  const {theme} = useTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isStreaming && currentIndex < text.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const newIndex = prev + 1;
          setDisplayedText(text.slice(0, newIndex));

          if (newIndex >= text.length) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            onComplete?.();
          }

          return newIndex;
        });
      }, speed);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [text, speed, currentIndex, isStreaming, onComplete]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: theme.aiText || '#FBFAF0'}]}>
        {displayedText || 'Loading...'}
        {isStreaming && currentIndex < text.length && (
          <Text style={[styles.cursor, {color: theme.aiText || '#FBFAF0'}]}>
            |
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 20,
  },
  text: {
    ...typography.body,
    lineHeight: 22,
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cursor: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.7,
  },
});

export default StreamingText;

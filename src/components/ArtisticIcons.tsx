import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Polygon,
} from 'react-native-svg';

interface ArtisticIconProps {
  size?: number;
  color?: string;
  style?: any;
}

const defaultSize = 24;

// Geometric warm icon - based on Group 1-2
export const GeometricWarmIcon: React.FC<ArtisticIconProps> = ({
  size = defaultSize,
  color = '#D4A574',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient id="warmIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        <Path d="M3 3 L12 3 L7.5 12 Z" fill="url(#warmIconGrad)" />
        <Path d="M15 6 L21 6 L18 15 Z" fill="url(#warmIconGrad)" />
        <Circle cx="6" cy="18" r="3" fill="url(#warmIconGrad)" />
        <Circle cx="18" cy="21" r="2" fill="url(#warmIconGrad)" />
      </Svg>
    </View>
  );
};

// Organic nature icon - based on Group 2
export const OrganicNatureIcon: React.FC<ArtisticIconProps> = ({
  size = defaultSize,
  color = '#90EE90',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient
            id="natureIconGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        <Path
          d="M3 6 C6 3, 9 3, 12 6 C15 9, 18 9, 21 6"
          fill="url(#natureIconGrad)"
        />
        <Path
          d="M6 12 C9 9, 12 9, 15 12 C18 15, 21 15, 24 12"
          fill="url(#natureIconGrad)"
        />
        <Ellipse cx="9" cy="18" rx="3" ry="2" fill="url(#natureIconGrad)" />
        <Ellipse cx="18" cy="21" rx="2" ry="1" fill="url(#natureIconGrad)" />
      </Svg>
    </View>
  );
};

// Modern architectural icon - based on Group 3
export const ModernArchitecturalIcon: React.FC<ArtisticIconProps> = ({
  size = defaultSize,
  color = '#708090',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient id="archIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        <Rect x="3" y="3" width="6" height="6" fill="url(#archIconGrad)" />
        <Rect x="12" y="6" width="5" height="5" fill="url(#archIconGrad)" />
        <Polygon points="6,12 9,9 12,12" fill="url(#archIconGrad)" />
        <Polygon points="15,15 18,12 21,15" fill="url(#archIconGrad)" />
      </Svg>
    </View>
  );
};

// Flowing organic icon - based on Group 4
export const FlowingOrganicIcon: React.FC<ArtisticIconProps> = ({
  size = defaultSize,
  color = '#FFB6C1',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient id="flowIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        <Path
          d="M3 6 C6 3, 9 3, 12 6 C15 9, 18 3, 21 6"
          fill="url(#flowIconGrad)"
        />
        <Path
          d="M6 12 C9 9, 12 12, 15 9 C18 12, 21 9, 24 12"
          fill="url(#flowIconGrad)"
        />
        <Circle cx="9" cy="18" r="3" fill="url(#flowIconGrad)" />
        <Circle cx="18" cy="21" r="2" fill="url(#flowIconGrad)" />
      </Svg>
    </View>
  );
};

// Botanical nature icon - based on Group 5
export const BotanicalNatureIcon: React.FC<ArtisticIconProps> = ({
  size = defaultSize,
  color = '#8FBC8F',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient
            id="botanicalIconGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        <Path
          d="M6 6 C7 5, 8 5, 9 6 C8 7, 7 7, 6 6"
          fill="url(#botanicalIconGrad)"
        />
        <Path
          d="M15 9 C16 8, 17 8, 18 9 C17 10, 16 10, 15 9"
          fill="url(#botanicalIconGrad)"
        />
        <Path
          d="M9 15 C10 14, 11 14, 12 15 C11 16, 10 16, 9 15"
          fill="url(#botanicalIconGrad)"
        />
        <Path
          d="M18 18 C19 17, 20 17, 21 18 C20 19, 19 19, 18 18"
          fill="url(#botanicalIconGrad)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

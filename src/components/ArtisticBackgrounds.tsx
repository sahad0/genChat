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

const {width, height} = Dimensions.get('window');

interface ArtisticBackgroundProps {
  style?: any;
  opacity?: number;
}

// Group 1-2: Abstract geometric patterns with warm, earthy tones
export const GeometricWarmBackground: React.FC<ArtisticBackgroundProps> = ({
  style,
  opacity = 0.3,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={[styles.background, {opacity}]}>
        <Defs>
          <LinearGradient id="warmGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#D4A574" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#E8C4A0" stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient id="warmGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#B8860B" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#DAA520" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Abstract geometric shapes */}
        <Path d="M50 50 L150 50 L100 150 Z" fill="url(#warmGrad1)" />
        <Path d="M200 100 L300 100 L250 200 Z" fill="url(#warmGrad2)" />
        <Circle cx="100" cy="250" r="40" fill="url(#warmGrad1)" />
        <Circle cx="300" cy="300" r="30" fill="url(#warmGrad2)" />
      </Svg>
    </View>
  );
};

// Group 2: Complex organic shapes with nature-inspired elements
export const OrganicNatureBackground: React.FC<ArtisticBackgroundProps> = ({
  style,
  opacity = 0.3,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={[styles.background, {opacity}]}>
        <Defs>
          <LinearGradient id="natureGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#90EE90" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#98FB98" stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient id="natureGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#228B22" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#32CD32" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Organic flowing shapes */}
        <Path
          d="M50 100 C100 50, 150 50, 200 100 C250 150, 300 150, 350 100"
          fill="url(#natureGrad1)"
        />
        <Path
          d="M100 200 C150 150, 200 150, 250 200 C300 250, 350 250, 400 200"
          fill="url(#natureGrad2)"
        />
        <Ellipse cx="150" cy="300" rx="60" ry="40" fill="url(#natureGrad1)" />
        <Ellipse cx="300" cy="350" rx="50" ry="30" fill="url(#natureGrad2)" />
      </Svg>
    </View>
  );
};

// Group 3: Modern architectural/geometric designs
export const ModernArchitecturalBackground: React.FC<
  ArtisticBackgroundProps
> = ({style, opacity = 0.3}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={[styles.background, {opacity}]}>
        <Defs>
          <LinearGradient id="archGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#708090" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#A9A9A9" stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient id="archGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#2F4F4F" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#696969" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Modern geometric patterns */}
        <Rect x="50" y="50" width="100" height="100" fill="url(#archGrad1)" />
        <Rect x="200" y="100" width="80" height="80" fill="url(#archGrad2)" />
        <Polygon points="100,200 150,150 200,200" fill="url(#archGrad1)" />
        <Polygon points="250,250 300,200 350,250" fill="url(#archGrad2)" />
      </Svg>
    </View>
  );
};

// Group 4: Flowing, organic patterns with soft curves
export const FlowingOrganicBackground: React.FC<ArtisticBackgroundProps> = ({
  style,
  opacity = 0.3,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={[styles.background, {opacity}]}>
        <Defs>
          <LinearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#FFC0CB" stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#DDA0DD" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#EE82EE" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Flowing organic curves */}
        <Path
          d="M50 100 C100 50, 150 50, 200 100 C250 150, 300 50, 350 100"
          fill="url(#flowGrad1)"
        />
        <Path
          d="M100 200 C150 150, 200 200, 250 150 C300 200, 350 150, 400 200"
          fill="url(#flowGrad2)"
        />
        <Circle cx="150" cy="300" r="50" fill="url(#flowGrad1)" />
        <Circle cx="300" cy="350" r="40" fill="url(#flowGrad2)" />
      </Svg>
    </View>
  );
};

// Group 5: Detailed botanical/nature-inspired illustrations
export const BotanicalNatureBackground: React.FC<ArtisticBackgroundProps> = ({
  style,
  opacity = 0.3,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        style={[styles.background, {opacity}]}>
        <Defs>
          <LinearGradient
            id="botanicalGrad1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor="#8FBC8F" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#98FB98" stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient
            id="botanicalGrad2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor="#228B22" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#32CD32" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Botanical leaf-like shapes */}
        <Path
          d="M100 100 C120 80, 140 80, 160 100 C140 120, 120 120, 100 100"
          fill="url(#botanicalGrad1)"
        />
        <Path
          d="M250 150 C270 130, 290 130, 310 150 C290 170, 270 170, 250 150"
          fill="url(#botanicalGrad2)"
        />
        <Path
          d="M150 250 C170 230, 190 230, 210 250 C190 270, 170 270, 150 250"
          fill="url(#botanicalGrad1)"
        />
        <Path
          d="M300 300 C320 280, 340 280, 360 300 C340 320, 320 320, 300 300"
          fill="url(#botanicalGrad2)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

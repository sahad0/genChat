import React, {useEffect, useRef} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset to off-screen position first
      slideAnim.setValue(SCREEN_HEIGHT + insets.bottom);
      // Then animate to visible position
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim, insets.bottom]);

  if (!visible) return null;

  return (
    <View style={{marginTop: 100, backgroundColor: 'red'}}>
      <Modal
        style={{marginTop: 100}}
        visible={visible}
        transparent
        animationType="none">
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
        <View style={styles.overlay}>
          <Animated.View style={[styles.backdrop, {opacity: fadeAnim}]}>
            <TouchableOpacity
              style={styles.backdropTouch}
              activeOpacity={1}
              onPress={onClose}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{translateY: slideAnim}],
                bottom: -insets.bottom, // Position from actual bottom edge
              },
            ]}>
            {/* Handle */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* Content */}
            <View style={[styles.content, {paddingBottom: 24 + insets.bottom}]}>
              {children}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 46, 44, 0.4)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdropTouch: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#FBFAF0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#EDECE3',
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#5D5C5B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default BottomSheet;

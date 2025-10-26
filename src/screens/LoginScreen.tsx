import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  TextInput,
} from 'react-native';
import {useAuthStore} from '../store/authStore';
import SVGDecorations from '../components/SVGDecorations';
import {
  GeometricWarmBackground,
  OrganicNatureBackground,
  ModernArchitecturalBackground,
  FlowingOrganicBackground,
  BotanicalNatureBackground,
} from '../components/ArtisticBackgrounds';

const LoginScreen: React.FC = () => {
  const {login} = useAuthStore();
  const [showInputs, setShowInputs] = useState(false);
  const [email, setEmail] = useState('test@aira.ai');
  const [password, setPassword] = useState('password');
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  const handleInitialClick = () => {
    setShowInputs(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // Animate button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Start spinning animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      {iterations: -1},
    ).start();

    try {
      console.log('Attempting login with:', email, password);
      const success = await login(email, password);
      console.log('Login result:', success);
      if (success) {
        console.log('Login successful, should navigate to chat');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setIsLoading(false);
      spinAnim.stopAnimation();
      spinAnim.setValue(0);
    }
  };

  const arrowRotationInterpolate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const cycleBackground = () => {
    setCurrentBackground(prev => (prev + 1) % 5);
  };

  const renderArtisticBackground = () => {
    const backgrounds = [
      <GeometricWarmBackground key="geometric" opacity={0.4} />,
      <OrganicNatureBackground key="organic" opacity={0.4} />,
      <ModernArchitecturalBackground key="architectural" opacity={0.4} />,
      <FlowingOrganicBackground key="flowing" opacity={0.4} />,
      <BotanicalNatureBackground key="botanical" opacity={0.4} />,
    ];
    return backgrounds[currentBackground];
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SVGDecorations />
      {renderArtisticBackground()}

      {/* Main content area */}
      <View style={styles.content}>
        {/* Artistic title section */}
        <TouchableOpacity
          style={styles.titleSection}
          onPress={cycleBackground}
          activeOpacity={0.8}>
          <Text style={styles.mainTitle}>Welcome</Text>
          <Text style={styles.subtitle}>to the future of</Text>
          <Text style={styles.accentTitle}>conversation</Text>
        </TouchableOpacity>

        {/* Artistic description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Experience the next generation of AI-powered communication
          </Text>
        </View>

        {/* Animated Input Fields */}
        {showInputs && (
          <Animated.View
            style={[
              styles.inputsContainer,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="test@aira.ai"
                  placeholderTextColor="#5D5C5B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="password"
                  placeholderTextColor="#5D5C5B"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </Animated.View>
        )}

        {/* Login button with artistic styling */}
        <View style={styles.buttonSection}>
          {!showInputs ? (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleInitialClick}>
              <View style={styles.buttonGradient}>
                <Text style={styles.loginButtonText}>Enter the Experience</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Animated.View style={{transform: [{scale: buttonScale}]}}>
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  isLoading && styles.arrowButtonLoading,
                ]}
                onPress={handleLogin}
                disabled={isLoading}>
                <View style={styles.arrowButtonGradient}>
                  {isLoading ? (
                    <Animated.Text
                      style={[
                        styles.arrowButtonText,
                        {transform: [{rotate: spinInterpolate}]},
                      ]}>
                      ⟳
                    </Animated.Text>
                  ) : (
                    <Text style={styles.arrowButtonText}>→</Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Artistic footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by advanced AI technology
          </Text>
          <View style={styles.backgroundIndicator}>
            <View
              style={[
                styles.indicatorDot,
                currentBackground === 0 && styles.activeDot,
              ]}
            />
            <View
              style={[
                styles.indicatorDot,
                currentBackground === 1 && styles.activeDot,
              ]}
            />
            <View
              style={[
                styles.indicatorDot,
                currentBackground === 2 && styles.activeDot,
              ]}
            />
            <View
              style={[
                styles.indicatorDot,
                currentBackground === 3 && styles.activeDot,
              ]}
            />
            <View
              style={[
                styles.indicatorDot,
                currentBackground === 4 && styles.activeDot,
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9EF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '300',
    color: '#2E2E2C',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4F4D4C',
    fontWeight: '300',
    letterSpacing: 1,
    marginBottom: 5,
  },
  accentTitle: {
    fontSize: 32,
    color: '#5D5C5B',
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  descriptionSection: {
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#4F4D4C',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  loginButton: {
    width: 280,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  buttonGradient: {
    flex: 1,
    backgroundColor: '#2E2E2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginButtonText: {
    color: '#FAF9EF',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#5D5C5B',
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  backgroundIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(93, 92, 91, 0.3)',
  },
  activeDot: {
    backgroundColor: '#D4A574',
    transform: [{scale: 1.2}],
  },
  // New styles for animated inputs
  inputsContainer: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2E2E2C',
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: '#FBFAF0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  input: {
    height: 56,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2E2E2C',
    fontWeight: '400',
    textAlignVertical: 'center',
  },
  // Arrow button styles
  arrowButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDECE3',
  },
  arrowButtonGradient: {
    flex: 1,
    backgroundColor: '#2E2E2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  arrowButtonText: {
    color: '#FAF9EF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 10,
  },
  arrowButtonLoading: {
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#5D5C5B',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;

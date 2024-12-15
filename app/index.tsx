import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const hardwareSupported = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log('Hardware Supported:', hardwareSupported);
      console.log('Supported Types:', supportedTypes);

      if (
        hardwareSupported
      ) {
        setIsBiometricsAvailable(true);
      } else {
        Alert.alert('Biometrics not available', 'Your device does not support biometric authentication.');
      }
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Enter Password',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
        router.replace('/HistoryScreen');
      } else {  
        Alert.alert('Error', 'Authentication failed or canceled.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error(error);
    }
  };

  return (
    <View className="w-screen h-screen bg-black flex items-center justify-center">
        <Text className='text-white mb-5 text-3xl font-semibold'>Welcome to Your Secure Transaction History App</Text>
        <Text className='text-white mb-5'>Biometrics Login {!isBiometricsAvailable && 'Not'}Available</Text>
      <TouchableOpacity
        className="rounded-xl px-10 py-2 bg-white text-black"
        onPress={handleBiometricLogin}
      >
        <Text className="text-2xl font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false); // boolean to check if biometrics is available

  const router = useRouter();

  useEffect(() => {
    // Check if biometrics is available on the device as soon as the component mounts
    const checkBiometricSupport = async () => {
      const hardwareSupported = await LocalAuthentication.hasHardwareAsync(); // Check if the device supports biometrics
      const isEnrolled = await LocalAuthentication.isEnrolledAsync(); // Check if the user has enrolled biometrics
      if (
        hardwareSupported && isEnrolled
      ) {
        setIsBiometricsAvailable(true);
      } else {
        setIsBiometricsAvailable(false);
        Alert.alert('Biometrics not available', 'Your device does not support biometric authentication.'); // Show an alert if biometrics is not available
      }
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricLogin = async () => {
    // Authenticate the user using biometrics
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Enter Password',
        disableDeviceFallback: false,
      });

      if (result.success) {
        router.replace('/HistoryScreen'); // Redirect to the HistoryScreen when authentication is successful
      } else if (result.error == 'user_cancel') {
        Alert.alert('Authentication Cancelled', 'Authentication canceled by user.'); // Show an alert if authentication is canceled by the user
      } else if (result.error == 'system_cancel') {
        Alert.alert('Authentication Interrupted', 'Authentication interrupted by the system.'); // Show an alert if authentication is interrupted by the system
      }
      else {  
        Alert.alert('Authentication Failed', 'Authentication failed.'); // Show an alert if authentication fails
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.'); // Show an alert if an unexpected error occurs
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

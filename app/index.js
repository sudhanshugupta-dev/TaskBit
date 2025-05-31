// app/SplashScreen.jsx or app/splash.jsx (if using expo-router)
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/home'); // your ForecastScreen route
    }, 2500); // wait 2.5 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={['#00c6ff', '#0072ff']}
      style={styles.container}
    >
      <Image
        source={require('../assets/cloudy.png')} // weather icon
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>SkyCast</Text>
      <Text style={styles.subtitle}>Your Weather Companion</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0f7fa',
    marginTop: 10,
  },
});

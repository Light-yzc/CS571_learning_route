import { StyleSheet, Text, View } from 'react-native';
import Mascot from './src/components/Mascot';

export default function App() {
  return (
    <View style={styles.container}>
      <Mascot/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

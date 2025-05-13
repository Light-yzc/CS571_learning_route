import { StyleSheet, Text, View } from 'react-native';
import BadgerMart from './src/components/BadgerMart';

export default function App() {
  return (
    <View style={styles.container}>
      <BadgerMart/>
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

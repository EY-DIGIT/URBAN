import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebViewWrapper from './src/components/WebViewWrapper';
import { BACKGROUND_COLOR, WEB_PORTAL_URL } from './src/constant/appConstants'; 

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewWrapper url={WEB_PORTAL_URL} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default App;


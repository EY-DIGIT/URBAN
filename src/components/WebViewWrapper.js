// src/components/WebViewWrapper.js
import React, { useState, useEffect } from 'react'; // Import useEffect for lifecycle logging
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Import constants from a shared file (assuming src/constants/appConstants.js exists)
import { LOADING_COLOR } from '../constant/appConstants';

function WebViewWrapper({ url }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- New: Log prop values when component mounts or updates ---
  useEffect(() => {
    console.log('WebViewWrapper: Component mounted or updated.');
    console.log('WebViewWrapper: URL prop received:', url);
    // You could also log injectedJavaScriptBeforeLoad here, but it's a long string.
    // Consider logging its first few characters or a hash to confirm it's present.
  }, [url]); // Re-run if URL prop changes

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebViewWrapper: WebView error occurred!', nativeEvent); // More descriptive log
    setError(nativeEvent);
    setIsLoading(false);
  };

  const handleLoadStart = (syntheticEvent) => { // syntheticEvent contains navState
    const { nativeEvent } = syntheticEvent;
    console.log('WebViewWrapper: Load started for URL:', nativeEvent.url); // More detailed log
    setIsLoading(true);
    setError(null);
  };

  const handleLoadEnd = (syntheticEvent) => { // syntheticEvent contains navState
    const { nativeEvent } = syntheticEvent;
    console.log('WebViewWrapper: Load ended for URL:', nativeEvent.url); // More detailed log
    setIsLoading(false);
  };

  const handleNavigationStateChange = (navState) => {
    console.log('WebViewWrapper: Navigation State Changed to:', navState.url);
    if (navState.canGoBack) {
      console.log('WebViewWrapper: Can go back:', navState.canGoBack);
    }
    if (navState.canGoForward) {
      console.log('WebViewWrapper: Can go forward:', navState.canGoForward);
    }
  };

  // --- Start of Injected JavaScript for Responsiveness ---
  const injectedJavaScriptBeforeLoad = `
    (function() {
      // Add a log right at the start of the injected script to confirm execution
      console.log('WebViewInjected: Script started execution.');

      // 1. Ensure a proper viewport meta tag is present (critical for mobile rendering)
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.setAttribute('name', 'viewport');
        document.head.appendChild(viewportMeta);
        console.log('WebViewInjected: Viewport meta tag created and appended.');
      } else {
        console.log('WebViewInjected: Viewport meta tag already exists.');
      }
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      console.log('WebViewInjected: Viewport content set.');


      // 2. Inject CSS to override potentially non-responsive styles
      const style = document.createElement('style');
      style.innerHTML = \`
        /* General responsive rules */
        html, body {
          width: 100% !important;
          min-width: unset !important; /* Remove any fixed min-width */
          overflow-x: hidden !important; /* Prevent horizontal scrolling */
          box-sizing: border-box !important;
        }
        body > #root { /* Target common React root element */
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
        }
        img, video, iframe {
          max-width: 100% !important;
          height: auto !important;
          display: block; /* Helps with layout issues */
        }
        /* Target specific elements based on inspection of urban.eydemoapp.in */
        /* You will likely need to inspect the live site using browser developer tools
           and add more specific rules here for elements that don't adapt well.
           For example, if you see fixed-width columns or containers:
        */
        .digit-dashboard-card, .MuiGrid-grid-xs-12 { /* Example selectors - MIGHT NOT BE CORRECT */
            width: 100% !important;
            flex-basis: 100% !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            box-sizing: border-box !important;
        }
        /* If there's a specific header/navbar that's too wide: */
        .digit-header, .MuiAppBar-root {
            width: 100% !important;
            padding: 10px !important; /* Adjust padding as needed */
            box-sizing: border-box !important;
        }
        /* If form inputs are too small or too big */
        input[type="text"], input[type="password"], textarea, select {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 8px !important;
            font-size: 16px !important; /* Prevent iOS from zooming on input focus */
        }
        /* Adjust font sizes if they are too small/large */
        h1, h2, h3, h4, h5, h6 {
            font-size: 1.2em !important; /* Adjust as needed */
        }
        p, span, li, a {
            font-size: 1em !important; /* Adjust as needed */
        }

        /* Hide elements that might not be needed on mobile, e.g., sidebars or complex desktop navigation */
        .desktop-only-element {
          display: none !important;
        }

        /* For elements using flexbox that don't wrap */
        .flex-container-that-needs-wrap {
            flex-wrap: wrap !important;
        }
      \`;
      document.head.appendChild(style);
      console.log('WebViewInjected: Style tag created and appended with CSS.');

      // Final confirmation log from within the WebView context
      console.log('WebViewInjected: All responsive JavaScript and CSS operations completed.');
    })();
  `;
  // --- End of Injected JavaScript for Responsiveness ---

  return (
    <View style={styles.wrapperContainer}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={LOADING_COLOR} />
          <Text style={styles.loadingText}>Loading web portal...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
          <Text style={styles.errorMessage}>
            Error loading page: {error.description || error.message || 'Unknown error occurred.'}
          </Text>
          <Text style={styles.errorTip}>Please check your internet connection and try again.</Text>
        </View>
      )}

      <WebView
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleWebViewError}
        onNavigationStateChange={handleNavigationStateChange} // Use the new handler
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        inspectable={true}
        // --- Inject the JavaScript BEFORE the content loads ---
        injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeLoad}
        // This is important for a smooth experience and responsiveness
        // as it attempts to set the viewport and initial styles before rendering.
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (Your existing styles for wrapperContainer, webview, loadingOverlay, errorOverlay, etc.)
  wrapperContainer: { flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
  },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#555',
  },
  errorOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,0,0,0.85)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 11,
      padding: 20,
  },
  errorTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
  },
  errorMessage: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
  },
  errorTip: {
      color: '#eee',
      fontSize: 14,
      textAlign: 'center',
  },
});

export default WebViewWrapper;







// src/components/WebViewWrapper.js
// import React, { useState } from 'react';
// import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// // Import constants from a shared file
// import { LOADING_COLOR } from '../constant/appConstants'; // Assuming you create this file

// function WebViewWrapper({ url }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleWebViewError = (syntheticEvent) => {
//     const { nativeEvent } = syntheticEvent;
//     console.warn('WebView error: ', nativeEvent);
//     setError(nativeEvent);
//     setIsLoading(false);
//   };

//   const handleLoadStart = () => {
//     setIsLoading(true);
//     setError(null);
//   };

//   const handleLoadEnd = () => {
//     setIsLoading(false);
//   };

//   return (
//     <View style={styles.wrapperContainer}>
//       {isLoading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color={LOADING_COLOR} />
//           <Text style={styles.loadingText}>Loading web portal...</Text>
//         </View>
//       )}

//       {error && (
//         <View style={styles.errorOverlay}>
//           <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
//           <Text style={styles.errorMessage}>
//             Error loading page: {error.description || error.message || 'Unknown error occurred.'}
//           </Text>
//           <Text style={styles.errorTip}>Please check your internet connection and try again.</Text>
//         </View>
//       )}

//       <WebView
//         source={{ uri: url }}
//         style={styles.webview}
//         onLoadStart={handleLoadStart}
//         onLoadEnd={handleLoadEnd}
//         onError={handleWebViewError}
//         onNavigationStateChange={(navState) => {
//           console.log('Navigating to:', navState.url);
//         }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         allowsInlineMediaPlayback={true}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // ... (your existing styles for wrapperContainer, webview, loadingOverlay, errorOverlay, etc.)
//   wrapperContainer: { flex: 1 },
//   webview: { flex: 1 },
//   loadingOverlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(255,255,255,0.9)',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 10,
//   },
//   loadingText: {
//       marginTop: 10,
//       fontSize: 16,
//       color: '#555',
//   },
//   errorOverlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(255,0,0,0.85)',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 11,
//       padding: 20,
//   },
//   errorTitle: {
//       color: 'white',
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 10,
//       textAlign: 'center',
//   },
//   errorMessage: {
//       color: 'white',
//       fontSize: 16,
//       textAlign: 'center',
//       marginBottom: 15,
//   },
//   errorTip: {
//       color: '#eee',
//       fontSize: 14,
//       textAlign: 'center',
//   },
// });

// export default WebViewWrapper;
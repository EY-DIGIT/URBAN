import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Button from "../../components/Button"; 

const LoaderScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/Wave-2X.png")} // Replace with actual image path
                style={{
                    width: '110%',
                    height: 120,
                    position: 'contain',
                    top: -220,
                    left: 0,
                    right: 0,
                }}
            />

            {/* Logo at the top left */}
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/images/benifitVendor.jpeg")} style={styles.logo} />
            </View>

            {/* Content Container */}
            <View style={styles.content}>
                <Text style={styles.text}>One place for all{"\n"}Government</Text>
                <Text style={styles.text}>Benefits</Text>
                <View style={styles.subtextContainer}>
                    <Text style={styles.subtext}>Become an authorized distributor of</Text>
                    <Text style={styles.subtext}>government benefits</Text>
                </View>
            </View>

        
               {/* Get Started Button */}
             <Button 
                title="Get Started" 
                onPress={() => navigation.replace("Login")} 
                style={styles.button} 
                textStyle={styles.buttonText} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 40, // Added padding to ensure space at the top
    },
    logoContainer: {
        position: "absolute",
        top: 20,
        left: 20, // Aligns logo to the left
    },
    logo: {
        width: 190,
        height: 190,
        resizeMode: "contain",
        marginTop: 100,
        marginLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start", // Align text to the left
        width: "100%",
        marginLeft:80,
        marginTop: 70
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        color: "#000",
    },
    subtextContainer: {
        flexDirection: "column",
        marginTop: 20,
    },
    subtext: {
        fontSize: 16,
        textAlign: "left",
        color: "#666",
        marginTop: 0,  // Remove extra spacing
        marginBottom: 0, // Remove extra spacing
        lineHeight: 22, // Adjust spacing between lines
    },
    button: {
        width: "80%", // Make button wider
        paddingVertical: 14,
        marginBottom:200

    
    },
    buttonText: {
        fontSize: 18,
    },
});

export default LoaderScreen;
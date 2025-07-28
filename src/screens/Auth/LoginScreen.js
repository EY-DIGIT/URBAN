import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import Button from "../../components/Button";
import InformationPortalModal from "../../components/InformationPortalModal";
import loginStyles from "../../styles/loginStyles";
import commonStyles from "../../styles/commonStyles";
import { Linking, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [idenTTModalVisible, setIdenTTModalVisible] = useState(false);

    const openIdenTT = () => {
        console.log("Proceed button pressed.");
        const deepLinkURL = "myapp://auth"; // Use "myapp" instead of "identt"
    
      
        console.log("Attempting to open deep link:", deepLinkURL);
    
        Linking.canOpenURL(deepLinkURL)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(deepLinkURL);
                } else {
                    throw new Error("Deep linking not supported or IdenTT app not installed.");
                }
            })
            .then(() => console.log("Deep link opened successfully"))
            .catch((err) => {
                console.error("Failed to open deep link:", err);
                Alert.alert(
                    "Error",
                    "Unable to open IdenTT app. Please check if it's installed."
                );
            });
    };
    
    return (
        <View style={[commonStyles.container, commonStyles.centered]}>
            <Image
                source={require("../../assets/images/Wave-2X.png")}
                style={{
                    width: '110%',
                    height: 120,
                    position: 'contain',
                    top: -220, 
                    left: 0,
                    right: 0,
                }}
            />

            <Image
                source={require("../../assets/images/benifitVendor.jpeg")}
                style={loginStyles.image}
            />
          
            <Button title="Information Portal" onPress={() => setModalVisible(true)} style={loginStyles.infoButton} />
         
            <TouchableOpacity style={loginStyles.identButton} onPress={() => navigation.navigate("WithIdenTT")}>
                
                <Image
                    source={require("../../assets/images/authenticationIcon.png")}
                    style={loginStyles.identButtonIcon}
                />
                <Text style={loginStyles.identButtonText}>Continue with IdenTT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Eligibility")}>
                <Text style={commonStyles.linkText}>Register as a new vendor</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Text style={commonStyles.linkTextTwo}>Do not have an IdenTT? </Text>
               
                <TouchableOpacity onPress={() => setIdenTTModalVisible(true)}>   
                    <Text style={commonStyles.buttonText}>Create IdenTT</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={commonStyles.notice}>
                Please note: You need to be pre-approved by Ministry of Social Development and Family Services to proceed.
            </Text>
            
            <View style={commonStyles.footer}>
                <Text style={commonStyles.terms}>
                    By proceeding, you agree to our <Text style={commonStyles.link}>Terms of Service</Text> and <Text style={commonStyles.link}>Privacy Policy</Text>.
                </Text>
            </View>

            {/* Information Portal Modal */}
            <InformationPortalModal visible={modalVisible} onClose={() => setModalVisible(false)} navigation={navigation}/>


            {/* IdenTT Information Modal */}
            <Modal visible={idenTTModalVisible} transparent={true} animationType="fade">
                <View style={loginStyles.modalOverlay}>
                    <View style={loginStyles.modalContainer}>

                        {/* Close Button (Cross Icon) */}
                        <TouchableOpacity onPress={() => setIdenTTModalVisible(false)} style={loginStyles.modalCloseButton}>
                            <Text style={loginStyles.modalCloseButtonText}>✕</Text>
                        </TouchableOpacity>

                        {/* Modal Heading */}
                        <Text style={loginStyles.modalTitle}>Proceed with IdenTT app</Text>

                        {/* Modal Description */}
                        <Text style={loginStyles.modalMessage}>
                            To proceed, please grant consent in the IdenTT application.
                        </Text>

                        {/* Proceed Button (Right-Aligned) */}
                        <View style={loginStyles.proceedButtonContainer}>
                            <TouchableOpacity
                                onPress={openIdenTT}  // ✅ Correctly calling the function
                                style={loginStyles.proceedButton}>
                                <Text style={loginStyles.proceedButtonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LoginScreen;

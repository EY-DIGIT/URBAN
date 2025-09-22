import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getPTAcknowledgementData from "../../../getPTAcknowledgementData";


const successModal = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "40px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
}

const successIcon = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#000",
    border: "3px solid green",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const successButton = {
    marginTop: "30px",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#6b133f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
}

const downloadButton = {
    color: "#fff",
    border: "none",
    fontWeight: 700,
    padding: "0px",
    height: "35px",
    width: "auto",
    borderRadius: "6px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#6B133F",
    marginLeft: "auto",
}
const downloadSection = {
    width: "100%",
    textAlign: "right",
}

const SuccessPage = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { property } = location.state;

    console.log("property====>>", property)

    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const { tenants } = storeData || {};

    const handleDownloadPdf = async () => {
        // const { Properties = [] } = property;
        // let propertyData = (Properties && Properties[0]) || {};
        // console.log("property22222", propertyData)
        const tenantInfo = tenants.find((tenant) => tenant.code === property.tenantId);
        let tenantId = property.tenantId;
        console.log("tenantId", property.tenantId)
        const propertyDetails = await Digit.PTService.search({ tenantId, filters: { propertyIds: property?.propertyId, status: "INACTIVE" } });
        property.transferorDetails = propertyDetails?.Properties?.[0] || [];
        property.isTransferor = true;
        property.transferorOwnershipCategory = propertyDetails?.Properties?.[0]?.ownershipCategory
        const data = await getPTAcknowledgementData({ ...property }, tenantInfo, t);
        Digit.Utils.pdf.generate(data);
    };


    return (
        <div>
            <div style={downloadSection}>
                <button style={downloadButton} onClick={handleDownloadPdf}>Download Acknowledgement</button>
            </div>
            <div style={successModal}>
                <div style={successIcon}>
                    <span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
                </div>
                <h2 style={{ marginTop: "1rem" }}>Application Submitted Successfully</h2>
                <p style={{ color: "gray", marginTop: "30px" }}>
                    Application Number
                    <br />
                    {property && <strong style={{ marginTop: "30px" }}> {property?.acknowldgementNumber}</strong>}
                </p>
                <button style={successButton} onClick={() => window.location.href = "/digit-ui/citizen"}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
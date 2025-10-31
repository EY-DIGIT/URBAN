import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
 
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
};
 
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
};
 
const successButton = {
  marginTop: "30px",
  padding: "0.5rem 1.5rem",
  backgroundColor: "#6b133f",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
 
const downloadButton = {
  color: "#fff",
  border: "none",
  fontWeight: 700,
  height: "35px",
  borderRadius: "6px",
  padding: "10px 15px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#6B133F",
  marginLeft: "auto",
};
 
const downloadSection = {
  width: "100%",
  textAlign: "right",
};
 
const BannerResponse = () => {

  const location = useLocation();
  const ackNo = location?.state?.ackNo;
       const history = useHistory();

  const backClickSearch=()=>{

      history.push(`/digit-ui/citizen/pt/property/Actions`);
      
  }



  return (
<div>


{/* <div style={downloadSection}>
<button style={downloadButton}>Download Acknowledgement</button>
</div> */}
 
      <div style={successModal}>
<div style={successIcon}>
<span style={{ color: "white", fontSize: "1.5rem" }}>✔</span>
</div>
 
        <h2 style={{ marginTop: "1rem" }}>Application Submitted Successfully</h2>
 
        <p style={{ color: "gray", marginTop: "30px" }}>
          Application ID
<br />
<strong style={{ marginTop: "30px" }}>{ackNo}</strong>
</p>
 
        <button style={successButton}  onClick={backClickSearch}>Home</button>
</div>
</div>
  );
};
 
export default BannerResponse;
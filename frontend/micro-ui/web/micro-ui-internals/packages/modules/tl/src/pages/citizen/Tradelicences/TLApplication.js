import React from "react";
import styles from "./IndexStyle"
import UlbDetails from "./UlbDetailsSection";
import PropertyOwnerSection from "./PropertyOwnerSection";
import FirmDetailsSection from "./FirmDetailsSection";
import FirmAddressSection from "./FirmAddressSection";
import ApplicationDetailsSection from "./ApplicationDetailsSection";
import ApplicantDocuments from "./ApplicantDocumentsSection";
import FirmDocumentsSection from "./FirmDocumentsSection";
import SpecialDocumentsSection from "./SpecialDocumentsSection";
import OtherDocumentsSection from "./OtherDocumentsSection";
import SelfDeclarationSection from "./SelfDeclarationSection";
import ItemDetailsSection from "./ItemDetailsSection";
//Birth certificate components strats here
import SearchApplication from "./SearchApplication";
import NewbornDetailsSection from "./NewbornDetailsSection";
import AttachmentsSection from "./AttachmentsSection";
import OtherDetailsSection from "./OtherDetailsSection";
import DocumentsSection from "./DocumentsSection";
import BirthLandingPage from "./BirthLandingPage";
import DocumentsActionSection from "./DocumentsActionSection";

const TLApplication = () => {
  return (
    <div>
        <div style={{...styles.assessmentStyle, color: "#555555"}}>Trade License Application</div>
        <div style={styles.card}>
            <div style={styles.assessmentStyle}>ULB Details</div>
            <UlbDetails />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Property Owner Details</div>
            <div style={{...styles.assessmentStyle, fontSize: "14px"}}>Owner 1</div>
             <PropertyOwnerSection  />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Firm Details</div>
            <FirmDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Firm Address</div>
            <FirmAddressSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Application Details</div>
            <ApplicationDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Applicant & Detail Shop Documents</div>
            <ApplicantDocuments />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Firm/ Organisation Related Documents</div>
            <FirmDocumentsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Special Business / Professional License Documents</div>
            <SpecialDocumentsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Other Supporting/ Authority Documents</div>
            <OtherDocumentsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Item Details</div>
            <ItemDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Declaration</div>
            <SelfDeclarationSection />
        </div>
        
        {/* Birth Certificate Components ///////////////////////////////*/}
        <div style={styles.card}>
            <div style={styles.assessmentStyle}></div>
            <SearchApplication />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Newborn Details</div>
            <NewbornDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Attachments<br/>
                <p style={{fontSize: "10px", color: "#555555"}}>( *Accepted File Type : JPG/PNG/PDF **Maximum File Size 2MB)</p></div>
            <AttachmentsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Other Details<br/>
                <p style={{fontSize: "10px", color: "#555555"}}>Relative’s/Reporters Details Relationship With Child </p></div>
            <OtherDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Documents</div>
            <DocumentsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}></div>
            <BirthLandingPage />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Other Details<br/>
                <p style={{fontSize: "10px", color: "#555555"}}>Relative’s/Reporters Details Relationship With Child </p></div>
            <OtherDetailsSection />
        </div>

        <div style={styles.card}>
            <div style={styles.assessmentStyle}>Documents</div>
            <DocumentsActionSection />
        </div>

    </div>
  );
};

export default TLApplication;
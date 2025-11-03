import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./IndexStyle"
import { Dropdown, TextInput, Loader } from "@egovernments/digit-ui-react-components";

const SelfDeclaration = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  const handleSubmitClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // Navigate to SuccessModal page
    setShowConfirmModal(false);
    history.push("/digit-ui/citizen/tl/tradelicence/tradelicense-success");
  };

  const handleBack = () => {
    setShowConfirmModal(false);
  };

  return (

    <div>
      {/* Self Declaration */}
      <label style={{ fontSize: "13px" }}>
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
        />
          I hereby declare that the information provided above is true and correct to the best of my knowledge.
          I understand that I shall be held responsible for any misrepresentation.</label>
      
      {/* Submit Button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '30px' 
      }}>
        <button
          type="submit"
          onClick={handleSubmitClick}
          style={{
            backgroundColor: 'rgb(107, 19, 63)',
            color: 'white',
            border: 'none',
            padding: '8px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            minWidth: '180px',
          }}
        >
          Submit
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#6b133f',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '30px',
              lineHeight: '1.4'
            }}>
              Are you sure you want to submit this form?
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <button
                onClick={handleBack}
                style={{
                  backgroundColor: '#6b133f',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  minWidth: '80px'
                }}
              >
                Back
              </button>
              
              <button
                onClick={handleConfirm}
                style={{
                  backgroundColor: '#6b133f',
                  color: 'white',
                  border: '2px solid #fbbf24',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  minWidth: '80px'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    
  );
};

export default SelfDeclaration;
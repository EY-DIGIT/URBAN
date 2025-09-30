import React from 'react';

const ConfirmationModal = ({ t, onBack, onConfirm, styles: customStyles }) => {
  const defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '40px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    message: {
      fontSize: '18px',
      color: '#333',
      marginBottom: '30px',
      fontWeight: '500',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
    },
    button: {
      padding: '12px 32px',
      borderRadius: '24px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: '100px',
    },
    backButton: {
      backgroundColor: '#6B133F',
      color: '#ffffff',
    },
    confirmButton: {
      backgroundColor: '#6B133F',
      color: '#ffffff',
    },
  };

  // Merge custom styles with default styles
  const styles = { ...defaultStyles, ...customStyles };

  return (
    <div style={styles.overlay} onClick={onBack}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p style={styles.message}>
          {'Are you sure you want to submit this form?'}
        </p>
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.backButton }}
            onClick={onBack}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {t ? t('back') : 'Back'}
          </button>
          <button
            style={{ ...styles.button, ...styles.confirmButton }}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {t ? t('confirm') : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
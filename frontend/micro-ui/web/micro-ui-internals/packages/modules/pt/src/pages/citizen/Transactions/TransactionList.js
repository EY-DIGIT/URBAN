import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import { Download, ArrowLeft } from 'lucide-react';

const TransactionList = () => {
  const { propertyId } = useParams();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(null);
  const itemsPerPage = 10;

  // Get user info and tenant details
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
  const tenantId = userInfo1?.tenantId;
  const stateId = Digit.ULBService.getStateId();

  // Fetch payment data for this specific property
  const { data: paymentsData, isLoading: paymentsLoading } = Digit.Hooks.pt.useMyPropertyPayments(
    { tenantId: tenantId, filters: { consumerCodes: propertyId } },
    { enabled: !!propertyId }
  );

  // Get property details
  const { data: propertyData, isLoading: propertyLoading } = Digit.Hooks.pt.usePropertySearch(
    { tenantId, filters: { propertyIds: propertyId } },
    { enabled: !!propertyId }
  );

  // Get generatePdfKey for receipt generation
  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => "PT".includes(code))[0]?.receiptKey || "consolidatedreceipt",
  });

  const property = propertyData?.Properties?.[0];
  const payments = paymentsData?.Payments || [];

  // Pagination
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);

  const styles = {
    container: {
      // padding: '40px',
      // backgroundColor: '#f5f5f5',
      // minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    backButton: {
      backgroundColor: '#6B133F',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    heading: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#6B133F',
      margin: 0
    },
    propertyInfo: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    infoRow: {
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap'
    },
    infoItem: {
      flex: '1',
      minWidth: '200px'
    },
    infoLabel: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px',
      fontWeight: '500'
    },
    infoValue: {
      fontSize: '16px',
      color: '#333',
      fontWeight: '600'
    },
    tableWrapper: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflowX: 'auto',        
      overflowY: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      WebkitOverflowScrolling: 'touch'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '900px',
    },
    headerRow: {
      backgroundColor: '#b49baa',
    },
    headerCell: {
      padding: '16px 20px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d2d2d',
      borderBottom: 'none'
    },
    dataRow: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      transition: 'background-color 0.2s'
    },
    dataCell: {
      padding: '20px',
      fontSize: '14px',
      color: '#333333',
      whiteSpace: 'nowrap',   
      verticalAlign: 'middle'     
    },
    headerCell: {
      padding: '16px 20px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d2d2d',
      borderBottom: 'none',
      whiteSpace: 'nowrap'    
    },
    downloadButton: {
      backgroundColor: '#6B133F',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      fontSize: '14px',
      transition: 'background-color 0.2s',
      minWidth: '100px'
    },
    downloadButtonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      padding: '25px',
      backgroundColor: '#f8f8f8'
    },
    paginationButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
      backgroundColor: '#6B133F',
      color: '#ffffff'
    },
    paginationButtonDisabled: {
      backgroundColor: '#e0e0e0',
      color: '#999999',
      cursor: 'not-allowed'
    },
    pageInfo: {
      fontSize: '14px',
      color: '#666666',
      fontWeight: '500'
    },
    noResults: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#666',
      fontSize: '16px'
    },
    loader: {
      textAlign: 'center',
      padding: '60px 20px',
      fontSize: '16px',
      color: '#6B133F'
    }
  };

  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    @media (max-width: 768px) {
      table {
        font-size: 12px;
      }
      th, td {
        padding: 10px;
      }
      h1 {
        font-size: 24px;
      }
    }
  `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);


  const handleDownloadReceipt = async (payment) => {
    setIsDownloading(payment.id);
    try {
      const receiptNumber = payment?.paymentDetails?.[0]?.receiptNumber;

      if (!receiptNumber) {
        alert("Receipt number not found.");
        setIsDownloading(null);
        return;
      }

      const currentTenantId = Digit.ULBService.getCurrentTenantId();
      const state = Digit.ULBService.getStateId();

      // Fetch the receipt
      const payments = await Digit.PaymentService.getReciept(
        currentTenantId,
        "PT",
        { receiptNumbers: receiptNumber }
      );

      let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

      if (!payments.Payments[0]?.fileStoreId) {
        // Generate PDF with property details
        const paymentsWithDetails = payments.Payments.map(p => ({
          ...p,
          plotArea: property?.landArea,
          ward: property?.address?.ward,
          zone: property?.address?.zone,
          rateZone: property?.address?.locality?.children?.[0]?.name,
          address: `${property?.address?.doorNo}, ${property?.address?.street}, ${property?.address?.locality?.name}, ${property?.address?.pincode}`
        }));

        response = await Digit.PaymentService.generatePdf(
          state,
          { Payments: paymentsWithDetails },
          generatePdfKey
        );
      }

      // Print/download the receipt
      const fileStore = await Digit.PaymentService.printReciept(
        state,
        { fileStoreIds: response.filestoreIds[0] }
      );
      window.open(fileStore[response.filestoreIds[0]], "_blank");

    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setIsDownloading(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return '₹ 0';
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const getPaymentMode = (payment) => {
    return payment?.paymentMode || 'N/A';
  };

  const getReceiptNumber = (payment) => {
    return payment?.paymentDetails?.[0]?.receiptNumber || 'N/A';
  };

  const getOwnerName = () => {
    if (!property?.owners || property.owners.length === 0) return 'N/A';
    return property.owners.map(owner => owner.name).join(', ');
  };

  if (paymentsLoading || propertyLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>Loading receipts...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>List Of Transactions</h1>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Receipt Number</th>
              <th style={styles.headerCell}>Owner Name</th>
              <th style={styles.headerCell}>Transaction Date</th>
              <th style={styles.headerCell}>Receipt Date</th>
              <th style={styles.headerCell}>Amount</th>
              <th style={styles.headerCell}>Payment Mode</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((payment, index) => (
                <tr
                  key={payment.id || index}
                  style={styles.dataRow}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  <td style={styles.dataCell}>{getReceiptNumber(payment)}</td>
                  <td style={styles.dataCell}>{getOwnerName()}</td>
                  <td style={styles.dataCell}>{formatDate(payment.transactionDate)}</td>
                  <td style={styles.dataCell}>{formatDate(payment.auditDetails?.createdTime)}</td>
                  <td style={styles.dataCell}>{formatAmount(payment.totalAmountPaid)}</td>
                  <td style={styles.dataCell}>{getPaymentMode(payment)}</td>
                  <td style={styles.dataCell}>
                    <span style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Paid
                    </span>
                  </td>
                  <td style={styles.dataCell}>
                    <button
                      style={{
                        ...styles.downloadButton,
                        ...(isDownloading === payment.id ? styles.downloadButtonDisabled : {})
                      }}
                      onClick={() => handleDownloadReceipt(payment)}
                      disabled={isDownloading === payment.id}
                      onMouseOver={(e) => {
                        if (isDownloading !== payment.id) {
                          e.target.style.backgroundColor = '#8a1a5a';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (isDownloading !== payment.id) {
                          e.target.style.backgroundColor = '#6B133F';
                        }
                      }}
                    >
                      <button>{isDownloading === payment.id ? 'Downloading...' : 'Download'}</button>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={styles.noResults}>
                  No payment receipts found for this property.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {payments.length > 0 && (
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
              }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
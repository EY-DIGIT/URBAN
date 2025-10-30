import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Loader } from "@egovernments/digit-ui-react-components";

const PropertyManagement = ({ applications = [] }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  const itemsPerPage = 10;

  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));
  const tenantId = userInfo1?.tenantId;
  const stateId = Digit.ULBService.getStateId();

  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  // Get generatePdfKey for receipt generation
  const { data: generatePdfKey } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: (data) =>
      data["common-masters"]?.uiCommonPay?.filter(({ code }) => "PT".includes(code))[0]?.receiptKey || "consolidatedreceipt",
  });

  // Fetch payment data for all properties
  const consumerCodes = applications?.map((a) => a.propertyId).join(",");
  const { data: paymentsData, isLoading: paymentsLoading } = Digit.Hooks.pt.useMyPropertyPayments(
    { tenantId: tenantId, filters: { consumerCodes: consumerCodes } },
    { enabled: applications?.length > 0, propertyData: applications }
  );

  // CSS-in-JS styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "white",
      minHeight: "100vh"
    },
    searchSection: {
      padding: "20px",
      marginBottom: "20px",
    },
    searchTitle: {
      color: "#6B133F",
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "15px"
    },
    searchContainer: {
      display: "flex",
      gap: "80px",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: "10px"
    },
    searchInput: {
      minWidth: "120px",
      backgroundColor: "#F7F7F7",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px"
    },
    searchLabel: {
      fontSize: "14px",
      color: "#333",
      marginRight: "10px",
      minWidth: "80px"
    },
    buttonContainer: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap"
    },
    clearButton: {
      backgroundColor: "#6B133F",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500"
    },
    findButton: {
      backgroundColor: "#6B133F",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500"
    },
    propertiesSection: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      overflow: "hidden"
    },
    propertiesTitle: {
      color: "#6B133F",
      fontSize: "24px",
      fontWeight: "600",
      padding: "20px",
      borderBottom: "1px solid #eee",
      margin: 0,
    },
    tableContainer: {
      overflowX: "auto"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    tableHeader: {
      backgroundColor: "#6B133F66",
      color: "black"
    },
    tableHeaderCell: {
      padding: "12px",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "14px"
    },
    tableRow: {
      borderBottom: "1px solid #eee"
    },
    tableRowEven: {
      backgroundColor: "#f9f9f9"
    },
    tableCell: {
      padding: "12px",
      fontSize: "14px",
      verticalAlign: "top"
    },
    actionButtonsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    },
    actionButton: {
      backgroundColor: "transparent",
      color: "#6B133F",
      border: "1px solid #6B133F",
      padding: "6px 12px",
      borderRadius: "15px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      transition: "all 0.3s ease"
    },
    receiptButton: {
      backgroundColor: "transparent",
      color: "#6B133F",
      border: "1px solid #6B133F",
      padding: "6px 12px",
      borderRadius: "15px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      transition: "all 0.3s ease"
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      padding: "20px",
      backgroundColor: "white"
    },
    paginationText: {
      fontSize: "14px",
      color: "#666"
    },
    paginationButton: {
      backgroundColor: "#6B133F",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px"
    },
    paginationButtonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed"
    },
    noResults: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px"
    }
  };

  // Filter applications - show only ACTIVE status and apply search term
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter(app => app.status === "ACTIVE");

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.propertyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.owners?.some(owner => 
          owner.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [applications, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  // Handle search
  const handleSearch = () => {
    const propertyIdInput = document.getElementById("propertyIdInput");
    const inputValue = propertyIdInput ? propertyIdInput.value : "";
    setSearchTerm(inputValue);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
    // Clear the input field directly
    const propertyIdInput = document.getElementById("propertyIdInput");
    if (propertyIdInput) {
      propertyIdInput.value = "";
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetch estimate data for a specific property
  const fetchEstimateData = async (application) => {
    return new Promise((resolve, reject) => {
      const units = application?.units;
      const yearRange = Array.isArray(units) && units.length > 0
        ? units[0].toYear
        : null;

      if (!yearRange || !application?.propertyId) {
        reject(new Error("Missing required data"));
        return;
      }

      const payload = {
        Assessment: {
          financialYear: yearRange,
          propertyId: application?.propertyId,
          tenantId: tenantId,
          source: "MUNICIPAL_RECORDS",
          channel: "CITIZEN",
          assessmentDate: Date.now(),
        }
      };

      ptCalculationEstimateMutate(payload, {
        onSuccess: (data) => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  // Navigation handlers - fetch estimate data first
  const handleLedger = async (application) => {
    setIsLoadingEstimate(true);
    try {
      const estimateData = await fetchEstimateData(application);
      history.push({
        pathname: `/digit-ui/citizen/pt/PropertyLedger`,
        state: { 
          proOwnerDetail: application,
          calculation: estimateData?.Calculation?.[0],
        }
      });
    } catch (error) {
      console.error("Error fetching estimate:", error);
      alert("Failed to load property data. Please try again.");
    } finally {
      setIsLoadingEstimate(false);
    }
  };

  const handleDetailedLedger = async (application) => {
    setIsLoadingEstimate(true);
    try {
      const estimateData = await fetchEstimateData(application);
      history.push({
        pathname: `/digit-ui/citizen/pt/DetailLedgerPage`,
        state: { 
          proOwnerDetail: application,
          calculation: estimateData?.Calculation?.[0],
        }
      });
    } catch (error) {
      console.error("Error fetching estimate:", error);
      alert("Failed to load property data. Please try again.");
    } finally {
      setIsLoadingEstimate(false);
    }
  };

  const handleDemandNote = async (application) => {
    setIsLoadingEstimate(true);
    try {
      const estimateData = await fetchEstimateData(application);
      history.push({
        pathname: `/digit-ui/citizen/pt/DemandNote`,
        state: { 
          proOwnerDetail: application,
          calculation: estimateData?.Calculation?.[0],
        }
      });
    } catch (error) {
      console.error("Error fetching estimate:", error);
      alert("Failed to load property data. Please try again.");
    } finally {
      setIsLoadingEstimate(false);
    }
  };

  // Duplicate Receipt handler - using pre-fetched payment data
  // const handleDuplicateReceipt = async (application) => {
  //   setIsLoadingEstimate(true);
  //   try {
  //     // Find payments for this specific property
  //     const propertyPayments = paymentsData?.Payments?.filter(payment => 
  //       payment.paymentDetails?.some(detail => detail.bill?.consumerCode === application.propertyId)
  //     );

  //     if (!propertyPayments || propertyPayments.length === 0) {
  //       alert("No payment receipts found for this property.");
  //       setIsLoadingEstimate(false);
  //       return;
  //     }

  //     // Get the most recent payment
  //     const latestPayment = propertyPayments[0];
  //     const receiptNumber = latestPayment?.paymentDetails?.[0]?.receiptNumber;

  //     if (!receiptNumber) {
  //       alert("Receipt number not found in payment records.");
  //       setIsLoadingEstimate(false);
  //       return;
  //     }

  //     // Fetch estimate data
  //     const estimateData = await fetchEstimateData(application);

  //     const currentTenantId = Digit.ULBService.getCurrentTenantId();
  //     const state = Digit.ULBService.getStateId();

  //     // Fetch the receipt
  //     const payments = await Digit.PaymentService.getReciept(
  //       currentTenantId,
  //       "PT",
  //       { receiptNumbers: receiptNumber }
  //     );

  //     let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };

  //     if (!payments.Payments[0]?.fileStoreId) {
  //       // Generate PDF with calculation and property details
  //       const paymentsWithCalculation = payments.Payments.map(payment => ({
  //         ...payment,
  //         Calculation: estimateData?.Calculation?.[0] || {},
  //         plotArea: application?.landArea,
  //         ward: application?.address?.ward,
  //         zone: application?.address?.zone,
  //         rateZone: application?.address?.locality?.children?.[0]?.name,
  //         address: `${application?.address?.doorNo}, ${application?.address?.street}, ${application?.address?.locality?.name}, ${application?.address?.pincode}`
  //       }));
  //       response = await Digit.PaymentService.generatePdf(
  //         state,
  //         { Payments: paymentsWithCalculation },
  //         generatePdfKey
  //       );
  //     }

  //     // Print/download the receipt
  //     const fileStore = await Digit.PaymentService.printReciept(
  //       state,
  //       { fileStoreIds: response.filestoreIds[0] }
  //     );
  //     window.open(fileStore[response.filestoreIds[0]], "_blank");

  //   } catch (error) {
  //     console.error("Error generating duplicate receipt:", error);
  //     alert("Failed to generate duplicate receipt. Please try again.");
  //   } finally {
  //     setIsLoadingEstimate(false);
  //   }
  // };

const handleDuplicateReceipt = (application) => {
  history.push(`/digit-ui/citizen/pt/TransactionList/${application.propertyId}`);
};

  const formatOwnerNames = (owners) => {
    if (!owners || owners.length === 0) return "N/A";
    return owners.map(owner => owner.name).join(", ");
  };

 const formatStatus = (status) => {
  if (!status) return "N/A";

  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "Approved";
    case "SAVE":
      return "In Progress";
    case "INWORKFLOW":
      return "In Progress";
    case "INACTIVE":
      return "Rejected";
    default:
      return t(`PT_COMMON_${status}`) || status; // fallback to translation
  }
};


  if (isLoadingEstimate || paymentsLoading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      {/* Search Section */}
      <div style={styles.searchSection}>
        <h2 style={styles.searchTitle}>Search Property</h2>
        <span style={styles.searchLabel}>Property ID</span>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            id="propertyIdInput"
            placeholder="Enter Property ID..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div style={styles.buttonContainer}>
            <button style={styles.clearButton} onClick={handleClear}>
              Clear
            </button>
            <button style={styles.findButton} onClick={handleSearch}>
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Properties Table Section */}
      <h2 style={styles.propertiesTitle}>My Properties</h2>

      <div style={styles.propertiesSection}>        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Property ID</th>
                <th style={styles.tableHeaderCell}>Owner Name</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Tax Details</th>
                <th style={styles.tableHeaderCell}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.length > 0 ? (
                currentApplications.map((application, index) => (
                  <tr
                    key={application.propertyId || index}
                    style={{
                      ...styles.tableRow,
                      ...(index % 2 === 1 ? styles.tableRowEven : {})
                    }}
                  >
                    <td style={styles.tableCell}>
                      {application.propertyId || "N/A"}
                    </td>
                    <td style={styles.tableCell}>
                      {formatOwnerNames(application.owners)}
                    </td>
                    <td style={styles.tableCell}>
                      {formatStatus(application.status)}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtonsContainer}>
                        <button 
                          style={styles.actionButton}
                          onClick={() => handleLedger(application)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#6B133F";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#6B133F";
                          }}
                        >
                          Ledger
                        </button>
                        <button 
                          style={styles.actionButton}
                          onClick={() => handleDetailedLedger(application)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#6B133F";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#6B133F";
                          }}
                        >
                          Detailed Ledger
                        </button>
                        <button 
                          style={styles.actionButton}
                          onClick={() => handleDemandNote(application)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#6B133F";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#6B133F";
                          }}
                        >
                          Demand Note
                        </button>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.receiptButton}
                        onClick={() => handleDuplicateReceipt(application)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#6B133F";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#6B133F";
                        }}
                      >
                        Duplicate Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.noResults}>
                    {searchTerm ? "No active properties found matching your search." : "No active properties available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
              }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <span style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
              }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyManagement;
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const PropertyManagement = ({ applications = [] }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // CSS-in-JS styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "white",
      minHeight: "100vh"
    },
    searchSection: {
      // backgroundColor: "white",
      padding: "20px",
      // borderRadius: "8px",
      marginBottom: "20px",
      // boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
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
      backgroundColor: "#6B133F66",
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
      color: "white"
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
      whiteSpace: "nowrap"
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
      whiteSpace: "nowrap"
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
    },
    // Responsive styles
    "@media (maxWidth: 768px)": {
      tableHeaderCell: {
        padding: "8px",
        fontSize: "12px"
      },
      tableCell: {
        padding: "8px",
        fontSize: "12px"
      },
      actionButtonsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
      },
      actionButton: {
        fontSize: "10px",
        padding: "4px 8px"
      },
      receiptButton: {
        fontSize: "10px",
        padding: "4px 8px"
      }
    }
  };

  // Filter applications based on search term
  const filteredApplications = useMemo(() => {
    if (!searchTerm) return applications;
    
    return applications.filter(app =>
      app.propertyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.owners?.some(owner => 
        owner.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [applications, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatOwnerNames = (owners) => {
    if (!owners || owners.length === 0) return "N/A";
    return owners.map(owner => owner.name).join(", ");
  };

  const formatStatus = (status) => {
    return status ? t(`PT_COMMON_${status}`) : "N/A";
  };

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
            placeholder="Enter Property ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                        <button style={styles.actionButton}>
                          Ledger
                        </button>
                        <button style={styles.actionButton}>
                          Detailed Ledger
                        </button>
                        <button style={styles.actionButton}>
                          Demand Note
                        </button>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.receiptButton}>
                        Duplicate Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.noResults}>
                    {searchTerm ? "No properties found matching your search." : "No properties available."}
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



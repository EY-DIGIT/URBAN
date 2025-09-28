import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Toast } from "@egovernments/digit-ui-react-components";
import Popup from "../PaymentPopUp/PaymentPopUp"

const SearchProperty = ({ onSelect }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [formValue, setFormValue] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [errorShown, setErrorShown] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const [showPopup, setShowPopup] = useState(true);
  const [payFor, setPayFor] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can make this configurable
  const [totalPages, setTotalPages] = useState(0);

  const userInfo = Digit.UserService.getUser();

  console.log("userInfo", userInfo);

  if (payFor == 'own') {
    formValue.mobileNumber = userInfo?.info?.mobileNumber;
  }

  const { data: propertyData, billData, isLoading: propertyDataLoading, error } = Digit.Hooks.pt.usePropertySearchWithDue({
    tenantId: tenantId,
    filters: {
      ...(formValue.propertyIds ? { propertyIds: formValue.propertyIds } : {}),
      ...(formValue.mobileNumber ? { mobileNumber: formValue.mobileNumber } : {}),
    },
    auth: true,
    configs: {
      enabled: !!formValue.propertyIds || !!formValue.mobileNumber,
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
    },
  });
  // const activeProperties = propertyData?.filter(property => property.status === "ACTIVE");

  // Update search results and reset pagination
  useEffect(() => {
    console.log("propertyData===========>>", propertyData);

    if (propertyData?.FormattedData) {
      // Convert object to array, filter for ACTIVE, then use in state
      const activeResults = Object.values(propertyData.FormattedData).filter(
        (property) => property.status === "ACTIVE"
      );

      setSearchResults(activeResults);
      setCurrentPage(1);
      setTotalPages(Math.ceil(activeResults.length / itemsPerPage));
    }
  }, [propertyData, itemsPerPage]);


  // ✅ Update layout on resize
  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 600);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (
      propertyData?.Properties?.length > 50 && // Arbitrary max result, adjust if needed
      !errorShown
    ) {
      setShowToast({ error: true, warning: true, label: "ERR_PLEASE_REFINED_UR_SEARCH" });
      setErrorShown(true);
    }
  }, [propertyData]);

  const onPropertySearch = () => {
    const { propertyIds, mobileNumber } = formValue;

    if (!propertyIds && !mobileNumber) {
      setShowToast({ warning: true, label: "ERR_PT_FILL_VALID_FIELDS" });
      return;
    }

    if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setShowToast({ warning: true, label: "ERR_PT_INVALID_MOBILE" });
      return;
    }

    if (propertyIds && !/^[A-Za-z0-9-/]+$/.test(propertyIds)) {
      setShowToast({ warning: true, label: "ERR_PT_INVALID_PID" });
      return;
    }

    // For same-page results, you might not need to push to history
    // If you still want to navigate to results page, keep this:
    // const filters = {};
    // if (propertyIds) filters.propertyIds = propertyIds;
    // if (mobileNumber) filters.mobileNumber = mobileNumber;
    // history.push(
    //   `/digit-ui/citizen/pt/property/search-results?${Object.keys(filters)
    //     .map((key) => `${key}=${filters[key]}`)
    //     .join("&")}&city=${tenantId}`
    // );
  };

  const handleClear = () => {
    setFormValue({});
    setSearchResults([]);
    setCurrentPage(1);
    setTotalPages(0);
  };

  const handlePopupClose = (option) => {
    setShowPopup(false);
    setPayFor(option);
  };

  const proceedToPay = (property) => {
    // history.push(`/digit-ui/citizen/payment/my-bills/PT/${property.propertyId}`, { tenantId });
    history.push(`/digit-ui/citizen/pt/property/previewPayment/${property.propertyId}`, { tenantId });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 1) {
      rangeWithDots.push(1);
      if (range[0] > 2) rangeWithDots.push('...');
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) rangeWithDots.push('...');
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <div style={containerStyle}>
        <h4 style={headingStyle}>{t("SEARCH_PROPERTY")}</h4>
        <div style={rowStyle}>
          <div style={inputGroupWrapper}>
            <div>
              <label style={labelStyle}>
                {t("PROPERTY_ID")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("Enter Property ID")}
                style={inputStyle}
                value={formValue?.propertyIds || ""}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    propertyIds: e.target.value,
                    mobileNumber: "",
                  }))
                }
              />
            </div>

            {/* <div style={orStyle}>OR</div> */}

            {/* <div>
              <label style={labelStyle}>
                {t("Mobile Number")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("Mobile Number")}
                style={inputStyle}
                value={formValue?.mobileNumber || ""}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                    propertyIds: "",
                  }))
                }
              />
            </div> */}
          </div>

          <div style={buttonGroupStyle}>
            <button onClick={handleClear} style={clearButtonStyle}>
              {t("CITIZEN_CLEAR_BUTTON")}
            </button>
            <button onClick={onPropertySearch} style={findButtonStyle}>
              {t("CITIZEN_FIND_BUTTON")}
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {searchResults.length > 0 && (
        <div style={paymentSectionStyle}>
          <h3 style={paymentHeadingStyle}>{t("PAYMENT")}</h3>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{t("PROPERTY_ID")}</th>
                <th style={thStyle}>{t("OWNER_NAME")}</th>
                <th style={thStyle}>{t("MOBILE_NUMBER")}</th>
                <th style={thStyle}>{t("PAYMENT_AMOUNT")}</th>
                <th style={{ ...thStyle, textAlign: "center" }}>{t("ACTION")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((property) => {
                const owner = property.owners?.[0] || {};
                return (
                  <tr key={property.propertyId}>
                    <td style={tdStyle}>{property.propertyId}</td>
                    <td style={tdStyle}>{owner.name || "-"}</td>
                    <td style={tdStyle}>{owner.mobileNumber || "-"}</td>
                    <td style={tdStyle}>
                      ₹ {(property.due || 0).toLocaleString("en-IN")}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <button
                        style={{
                          ...payButtonStyle,
                          opacity: property.due === 0 || !property?.due ? 0.5 : 1,
                          cursor: property.due === 0 || !property?.due ? "not-allowed" : "pointer"
                        }}
                        onClick={() => proceedToPay(property)}
                        disabled={!property?.due || property.due === 0}
                      >
                        {t("PAY")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={paginationContainer}>
              <div style={paginationInfo}>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, searchResults.length)} of {searchResults.length} results
              </div>

              <div style={paginationControls}>
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  style={{
                    ...paginationButton,
                    ...(currentPage === 1 ? disabledButtonStyle : {})
                  }}
                >
                  Previous
                </button>

                {getPageNumbers().map((number, index) => (
                  number === '...' ? (
                    <span key={`dots-${index}`} style={paginationDots}>...</span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      style={{
                        ...paginationButton,
                        ...(currentPage === number ? activePageButton : {})
                      }}
                    >
                      {number}
                    </button>
                  )
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  style={{
                    ...paginationButton,
                    ...(currentPage === totalPages ? disabledButtonStyle : {})
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results Message */}
      {propertyDataLoading === false && searchResults.length === 0 && (formValue.propertyIds || formValue.mobileNumber) && (
        <div style={noResultsStyle}>
          {t("CS_PT_NO_PROPERTIES_FOUND")}
        </div>
      )}

      {showToast && (
        <Toast
          error={showToast.error}
          isDleteBtn={true}
          warning={showToast.warning}
          label={t(showToast.label)}
          onClose={() => {
            setShowToast(null);
            setErrorShown(false);
          }}
        />
      )}
      <Popup
        show={showPopup}
        onClose={(option) => handlePopupClose(option)}
      />
    </div>
  );
};

export default SearchProperty;

// -------------------------------------------
// STYLES
// -------------------------------------------
const containerStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px 30px",
  maxWidth: "1000px",
  fontFamily: "sans-serif",
};

const headingStyle = {
  margin: "0 0 24px 0",
  fontFamily: "Barlow, sans-serif",
  fontWeight: 600,
  fontSize: "20px",
  color: "#6B133F",
};

const rowStyle = {
  display: "flex",
  alignItems: "flex-end",
  gap: "50px",
  flexWrap: "wrap",
};

const inputGroupWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontFamily: "Noto Sans, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  color: "#505050",
};

const inputStyle = {
  width: "300px",
  padding: "10px 14px",
  borderRadius: "4px",
  border: "1px solid #D6D5D4",
  backgroundColor: "#F7F7F7",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s",
};

const orStyle = {
  fontWeight: "bold",
  color: "#555",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
};

const baseButtonStyle = {
  padding: "8px 32px",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s",
  border: "none",
  minWidth: "80px",
};

const clearButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#6B133F",
  color: "#fff",
};

const findButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#D4B5C7",
  color: "#fff",
};

const paymentSectionStyle = {
  marginTop: "32px",
  padding: "0 20px"
};

const paymentHeadingStyle = {
  margin: "0 0 16px 0",
  fontFamily: "Barlow, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  color: "#000",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#E8D4DE",
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 500,
  fontSize: "14px",
  color: "#505050",
  borderBottom: "1px solid #E0E0E0",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "14px",
  color: "#333",
  borderBottom: "1px solid #F0F0F0",
};

const payButtonStyle = {
  backgroundColor: "#fff",
  border: "1px solid #6B133F",
  color: "#6B133F",
  padding: "6px 24px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s",
};

const noResultsStyle = {
  padding: "32px",
  textAlign: "center",
  backgroundColor: "#fff",
  borderRadius: "8px",
  color: "#666",
};

// Pagination styles
const paginationContainer = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px"
};

const paginationInfo = {
  color: "#666",
  fontSize: "14px",
};

const paginationControls = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const paginationButton = {
  padding: "6px 12px",
  border: "1px solid #D6D5D4",
  backgroundColor: "#fff",
  color: "#333",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s",
  minWidth: "32px",
};

const activePageButton = {
  backgroundColor: "#6B133F",
  color: "#fff",
  borderColor: "#6B133F",
};

const disabledButtonStyle = {
  opacity: 0.5,
  cursor: "not-allowed",
  backgroundColor: "#f5f5f5",
};

const paginationDots = {
  padding: "0 8px",
  color: "#666",
};
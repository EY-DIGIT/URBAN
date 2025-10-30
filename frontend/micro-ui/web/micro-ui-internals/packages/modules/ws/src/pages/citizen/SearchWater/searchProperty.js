import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Toast } from "@egovernments/digit-ui-react-components";
import Popup from "../PaymentPopUp/PaymentPopUp"
import { Styles} from "../../../utils/cssHelper";
import  {toSentenceCase}  from "../../../utils/masterdataconvertHelper"
const SearchWater = ({ onSelect }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [formValue, setFormValue] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [errorShown, setErrorShown] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const [showPopup, setShowPopup] = useState(false);
  const [payFor, setPayFor] = useState('own');
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

  const { data: data, billData, isLoading: propertyDataLoading, error } =  Digit.Hooks.ws.useWaterSearch({
    tenantId: tenantId,
    filters: {
      ...(formValue.propertyIds ? { propertyIds: formValue.propertyIds } : {}),
      ...(formValue.mobileNumber ? { mobileNumber: formValue.mobileNumber } : {}),
    },
   BusinessService: "WS", t ,
    configs: {
      enabled: !!formValue.propertyIds || !!formValue.mobileNumber,
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
    },
  });
  // const activeProperties = data?.filter(property => property.status === "ACTIVE");

  // Update search results and reset pagination
useEffect(() => {
  console.log("data===========>>", data);
if (!data?.FormattedData) return;
const active = Object.values(data.FormattedData).filter(p => p.status === "Active");

  setSearchResults(prev => {
    const same = JSON.stringify(prev) === JSON.stringify(active);
    return same ? prev : active;
  });
 // setCurrentPage(1);
  setTotalPages(Math.ceil(active.length / itemsPerPage));
  // if (data?.FormattedData) {
  //   const activeResults = Object.values(data.FormattedData).filter(
  //     (property) => property.status === "Active"
  //   );

  //   setSearchResults(activeResults);
  //   setCurrentPage(1);
  //   setTotalPages(Math.ceil(activeResults.length / itemsPerPage));
  // }
}, [data, itemsPerPage]);





  // ✅ Update layout on resize
  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 600);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (
      data?.Properties?.length > 50 && // Arbitrary max result, adjust if needed
      !errorShown
    ) {
      setShowToast({ error: true, warning: true, label: "ERR_PLEASE_REFINED_UR_SEARCH" });
      setErrorShown(true);
    }
  }, [data]);

  const onPropertySearch = () => {
    const { propertyIds, mobileNumber } = formValue;

    if (!propertyIds && !mobileNumber) {
      setShowToast({ warning: true, label: "ERR_PT_FILL_VALID_FIELDS" });
      return;
    }
    if (propertyIds && !mobileNumber) {
      setShowToast({ warning: true, label: "ERR_PT_FILL_MOBILE_FIELDS" });
      return;
    }

    if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setShowToast({ warning: true, label: "ERR_PT_INVALID_MOBILE" });
      return;
    }

    // if (propertyIds && !/^[A-Za-z0-9-/]+$/.test(propertyIds)) {
    //   setShowToast({ warning: true, label: "ERR_PT_INVALID_PID" });
    //   return;
    // }

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
    // Clear the input field directly
    const applicationIdInput = document.getElementById("applicationIdInput");
    if (applicationIdInput) {
      applicationIdInput.value = "";
    }
  };

  const handlePopupClose = (option) => {
    setShowPopup(false);
    setPayFor(option);
  };

  const proceedToPay = (property) => {
    // history.push(`/digit-ui/citizen/payment/my-bills/PT/${property.propertyId}`, { tenantId });
    history.push(`/digit-ui/citizen/ws/water/previewPayment?consumerCode=${property.applicationNo}&businessService=WS`, { tenantId });
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
      <div style={Styles.containerStyle}>
        <h4 style={Styles.headingStyle}>{t("SEARCH_WATER_APPLICATION")}</h4>
        <div style={Styles.rowStyle}>
          <div style={Styles.inputGroupWrapper}>
            
            <div>
              <label style={Styles.labelStyle}>
                {t("WATER_APPLICATION")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="applicationIdInput"
                placeholder={t("Enter Application Number")}
                style={Styles.inputStyle}
                //value={formValue?.propertyIds || ""}
                // onChange={(e) =>
                //   setFormValue((prev) => ({
                //     ...prev,
                //     propertyIds: e.target.value,
                //     mobileNumber: "",
                //   }))
                // }
              />
            </div>

            {/* <div style={orStyle}>OR</div> */}

            <div>
              <label style={Styles.labelStyle}>
                {t("Mobile Number")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("Mobile Number")}
                style={Styles.inputStyle}
                value={formValue?.mobileNumber || ""}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                    propertyIds: "",
                  }))
                }
              />
            </div>
          </div>

          <div style={Styles.buttonGroupStyle}>
            <button onClick={handleClear} style={Styles.clearButtonStyle}>
              {t("CITIZEN_CLEAR_BUTTON")}
            </button>
            
            <button
              onClick={() => {
                const propertyId = document.getElementById("applicationIdInput").value; 
                setFormValue((prev) => ({
                  ...prev,
                  propertyIds: propertyId,
                  mobileNumber: "",
                }));
                onPropertySearch();
              }}
              style={Styles.findButtonStyle}
            >
              {t("CITIZEN_FIND_BUTTON")}
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {searchResults && searchResults.length > 0 && (
        <div style={Styles.paymentSectionStyle}>
          {/* <h3 style={paymentHeadingStyle}>{t("PAYMENT")}</h3> */}

          <table style={Styles.tableStyle}>
            <thead>
              <tr>
                <th style={Styles.thStyle}>{t("APPLICATION_NUMBER")}</th>
                <th style={Styles.thStyle}>{t("OWNER_NAME")}</th>
                 <th style={Styles.thStyle}>{t("ConsumerNumber")}</th>
                <th style={Styles.thStyle}>{t("MOBILE_NUMBER")}</th>
                {/* <th style={thStyle}>{t("PAYMENT_AMOUNT")}</th> */}
                <th style={Styles.thStyle}>{t("STATUS")}</th>
                <th style={{ ...Styles.thStyle, textAlign: "center" }}>{t("ACTION")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((property) => {
                const owner = property.owners?.[0] || {};
                return (
                  <tr key={property.applicationNo}>
                    <td style={Styles.tdStyle}>
                      
                      {/* {property.applicationNo} */}
                       <span className="link">
                                              <Link to={`/digit-ui/citizen/ws/application-details/${property.applicationNo}`}>
                                                {property.applicationNo}
                                              </Link>
                                            </span>
                      
                      </td>
                    <td style={Styles.tdStyle}>{property.ConsumerName || "-"}</td>
                     <td style={Styles.tdStyle}>{property.ConsumerNumber || "-"}</td>
                     
                    <td style={Styles.tdStyle}>{property.mobileNumber || "-"}</td>
                    <td style={Styles.tdStyle}>
                      {/* ₹ {(property.due || 0).toLocaleString("en-IN")} */}
                      <span style={property.applicationStatus ==="APPROVED"? Styles.statusActive:property.applicationStatus ==="REJECTED"? Styles.statusInactive:Styles.statusInWorkflow}>
                      
                      {toSentenceCase(property.applicationStatus) || "-"}
                      </span>
                    </td>
                    <td style={{ ...Styles.tdStyle, textAlign: "center" }}>
                      <button
                        style={{
                          ...Styles.payButtonStyle,
                          ...property.applicationStatus ==="PENDING PAYMENT" ? Styles.activePageButton:Styles.disabledButtonStyle
                          // opacity:property.applicationStatus !=="PENDING PAYMENT" ? 0.5:1,
                          // cursor:property.applicationStatus ==="PENDING PAYMENT"?"pointer" : "not-allowed",
                         // opacity: property.due === 0 || property.applicationStatus !=="PENDING PAYMENT" ||  !property?.due ? 0.5 : 1,
                         // cursor: property.due === 0 || property.applicationStatus !=="PENDING PAYMENT" ||  !property?.due ? "not-allowed" : "pointer"
                        }}
                        onClick={() => proceedToPay(property)}
                       // disabled={!property?.due || property.due === 0}
                        disabled={property.applicationStatus ==="PENDING PAYMENT"?false:true}
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
          {totalPages > 1 && data && data.length>0 && (
            <div style={Styles.paginationContainer}>
              <div style={Styles.paginationInfo}>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of {data.length} results
              </div>

              <div style={Styles.paginationControls}>
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  style={{
                    ...Styles.paginationButton,
                    ...(currentPage === 1 ? Styles.disabledButtonStyle : {})
                  }}
                >
                  Previous
                </button>

                {getPageNumbers().map((number, index) => (
                  number === '...' ? (
                    <span key={`dots-${index}`} style={Styles.paginationDots}>...</span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      style={{
                        ...Styles.paginationButton,
                        ...(currentPage === number ? Styles.activePageButton : {})
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
                    ...Styles.paginationButton,
                    ...(currentPage === totalPages ? Styles.disabledButtonStyle : {})
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
      {propertyDataLoading === false && data && data.length === 0 && (formValue.propertyIds || formValue.mobileNumber) && (
        <div style={Styles.noResultsStyle}>
          {t("CS_WS_NO_APPLICATION_FOUND")}
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

export default SearchWater;

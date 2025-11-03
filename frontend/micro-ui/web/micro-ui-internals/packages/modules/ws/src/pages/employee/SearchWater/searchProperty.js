import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Toast, Dropdown } from "@egovernments/digit-ui-react-components";
import { Styles} from "../../../utils/cssHelper";
import  {toSentenceCase}  from "../../../utils/masterdataconvertHelper"
//import Popup from "../PaymentPopUp/PaymentPopUp"

const SearchWater = ({ onSelect }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const [boundaryData, setBoundaryData] = useState(null);
  const { stateInfo } = storeData || {};
  const [formValue, setFormValue] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [errorShown, setErrorShown] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const [showPopup, setShowPopup] = useState(false);
  const [payFor, setPayFor] = useState('own1');
  const [searchResults, setSearchResults] = useState([]);
  const [zones, setZones] = useState([]);
  const [wards, setWards] = useState([]);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can make this configurable
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    applicationNumber: '',
    //  propertyId: '',
    mobileNumber: '',
    status: '',
    zone: "",
    Ward: "",
    applicationType: '',
    toDate: ''
  });
  const userInfo = Digit.UserService.getUser();

  console.log("userInfo", userInfo);

  if (payFor == 'own') {
    formValue.mobileNumber = userInfo?.info?.mobileNumber;
  }
  const updateWartd = (Type) => {
    if (boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === Type);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
    } else {
      setWards([]);
    }
  }
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const { data: data, billData, isLoading: propertyDataLoading, error } = Digit.Hooks.ws.useWaterSearch({
    tenantId: tenantId,
    filters: {
      ...(formValue.propertyIds ? { propertyIds: formValue.propertyIds } : {}),
      ...(formValue.mobileNumber ? { mobileNumber: formValue.mobileNumber } : {}),
    },
    BusinessService: "WS", t,
    configs: {
      enabled: !!formValue.propertyIds || !!formValue.mobileNumber,
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
    },
  });
  // Fetch boundary data and extract zones
  useEffect(() => {
    (async () => {
      try {
        const tenantId = Digit.ULBService.getCurrentTenantId();
        const response = await Digit.LocationService.getRevenueLocalities(tenantId);

        console.log("🔍 Raw TenantBoundary Response:", response);

        const cityBoundary = response?.TenantBoundary?.[0]?.boundary?.[0];
        if (cityBoundary?.children?.length > 0) {
          setBoundaryData(cityBoundary);

          const zoneOptions = cityBoundary.children.map((zone) => ({
            code: zone.code,
            name: zone.name || zone.code,
          }));
          setZones(zoneOptions);
        } else {
          console.warn("❌ No boundary children found.");
        }
      } catch (error) {
        console.error("❌ Error fetching boundary data:", error);
      }
    })();
  }, []);
  // Update Wards when Zone changes
  useEffect(() => {
    if (formData.zone && boundaryData?.children?.length > 0) {
      const selectedZone = boundaryData.children.find((z) => z.code === formData.zone);
      const wardList = selectedZone?.children || [];
      const formattedWards = wardList.map((ward) => ({
        code: ward.code,
        name: ward.name || ward.code,
      }));
      setWards(formattedWards);
    } else {
      setWards([]);
    }
  }, [formData.zone, boundaryData]);

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
    history.push(`/digit-ui/citizen/ws/property/previewPayment/${property.propertyId}`, { tenantId });
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
      {/* <div style={containerStyle}> */}
      <div className="main-container">
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
            {/* Zone No */}
            <div className="form-field" style={{ paddingTop: "25px", width: "250px" }} >
              <label style={Styles.labelStyle}>Zone</label>

              <Dropdown
                style={Styles.widthInput}
                t={t}
                option={zones}
                //selected={formData.zone}
                select={(option) => {

                  updateWartd(option.code)
                  // handleInputChange('zone', option.code)
                  // setWards([]);
                }}
                optionKey="name"
                placeholder={t("Select")}
              />
            </div>
            {/* Application No */}
            <div className="form-field" style={{ paddingTop: "25px", width: "250px" }} >
              <label style={Styles.labelStyle}>Ward</label>
              <Dropdown
                style={Styles.widthInput}
                t={t}
                option={wards}
                selected={formData.Ward}
                select={(option) => {
                  handleInputChange('Ward', option)

                }}
                optionKey="name"
                placeholder={t("Select")}
              />
            </div>
          </div>



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
      {/* Results Table */}
      {searchResults && searchResults.length > 0 && (
        <div style={Styles.paymentSectionStyle}>
          {/* <h3 style={paymentHeadingStyle}>{t("PAYMENT")}</h3> */}

          <table style={Styles.tableStyle}>
            <thead>
              <tr>
                <th style={Styles.thStyle}>{t("APPLICATION_NUMBER")}</th>
                <th style={Styles.thStyle}>{t("OWNER_NAME")}</th>
                <th style={Styles.thStyle}>{t("CONNECTION_NUMBER")}</th>
                <th style={Styles.thStyle}>{t("Address")}</th>
                <th style={Styles.thStyle}>{t("Ward")}</th>
                <th style={Styles.thStyle}>{t("Zone")}</th>
                {/* <th style={Styles.thStyle}>{t("Coloney")}</th> */}
                <th style={Styles.thStyle}>{t("Status")}</th>
                <th style={Styles.thStyle}>{t("Application Type")}</th>
                <th style={{ ...Styles.thStyle, textAlign: "center" }}>{t("ACTION")}</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((property) => {
                const owner = property.owners?.[0] || {};
                return (
                  <tr key={property.applicationNo}>
                    <td style={Styles.tdStyle}>
                      <span className="link">
                        <Link to={`/digit-ui/employee/ws/application-details/${property.applicationNo}`}>
                          {property.applicationNo}
                        </Link>
                        {/* {item.acknowldgementNumber || item.applicationNo} */}
                      </span>
                    </td>
                    <td style={Styles.tdStyle}>{property.ConsumerName || "-"}</td>
                     <td style={Styles.tdStyle}>{property?.ConsumerNumber || "-"}</td>
                      {/* <td style={Styles.tdStyle}>{
                      property.applicationStatus ==="APPROVED"? property.ConsumerNumber: "-"
                      }</td> */}
                    <td style={Styles.tdStyle}>{property.Address || "-"}</td>
                    <td style={Styles.tdStyle}>{property.ward || "-"}</td>
                    <td style={Styles.tdStyle}>{property.zone || "-"}</td>
                  
                    <td style={Styles.tdStyle}>
                     <span style={property.applicationStatus ==="APPROVED"? Styles.statusActive:property.applicationStatus ==="REJECTED"? Styles.statusInactive:Styles.statusInWorkflow}>
                                           
                                           {toSentenceCase(property.applicationStatus) || "-"}
                                           </span>
                    </td>
                    <td style={Styles.tdStyle}>{property.applicationType || "-"}</td>
                    <td style={{ ...Styles.tdStyle, textAlign: "center" }}>
                      <span className="link">
                        <Link to={`/digit-ui/employee/ws/application-details/${property.applicationNo}`}>
                          <img src={stateInfo?.uiImageAssets?.action_icon} alt="Property" style={{ width: "20px", height: "30px" }} />
                        </Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && data && data.length > 0 && (
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
      {propertyDataLoading === false && data.length === 0 && (formValue.propertyIds || formValue.mobileNumber) && (
        <div style={noResultsStyle}>
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
      {/* <Popup
        show={showPopup}
        onClose={(option) => handlePopupClose(option)}
      /> */}
    </div>
  );
};

export default SearchWater;


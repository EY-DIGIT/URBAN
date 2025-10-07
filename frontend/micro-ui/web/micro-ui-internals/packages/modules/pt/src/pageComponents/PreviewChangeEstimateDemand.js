import React, { useState, useEffect } from "react";
import {
    Loader, Card,
    SubmitBar,
    TextInput,
    Dropdown,
    CheckBox,
} from "@egovernments/digit-ui-react-components";
import { useLocation, useHistory } from "react-router-dom";
import DownloadPdfButton from "./DownloadPDF";
const styles = {
    container: {
        padding: "20px",
        fontSize: "14px",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        justifyContent: "space-between",
        width: "100%"
    },
    rowOwnerName: {
        // display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "16px",
        // justifyContent: "space-between",
        width: "100%"
    },
    field: {
        display: "block",
        // flexDirection: "column",
        alignItems: "center",

    },
    input: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "300px"

    },
    inputs: {
        height: "35px",
        border: "1px solid #D9D9D9",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        width: "300px",
    },
    label: {
        // fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0%",
        color: "#282828",
        width: "200px"
    },
    sectionHeader: {
        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "100%",
        letterSpacing: "0%",
        // textDecoration: "underline",
        textDecorationStyle: "solid",
        textDecorationOffset: "0%",
        textDecorationThickness: "0%",
        color: "#6b133f",
    },
    sectionHeaderDemand: {
        // fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "100%",
        letterSpacing: "0%",
        // textDecoration: "underline",
        textDecorationStyle: "solid",
        textDecorationOffset: "0%",
        textDecorationThickness: "0%",
        color: "#6b133f",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        marginBottom: "20px",
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px",
        // backgroundColor: "#6b133f",
        backgroundColor: "rgba(107, 19, 63, 0.2)",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        // color: "white",
        color: "#6b133f",
    },
    td: {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "center",
        // fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "130%",
        letterSpacing: "0%",
        color: "#000000",
    },
    downloadBtn: {
        float: "right",
        marginBottom: "10px",
        padding: "6px 12px",
        background: "white",
        border: "1px solid #6b133f",
        borderRadius: "12px",
        cursor: "pointer",
        // width: "202px",
        // fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "3%",
        textAlign: "center",
        color: "#6b133f",
        position: "absolute",
        right: "0px",
        top: "-42px",
    },
    cardD: {
        backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        padding: "16px",
        // border: "1px solid #000000",
        marginBottom: "22px",
        borderRadius: "12px",
    },
    confirmBtn: {
        padding: "10px 30px",
        backgroundColor: "#6b133f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        // float: "right",
        marginTop: "20px",
        // fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "100%",
        letterSpacing: "3%",
        color: "#FFFFFF",
        display: "flex",
        marginLeft: "auto"
    },
    bottomText: {
        color: "red",
        fontSize: "12px",
        marginTop: "8px",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box"
    },
    modalContent: {
        background: "#fff",
        borderRadius: "8px",
        padding: "40px",
        textAlign: "center",
        width: "500px",
        maxWidth: "100%",
        '@media (max-width: 768px)': {
            padding: "24px",
            width: "100%",
            maxWidth: "350px"
        }
    },
    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        '@media (max-width: 768px)': {
            flexDirection: "column",
            gap: "12px"
        }
    },
    modalButton: {
        backgroundColor: "#6b133f",
        color: "#fff",
        padding: "8px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        '@media (max-width: 768px)': {
            padding: "12px 20px",
            fontSize: "13px",
            width: "100%"
        }
    }
};

const InputField = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.input} value={value} readOnly />
    </div>
);
const InputFieldNew = ({ label, value }) => (
    <div style={styles.field}>
        <div style={styles.label}>{label}</div>
        <input style={styles.inputs} value={value} readOnly />
    </div>
);
const PreviewChangeEstimateDemand = () => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const history = useHistory();
    let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

    const location = useLocation();
    const { data, applicationData } = location.state || {}; // receive full object
    const calculation = data?.Calculation?.[0];

    const propertyFYDetails = calculation?.propertyFYDetails || [];
    const taxSummaries = calculation?.propertyFYTaxSummaries || [];
    console.log("propertyDetail", applicationData)
    const ownersDetail = applicationData?.owners || [];
    const address = applicationData?.address || {};

    const stateId = Digit.ULBService.getStateId();

    const [floorList, setFloorList] = useState([]);
    const { data: FloorAll = {}, isLoadingF } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Floor") || {};
    useEffect(() => {
        if (isLoadingF) return;

        const floors = FloorAll?.PropertyTax?.Floor || [];

        const mappedFloors = floors
            .filter(floor => floor?.code && floor?.active)
            .map(floor => ({
                i18nKey: floor.name,
                code: floor.code,
            }))
            .sort((a, b) => {
                const getSortValue = (val) => {
                    const num = parseInt(val, 10);
                    return isNaN(num) ? Number.MAX_SAFE_INTEGER : num;
                };
                return getSortValue(b.code) - getSortValue(a.code);
            });

        setFloorList(mappedFloors);
    }, [isLoadingF, FloorAll]);

    console.log("FLOOR NO=", floorList)

    const [boundaryData, setBoundaryData] = useState(null);
    const [zones, setZones] = useState([]);
    const [wards, setWards] = useState([]);
    const [colonies, setColonies] = useState([]);
    const [rateZones, setRateZones] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const tenantId = Digit.ULBService.getCurrentTenantId();
                const response = await Digit.LocationService.getRevenueLocalities(tenantId);

                console.log("🔍 Raw TenantBoundary Response:", response?.TenantBoundary);

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

    console.log("Zones No=", zones)

    // const handleConfirm = () => {
    //     const flag = true;
    //     const propertyId = applicationData?.propertyId;
    //     history.push({
    //         pathname: `applicationsearch/application-details/${propertyId}`, // 👈 send via query params
    //         state: { propertyId, flag } // 👈 also send via state if needed
    //     });
    // };
    const handleConfirm = () => {
        const flag = true;
        const propertyId = applicationData?.propertyId;

        sessionStorage.setItem("flagstatus", JSON.stringify(flag));
        window.location.href = `/digit-ui/employee/pt/modify-application/${propertyId}`;
    };

    return (
        <div id="downloadable-component">
            <div style={{ position: "relative" }}>
                <button style={styles.downloadBtn}><DownloadPdfButton targetId="downloadable-component" /></button>
                <div style={styles.cardD}>
                    <div style={styles.sectionHeaderDemand}>Demand</div>

                    <div style={styles.row}>
                        {/* <InputField label="Property id" value={calculation?.serviceNumber || "N/A"} />
                           <InputField label="Old Property id" value="567889" /> */}
                        <InputField label="Rate zone" value={applicationData?.units[0].rateZone || "N/A"} />
                    </div>
                    {ownersDetail.map((owner, index) => (
                        <React.Fragment key={owner.uuid || index}>
                            <div style={styles.sectionHeader}>Owner {index + 1}</div>
                            <div style={{ marginTop: "14px" }}></div>
                            <div style={styles.row}>
                                <InputField label="Owner Name" value={` ${owner?.name || "N/A"}`} />

                                <InputField label="Father/Husband Name" value={owner?.fatherOrHusbandName} />

                                <InputField label="Address" value={owner?.permanentAddress || "N/A"} />
                            </div>
                            <div style={styles.row}>

                                <InputField
                                    label="Zone"
                                    value={
                                        zones.find((f) => f.code === address?.zone)?.name || "N/A"
                                    }
                                />

                                {/* <InputField label="Zone" value={address?.zone || "N/A"} /> */}
                                <InputField label="Ward" value={address?.ward || "N/A"} />
                                <InputField label="Colony" value={address?.locality?.name || "N/A"} />
                            </div>
                            <div style={styles.row}>
                                <InputField label="Pincode" value={address?.pincode || "N/A"} />
                                <InputField label="Mobile Number" value={owner?.mobileNumber || "N/A"} />
                                <InputField
                                    label="Aadhaar ID"
                                    value={
                                        owner?.aadhaarNumber
                                            ? owner.aadhaarNumber.replace(/\d(?=\d{4})/g, "X")
                                            : "N/A"
                                    }
                                />

                            </div>
                            <div style={styles.row}>
                                <InputField label="Email ID" value={owner?.emailId || "N/A"} />
                                <InputField label="Exemption" value={owner?.ownerType || "N/A"} />
                                <InputField label="Date" value={owner?.createdDate ? new Date(owner.createdDate).toLocaleDateString("en-GB") : "N/A"} />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div style={styles.cardD}>
                    {/* Table 1 - Property Details */}
                    <div style={styles.sectionHeader}>Tax Details</div>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {["Year", "Usage Type", "Usage Factor", "Floor Number", "Construction Type", "Area (Sq feet)", "Rate", "ALV", "Maintenance Discount", "TPV"].map((h) => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {propertyFYDetails.map((item) => {
                                    const floor = floorList.find(f => f.code === item.floorNo);
                                    return (

                                        <tr key={item.year}>
                                            <td style={styles.td}>{item.year}</td>
                                            <td style={styles.td}>{item.usageType}</td>
                                            <td style={styles.td}>{item.usageFactor}</td>
                                            <td style={styles.td}>{floor?.i18nKey}</td>
                                            <td style={styles.td}>{item.constructionType}</td>
                                            <td style={styles.td}>{item.area}</td>
                                            <td style={styles.td}>₹ {Math.round(item.factor)}</td>
                                            <td style={styles.td}>₹ {Math.round(item.alv)}</td>
                                            <td style={styles.td}>₹ {Math.round(item?.discount)}</td>
                                            <td style={styles.td}>₹ {Math.round(item?.tpv)}</td>
                                        </tr>
                                    )
                                }

                                )

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={styles.cardD}>
                    {/* Table 2 - Tax Summary */}
                    <div style={styles.sectionHeader}>Property Tax Summary</div>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {["Year", "TPV", "Property Tax", "Consolidated Tax", "Education Cess", "Water Cess", "Drainage Cess", "Urban Development Cess", "Service Charge", "Total Tax", "Rebate", "Penalty", "Net Tax"].map((h) => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {taxSummaries.map((item) => (
                                    <tr key={item.year}>
                                        <td style={styles.td}>{item.year}</td>
                                        <td style={styles.td}>{Math.round(item.tpv)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.propertyTax)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.samekit)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.educationCess)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.jalKar)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.jalNikas)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.urbanTax)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.sevaKar)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.totalTax)}</td>
                                        <td style={styles.td}>₹ {Math.abs(item.rebate)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.penalty)}</td>
                                        <td style={styles.td}>₹ {Math.round(item.netTax)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={12} style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>TOTAL</td>
                                    <td style={styles.td}>
                                        ₹ {taxSummaries.reduce((sum, item) => sum + (item.netTax || 0), 0).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.bottomText}>
                        All values mentioned are in “₹” (Indian Rupees).
                    </div>
                    <div style={{ display: "flex", width: "224px", marginLeft: "auto" }}>
                        <button style={styles.confirmBtn} onClick={() => window.history.back()}>
                            Back
                        </button>
                        <button style={styles.confirmBtn} onClick={() => handleConfirm()}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewChangeEstimateDemand;
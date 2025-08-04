
// import React, { useCallback, useMemo, useEffect } from "react"


// const PTinboxTable = () => {

//    const { data, isLoadings, isFetching, isSuccesss } = Digit.Hooks.useNewInboxGeneralV2({
//       tenantId: Digit.ULBService.getCurrentTenantId(),
//       ModuleCode: "PT",
//       filters: { limit: 10, offset: 0, services: ["PT.CREATE", "PT.MUTATION", "PT.UPDATE"] },
//       // config: {
//       //   select: (data) => {
//       //     return { totalCount: data?.totalCount, nearingSlaCount: data?.nearingSlaCount } || "-";
//       //   },
//       //   enabled: Digit.Utils.ptAccess(),
//       // },
//     });
//     return <React.Fragment>


//          <div style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden", marginTop: "20px" }}>
//                         <table style={{ borderCollapse: "collapse", width: "100%" }}>
//                             <thead>
//                                 <tr style={{ backgroundColor: "#6b133f" }}>
//                                     <th style={headerStyle}>Application No</th>
//                                     <th style={headerStyle}>Property ID</th>
//                                     <th style={headerStyle}>Owner Name</th>
//                                     <th style={headerStyle}>Application Type</th>
//                                     <th style={headerStyle}>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array.isArray(data) && data.length > 0 ? (
//                                     data.map((item, index) => {
//                                         const {
//                                             acknowldgementNumber,
//                                             propertyId,
//                                             owners,
//                                         } = item.searchData || {};

//                                         const applicationType = item.workflowData?.businessService || "N/A";
//                                         const status = item.workflowData?.state?.applicationStatus || "N/A";

//                                         const ownerNames = Array.isArray(owners)
//                                             ? owners.map((owner) => owner.name).join(", ")
//                                             : "N/A";

//                                         return (
//                                             <tr key={index} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
//                                                 <td style={cellStyle}>{acknowldgementNumber || "N/A"}</td>
//                                                 <td style={cellStyle}>
//                                                     <a
//                                                         href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
//                                                         style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer" }}
//                                                     >
//                                                         {propertyId || "N/A"}
//                                                     </a>
//                                                 </td>

//                                                 <td style={cellStyle}>{ownerNames}</td>
//                                                 <td style={cellStyle}>{applicationType}</td>
//                                                 <td style={cellStyle}>{status}</td>
//                                             </tr>
//                                         );
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" style={{ textAlign: "center", padding: "12px", fontStyle: "italic" }}>
//                                             No data found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//     </React.Fragment>
// }
// const headerStyle = {
//     padding: "12px",
//     textAlign: "left",
//     fontWeight: "600",
//     fontSize: "14px",
//     color: "#333",
//     borderBottom: "1px solid #ddd",
// };

// const cellStyle = {
//     padding: "12px",
//     fontSize: "14px",
//     color: "#333",
//     borderBottom: "1px solid #f0f0f0",
// };

// export default PTinboxTable


import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
const PTinboxTable = () => {
    const [offset, setOffset] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation();
    const limit = 10;

    const tenantId = Digit.ULBService.getCurrentTenantId();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const inboxParams = useMemo(() => ({
        tenantId,
        ModuleCode: "PT",
        filters: {
            limit,
            offset,
            services: ["PT.CREATE", "PT.MUTATION", "PT.UPDATE"],
        },
        config: {
            enabled: true,
            select: (res) => res,
        },
    }), [offset]);

    const { data, isLoading, isFetching } = Digit.Hooks.useNewInboxGeneralV2(inboxParams);

    const results = data?.items || [];
    const totalCount = data?.totalCount || 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const handlePrevious = () => {
        if (offset >= limit) setOffset(offset - limit);
    };

    const handleNext = () => {
        if (offset + limit < totalCount) setOffset(offset + limit);
    };

    const renderMobileCard = (item, index) => {
        const bo = item?.businessObject || {};
        const pi = item?.ProcessInstance || {};

        const applicationNo = bo?.acknowldgementNumber || "N/A";
        const propertyId = bo?.propertyId || "N/A";
        const ownerNames = Array.isArray(bo?.owners)
            ? bo.owners.map((o) => o.name || o.ownerName || "").join(", ")
            : "N/A";

        const applicationType = pi?.businessService || "N/A";
        const status = pi?.state?.applicationStatus || "N/A";

        return (
            <div key={index} style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
                <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#6b133f" }}>Application No:</strong> {applicationNo}
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#6b133f" }}>Unique ID:</strong> 
                    <a
                        href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
                        style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer", marginLeft: "4px" }}
                    >
                        {propertyId}
                    </a>
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#6b133f" }}>Owner Name:</strong> {ownerNames}
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#6b133f" }}>Application Type:</strong> {t(applicationType)}
                </div>
                <div>
                    <strong style={{ color: "#6b133f" }}>Status:</strong> {status}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div style={{ margin: "0 auto", maxWidth: "1400px", background: "white", borderRadius: "10px", overflow: "hidden", width: "100%" }}>
                {isMobile ? (
                    <div style={{ padding: "16px" }}>
                        <h3 style={{ color: "#6b133f", marginBottom: "16px", textAlign: "center" }}>
                            Search Results
                        </h3>
                        {results.length > 0 ? (
                            results.map((item, index) => renderMobileCard(item, index))
                        ) : (
                            <div style={{ textAlign: "center", padding: "20px", fontStyle: "italic" }}>
                                {isLoading || isFetching ? "Loading..." : "No data found"}
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden" }}>
                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#6b133f" }}>
                                    <th style={headerStyle}>Application No</th>
                                    <th style={headerStyle}>Unique ID</th>
                                    <th style={headerStyle}>Owner Name</th>
                                    <th style={headerStyle}>Application Type</th>
                                    <th style={headerStyle}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length > 0 ? (
                                    results.map((item, index) => {
                                        const bo = item?.businessObject || {};
                                        const pi = item?.ProcessInstance || {};

                                        const applicationNo = bo?.acknowldgementNumber || "N/A";
                                        const propertyId = bo?.propertyId || "N/A";
                                        const ownerNames = Array.isArray(bo?.owners)
                                            ? bo.owners.map((o) => o.name || o.ownerName || "").join(", ")
                                            : "N/A";

                                        const applicationType = pi?.businessService || "N/A";
                                        const status = pi?.state?.applicationStatus || "N/A";

                                        return (
                                            <tr key={index} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
                                                <td style={cellStyle}>{applicationNo}</td>
                                                <td style={cellStyle}>
                                                    <a
                                                        href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
                                                        style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer" }}
                                                    >
                                                        {propertyId}
                                                    </a>
                                                </td>
                                                <td style={cellStyle}>{ownerNames}</td>
                                                <td style={cellStyle}>{t(applicationType)}</td>
                                                <td style={cellStyle}>{status}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "12px", fontStyle: "italic" }}>
                                            {isLoading || isFetching ? "Loading..." : "No data found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: isMobile ? "10px" : "20px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontFamily: "sans-serif",
                    flexWrap: "wrap",
                    padding: isMobile ? "0 10px" : "0"
                }}>
                    <button
                        onClick={handlePrevious}
                        disabled={offset === 0}
                        style={{
                            padding: isMobile ? "6px 12px" : "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset === 0 ? "#f0f0f0" : "#6B133F",
                            color: offset === 0 ? "#999" : "#fff",
                            cursor: offset === 0 ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease",
                            fontSize: isMobile ? "12px" : "14px"
                        }}
                    >
                        {isMobile ? "◀ Prev" : "◀ Previous"}
                    </button>

                    <span style={{ 
                        fontSize: isMobile ? "14px" : "16px", 
                        fontWeight: "500", 
                        color: "#333",
                        textAlign: "center"
                    }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={offset + limit >= totalCount}
                        style={{
                            padding: isMobile ? "6px 12px" : "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset + limit >= totalCount ? "#f0f0f0" : "#6B133F",
                            color: offset + limit >= totalCount ? "#999" : "#fff",
                            cursor: offset + limit >= totalCount ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease",
                            fontSize: isMobile ? "12px" : "14px"
                        }}
                    >
                        {isMobile ? "Next ▶" : "Next ▶"}
                    </button>
                </div>
            </div>

            {/* Pagination controls */}


        </React.Fragment>
    );
};

const headerStyle = {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    color: "white",
    borderBottom: "1px solid #ddd",
    background: "#6b133f",
};

const cellStyle = {
    padding: "12px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
};

export default PTinboxTable;

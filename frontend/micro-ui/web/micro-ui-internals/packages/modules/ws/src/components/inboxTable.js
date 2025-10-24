
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
const PTinboxTable = () => {
    const [offset, setOffset] = useState(0);
    const { t } = useTranslation();
    const limit = 10;
    
const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { stateInfo } = storeData || {};
  console.log("Sate Info=",stateInfo)

    const tenantId = Digit.ULBService.getCurrentTenantId();

    // const inboxParams = useMemo(() => ({
    //     tenantId,
    //     ModuleCode: "PT",
    //     filters: {
    //         limit,
    //         offset,
    //         services: ["PT.CREATE", "PT.MUTATION", "PT.UPDATE"],
    //     },
    //     config: {
    //         enabled: true,
    //         select: (res) => res,
    //     },
    // }), [offset]);

    //const { data, isLoading, isFetching } = Digit.Hooks.useNewInboxGeneralV2(inboxParams);
    const [payload, setPayload] = useState({status:"ACTIVE"})
    const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  }
    const { isLoading, isSuccess, data, isError } = Digit.Hooks.ws.useWaterSearch(
  { tenantId, filters: payload, BusinessService: "WS", t },
  config
);

    const results = isSuccess && !isLoading ? (data?.length > 0 ? data : { display: "ES_COMMON_NO_DATA" }) : []
    const totalCount = results.length || 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const handlePrevious = () => {
        if (offset >= limit) setOffset(offset - limit);
    };

    const handleNext = () => {
        if (offset + limit < totalCount) setOffset(offset + limit);
    };

    return (
        <React.Fragment>
            <div style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "auto", marginTop: "20px", background: "white" }}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead style={backGround23}>
                        <tr style={backGround23}>
                            <th style={headerStyle}>Application Number</th>
                           <th className="backGround23">Name</th>
                                            <th className="backGround23">Address</th>
                                            <th className="backGround23">Ward</th>
                                            <th className="backGround23">Zone</th>
                                            <th className="backGround23">Coloney</th>
                                            <th className="backGround23">Status</th>
                                            <th className="backGround23">Application Type</th>
                                            <th className="backGround23">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? (
                            results.map((item, index) => {
                                // const bo = item?.businessObject || {};
                                // const pi = item?.ProcessInstance || {};

                                // const applicationNo = bo?.applicationNo || "N/A";
                              
                                // const ownerNames = Array.isArray(bo?.owners)
                                //     ? bo.owners.map((o) => o.name || o.ownerName || "").join(", ")
                                //     : "N/A";

                                // const applicationType = pi?.businessService || "N/A";
                                // const status = pi?.state?.applicationStatus || "N/A";

                                return (
                                    <tr key={index} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
                                        <td style={cellStyle}>{item.applicationNo}</td>
                                        <td style={cellStyle}>
                                           {item.ConsumerName ?
                                                                item.ConsumerName : 'N/A'}
                                        </td>
                                        <td style={cellStyle}>{item.Address?item.Address : 'N/A'}</td>
                                        <td style={cellStyle}>{item.ward?item.ward : 'N/A'}</td>
                                        <td style={cellStyle}>{item.zone?item.zone : 'N/A'}</td>
                                        <td style={cellStyle}>{item.locality?item.locality : 'N/A'}</td>
                                        <td style={cellStyle}>  <span className={`status-badge status-${(item.status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                            {t(item.applicationStatus &&  item.applicationStatus) || "NA"}
                                        </span></td>
                                        <td style={cellStyle}>{item.applicationType?item.applicationType : 'N/A'}</td>
                                         <td style={cellStyle}>
                                            <a
                                                href={`/digit-ui/employee/ws/application-details?applicationNumber=${item.applicationNo}`}
                                                style={{ color: "#1d70b8", textDecoration: "underline", cursor: "pointer" }}
                                            >
                                                <img src={stateInfo?.uiImageAssets?.action_icon} alt="Property" style={{ width: "20px",height:"30px" }} />
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "12px", fontStyle: "italic" }}>
                                    {isLoading || isSuccess? "Loading..." : "No data found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontFamily: "sans-serif"
                }}>
                    <button
                        onClick={handlePrevious}
                        disabled={offset === 0}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset === 0 ? "#f0f0f0" : "#6B133F",
                            color: offset === 0 ? "#999" : "#fff",
                            cursor: offset === 0 ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        ◀ Previous
                    </button>

                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={offset + limit >= totalCount}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: offset + limit >= totalCount ? "#f0f0f0" : "#6B133F",
                            color: offset + limit >= totalCount ? "#999" : "#fff",
                            cursor: offset + limit >= totalCount ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease"
                        }}
                    >
                        Next ▶
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
    color: "rgba(40, 40, 40, 1)" ,
    borderBottom: "1px solid #ddd",
    background: "rgba(107, 19, 63, 0.3)",
    // background: "yellow",
    // backgroundColor:"rgba(107, 19, 63, 0.8)"
    
    
};
const backGround23={
    //  background: rgba(107, 19, 63, 0.3),
    //  color:black,
};

const cellStyle = {
    padding: "12px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
};

export default PTinboxTable;

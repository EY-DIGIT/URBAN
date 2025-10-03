import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const PTinboxTable = () => {
    const [offset, setOffset] = useState(0);
    const { t } = useTranslation();
    const limit = 10;
    
    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const { stateInfo } = storeData || {};

    const tenantId = Digit.ULBService.getCurrentTenantId();

    // Helper function to mask mobile number
    const maskMobileNumber = (mobile) => {
        if (!mobile) return 'N/A';
        const mobileStr = mobile.toString();
        if (mobileStr.length === 10) {
            return `xxx-xxx-${mobileStr.slice(-4)}`;
        }
        return mobileStr;
    };

    // Helper function to get father name
    const getFatherName = (owners) => {
        if (Array.isArray(owners) && owners.length > 0 && owners[0].fatherOrHusbandName) {
            return owners[0].fatherOrHusbandName;
        }
        return 'N/A';
    };

    // Helper function to get mobile number
    const getOwnerMobile = (owners) => {
        if (Array.isArray(owners) && owners.length > 0 && owners[0].mobileNumber) {
            return maskMobileNumber(owners[0].mobileNumber);
        }
        return 'N/A';
    };

    // Helper function to format address
    const getAddress = (address) => {
        if (!address) return 'N/A';
        const parts = [];
        if (address.doorNo) parts.push(address.doorNo);
        if (address.street) parts.push(address.street);
        if (address.landmark) parts.push(address.landmark);
        if (address.locality?.name) parts.push(address.locality.name);
        return parts.join(', ') || 'N/A';
    };

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
    }), [offset, tenantId]);

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

    return (
        <React.Fragment>
            <style>{`
                .inbox-container {
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: 1px solid #e0e0e0;
                }

                .inbox-header {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    font-size: 32px;
                    font-weight: 600;
                    color: rgba(107, 19, 63, 1);
                    margin-bottom: 20px;
                }

                .inbox-table-container {
                    overflow-x: auto;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    background: white;
                }

                .inbox-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }

                .inbox-table thead {
                    color: rgba(40, 40, 40, 1);
                }

                .inbox-table th {
                    padding: 14px 16px;
                    text-align: left;
                    font-weight: 500;
                    font-size: 14px;
                    white-space: nowrap;
                    background: rgba(107, 19, 63, 0.4);
                    border-bottom: 1px solid #ddd;
                }

                .inbox-table td {
                    padding: 14px 16px;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                    color: rgba(20, 27, 41, 1);
                }

                .inbox-table tbody tr:hover {
                    background: #f9f9f9;
                }

                .inbox-table tbody tr:last-child td {
                    border-bottom: none;
                }

                .inbox-link {
                    color: #6b133f;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                }

                .inbox-link:hover {
                    text-decoration: underline;
                }

                .inbox-status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .status-active {
                    background: #d4f8d4;
                    color: #0a6e0a;
                }

                .status-inactive {
                    background: #ffd4d4;
                    color: #d00000;
                }

                .status-inworkflow {
                    background: #fff3cd;
                    color: #856404;
                }

                .inbox-loading {
                    text-align: center;
                    padding: 40px;
                    color: #6b133f;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }

                .pagination-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                }

                .pagination-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .pagination-btn:not(:disabled) {
                    background-color: #6B133F;
                    color: #fff;
                }

                .pagination-btn:not(:disabled):hover {
                    background-color: #551030;
                    transform: translateY(-1px);
                }

                .pagination-btn:disabled {
                    background-color: #f0f0f0;
                    color: #999;
                    cursor: not-allowed;
                }

                .pagination-info {
                    fontSize: 16px;
                    font-weight: 500;
                    color: #333;
                }

                @media (max-width: 768px) {
                    .inbox-table-container {
                        margin-left: -20px;
                        margin-right: -20px;
                        border-radius: 0;
                    }
                    
                    .inbox-table th,
                    .inbox-table td {
                        padding: 10px 12px;
                        font-size: 13px;
                    }
                }
            `}</style>

            <div className="inbox-container">
                <h3 className="inbox-header">
                    Results
                    {totalCount > 0 && ` (${totalCount} found)`}
                </h3>
                
                <div className="inbox-table-container">
                    <table className="inbox-table">
                        <thead>
                            <tr>
                                <th>Application Number</th>
                                <th>Property ID</th>
                                <th>Address</th>
                                <th>Owner Name</th>
                                <th>Father Name</th>
                                <th>Mobile Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading || isFetching ? (
                                <tr>
                                    <td colSpan="7" className="inbox-loading">
                                        Loading...
                                    </td>
                                </tr>
                            ) : results.length > 0 ? (
                                results.map((item, index) => {
                                    const bo = item?.businessObject || {};
                                    const pi = item?.ProcessInstance || {};

                                    const applicationNo = bo?.acknowldgementNumber || "Prefilled";
                                    const propertyId = bo?.propertyId || "Prefilled";
                                    const ownerNames = Array.isArray(bo?.owners)
                                        ? bo.owners.map((o) => o.name || o.ownerName || "").filter(Boolean).join(", ")
                                        : "Prefilled";

                                    const applicationType = pi?.businessService || "N/A";
                                    const status = pi?.state?.applicationStatus || "Prefilled";

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a
                                                    href={`/digit-ui/employee/pt/applicationsearch/application-details/${propertyId}`}
                                                    className="inbox-link"
                                                >
                                                    {applicationNo}
                                                </a>
                                            </td>
                                            <td>{propertyId}</td>
                                            <td>{getAddress(bo?.address)}</td>
                                            <td>{ownerNames}</td>
                                            <td>{getFatherName(bo?.owners)}</td>
                                            <td>{getOwnerMobile(bo?.owners)}</td>
                                            <td>
                                                <span className={`inbox-status-badge status-${(status || '').toLowerCase().replace(/\s+/g, '')}`}>
                                                    {t(status && `WF_PT_${status}`) || status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="inbox-loading">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="pagination-container">
                        <button
                            onClick={handlePrevious}
                            disabled={offset === 0}
                            className="pagination-btn"
                        >
                            ◀ Previous
                        </button>

                        <span className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={offset + limit >= totalCount}
                            className="pagination-btn"
                        >
                            Next ▶
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default PTinboxTable;
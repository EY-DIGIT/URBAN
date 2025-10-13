import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Toast } from "@egovernments/digit-ui-react-components";

const PTFreezeProperty = () => {
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const { data: storeData } = Digit.Hooks.useStore.getInitData();
    const { stateInfo } = storeData || {};

    const [propertyId, setPropertyId] = useState("");
    const [showToast, setShowToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    
    // Initialize with a broad date range to fetch all properties on mount
    // Using a very old fromDate to capture all properties
    const getDefaultPayload = () => ({
        // fromDate: new Date('2000-01-01').getTime(), // Very old date to get all properties
        toDate: new Date().getTime(), // Current date
        // offset: currentPage * pageSize,
        // limit: pageSize
    });

    const [payload, setPayload] = useState(getDefaultPayload());

    const config = {
        enabled: true // Always enabled since we always have default payload
    };

    const { isLoading, isSuccess, data: { Properties: searchResult, Count: count } = {} } = Digit.Hooks.pt.usePropertySearch(
        {
            tenantId,
            filters: payload
        },
        config,
    );

    // Client-side filtering based on propertyId input
    const filteredProperties = searchResult?.filter((property) => {
        if (!propertyId.trim()) return true;
        return property.propertyId?.toLowerCase().includes(propertyId.toLowerCase());
    });

    const handleSearch = () => {
        if (propertyId.trim()) {
            // Search by specific property ID
            setPayload({ 
                propertyIds: propertyId.trim(),
                offset: 0,
                limit: pageSize 
            });
        } else {
            // Reset to default broad search
            setPayload(getDefaultPayload());
        }
        setCurrentPage(0);
    };

    const handleReset = () => {
        setPropertyId("");
        setPayload(getDefaultPayload());
        setShowToast(null);
        setCurrentPage(0);
    };

    const totalPages = count ? Math.ceil(count / pageSize) : 0;

    // Update payload when page changes
    useEffect(() => {
        setPayload(prev => ({ 
            ...prev, 
            offset: currentPage * pageSize 
        }));
    }, [currentPage]);

    return (
        <div>
            <style>{`
        * {
          box-sizing: border-box;
        }

        .search-container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .section-title {
          font-family: 'Roboto', sans-serif;
          font-weight: 600;
          font-size: 28px;
          color: #6B133F;
          margin: 0 0 30px 0;
        }

        .search-row {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 40px;
        }

        .input-group {
          flex: 1;
          max-width: 400px;
        }

        .input-label {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
          display: block;
        }

        .property-input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Roboto', sans-serif;
          background: #f8f8f8;
        }

        .property-input:focus {
          outline: none;
          border-color: #6B133F;
          background: white;
        }

        .property-input::placeholder {
          color: #999;
        }

        .button-group {
          display: flex;
          gap: 12px;
        }

        .btn {
          min-width: 120px;
          height: 48px;
          padding: 0 32px;
          border: none;
          border-radius: 24px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Roboto', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-clear {
          background: #6B133F;
          color: white;
        }

        .btn-clear:hover:not(:disabled) {
          background: #6B133F;
        }

        .btn-find {
          background: #c99fb1;
          color: white;
        }

        .btn-find:hover:not(:disabled) {
          background: #b88ea0;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .results-section {
          margin-top: 60px;
        }

        .table-wrapper {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        .result-table {
          width: 100%;
          border-collapse: collapse;
        }

        .result-table thead {
          background: #c99fb1;
        }

        .result-table th {
          padding: 16px;
          text-align: left;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #333;
        }

        .result-table td {
          padding: 16px;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #f0f0f0;
        }

        .result-table tbody tr:hover {
          background: #f9f9f9;
        }

        .result-table tbody tr:last-child td {
          border-bottom: none;
        }

        .action-icon {
          cursor: pointer;
          color: #6B133F;
        }

        .action-icon:hover {
          opacity: 0.7;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
        }

        .pagination-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:disabled {
          background: #e0e0e0;
          color: #999;
          cursor: not-allowed;
        }

        .pagination-btn:not(:disabled) {
          background: #6B133F;
          color: white;
        }

        .pagination-btn:not(:disabled):hover {
          background: #6B133F;
        }

        .page-info {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          color: #333;
        }

        .loading-state,
        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #666;
          font-family: 'Roboto', sans-serif;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          background: #e3f2fd;
          color: #1976d2;
        }

        @media (max-width: 768px) {
          .search-container {
            padding: 20px;
          }

          .search-row {
            flex-direction: column;
            align-items: stretch;
          }

          .input-group {
            max-width: 100%;
          }

          .button-group {
            width: 100%;
          }

          .btn {
            flex: 1;
          }
        }
      `}</style>

            <div className="search-container">
                <h1 className="section-title">Search</h1>

                <div className="search-row">
                    <div className="input-group">
                        <label className="input-label">Property ID</label>
                        <input
                            className="property-input"
                            type="text"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                            placeholder="1234XXX"
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="btn btn-clear"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            className="btn btn-clear"
                            onClick={handleSearch}
                            disabled={isLoading}
                        >
                            {isLoading ? "Searching..." : "Find"}
                        </button>
                    </div>
                </div>

                <div className="results-section">
                    <h2 className="section-title">Result</h2>

                    {isLoading ? (
                        <div className="loading-state">Loading properties...</div>
                    ) : filteredProperties && filteredProperties.length > 0 ? (
                        <>
                            <div className="table-wrapper">
                                <table className="result-table">
                                    <thead>
                                        <tr>
                                            <th>Property ID</th>
                                            <th>Owner Name</th>
                                            <th>Address</th>
                                            <th>Mobile Number</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProperties.map((property, index) => (
                                            <tr key={index}>
                                                <td>{property.propertyId || "N/A"}</td>
                                                <td>
                                                    {property.owners
                                                        ? property.owners.map((o) => o.name).join(", ")
                                                        : "N/A"}
                                                </td>
                                                <td>
                                                    {property.address
                                                        ? `${property.address.doorNo || ""} ${property.address.street || ""} ${property.address.locality?.name || ""}`
                                                        : "N/A"}
                                                </td>
                                                <td>{property.owners?.[0]?.mobileNumber || "N/A"}</td>
                                                <td>
                                                    <span className="status-badge">
                                                        {property.status || "Active"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/digit-ui/employee/pt/applicationsearch/application-details/${property.propertyId}`}
                                                        className="action-icon"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {propertyId.trim() && filteredProperties?.length === 0 && (
                                <div className="no-results">
                                    No properties found matching "{propertyId}"
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                        disabled={currentPage === 0 || isLoading}
                                    >
                                        Previous
                                    </button>
                                    <span className="page-info">
                                        Page {currentPage + 1} of {totalPages}
                                    </span>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                                        disabled={currentPage >= totalPages - 1 || isLoading}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-results">
                            {propertyId.trim() ? `No properties found matching "${propertyId}"` : "No properties available"}
                        </div>
                    )}
                </div>
            </div>

            {showToast && (
                <Toast
                    error={showToast.error}
                    warning={showToast.warning}
                    label={t(showToast.label)}
                    isDleteBtn={true}
                    onClose={() => setShowToast(null)}
                />
            )}
        </div>
    );
};

export default PTFreezeProperty;
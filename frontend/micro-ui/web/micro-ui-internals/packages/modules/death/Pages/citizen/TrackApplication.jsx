import React, { useState, useEffect } from "react";

const TrackApplication = () => {
    const [applicationId, setApplicationId] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [downloadCert, setDownloadCert] = useState(null);
    const [downloadTrigger, setDownloadTrigger] = useState(0);
    const tenantId = Digit.ULBService.getCurrentTenantId();

    const { isLoading, isError, data, error } = Digit.Hooks.death.useDeathSearch({
        tenantId,
        filters: { registrationNo: applicationId },
        auth: true,
        config: {
            enabled: !!triggerSearch && !!applicationId,
        },
    });

    const [isDownloading, setIsDownloading] = useState(false);


    useEffect(() => {
        if (data && triggerSearch) {
            setSearchResults(data);
            setTriggerSearch(false);
        }
    }, [data, triggerSearch]);

    const handleClear = () => {
        setApplicationId("");
        setTriggerSearch(false);
        setSearchResults(null);
    };

    const handleFind = () => {
        if (!applicationId) {
            alert("Please enter Application ID.");
            return;
        }
        setSearchResults(null);
        setTriggerSearch(true);
    };

    const getAddress = (cert) => {
        if (cert.deathPermaddr) {
            const addr = cert.deathPermaddr;
            return [addr.addressline1, addr.city, addr.state].filter(Boolean).join(", ");
        }
        return cert.placeofdeath || "N/A";
    };

    const getStatus = (status) => {
        return status || "APPROVED";
    };

    const getStatusClass = (status) => {
        const statusLower = (status || "").toLowerCase();
        if (statusLower === "completed" || statusLower === "active") return "status-active";
        if (statusLower === "rejected" || statusLower === "inactive") return "status-inactive";
        return "status-inworkflow";
    };

    const handleView = (cert) => {
        window.location.href = `/digit-ui/citizen/death/view-death-certificate-status/${cert.registrationno}`;
    };

    const handleDownload = async (cert) => {
        console.log("Download certificate:", cert);
        console.log("Certificate ID:", cert.id);

        try {
            setIsDownloading(true);

            // Call the death service API directly to get certificate data
            const response = await Digit.DeathService.download({
                tenantId,
                filters: { id: cert.id, source: "web" },
            });

            console.log("Download response:", response);

            // Check if we have filestore IDs
            if (response?.filestoreId) {
                // Get the actual file URL from filestore
                const state = Digit.ULBService.getStateId();

                const fileStore = await Digit.PaymentService.printReciept(
                    state,
                    { fileStoreIds: response.filestoreId }
                );

                console.log("File store URL:", fileStore);

                // Open the file in a new tab
                window.open(fileStore[response.filestoreId], "_blank");
            } else {
                alert("No file available for download");
            }
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download certificate. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };



    const styles = {
        container: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: "#f5f5f7",
            minHeight: "100vh",
            padding: "20px",
            maxWidth: "1400px",
            width: "100%",
        },
        backButton: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#333",
            cursor: "pointer",
            marginBottom: "20px",
            padding: "8px 0",
        },
        header: {
            marginBottom: "10px",
        },
        title: {
            fontSize: "32px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: "0 0 10px 0",
        },
        card: {
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "40px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            width: "calc(100vw - 300px)",
            maxWidth: "none",
        },
        searchTitle: {
            fontSize: "24px",
            fontWeight: "600",
            color: "#6b1c3d",
            marginBottom: "30px",
            marginTop: "0",
        },
        formRow: {
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            alignItems: "flex-end",
            width: "100%",
        },
        inputGroup: {
            flex: "1",
            display: "flex",
            flexDirection: "column",
        },
        label: {
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "8px",
        },
        input: {
            padding: "12px 16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            outline: "none",
            transition: "border-color 0.2s",
            backgroundColor: "#fafafa",
        },
        buttonGroup: {
            display: "flex",
            gap: "12px",
            paddingBottom: "4px",
        },
        button: {
            padding: "12px 32px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s",
            border: "none",
            backgroundColor: "#6b1c3d",
            color: "#ffffff",
        },
        tableWrapper: {
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            marginTop: "30px",
        },
        tableContainer: {
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            width: "100%",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            background: "white",
            tableLayout: "fixed",
        },
        thead: {
            color: "rgba(40, 40, 40, 1)",
        },
        th: {
            padding: "14px 20px",
            textAlign: "left",
            fontWeight: "500",
            fontSize: "14px",
            background: "rgba(107, 19, 63, 0.4)",
        },
        thAppNo: {
            width: "20%",
            borderTopLeftRadius: "8px",
        },
        thAddress: {
            width: "45%",
        },
        thStatus: {
            width: "20%",
        },
        thAction: {
            width: "15%",
            borderTopRightRadius: "8px",
        },
        td: {
            padding: "14px 20px",
            borderBottom: "1px solid #f0f0f0",
            fontSize: "14px",
            color: "rgba(20, 27, 41, 1)",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        statusBadge: {
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
        },
        actionButtons: {
            display: "flex",
            gap: "8px",
        },
        iconButton: {
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
            transition: "all 0.2s",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
        },
        iconButtonDisabled: {
            opacity: "0.4",
            cursor: "not-allowed",
        },
        loading: {
            textAlign: "center",
            padding: "40px",
            color: "#6b133f",
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        },
        noResults: {
            textAlign: "center",
            padding: "40px",
            color: "#666",
        },
    };

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => window.history.back()}>
                <span>← Back</span>
            </button>

            <div style={styles.header}>
                <h1 style={styles.title}>Track Application</h1>
            </div>

            <div style={styles.card}>
                <h2 style={styles.searchTitle}>Search Application</h2>

                <div style={styles.formRow}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Application ID</label>
                        <input
                            type="text"
                            placeholder="Enter"
                            value={applicationId}
                            onChange={(e) => setApplicationId(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            style={styles.button}
                            onClick={handleClear}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#541630")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b1c3d")}
                        >
                            Clear
                        </button>
                        <button
                            style={styles.button}
                            onClick={handleFind}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#541630")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b1c3d")}
                        >
                            Find
                        </button>
                    </div>
                </div>

                {isLoading && <p style={styles.loading}>Loading application details...</p>}
                {isError && <p style={{ color: "red" }}>Error: {error?.message}</p>}

                {searchResults?.deathCerts?.length > 0 && (
                    <div style={styles.tableWrapper}>
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead style={styles.thead}>
                                    <tr>
                                        <th style={{ ...styles.th, ...styles.thAppNo }}>Application No.</th>
                                        <th style={{ ...styles.th, ...styles.thAddress }}>Address</th>
                                        <th style={{ ...styles.th, ...styles.thStatus }}>Status</th>
                                        <th style={{ ...styles.th, ...styles.thAction }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.deathCerts.map((cert, index) => {
                                        const status = getStatus(cert.status);
                                        // const isCompleted = status.toUpperCase() === "SUCCESSFUL";
                                        const isCompleted = true;

                                        return (
                                            <tr key={cert.id || index} style={{ cursor: "default" }}>
                                                <td style={styles.td}>
                                                    <span style={{ color: "#6b133f", fontWeight: "500" }}>
                                                        {cert.registrationno || "N/A"}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>{getAddress(cert)}</td>
                                                <td style={styles.td}>
                                                    <span
                                                        style={{
                                                            ...styles.statusBadge,
                                                            backgroundColor:
                                                                getStatusClass(status) === "status-active"
                                                                    ? "#d4f8d4"
                                                                    : getStatusClass(status) === "status-inactive"
                                                                        ? "#ffd4d4"
                                                                        : "#fff3cd",
                                                            color:
                                                                getStatusClass(status) === "status-active"
                                                                    ? "#0a6e0a"
                                                                    : getStatusClass(status) === "status-inactive"
                                                                        ? "#d00000"
                                                                        : "#856404",
                                                        }}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={styles.actionButtons}>
                                                        <button
                                                            style={styles.iconButton}
                                                            onClick={() => handleView(cert)}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = "#f9f9f9";
                                                                e.target.style.borderColor = "#6b1c3d";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = "white";
                                                                e.target.style.borderColor = "#ddd";
                                                            }}
                                                            title="View"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            style={{
                                                                ...styles.iconButton,
                                                                ...(isCompleted ? {} : styles.iconButtonDisabled),
                                                            }}
                                                            onClick={() => isCompleted && handleDownload(cert)}
                                                            onMouseEnter={(e) => {
                                                                if (isCompleted) {
                                                                    e.target.style.backgroundColor = "#f9f9f9";
                                                                    e.target.style.borderColor = "#6b1c3d";
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (isCompleted) {
                                                                    e.target.style.backgroundColor = "white";
                                                                    e.target.style.borderColor = "#ddd";
                                                                }
                                                            }}
                                                            disabled={!isCompleted}
                                                            title={isCompleted ? "Download" : "Download (Available when completed)"}
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                <polyline points="7 10 12 15 17 10" />
                                                                <line x1="12" y1="15" x2="12" y2="3" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {searchResults?.deathCerts?.length === 0 && (
                    <div style={styles.noResults}>
                        No applications found for the given Application ID.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackApplication;
// import React, { useCallback, useMemo, useEffect } from "react"
// import { useForm, Controller } from "react-hook-form";
// import { TextInput, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Table, Card, MobileNumber, Loader, CardText, Header } from "@egovernments/digit-ui-react-components";
// import { Link } from "react-router-dom";
// import MobileSearchApplication from "./MobileSearchApplication";

// const PTSearchApplication = ({tenantId, isLoading, t, onSubmit, data, count, setShowToast }) => {
//     const isMobile = window.Digit.Utils.browser.isMobile();
//     const { register, control, handleSubmit, setValue, getValues, reset, formState } = useForm({
//         defaultValues: {
//             offset: 0,
//             limit: !isMobile && 10,
//             sortBy: "commencementDate",
//             sortOrder: "DESC"
//         }
//     })
//     useEffect(() => {
//       register("offset", 0)
//       register("limit", 10)
//       register("sortBy", "commencementDate")
//       register("sortOrder", "DESC")
//     },[register])
//     //need to get from workflow
//     const applicationTypes = [
//         {
//             code: "CREATE",
//             i18nKey: "CREATE"
//         },
//         {
//             code: "UPDATE",
//             i18nKey: "UPDATE"
//         },
//         {
//             code: "MUTATION",
//             i18nKey: "MUTATION"
//         },
//     ]
//     const applicationStatuses = [
//         {
//             code: "ACTIVE",
//             i18nKey: "WF_PT_ACTIVE"
//         },
//         {
//             code: "INACTIVE",
//             i18nKey: "WF_PT_INACTIVE"
//         },
//         {
//             code: "INWORKFLOW",
//             i18nKey: "WF_PT_INWORKFLOW"
//         },
//     ]

//     const getaddress = (address) => {
//         let newaddr = `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
//             address?.landmark ? `${address?.landmark}, ` : ""
//           }${t(address?.locality.code)}, ${t(address?.city)},${t(address?.pincode) ? `${address.pincode}` : " "}`
//         return newaddr;
//     }
//     const GetCell = (value) => <span className="cell-text">{value}</span>;
//     const columns = useMemo( () => ([
//         {
//             Header: t("PT_SEARCHPROPERTY_TABEL_PID"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.propertyId || ""),
//         },
//         {
//             Header: t("PT_APPLICATION_NO_LABEL"),
//             accessor: "acknowldgementNumber",
//             disableSortBy: true,
//             Cell: ({ row }) => {
//               return (
//                 <div>
//                   <span className="link">
//                     <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${row.original["propertyId"]}`}>
//                       {row.original["acknowldgementNumber"]}
//                     </Link>
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             Header: t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(row.creationReason || ""),
//           },
//           {
//             Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
//             accessor: (row) => GetCell(row.owners.map( o => o.name ). join(",") || ""),
//             disableSortBy: true,
//           },
//           {
//             Header: t("ES_SEARCH_PROPERTY_STATUS"),
//             accessor: (row) =>GetCell(t( row?.status &&`WF_PT_${row.status}`|| "NA") ),
//             disableSortBy: true,
//           },
//           {
//             Header: t("PT_ADDRESS_LABEL"),
//             disableSortBy: true,
//             accessor: (row) => GetCell(getaddress(row.address) || ""),
//           },
//       ]), [] )

//     const onSort = useCallback((args) => {
//         if (args.length === 0) return
//         setValue("sortBy", args.id)
//         setValue("sortOrder", args.desc ? "DESC" : "ASC")
//     }, [])

//     function onPageSizeChange(e){
//         setValue("limit",Number(e.target.value))
//         handleSubmit(onSubmit)()
//     }

//     function nextPage () {
//         setValue("offset", getValues("offset") + getValues("limit"))
//         handleSubmit(onSubmit)()
//     }
//     function previousPage () {
//         setValue("offset", getValues("offset") - getValues("limit") )
//         handleSubmit(onSubmit)()
//     }
//     let validation={}

//     return <React.Fragment>
//                 {isMobile ?
//                 <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit, formState, setShowToast }}/>
//                  :
//                 <div>
//                 <Header>{t("PT_SEARCH_PROP_APP")}</Header>
//                 < Card className={"card-search-heading"}>
//                     <span style={{color:"#505A5F"}}>{t("Provide at least one parameter to search for an application")}</span>
//                 </Card>
//                 <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
//                 <SearchField>
//                     <label>{t("PT_APPLICATION_NO_LABEL")}</label>
//                     <TextInput name="acknowledgementIds" inputRef={register({})} />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_SEARCHPROPERTY_TABEL_PID")}</label>
//                     <TextInput name="propertyIds" inputRef={register({})} />
//                 </SearchField>
//                 <SearchField>
//                 <label>{t("PT_OWNER_MOBILE_NO")}</label>
//                 <MobileNumber
//                     name="mobileNumber"
//                     inputRef={register({
//                     minLength: {
//                         value: 10,
//                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                     maxLength: {
//                         value: 10,
//                         message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                     pattern: {
//                     value: /[6789][0-9]{9}/,
//                     //type: "tel",
//                     message: t("CORE_COMMON_MOBILE_ERROR"),
//                     },
//                 })}
//                 type="number"
//                 componentInFront={<div className="employee-card-input employee-card-input--front">+91</div>}
//                 //maxlength={10}
//                 />
//                  <CardLabelError>{formState?.errors?.["mobileNumber"]?.message}</CardLabelError>
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE")}</label>
//                     <Controller
//                             control={control}
//                             name="creationReason"
//                             render={(props) => (
//                                 <Dropdown
//                                 selected={props.value}
//                                 select={props.onChange}
//                                 onBlur={props.onBlur}
//                                 option={applicationTypes}
//                                 optionKey="i18nKey"
//                                 t={t}
//                                 disable={false}
//                                 />
//                             )}
//                             />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("ES_SEARCH_PROPERTY_STATUS")}</label>
//                     <Controller
//                             control={control}
//                             name="status"
//                             render={(props) => (
//                                 <Dropdown
//                                 selected={props.value}
//                                 select={props.onChange}
//                                 onBlur={props.onBlur}
//                                 option={applicationStatuses}
//                                 optionKey="i18nKey"
//                                 t={t}
//                                 disable={false}
//                                 />
//                             )}
//                             />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_FROM_DATE")}</label>
//                     <Controller
//                         render={(props) => <DatePicker date={props.value} disabled={false} onChange={props.onChange} />}
//                         name="fromDate"
//                         control={control}
//                         />
//                 </SearchField>
//                 <SearchField>
//                     <label>{t("PT_TO_DATE")}</label>
//                     <Controller
//                         render={(props) => <DatePicker date={props.value} disabled={false} onChange={props.onChange} />}
//                         name="toDate"
//                         control={control}
//                         />
//                 </SearchField>
//                 <SearchField className="submit">
//                     <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
//                     <p style={{marginTop:"10px"}}
//                      onClick={() => {
//                         reset({ 
//                             acknowledgementIds: "", 
//                             fromDate: "", 
//                             toDate: "",
//                             propertyIds: "",
//                             mobileNumber:"",
//                             status: "",
//                             creationReason: "",
//                             offset: 0,
//                             limit: 10,
//                             sortBy: "commencementDate",
//                             sortOrder: "DESC"
//                         });
//                         setShowToast(null);
//                         previousPage();
//                     }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
//                 </SearchField>
//             </SearchForm>
//             {!isLoading && data?.display ? <Card style={{ marginTop: 20 }}>
//                 {
//                 t(data.display)
//                     .split("\\n")
//                     .map((text, index) => (
//                     <p key={index} style={{ textAlign: "center" }}>
//                         {text}
//                     </p>
//                     ))
//                 }
//             </Card>
//             :(!isLoading && data !== ""? <Table
//                 t={t}
//                 data={data}
//                 totalRecords={count}
//                 columns={columns}
//                 getCellProps={(cellInfo) => {
//                 return {
//                     style: {
//                     minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
//                     padding: "20px 18px",
//                     fontSize: "16px"
//                   },
//                 };
//                 }}
//                 onPageSizeChange={onPageSizeChange}
//                 currentPage={getValues("offset")/getValues("limit")}
//                 onNextPage={nextPage}
//                 onPrevPage={previousPage}
//                 pageSizeLimit={getValues("limit")}
//                 onSort={onSort}
//                 disableSort={false}
//                 sortParams={[{id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false}]}
//             />: data !== "" || isLoading && <Loader/>)}
//             </div>}
//         </React.Fragment>
// }

// export default PTSearchApplication



import React, { useCallback, useMemo, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form";
import { TextInput, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown, Table, Card, MobileNumber, Loader, CardText, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import MobileSearchApplication from "./MobileSearchApplication";
import PTinboxTable from "./inboxTable";

const PTSearchApplication = ({ tenantId, isLoading, t, onSubmit, data, count, setShowToast }) => {
    const isMobile = window.Digit.Utils.browser.isMobile();
    const { register, control, handleSubmit, setValue, getValues, reset, formState } = useForm({
        defaultValues: {
            offset: 0,
            limit: !isMobile && 10,
            sortBy: "commencementDate",
            sortOrder: "DESC"
        }
    })

    const [gridColumns, setGridColumns] = useState(3);

    // Add CSS to hide dropdown input and fix styling
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .digit-dropdown .digit-dropdown-input {
                display: none !important;
            }
            .digit-dropdown .digit-dropdown-selected {
                background: white !important;
                border: 1px solid #ccc !important;
                border-radius: 6px !important;
                height: 48px !important;
                padding: 14px 16px !important;
                font-size: 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                cursor: pointer !important;
            }
            .digit-dropdown .digit-dropdown-options {
                top: 100% !important;
                bottom: auto !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setGridColumns(1);
            } else if (width <= 900) {
                setGridColumns(2);
            } else {
                setGridColumns(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        register("offset", 0)
        register("limit", 10)
        register("sortBy", "commencementDate")
        register("sortOrder", "DESC")
    }, [register])
    //need to get from workflow
    const applicationTypes = [
        {
            code: "CREATE",
            i18nKey: "CREATE"
        },
        {
            code: "UPDATE",
            i18nKey: "UPDATE"
        },
        {
            code: "MUTATION",
            i18nKey: "MUTATION"
        },
    ]
    const applicationStatuses = [
        {
            code: "ACTIVE",
            i18nKey: "WF_PT_ACTIVE"
        },
        {
            code: "INACTIVE",
            i18nKey: "WF_PT_INACTIVE"
        },
        {
            code: "INWORKFLOW",
            i18nKey: "WF_PT_INWORKFLOW"
        },
    ]

    const getaddress = (address) => {
        let newaddr = `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
            }${t(address?.locality.code)}, ${t(address?.city)},${t(address?.pincode) ? `${address.pincode}` : " "}`
        return newaddr;
    }
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    const columns = useMemo(() => ([
        {
            Header: t("PT_SEARCHPROPERTY_TABEL_PID"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.propertyId || ""),
        },
        {
            Header: t("PT_APPLICATION_NO_LABEL"),
            accessor: "acknowldgementNumber",
            disableSortBy: true,
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="link">
                            <Link to={`/digit-ui/employee/pt/applicationsearch/application-details/${row.original["propertyId"]}`}>
                                {row.original["acknowldgementNumber"]}
                            </Link>
                        </span>
                    </div>
                );
            },
        },
        {
            Header: t("PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.creationReason || ""),
        },
        {
            Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
            accessor: (row) => GetCell(row.owners.map(o => o.name).join(",") || ""),
            disableSortBy: true,
        },
        {
            Header: t("ES_SEARCH_PROPERTY_STATUS"),
            accessor: (row) => GetCell(t(row?.status && `WF_PT_${row.status}` || "NA")),
            disableSortBy: true,
        },
        {
            Header: t("PT_ADDRESS_LABEL"),
            disableSortBy: true,
            accessor: (row) => GetCell(getaddress(row.address) || ""),
        },
    ]), [])

    const onSort = useCallback((args) => {
        if (args.length === 0) return
        setValue("sortBy", args.id)
        setValue("sortOrder", args.desc ? "DESC" : "ASC")
    }, [])

    function onPageSizeChange(e) {
        setValue("limit", Number(e.target.value))
        handleSubmit(onSubmit)()
    }

    function nextPage() {
        setValue("offset", getValues("offset") + getValues("limit"))
        handleSubmit(onSubmit)()
    }
    function previousPage() {
        setValue("offset", getValues("offset") - getValues("limit"))
        handleSubmit(onSubmit)()
    }
    // Styles
    const containerStyle = {
        background: "white",
        padding: "40px",
        margin: "0 auto",
        width: "100%",
        maxWidth: "1400px",
        borderRadius: "0",
        boxShadow: "none",
        boxSizing: "border-box",
        minHeight: "100vh"
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: "2.5rem 2rem",
        marginBottom: "2rem",
        width: "100%"
    };

    const fieldStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minWidth: "0"
    };

    const labelStyle = {
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        letterSpacing: "0%",
        color: "#282828",
        whiteSpace: "nowrap",
        marginBottom: "8px"
    };

    const inputStyle = {
        borderRadius: "6px",
        height: "48px",
        padding: "14px 16px",
        border: "1px solid #ccc",
        fontSize: "16px",
        width: "100%",
        maxWidth: "100%",
        minWidth: "250px",
        boxSizing: "border-box",
        transition: "border-color 0.2s ease"
    };

    const dropdownStyle = {
        borderRadius: "6px",
        height: "48px",
        border: "1px solid #ccc",
        fontSize: "16px",
        width: "100%",
        maxWidth: "100%",
        minWidth: "250px",
        boxSizing: "border-box",
        position: "relative"
    };

    const datePickerStyle = {
        width: "100%",
        maxWidth: "100%",
        minWidth: "250px",
        height: "48px"
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "1rem",
        marginTop: "3rem",
        gridColumn: "1 / -1",
        paddingTop: "1rem",
        borderTop: "1px solid #f0f0f0"
    };

    let validation = {}

    return <React.Fragment>
        {isMobile ?
            <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit, formState, setShowToast }} />
            :
            <div style={containerStyle}>
                <Card className={"card-search-heading"} style={{marginBottom: "2rem"}}>
                    <span style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "42.5px",
                        letterSpacing: "3%",
                        verticalAlign: "middle",
                        color: "#6b133f"
                    }}>{t("Search Criteria")}</span>
                </Card>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <div style={gridStyle}>
                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("Application No.")}</label>
                            <TextInput name="acknowledgementIds" style={inputStyle} inputRef={register({})} />
                        </SearchField>
                        
                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("Property ID")}</label>
                            <TextInput name="propertyIds" style={inputStyle} inputRef={register({})} />
                        </SearchField>
                        
                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("Owner Mobile No.")}</label>
                            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <div style={{ 
                                    padding: "14px 16px",
                                    backgroundColor: "#f5f5f5",
                                    border: "1px solid #ccc",
                                    borderRight: "none",
                                    borderRadius: "6px 0 0 6px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "16px",
                                    boxSizing: "border-box"
                                }}>
                                    +91
                                </div>
                                <input
                                    name="mobileNumber"
                                    type="number"
                                    ref={register({
                                        minLength: {
                                            value: 10,
                                            message: t("CORE_COMMON_MOBILE_ERROR"),
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: t("CORE_COMMON_MOBILE_ERROR"),
                                        },
                                        pattern: {
                                            value: /[6789][0-9]{9}/,
                                            message: t("CORE_COMMON_MOBILE_ERROR"),
                                        },
                                    })}
                                    style={{
                                        ...inputStyle,
                                        borderRadius: "0 6px 6px 0",
                                        borderLeft: "none",
                                        flex: 1,
                                        minWidth: "200px"
                                    }}
                                />
                            </div>
                            <CardLabelError>{formState?.errors?.["mobileNumber"]?.message}</CardLabelError>
                        </SearchField>

                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("Application Status")}</label>
                            <div style={{ 
                                position: "relative", 
                                zIndex: 10,
                                width: "100%"
                            }}>
                                <Controller
                                    control={control}
                                    name="status"
                                    render={(props) => (
                                        <div style={{ position: "relative" }}>
                                            <Dropdown
                                                style={dropdownStyle}
                                                selected={props.value}
                                                select={props.onChange}
                                                onBlur={props.onBlur}
                                                option={applicationStatuses}
                                                optionKey="i18nKey"
                                                t={t}
                                                disable={false}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </SearchField>

                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("From Date")}</label>
                            <div style={datePickerStyle}>
                                <Controller
                                    render={(props) => (
                                        <DatePicker 
                                            date={props.value} 
                                            disabled={false} 
                                            onChange={props.onChange}
                                        />
                                    )}
                                    name="fromDate"
                                    control={control}
                                />
                            </div>
                        </SearchField>

                        <SearchField style={fieldStyle}>
                            <label style={labelStyle}>{t("To Date")}</label>
                            <div style={datePickerStyle}>
                                <Controller
                                    render={(props) => (
                                        <DatePicker 
                                            date={props.value} 
                                            disabled={false} 
                                            onChange={props.onChange}
                                        />
                                    )}
                                    name="toDate"
                                    control={control}
                                />
                            </div>
                        </SearchField>

                        <div style={buttonContainerStyle}>
                            <button
                                type="button"
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "white",
                                    color: "#F47738",
                                    border: "1px solid #F47738",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    minWidth: "100px"
                                }}
                                onClick={() => {
                                    reset({
                                        acknowledgementIds: "",
                                        fromDate: "",
                                        toDate: "",
                                        propertyIds: "",
                                        mobileNumber: "",
                                        status: "",
                                        creationReason: "",
                                        offset: 0,
                                        limit: 10,
                                        sortBy: "commencementDate",
                                        sortOrder: "DESC"
                                    });
                                    setShowToast(null);
                                    previousPage();
                                }}
                            >
                                {t("CLEAR ALL")}
                            </button>
                            <button
                                type="submit"
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "#6b133f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    minWidth: "100px"
                                }}
                            >
                                {t("Search")}
                            </button>
                        </div>
                    </div>
                </SearchForm>
                {!isLoading && data?.display ? <Card style={{ marginTop: 20 }}>
                    {
                        t(data.display)
                            .split("\\n")
                            .map((text, index) => (
                                <p key={index} style={{ textAlign: "center" }}>
                                    {text}
                                </p>
                            ))
                    }
                </Card>
                    : (!isLoading && data !== "" ? <Table
                        t={t}
                        data={data}
                        totalRecords={count}
                        columns={columns}
                        getCellProps={(cellInfo) => {
                            return {
                                style: {
                                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                                    padding: "20px 18px",
                                    fontSize: "16px"
                                },
                            };
                        }}
                        onPageSizeChange={onPageSizeChange}
                        currentPage={getValues("offset") / getValues("limit")}
                        onNextPage={nextPage}
                        onPrevPage={previousPage}
                        pageSizeLimit={getValues("limit")}
                        onSort={onSort}
                        disableSort={false}
                        sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
                    /> : <PTinboxTable/>)}
            </div>}
    </React.Fragment>
}

const widthMx ={
    width:"100%"
}
export default PTSearchApplication
import { DetailsCard, Loader, Table, Modal } from "@egovernments/digit-ui-react-components";
import React, { memo, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropertyInvalidMobileNumber from "../../pages/citizen/MyProperties/PropertyInvalidMobileNumber";
import  {toSentenceCase}  from "../../utils/masterdataconvertHelper"
import { Styles} from "../../utils/cssHelper";
const GetCell = (value) => <span className="cell-text">{value}</span>;


const SearchPTID = ({ tenantId, t, payload, showToast, setShowToast,ptSearchConfig }) => {
  const history = useHistory();
  
  const [searchQuery, setSearchQuery] = useState({
    /* ...defaultValues,   to enable pagination */
    ...payload,
  });
  const [showModal, setShowModal] = useState(false);
  const [showUpdateNo, setShowUpdateNo] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [ownerInvalidMobileNumberIndex, setOwnerInvalidMobileNumberIndex] = useState(0);

  const { data, isLoading, error, isSuccess, billData ,revalidate} = Digit.Hooks.ws.useWaterSearch({
    tenantId,
    filters: searchQuery,
    BusinessService: "WS", t,
    configs: { enabled: Object.keys(payload).length > 0 ? true : false, retry: false, retryOnMount: false, staleTime: Infinity },
  });

  console.log("dataa=",data)

  const mutation = Digit.Hooks.pt.usePropertyAPI(tenantId, false);

  const UpdatePropertyNumberComponent = Digit?.ComponentRegistryService?.getComponent("EmployeeUpdateOwnerNumber");
  const { data: updateNumberConfig } = Digit.Hooks.useCommonMDMS(Digit.ULBService.getStateId(), "PropertyTax", ["UpdateNumber"], {
    select: (data) => {
      return data?.PropertyTax?.UpdateNumber?.[0];
    },
    retry: false,
    enable: false,
  });

  const handleCollectTaxClick = (val) => {
    let isAtleastOneMobileNumberInvalid = false

    let { owners } = val;

    owners = owners && owners.filter(owner => owner.status == "ACTIVE");
    owners && owners.map((owner, index) => {
      let number = owner.mobileNumber;
      
      if (
          (
            (number == updateNumberConfig?.invalidNumber)
            || !number.match(updateNumberConfig?.invalidPattern) 
            && number == JSON.parse(getUserInfo()).mobileNumber
          )
        ) {
        isAtleastOneMobileNumberInvalid = true;
        setOwnerInvalidMobileNumberIndex(index);
      }
    })

    if(isAtleastOneMobileNumberInvalid) {
      setShowModal(true);
      setSelectedProperty(val);
    } else {
      revalidate();
      history.push(`/digit-ui/employee/ws/wssearch/water-details/${val?.["applicationNo"]}`)
    }

  }

  const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );

  const CloseBtn = (props) => {
    return (
      <div className="icon-bg-secondary" onClick={props.onClick}>
        <Close />
      </div>
    );
  };

  const skipNContinue = () => {
    history.push(`/digit-ui/employee/payment/collect/PT/${selectedProperty?.['propertyId']}`)
  }

  const updateMobileNumber = () => {
    const ind = ownerInvalidMobileNumberIndex;

    setShowModal(true);
    setShowUpdateNo({
      name: selectedProperty?.owners[ind]?.name,
      mobileNumber: selectedProperty?.owners[ind]?.mobileNumber,
      index: ind,
    });
  }



  const columns = useMemo(
    () => [
      // {
      //   Header: t("Property ID"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => {
      //     console.log("row", row);
      //     return (
      //       <div>
      //         <span className="link" style={{color: "#141B29"}}>
      //           <Link to={`/digit-ui/employee/ws/wssearch/water-details/${row.original["propertyId"]}`}>{row.original["propertyId"]}</Link>
      //         </span>
      //       </div>
      //     );
      //   },
      // },


    {
        Header: t("Application ID"),
        disableSortBy: true,
        Cell: ({ row }) => {        
          return (
            <div>
              <span className="link" style={{color: "#141B29"}}>
                <Link to={`/digit-ui/employee/ws/wssearch/water-details/${row.original.applicationNo}`}>{row.original.applicationNo}</Link>
              </span>
            </div>
          );
        },
      },

{
        Header: t("Consumer ID"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.ConsumerNumber) || ""),
      },
      // {
      //   Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => GetCell(`${row.original.owners.map((ob) => ob.name).join(",")}` || ""),
      // },

       {
        Header: t("PT_COMMON_TABLE_COL_OWNER_NAME"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.ownerName) || ""),
      },
      // property Id,Owner Name, Mobile Number ,House/Door Number , Address , Ward , Zone , Payment Receivable
      // //New Added Mobile Number Column
      {
        Header: t("Address"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.address) || ""),
      },
      //   //New Added House Number Column
      {
        Header: t("Zone"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.zone) || ""),
      },
      // //New Added Address
      {
        Header: t("Ward"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.ward) || ""),
      },

      //   //New Added Ward
        {
          Header: t("Locality"),
          disableSortBy: true,
          Cell: ({ row }) => GetCell(t(row.original.locality) || ""),
        },

      //     //New Added Zone
          {
            Header: t("Status"),
            disableSortBy: true,
            Cell: ({ row }) => {        
          return (
            <div>
               <span style={row.original.applicationStatus ==="APPROVED"? Styles.statusActive
                :row.original.applicationStatus ==="REJECTED"? Styles.statusInactive
                :row.original.applicationStatus ==="PAID PAYMENT"?Styles.statusPaid:Styles.statusInWorkflow}>
                {toSentenceCase(row.original.applicationStatus) || "-"}
                 </span>
            </div>
          );
        },
          },

      // //New Added Payment Receivable
      // {
      //   Header: t("Payment Receivable"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => GetCell(t(row.original.due) || ""),
      // },
    
      // {
      //   Header: t("ES_INBOX_LOCALITY"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => GetCell(t(row.original?.locality) || ""),
      // },
      // {
      //   Header: t("PT_COMMON_TABLE_COL_STATUS_LABEL"),
      //   Cell: ({ row }) => GetCell(row.original?.status || "NA"),
      //   disableSortBy: true,
      // },
      // {
      //   Header: t("PT_AMOUNT_DUE"),
      //   Cell: ({ row }) => GetCell(row?.original?.due?`₹ ${row?.original?.due}`:t("PT_NA")),
      //   disableSortBy: true,
      // },
      {
        Header: t("ES_SEARCH_ACTION"),
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              {row.original?.due > 0 && Digit.Utils.didEmployeeHasRole("PT_CEMP") ? (
                <span className="link"> 
                  <a  style={{textDecoration:'none'}} onClick={() => handleCollectTaxClick(row.original)}>
                    {/* {t("ES_PT_COLLECT_TAX")} */}
                    <button
                type="button"
                className="btn-view"
               
              >
                View
              </button>
                    </a>
                </span>
              ) :
              
              <div>
              <span >
                <Link to={`/digit-ui/employee/ws/wssearch/water-details/${row.original.applicationNo}`}><button
                type="button"
                className="btn-view"
               
              >

                View
              </button></Link>
              </span>
            </div>
              
              
              
              }
            </div>
          );
        },
      },
    ],
    []
  );

  const tableData = (data || [])
  .filter(item => item.applicationStatus ==="PENDING PAYMENT")  // apply your filter here
  .map((item) => {
  //const primaryOwner = item?.owners?.[0] || {};
  return {
    applicationNo: item?.applicationNo,
    ConsumerNumber: item?.ConsumerNumber || "NA",
    ownerName: item?.ConsumerName || "NA",
    mobileNumber: item.mobileNumber || "NA",
    doorNo: item?.address?.doorNo || "NA",
    address: item?.Address || "NA",
    locality: item?.locality || "NA",
    // ? `${item.address.street || ""}${item.address.street && item.address.pincode ? ", " : ""}${item.address.pincode || ""}`
    // : "NA",
    ward: item?.ward || "NA",
    zone: item?.zone || "NA",
    status: item?.status || "NA",
    applicationStatus: item?.applicationStatus || "NA",
    due: item?.AmountDue || "0",
  };
});

  
  let isMobile = window.Digit.Utils.browser.isMobile();

  if (isLoading) {
    showToast && setShowToast(null);
    return <Loader />;
  }
  if (error) {
    !showToast && setShowToast({ error: true, label: error?.response?.data?.Errors?.[0]?.code || error });
    return null;
  }
  const PTEmptyResultInbox = memo(Digit.ComponentRegistryService.getComponent("PTEmptyResultInbox"));

    console.log("DEKHO PEHLA HAI=",tableData);
  if(ptSearchConfig?.ptSearchCount&&payload.locality&&tableData&&tableData.length>ptSearchConfig.ptSearchCount){
    !showToast &&setShowToast({ error: true, label: "PT_MODIFY_SEARCH_CRITERIA" });
    return null;
  }
  return (
    <React.Fragment>



   <style>
        {`
         .btn-view {
          min-width: 90px;
          height: 27px;
          padding: 0 24px;
          border-radius: 12px;
          border: none;
          color: white;
          background: #6b133f;
          font-size: 12px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          
        }

           .tableinside thead {
  background-color: rgba(107, 19, 63, 0.4) !important;
  border-radius:4px !important;
  font-size: 50px;
  color: white !important; 
}
  .tableinside{
  width:100%;
  }
        
        .tableinside thead tr {
  background-color: rgba(107, 19, 63, 0.4) !important;
   border-radius:4px !important;
  font-size: 50px;
  color: white !important; 
}
   .tableinside tbody tr td {
  background-color: white !important;
  color:rgba(20, 27, 41, 1);

 
}
          
.tableinside thead th {
  background-color: rgba(107, 19, 63, 0.4) !important;
  //  border-radius:4px !important;
  font-size: 50px;
  color: white !important; 
}
  .tablecss{
  border: 1px solid rgb(204, 204, 204);
    border-radius: 10px;
    overflow: auto;
    margin-top: 20px;
    background: white;
    margin-bottom:20px;
  }


         
        `}
      </style>


      {data?.length === 0 ? (
        <PTEmptyResultInbox data={true}></PTEmptyResultInbox>
      ) : isMobile ? (
        // <DetailsCard data={getData(tableData)} t={t} />
          <div style={{ overflowX: 'auto', width: '100%',
              padding: '20px 20px 0 20px', backgroundColor: '#fff'
            }}>
              <div style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#6b133f",
                margin: "0 0 20px 0",
              }}>Water Application List</div> 


              <div className="tablecss">

         
        <Table
          t={t}
          data={tableData}
          totalRecords={data?.length}
          columns={columns}
          className="tableinside"
          getCellProps={(cellInfo) => {
            return {
              style: {
                padding: "10px",
                fontSize: "14px",
                backgroundColor: "#f9f9f9", 
                marginTop: '20px'
              },
            };
          }}
          manualPagination={false}
          disableSort={true}
        />
        </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', width: '100%',
              padding: '20px 20px 0 20px', backgroundColor: '#fff'
            }}>
              <div style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#6b133f",
                margin: "0 0 20px 0",
              }}>Property List</div> 


              <div className="tablecss">

         
        <Table
          t={t}
          data={tableData}
          totalRecords={data?.Properties?.length}
          columns={columns}
          className="tableinside"
          getCellProps={(cellInfo) => {
            return {
              style: {
                padding: "10px",
                fontSize: "14px",
                backgroundColor: "#f9f9f9", 
                marginTop: '20px'
              },
            };
          }}
          manualPagination={false}
          disableSort={true}
        />
        </div>
        </div>
      )}

      {showModal ? (
        <Modal
          headerBarMain={<h1 className="heading-m">{showUpdateNo ? t("PTUPNO_HEADER") : t("PT_INVALID_MOBILE_NO")}</h1>}
          headerBarEnd={
            <CloseBtn
              onClick={() => {
                setShowModal(false);
                setShowUpdateNo(false);
              }}
            />
          }
          hideSubmit={true}
          isDisabled={false}
          popupStyles={{ width: "50%", marginTop: "auto" }}
        >
          {showUpdateNo && (
            <UpdatePropertyNumberComponent
              showPopup={setShowModal}
              name={showUpdateNo?.name}
              UpdateNumberConfig={updateNumberConfig}
              mobileNumber={showUpdateNo?.mobileNumber}
              t={t}
              onValidation={(data, showToast) => {
                let newProp = { ...selectedProperty };
               newProp.owners[showUpdateNo?.index].mobileNumber = data.mobileNumber;
                newProp.creationReason = "UPDATE";
                newProp.workflow = null;
                let newDocObj = { ...data };
                delete newDocObj.mobileNumber;
                newProp.documents = [
                  ...newProp.documents,
                  ...Object.keys(newDocObj).map((key) => ({
                    documentType: key,
                    documentUid: newDocObj[key],
                    fileStoreId: newDocObj[key],
                  })),
                ];
                mutation.mutate(
                  {
                    Property: newProp,
                  },
                  {
                    onError: () => {},
                    onSuccess: async (successRes) => {
                      showToast();
                      setTimeout(() => {
                        window.location.reload();
                      }, 3000);
                    },
                  }
                );
              }}
            />
          )}
          {!showUpdateNo && <PropertyInvalidMobileNumber propertyId={selectedProperty?.propertyId} userType={"employee"} skipNContinue={skipNContinue} updateMobileNumber={updateMobileNumber} />}
        </Modal>
      ) : null}

    </React.Fragment>
  );
};

export default SearchPTID;
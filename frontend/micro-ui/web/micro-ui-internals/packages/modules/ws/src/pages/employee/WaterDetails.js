import { EditIcon, Header, LinkLabel, Loader, Modal } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails/cashDeskIndex";
import OwnerHistory from "./WaterMutation/ownerHistory";
import * as func from "../../utils";
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

const WaterDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  //const { id: applicationNumber } = useParams();
  let filters = func.getQueryStringParams(location.search);
  //const applicationNumber = filters?.applicationNumber;
  const { id } = useParams();
const applicationNumber = `${id}`;
  const serviceType = "WATER";//filters?.service;
   const userInfo = Digit.UserService.getUser();
  const [showToast, setShowToast] = useState(null);
  const [appDetailsToShow, setAppDetailsToShow] = useState({});
  const [enableAudit, setEnableAudit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateNo, setShowUpdateNo] = useState(false);
  const PT_CEMP = Digit.UserService.hasAccess(["PT_CEMP"]) || false;
  const [businessService, setBusinessService] = useState("PT.CREATE");
  const history = useHistory();
  //sessionStorage.setItem("propertyIdinPropertyDetail", applicationNumber);
  // const isMobile = window.Digit.Utils.browser.isMobile();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 780);

  let { isLoading, isError, data: applicationDetails,  error } = Digit.Hooks.ws.useWSDetails(
    t,
    tenantId,
   applicationNumber,
    serviceType,
    userInfo,
    { privacy: Digit.Utils.getPrivacyObject() }
  );
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 780 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth > 780 && isMobile) {
        setIsMobile(false);
      }
    }

    window.addEventListener("resize", () => {
      onResize();
    });

    return () => {
      window.removeEventListener("resize", () => {
        onResize()
      });
    };
  });
  useEffect(() => {
    if (applicationDetails && !enableAudit) {
      setAppDetailsToShow(_.cloneDeep(applicationDetails));
      if (applicationDetails?.applicationData?.status !== "ACTIVE") {
        setEnableAudit(true);
      }
    }
  }, [applicationDetails]);
  const closeToast = () => {
    setShowToast(null);
  };

  

  if (appDetailsToShow?.applicationDetails) {
    appDetailsToShow.applicationDetails = appDetailsToShow?.applicationDetails?.map((e) => {
      if (e.title === "PT_OWNERSHIP_INFO_SUB_HEADER") {
        if (applicationDetails?.applicationData?.status === "ACTIVE") {
          e.additionalDetails.owners.map((owner, ind) => {
            owner.values.map((value) => {
              if (value.title == "PT_OWNERSHIP_INFO_MOBILE_NO") {
                value.textStyle = { display: "flex", wordBreak:"revert" };
                value.caption = (
                  <span
                    onClick={() => {
                      setShowModal((prev) => !prev);
                      setShowUpdateNo({
                        name: appDetailsToShow?.applicationData?.owners[ind]?.name,
                        mobileNumber: appDetailsToShow?.applicationData?.owners[ind]?.mobileNumber,
                        index: ind,
                      });
                    }}
                    style={{ cursor: "pointer", display: "inline-flex", paddingLeft: "20px" }}
                  >
                    <EditIcon />
                  </span>
                );
              }
            });
          });
        }
        return {
          ...e,
          Component: () => (
            <LinkLabel
              onClick={() => {
                setShowModal((prev) => !prev);
              }}
              style={{ display: "inline", marginLeft: "25px" }}
            >
              {t("PT_VIEW_HISTORY")}
            </LinkLabel>
          ),
        };
      }
      return e;
    });
  }


  

 
//
  if (isLoading) {
    return <Loader />;
  }
  const UpdatePropertyNumberComponent = Digit?.ComponentRegistryService?.getComponent("EmployeeUpdateOwnerNumber");
  return (
    <div>
      <Header>{t("WS_WATER_TAX_INFORMATION")}</Header>
      <ApplicationDetailsTemplate
        applicationDetails={appDetailsToShow}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={appDetailsToShow?.applicationData}
        mutate={null}
        workflowDetails={ {}}
        businessService="WS"
        showToast={showToast}
        setShowToast={setShowToast}
        closeToast={closeToast}
        showTimeLine={false}
        timelineStatusPrefix={"ES_PT_COMMON_STATUS_"}
        forcedActionPrefix={"WF_EMPLOYEE_PT.CREATE"}
      />
      {showModal ? (
        <Modal
          headerBarMain={<h1 className="heading-m">{showUpdateNo ? t("PTUPNO_HEADER") : t("PT_OWNER_HISTORY")}</h1>}
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
          popupStyles={showUpdateNo ? { width: isMobile ? "473px" : "50%"} : { width: "75%"}}
        >
          
        </Modal>
      ) : null}
    </div>
  );
};

export default WaterDetails;

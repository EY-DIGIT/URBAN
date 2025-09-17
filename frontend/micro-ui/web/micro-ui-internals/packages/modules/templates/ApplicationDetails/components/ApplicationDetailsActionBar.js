import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubmitBar, ActionBar, Menu } from "@egovernments/digit-ui-react-components";
import { useHistory, useLocation } from "react-router-dom";

function ApplicationDetailsActionBar({ workflowDetails, displayMenu, onActionSelect, setDisplayMenu, businessService, forcedActionPrefix, ActionBarStyle = {}, MenuStyle = {}, applicationData }) {
  console.log("ApplicationDetailsActionBar Props:", applicationData);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const storedFlag = JSON.parse(sessionStorage.getItem("flag"));
    if (storedFlag) {
      setFlag(storedFlag);
      sessionStorage.removeItem("flag"); // clear after reading once
    }
  }, []);
  const history = useHistory();
  const { t } = useTranslation();
  let user = Digit.UserService.getUser();
  const menuRef = useRef();
  if (window.location.href.includes("/obps") || window.location.href.includes("/noc")) {
    const userInfos = sessionStorage.getItem("Digit.citizen.userRequestObject");
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    user = userInfo?.value;
  }
  const userRoles = user?.info?.roles?.map((e) => e.code);
  let isSingleButton = false;
  let isMenuBotton = false;
  let actions = workflowDetails?.data?.actionState?.nextActions?.filter((e) => {
    return userRoles?.some((role) => e.roles?.includes(role)) || !e.roles;
  }) || workflowDetails?.data?.nextActions?.filter((e) => {
    return userRoles?.some((role) => e.roles?.includes(role)) || !e.roles;
  });


  console.log("ABCBD=",actions);

  const closeMenu = () => {
    setDisplayMenu(false);
  }
  Digit.Hooks.useClickOutside(menuRef, closeMenu, displayMenu);

  if (((window.location.href.includes("/obps") || window.location.href.includes("/noc")) && actions?.length == 1) || (actions?.[0]?.redirectionUrl?.pathname.includes("/pt/property-details/")) && actions?.length == 1) {
    isMenuBotton = false;
    isSingleButton = true;
  } else if (actions?.length > 0) {
    isMenuBotton = true;
    isSingleButton = false;
  }
  let userInfo1 = JSON.parse(localStorage.getItem("user-info"));

  const tenantId = userInfo1?.tenantId;
  const {
    isLoading: ptCalculationEstimateLoading,
    data: ptCalculationEstimateData,
    mutate: ptCalculationEstimateMutate,
    error,
  } = Digit.Hooks.pt.usePtCalculationEstimate(tenantId);

  const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed: Jan = 0, Mar = 2, Apr = 3

    if (currentMonth >= 3) {
      // April (3) or later — financial year starts this year
      return `${currentYear}-${String(currentYear + 1).slice(-2)}`;
    } else {
      // Jan–Mar — financial year started last year
      return `${currentYear - 1}-${String(currentYear).slice(-2)}`;
    }
  };

  const toYear = getCurrentFinancialYear();
  const handlePreview = () => {

    const payload = {
      Assessment: {
        financialYear: toYear,
        propertyId: applicationData?.propertyId,
        tenantId: tenantId,
        source: "MUNICIPAL_RECORDS",
        channel: "CITIZEN",
        assessmentDate: Date.now(),
      },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: userInfo1?.authToken || "default-token",
        userInfo: {
          id: userInfo1?.id || 1,
          uuid: userInfo1?.uuid || "default-uuid",
          userName: userInfo1?.userName || "defaultuser",
          name: userInfo1?.name || "Default User",
          mobileNumber: userInfo1?.mobileNumber || "9999999999",
          emailId: userInfo1?.emailId || "default@example.com",
          locale: userInfo1?.locale || "en_IN",
          type: userInfo1?.type || "CITIZEN",
          roles: userInfo1?.roles || [],
          active: userInfo1?.active !== false,
          tenantId: userInfo1?.tenantId || "pg.citya",
          permanentCity: userInfo1?.permanentCity || "pg.citya"
        },
        msgId: "1749797151521|en_IN",
        plainAccessRequest: {}
      }
    };

    ptCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        history.push({
          pathname: "/digit-ui/employee/pt/PreviewEstimateDemand",
          state: { data, applicationData }// send full object
        });
        console.log("Estimate success:", data);
      },
      onError: (error) => {
        console.log("Estimate error:", error);
      },
    });
  };
  const EditApplication = () => {
    history.push({
      pathname: `/digit-ui/employee/pt/edit-update-application/${applicationData?.propertyId}`, // <-- apna redirect page
      state: { applicationData }
    });
  }

  return (
    <React.Fragment>



      <style>
        {`

  

@media (min-width: 780px) {
  .forwardbutton .menu-wrap {
    margin-right: 124px;
    background:none;
    margin-bottom:10px;
    
  }
}

.forwardbutton .menu-wrap div {
   
    background:rgba(107, 19, 63, 0.7);
    margin-bottom:10px;
    border-radius:4px;
    width:100%;
    color:white;
    height:40px;
    font-size:16px;
    text-align:center;
    font-weight:500;
    padding:10px;

  }

  
.forwardbutton .menu-wrap div:hover {
  background: rgba(107, 19, 63, 0.6);
        }

         
        `}
      </style>


      {!workflowDetails?.isLoading && isMenuBotton && !isSingleButton && (
        <ActionBar style={{ ...ActionBarStyle, position: "relative", boxShadow: "none" }} className="forwardbutton" >
          {displayMenu && (workflowDetails?.data?.actionState?.nextActions || workflowDetails?.data?.nextActions) ? (
            <Menu
              localeKeyPrefix={forcedActionPrefix || `WF_EMPLOYEE_${businessService?.toUpperCase()}`}
              options={actions}
              optionKey={"action"}
              t={t}
              onSelect={onActionSelect}
              style={MenuStyle}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }} ref={menuRef}>
            {/* <SubmitBar ref={menuRef} label={t("Edit")} onSubmit={() => EditApplication()} /> */}
            {actions?.some((act) => act?.action?.toUpperCase() === "FORWARD") && (
              <SubmitBar label={t("EDIT")} onSubmit={() => EditApplication()} />
            )}
            {!actions?.some((act) => act?.action?.toUpperCase() === "FORWARD") && (
              <SubmitBar label={t("PREVIEW")} onSubmit={() => handlePreview()} />
            )}
            {flag && (
              <SubmitBar ref={menuRef} label={t("WF_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
            )}
          </div>
        </ActionBar>
      )}
      {!workflowDetails?.isLoading && !isMenuBotton && isSingleButton && (
        <ActionBar style={{ ...ActionBarStyle }}>
          <button
            style={{ color: "#FFFFFF", fontSize: "18px" }}
            className={"submit-bar"}
            name={actions?.[0]?.action}
            value={actions?.[0]?.action}
            onClick={(e) => { onActionSelect(actions?.[0] || {}) }}>
            {t(`${forcedActionPrefix || `WF_EMPLOYEE_${businessService?.toUpperCase()}`}_${actions?.[0]?.action}`)}
          </button>
        </ActionBar>
      )}
    </React.Fragment>
  );
}

export default ApplicationDetailsActionBar;

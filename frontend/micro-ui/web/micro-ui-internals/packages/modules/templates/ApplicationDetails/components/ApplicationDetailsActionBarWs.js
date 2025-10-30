
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubmitBar, ActionBar, Menu } from "@egovernments/digit-ui-react-components";
import { useHistory, useLocation } from "react-router-dom";

function ApplicationDetailsActionBarWs({ workflowDetails, displayMenu, onActionSelect, setDisplayMenu, businessService, forcedActionPrefix, ActionBarStyle = {}, MenuStyle = {}, applicationData , ActionButton }) {
  console.log("ApplicationDetailsActionBar Props:", workflowDetails);
  const [flag, setFlag] = useState(true);

  // useEffect(() => {
  //   const storedFlag = JSON.parse(sessionStorage.getItem("flag"));
  //   // if (storedFlag) {
  //   //   setFlag(storedFlag);
  //   //   sessionStorage.removeItem("flag"); // clear after reading once
  //   // }
  // }, []);
  const history = useHistory();
  const { t } = useTranslation();
  let user = Digit.UserService.getUser();
  const menuRef = useRef();
  if (window.location.href.includes("/obps") || window.location.href.includes("/noc")) {
    const userInfos = sessionStorage.getItem("Digit.citizen.userRequestObject");
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    user = userInfo?.value;
  }
   //const [isEmployee, setIsEmployee] = useState(true);
  const userRoles = user?.info?.roles?.map((e) => e.code);
  let isSingleButton = false;
  let isMenuBotton = false;
 
 
  let actions = workflowDetails?.data?.actionState?.nextActions?.filter((e) => {
    return userRoles?.some((role) => e.roles?.includes(role)) || !e.roles;
  }) || workflowDetails?.data?.nextActions?.filter((e) => {
    return userRoles?.some((role) => e.roles?.includes(role)) || !e.roles;
  });


  console.log("ABCBD=", actions);

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
    mutate: wsCalculationEstimateMutate,
    error,
  } = Digit.Hooks.ws.usewsCalculationEstimate(tenantId);

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
      CalculationCriteria:[ {
        applicationNo: applicationData.applicationNo,
        tenantId: tenantId,
      // waterConnection:propertyData
      }]
    };
    // let data = {}
    // history.push({
    //       pathname: "/digit-ui/employee/ws/PreviewEstimateDemand",
    //       state: { data, applicationData }// send full object
    //     });

    wsCalculationEstimateMutate(payload, {
      onSuccess: (data) => {
        history.push({
          pathname: "/digit-ui/employee/ws/PreviewEstimateDemand",
          state: { data, applicationData }// send full object
        });
        console.log("Estimate success:", data);
      },
      onError: (error) => {
        console.log("Estimate error:", error);
      },
    });
  };
  // const EditApplication = () => {
  //   history.push({
  //     pathname: `/digit-ui/employee/pt/edit-update-application/${applicationData?.propertyId}`, // <-- apna redirect page
  //     state: { applicationData }
  //   });
  // }
const EditApplication = (action) => {
  history.push({
   pathname: `/digit-ui/employee/ws/edit-application/${applicationData?.applicationNo}`,
//pathname: `/digit-ui/employee/ws/edit-application?applicationNumber=${applicationData?.applicationNo}`,
    state: { applicationData, action } // ✅ sending action too
  });
   //window.location.href = `/digit-ui/employee/ws/edit-application?applicationNumber=${applicationData?.applicationNo}`;
};
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


      {!workflowDetails?.isLoading && isMenuBotton && !isSingleButton &&  (
        <ActionBar style={{ ...ActionBarStyle, position: "relative", boxShadow: "none" }} className="forwardbutton" >
          {displayMenu && (workflowDetails?.data?.actionState?.nextActions || workflowDetails?.data?.nextActions) ? (
           
            <Menu
             // localeKeyPrefix={forcedActionPrefix || `WF_EMPLOYEE_${businessService?.toUpperCase()}`}
             // localeKeyPrefix={forcedActionPrefix || `WF_`}
              options={actions.filter(action => action.action !== "UPDATE")}
              optionKey={"action"}
              t={t}
              onSelect={onActionSelect}
              style={MenuStyle}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }} ref={menuRef}>
            {/* <SubmitBar ref={menuRef} label={t("Edit")} onSubmit={() => EditApplication()} /> */}
            {/* {actions?.some((act) => act?.action?.toUpperCase() === "FORWARD") && (
              <SubmitBar label={t("EDIT")} onSubmit={() => EditApplication()} />
            )} */}
            {actions?.some(
              (act) =>
                act?.action?.toUpperCase() === "FORWARD" ||
                act?.action?.toUpperCase() === "UPDATE"
            ) && (
                <SubmitBar label={t("EDIT")} 
                // onSubmit={() => EditApplication()}
                  onSubmit={() => {
      const updateAction = actions.find(
        (act) => act?.action?.toUpperCase() === "UPDATE"
      );
      EditApplication(updateAction); // ✅ send the UPDATE action object
    }}
                 />
              )}

            {!actions?.some((act) => act?.action?.toUpperCase() === "FORWARD" ||
                act?.action?.toUpperCase() === "UPDATE") &&  (
              <SubmitBar label={t("PREVIEW")} onSubmit={() => handlePreview()} />
            )}
            {flag && (
              <SubmitBar ref={menuRef} label={t("WF_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
            )}
          </div>
        </ActionBar>
      )}
      
    </React.Fragment>
  );
}

export default ApplicationDetailsActionBarWs;

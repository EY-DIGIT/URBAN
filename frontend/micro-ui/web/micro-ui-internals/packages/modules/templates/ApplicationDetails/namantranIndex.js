import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { Loader, Card } from "@egovernments/digit-ui-react-components";

import ActionModal from "./Modal";

import { useHistory, useParams } from "react-router-dom";
import ApplicationDetailsContentVerifier from "./components/ApplicationDetailsContentNamantran";
// import ApplicationDetailsContent from "./components/ApplicationDetailsContent";
import ApplicationDetailsToast from "./components/ApplicationDetailsToast";
import ApplicationDetailsActionBar from "./components/ApplicationDetailsActionBarNamantran";
import ApplicationDetailsWarningPopup from "./components/ApplicationDetailsWarningPopup";

const ApplicationDetails = (props) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log("tenantId", tenantId);
  const state = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [propertyResponse, setPropertyResponse] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEnableLoader, setIsEnableLoader] = useState(false);
  const [isWarningPop, setWarningPopUp] = useState(false);
  // const { isLoading: assessmentLoading, mutate: assessmentMutate } = Digit.Hooks.pt.usePropertyAssessment(tenantId);
  const {
    applicationDetails,
    showToast,
    setShowToast,
    isLoading,
    isDataLoading,
    applicationData,
    mutate,
    nocMutation,
    workflowDetails,
    businessService,
    closeToast,
    moduleCode,
    timelineStatusPrefix,
    forcedActionPrefix,
    statusAttribute,
    ActionBarStyle,
    MenuStyle,
    paymentsList,
    showTimeLine = true,
    oldValue,
    isInfoLabel = false,
    clearDataDetails
  } = props;

  useEffect(() => {
    if (showToast) {
      workflowDetails.revalidate();
    }
  }, [showToast]);

  function onActionSelect(action) {
    if (action) {
      if (action?.isToast) {
        setShowToast({ key: "error", error: { message: action?.toastMessage } });
        setTimeout(closeToast, 5000);
      }
      else if (action?.isWarningPopUp) {
        setWarningPopUp(true);
      } else if (action?.redirectionUrll) {
        if (action?.redirectionUrll?.action === "ACTIVATE_CONNECTION") {
          // window.location.assign(`${window.location.origin}digit-ui/employee/ws/${action?.redirectionUrll?.pathname}`, { data: action?.redirectionUrll?.state });

          history.push(`${action?.redirectionUrll?.pathname}`, JSON.stringify({ data: action?.redirectionUrll?.state, url: `${location?.pathname}${location.search}` }));
        }
        else if (action?.redirectionUrll?.action === "RE-SUBMIT-APPLICATION") {
          history.push(`${action?.redirectionUrll?.pathname}`, { data: action?.redirectionUrll?.state });
        }
        else {
          window.location.assign(`${window.location.origin}/digit-ui/employee/payment/collect/${action?.redirectionUrll?.pathname}`);
        }
      } else if (!action?.redirectionUrl) {
        setShowModal(true);
      } else {
        history.push({
          pathname: action.redirectionUrl?.pathname,
          state: { ...action.redirectionUrl?.state },
        });
      }
    }
    setSelectedAction(action);
    setDisplayMenu(false);
  }

  const queryClient = useQueryClient();

  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };

  const closeWarningPopup = () => {
    setWarningPopUp(false);
  };
  const units = applicationDetails?.applicationData?.units;


  const yearRange = Array.isArray(units) && units.length > 0
    ? units[0].toYear
    : "N/A";
  // const handleAssessment = () => {
  //   const payload = {
  //     Assessment: {
  //       financialYear: yearRange,
  //       propertyId: applicationData?.propertyId,
  //       tenantId: tenantId,
  //       source: "MUNICIPAL_RECORDS",
  //       channel: "CFC_COUNTER",
  //       assessmentDate: Date.now(),
  //     }
  //   };

  //   assessmentMutate(payload, {
  //     onSuccess: (data, variables) => {
  //       const assessments = data?.Assessments || [];
  //       if (assessments.length > 0) {
  //         const latestAssessment = assessments[0];
  //         const status = latestAssessment?.status || "UNKNOWN";

  //         // Only fetch bill if assessment is ACTIVE or APPROVED
  //         if (status === "ACTIVE" || status === "APPROVED") {
  //           fetchBill(); // Call fetchBill only if valid
  //         } else {
  //           console.warn("Assessment status is not valid for billing:", status);
  //         }
  //       } else {
  //         console.warn("No assessments returned in response");
  //       }
  //     },
  //     onError: (error, variables) => {
  //       // 
  //     }

  //   });
  // }
const submitAction = async (data, nocData = false, isOBPS = {}) => {
  console.log("🟢 submitAction called with:", { data, nocData, isOBPS });
  debugger;

  setIsEnableLoader(true);

  if (typeof data?.customFunctionToExecute === "function") {
    console.log("⚙️ Executing custom function...");
    debugger;
    data?.customFunctionToExecute({ ...data });
  }

  if (nocData !== false && nocMutation) {
    console.log("📡 Starting NOC mutation calls...");
    debugger;
    const nocPrmomises = nocData?.map((noc) => {
      console.log("➡️ Mutating NOC:", noc);
      return nocMutation?.mutateAsync(noc);
    });
    try {
      setIsEnableLoader(true);
      const values = await Promise.all(nocPrmomises);
      console.log("✅ NOC mutation responses:", values);
      values &&
        values.map((ob) => {
          Digit.SessionStorage.del(ob?.Noc?.[0]?.nocType);
        });
    } catch (err) {
      console.error("❌ NOC mutation failed:", err);
      debugger;
      setIsEnableLoader(false);
      let errorValue = err?.response?.data?.Errors?.[0]?.code
        ? t(err?.response?.data?.Errors?.[0]?.code)
        : err?.response?.data?.Errors?.[0]?.message || err;
      closeModal();
      setShowToast({ key: "error", error: { message: errorValue } });
      setTimeout(closeToast, 5000);
      return;
    }
  }

  if (mutate) {
    console.log("🚀 Starting main mutation...");
    debugger;
    setIsEnableLoader(true);
    mutate(data, {
      onError: (error, variables) => {
        console.error("❌ Mutation error:", { error, variables });
        debugger;
        setIsEnableLoader(false);
        setShowToast({ key: "error", error });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        console.log("✅ Mutation success:", { data, variables });
        debugger;
        sessionStorage.removeItem("WS_SESSION_APPLICATION_DETAILS");
        setIsEnableLoader(false);

        if (isOBPS?.bpa) {
          console.log("➡️ Redirecting to OBPS BPA response...");
          debugger;
          data.selectedAction = selectedAction;
          history.replace(`/digit-ui/employee/obps/response`, { data: data });
        }

        if (isOBPS?.isStakeholder) {
          console.log("➡️ Redirecting to OBPS Stakeholder response...");
          debugger;
          data.selectedAction = selectedAction;
          history.push(`/digit-ui/employee/obps/stakeholder-response`, { data: data });
        }

        if (isOBPS?.isNoc) {
          console.log("➡️ Redirecting to NOC response...");
          debugger;
          history.push(`/digit-ui/employee/noc/response`, { data: data });
        }

        if (data?.Amendments?.length > 0) {
          console.log("📝 Amendment found:", data?.Amendments);
          debugger;

          if (variables?.AmendmentUpdate?.workflow?.action.includes("SEND_BACK")) {
            setShowToast({ key: "success", label: t("ES_MODIFYSWCONNECTION_SEND_BACK_UPDATE_SUCCESS") });
          } else if (variables?.AmendmentUpdate?.workflow?.action.includes("RE-SUBMIT")) {
            setShowToast({ key: "success", label: t("ES_MODIFYSWCONNECTION_RE_SUBMIT_UPDATE_SUCCESS") });
          } else if (variables?.AmendmentUpdate?.workflow?.action.includes("APPROVE")) {
            setShowToast({ key: "success", label: t("ES_MODIFYSWCONNECTION_APPROVE_UPDATE_SUCCESS") });
          } else if (variables?.AmendmentUpdate?.workflow?.action.includes("REJECT")) {
            setShowToast({ key: "success", label: t("ES_MODIFYWSCONNECTION_REJECT_UPDATE_SUCCESS") });
          }
          return;
        }

        console.log("➡️ Redirecting to PT success page with applicationNumber:", applicationNumber);
        debugger;
        history.push({
          pathname: `/digit-ui/employee/pt/success-applications/${applicationNumber}`,
          state: { data },
        });

        clearDataDetails && setTimeout(clearDataDetails, 3000);
        setTimeout(closeToast, 5000);
        queryClient.clear();
        queryClient.refetchQueries("APPLICATION_SEARCH");
      },
    });
  }

  console.log("🧹 Closing modal after submitAction.");
  debugger;
  closeModal();
};



  if (isLoading || isEnableLoader) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        <div>
          <ApplicationDetailsContentVerifier
            applicationDetails={applicationDetails}
            workflowDetails={workflowDetails}
            isDataLoading={isDataLoading}
            applicationData={applicationData}
            businessService={businessService}
            timelineStatusPrefix={timelineStatusPrefix}
            statusAttribute={statusAttribute}
            paymentsList={paymentsList}
            showTimeLine={showTimeLine}
            oldValue={oldValue}
            isInfoLabel={isInfoLabel}
          />
          {/* <ApplicationDetailsContent
            applicationDetails={applicationDetails}
            workflowDetails={workflowDetails}
            isDataLoading={isDataLoading}
            applicationData={applicationData}
            businessService={businessService}
            timelineStatusPrefix={timelineStatusPrefix}
            statusAttribute={statusAttribute}
            paymentsList={paymentsList}
            showTimeLine={showTimeLine}
            oldValue={oldValue}
            isInfoLabel={isInfoLabel}
          /> */}
          {showModal ? (
            <ActionModal
              t={t}
              action={selectedAction}
              tenantId={tenantId}
              state={state}
              id={applicationNumber}
              applicationDetails={applicationDetails}
              applicationData={applicationDetails?.applicationData}
              closeModal={closeModal}
              submitAction={submitAction}
              actionData={workflowDetails?.data?.timeline}
              businessService={businessService}
              workflowDetails={workflowDetails}
              moduleCode={moduleCode}
            />
          ) : null}
          {isWarningPop ? (
            <ApplicationDetailsWarningPopup
              action={selectedAction}
              workflowDetails={workflowDetails}
              businessService={businessService}
              isWarningPop={isWarningPop}
              closeWarningPopup={closeWarningPopup}
            />
          ) : null}
          <ApplicationDetailsToast t={t} showToast={showToast} closeToast={closeToast} businessService={businessService} />
          <ApplicationDetailsActionBar
            workflowDetails={workflowDetails}
            displayMenu={displayMenu}
            onActionSelect={onActionSelect}
            setDisplayMenu={setDisplayMenu}
            businessService={businessService}
            forcedActionPrefix={forcedActionPrefix}
            ActionBarStyle={ActionBarStyle}
            MenuStyle={MenuStyle}
            applicationData={applicationData}
          />
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default ApplicationDetails;

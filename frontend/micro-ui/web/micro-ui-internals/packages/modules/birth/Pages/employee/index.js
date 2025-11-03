import { PrivateRoute, BreadCrumb } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Switch, useLocation } from "react-router-dom";

const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  sessionStorage.removeItem("revalidateddone");
  const isMobile = window.Digit.Utils.browser.isMobile();

  const combineTaxDueInSearchData = async (searchData, _break, _next) => {
    let returnData;
    const tenantId = Digit.ULBService.getCurrentTenantId();
    let businessService = ["PT"].join();
    let consumerCode = searchData.map((e) => e.propertyId).join();
    try {
      const res = await Digit.PaymentService.fetchBill(tenantId, { consumerCode, businessService });
      let obj = {};
      res.Bill.forEach((e) => {
        obj[e.consumerCode] = e.totalAmount;
      });
      returnData = searchData.map((e) => ({ ...e, due_tax: obj[e.propertyId] || 0 }));
    } catch (er) {
      const err = er?.response?.data;
      if (["EG_BS_BILL_NO_DEMANDS_FOUND", "EMPTY_DEMANDS"].includes(err?.Errors?.[0].code)) {
        returnData = searchData.map((e) => ({ ...e, due_tax: 0 }));
      }
    }
    return _next(returnData);
  };

  const searchMW = [{ combineTaxDueInSearchData }];

  const breadcrumbObj = {
    ["/digit-ui/employee/pt/inbox"]: "ES_TITLE_INBOX",
    ["/digit-ui/employee/pt/new-application"]: "ES_TITLE_NEW_PROPERTY_APPLICATION",
    ["/digit-ui/employee/pt/search"]: "PT_COMMON_SEARCH_PROPERTY_SUB_HEADER",
    ["/digit-ui/employee/pt/application-search"]: "ES_COMMON_APPLICATION_SEARCH",
    ["/digit-ui/employee/pt/PreviewDemand"]: "PreviewDemand",
    ["/digit-ui/employee/pt/PropertyLandingPage"]: "New Property Application",
    ["/digit-ui/employee/pt/PropertyLedger"]: "Property Ledger Page",
    ["/digit-ui/employee/pt/DemandNote"]: " Demand Note Page",
    ["/digit-ui/employee/pt/DetailLedgerPage"]: "Detail Ledger Page",
    ["/digit-ui/employee/pt/application-details/"]: "PT_APPLICATION_TITLE",
  };

  const getBreadCrumb = () => {
    if (breadcrumbObj[location.pathname]) return t(breadcrumbObj[location.pathname]);
    else if (location.pathname.includes("/digit-ui/employee/pt/application-details/")) return t("PT_APPLICATION_TITLE");
    else if (location.pathname.includes("/digit-ui/employee/pt/property-details/")) return t("PT_PROPERTY_INFORMATION");
    else if (location.pathname.includes("/digit-ui/employee/pt/payment-details/")) return t("PT_PAYMENT_HISTORY");
    else if (location.pathname.includes("/digit-ui/employee/pt/assessment-details/")) return t("PT_ASSESS_PROPERTY");
    else if (location.pathname.includes("digit-ui/employee/pt/property-mutate-docs-required")) return t("PT_REQIURED_DOC_TRANSFER_OWNERSHIP");
    else if (location.pathname.includes("/digit-ui/employee/pt/property-mutate/")) return t("ES_TITLE_MUTATE_PROPERTY");
    else if (location.pathname.includes("/digit-ui/employee/pt/modify-application/")) return t("PT_UPDATE_PROPERTY");
    else if (location.pathname.includes("/digit-ui/employee/pt/PreviewDemand/")) return t("PreviewDemand");
    else if (location.pathname.includes("/digit-ui/employee/pt/PreviewView")) return t("Preview Demand");
    else if (location.pathname.includes("/digit-ui/employee/pt/PreviewEstimateDemand")) return t("Preview Demand");
    else if (location.pathname.includes("/digit-ui/employee/pt/PreviewDemandChange")) return t("Preview Demand");

    else if (location.pathname.includes("/digit-ui/employee/pt/success-applications/")) return t("PT_APPLICATION_TITLE");
    else if (location.pathname.includes("/digit-ui/employee/pt/PropertyLandingPage")) return t("Property Landing Page");
    else if (location.pathname.includes("/digit-ui/employee/pt/PropertyLedger")) return t("Property Ledger Page");
    else if (location.pathname.includes("/digit-ui/employee/pt/DemandNote")) return t("Demand Note Page");


  };

  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container" style={{ marginTop: "40px", marginLeft: "0px", padding: "0px" }}>
          <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
            <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
              {t("ES_COMMON_HOME")}
            </Link>{" "}
            / {" "}<span style={{ color: "#6B133F" }}>{getBreadCrumb()}</span>
          </p>
          {/* {!isRes ? <div style={isNewRegistration ? { marginLeft: "12px" } : { marginLeft: "-4px" }}><PTBreadCrumbs location={location} /></div> : null} */}
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;

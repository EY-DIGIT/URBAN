import React from "react";
import { useTranslation } from "react-i18next";
import { Switch, useLocation, Link, Route } from "react-router-dom";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import SearchApp from "./SearchApp";
import Search from "./Search";
import WSResponse from "./WSResponse";
import Response from "./Response";
import ResponseBillAmend from "./ResponseBillAmend";
import WSDisconnectionResponse from "./DisconnectionApplication/WSDisconnectionResponse";
const App = ({ path }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  const WSDocsRequired = Digit?.ComponentRegistryService?.getComponent("WSDocsRequired");
  const WaterLandingPage = Digit?.ComponentRegistryService?.getComponent("WaterLandingPage");
  const WSInbox = Digit?.ComponentRegistryService?.getComponent("WSInbox");
  const WSDisconnectionDocsRequired = Digit?.ComponentRegistryService?.getComponent('WSDisconnectionDocsRequired');
  const WSApplicationBillAmendment = Digit?.ComponentRegistryService?.getComponent("WSApplicationBillAmendment");
  const WSRequiredDocuments = Digit?.ComponentRegistryService?.getComponent("WSRequiredDocuments");
  const WSNewApplication = Digit?.ComponentRegistryService?.getComponent("WSNewApplication");
  const PreviewDemand = Digit?.ComponentRegistryService?.getComponent("PreviewDemand");
  const PreviewEstimateDemand = Digit?.ComponentRegistryService?.getComponent("PreviewEstimateDemand");
  const WaterDetails = Digit?.ComponentRegistryService?.getComponent("WSPropertyDetails");
  const applicationsearch = Digit?.ComponentRegistryService?.getComponent("applicationsearch");
  const SearchEmpWaterComponent = Digit?.ComponentRegistryService?.getComponent("WSEmpSearchWaterComponent");
  const WSApplicationDetails = Digit?.ComponentRegistryService?.getComponent("WSApplicationDetails");
  const WSGetConnectionDetails = Digit?.ComponentRegistryService?.getComponent("WSGetConnectionDetails");
  const WSActivateConnection = Digit?.ComponentRegistryService?.getComponent("WSActivateConnection");
  const WSApplicationDetailsBillAmendment = Digit?.ComponentRegistryService?.getComponent("WSApplicationDetailsBillAmendment");
  const WSSearch = Digit?.ComponentRegistryService?.getComponent("WSSearch");
  const WSSearchWater = Digit?.ComponentRegistryService?.getComponent("WSSearchWater");
  const WSEditApplication = Digit?.ComponentRegistryService?.getComponent("WSEditApplication");
  const SuccessAppication = Digit?.ComponentRegistryService?.getComponent("SuccessAppication");
  const WSConsumptionDetails = Digit?.ComponentRegistryService?.getComponent("WSConsumptionDetails");
  const WSModifyApplication = Digit?.ComponentRegistryService?.getComponent("WSModifyApplication");
  const WSEditModifyApplication = Digit?.ComponentRegistryService?.getComponent("WSEditModifyApplication");
  const WSDisconnectionApplication = Digit?.ComponentRegistryService?.getComponent("WSDisconnectionApplication");
  const WSEditApplicationByConfig = Digit?.ComponentRegistryService?.getComponent("WSEditApplicationByConfig");
  const WSBillIAmendMentInbox = Digit?.ComponentRegistryService?.getComponent("WSBillIAmendMentInbox");
  const WSGetDisconnectionDetails = Digit?.ComponentRegistryService?.getComponent("WSGetDisconnectionDetails");
  const WSModifyApplicationDetails = Digit?.ComponentRegistryService?.getComponent("WSModifyApplicationDetails");
  const WSEditDisconnectionApplication = Digit?.ComponentRegistryService?.getComponent("WSEditDisconnectionApplication");
  const WSEditDisconnectionByConfig = Digit?.ComponentRegistryService?.getComponent("WSEditDisconnectionByConfig");
  const WSResubmitDisconnection = Digit?.ComponentRegistryService?.getComponent("WSResubmitDisconnection");

  const locationCheck =
    window.location.href.includes("/employee/ws/new-application") ||
    window.location.href.includes("/employee/ws/modify-application") ||
    window.location.href.includes("/employee/ws/edit-application") ||
    window.location.href.includes("/employee/ws/activate-connection") ||
    window.location.href.includes("/employee/ws/application-details") ||
    window.location.href.includes("/employee/ws/modify-details") ||
    window.location.href.includes("/employee/ws/ws-response") ||
    window.location.href.includes("/employee/ws/new-disconnection/application-form") ||
    window.location.href.includes("/employee/ws/ws-disconnection-response") ||
    window.location.href.includes("/employee/ws/consumption-details") ||
    window.location.href.includes("/employee/ws/edit-disconnection-application") ||
    window.location.href.includes("/employee/ws/config-by-disconnection-application");
  window.location.href.includes("/employee/ws/resubmit-disconnection-application");
  const breadcrumbObj = {
    ["/digit-ui/employee/ws/inbox"]: "ES_TITLE_INBOX",
    ["/digit-ui/employee/ws/new-application"]: "New Water Application",
    ["/digit-ui/employee/ws/PreviewDemand"]: "Demand",
    ["/digit-ui/employee/ws/PreviewEstimateDemand"]:"Demand",
    ["/digit-ui/employee/ws/searchTax"]: "Cash Desk",
    ["/digit-ui/employee/ws/wssearch/water-details"]: "Cash Desk",
    ["/digit-ui/employee/ws/search"]: "WS_COMMON_SEARCH_PROPERTY_SUB_HEADER",
    ["/digit-ui/employee/ws/application-search"]: "ES_COMMON_APPLICATION_SEARCH",
    ["/digit-ui/employee/ws/PropertyLandingPage"]: "New Property Application",
    ["/digit-ui/employee/ws/PropertyLedger"]: "Property Ledger Page",
    ["/digit-ui/employee/ws/DemandNote"]: " Demand Note Page",
    ["/digit-ui/employee/ws/DetailLedgerPage"]: "Detail Ledger Page",
    ["/digit-ui/employee/ws/application-details"]: "WS_APPLICATION_DETAILS_TITLE",
    ["/digit-ui/employee/ws/edit-application"]: "WS_APPLICATION_DETAILS_TITLE",
  
  };
  const getBreadCrumb = () => {
    if (breadcrumbObj[location.pathname]) return t(breadcrumbObj[location.pathname]);
    else if (location.pathname.includes("/digit-ui/employee/ws/application-details/")) return t("Water Application Details");
    else if (location.pathname.includes("/digit-ui/employee/ws/edit-application/")) return t("Edit Application");
    // else if (location.pathname.includes("/digit-ui/employee/ws/new-application/")) return t("New Water Application");
    // else if (location.pathname.includes("/digit-ui/employee/ws/PreviewDemand/")) return t("Demand");
    // else if (location.pathname.includes("/digit-ui/employee/ws/PreviewEstimateDemand/")) return t("Demand");
    // else if (location.pathname.includes("/digit-ui/employee/ws/searchTax/")) return t("Cash Desk");
    // else if (location.pathname.includes("/digit-ui/employee/ws/application-search/")) return t("WS_VIEW_DETAILS_AND_PAY");
    // else if (location.pathname.includes("/digit-ui/employee/ws/response/")) return t("New Water Application");
    // else if (location.pathname.includes("/digit-ui/employee/ws/application-details/")) return t("Water Application Details");
    // else if (location.pathname.includes("/digit-ui/employee/ws/success-applications/")) return t("Water Application Details");


  };



  const locationCheckReqDocs = window.location.href.includes("/employee/ws/create-application") || window.location.href.includes("/employee/ws/new-disconnection/docsrequired");

  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container" style={{ marginTop: "40px", marginLeft: "0px", padding: "0px" }}>

          <p className="breadcrumb" style={{ marginLeft: mobileView ? "2vw" : "revert" }}>
            <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
              {t("ES_COMMON_HOME")}
            </Link>{" "}
            / {" "} <Link to="/digit-ui/employee/ws/WaterLandingPage" style={{ cursor: "pointer", color: "#666" }}>
              {t("Water Tax")}
            </Link>{" "}/ {" "}<span style={{ color: "#6B133F" }}>{getBreadCrumb()}</span>
          </p>
          <PrivateRoute path={`${path}/WaterLandingPage`} component={WaterLandingPage} />
          <PrivateRoute path={`${path}/create-application`} component={WSDocsRequired} />
          <PrivateRoute path={`${path}/new-application`} component={WSNewApplication} />
          <PrivateRoute path={`${path}/PreviewDemand`} component={PreviewDemand} />
          <PrivateRoute path={`${path}/PreviewEstimateDemand`} component={PreviewEstimateDemand} />
          {/* // <PrivateRoute path={`${path}/application-search`} component={WSSearch} /> */}
          {/* <PrivateRoute path={`${path}/application-search`} component={(props) => <SearchApp {...props} parentRoute={path} />} /> */}
          <PrivateRoute path={`${path}/application-search`} component={SearchEmpWaterComponent} />
          <PrivateRoute path={`${path}/edit-application/:id`} component={WSEditApplication} />
          {/* <PrivateRoute path={`${path}/edit-application/:service/:consumerNo/:finYear/:appNo`} component={WSEditApplication} /> */}
          <PrivateRoute path={`${path}/searchTax`} component={(props) => <Search {...props} t={t} parentRoute={path} />} />
          <PrivateRoute path={`${path}/wssearch/water-details/:id`} component={() => <WaterDetails parentRoute={path} />} />
          {/* <PrivateRoute path={`${path}/wssearch/water-details/:service/:consumerNo/:finYear/:appNo`} component={() => <WaterDetails parentRoute={path} />} /> */}
          {/* <PrivateRoute
  path="/digit-ui/employee/ws/wssearch/water-details/:service/:consumerNo/:finYear/:appNo"
  element={<WaterDetails />}
/> */}
          <PrivateRoute path={`${path}/success-applications/:id`} component={SuccessAppication} />
          <PrivateRoute path={`${path}/edit-disconnection-application`} component={WSEditDisconnectionApplication} />
          <PrivateRoute path={`${path}/resubmit-disconnection-application`} component={WSResubmitDisconnection} />
          <PrivateRoute path={`${path}/config-by-disconnection-application`} component={WSEditDisconnectionByConfig} />
          <PrivateRoute path={`${path}/application-details/:id`} component={WSApplicationDetails} />
          <PrivateRoute path={`${path}/modify-details`} component={WSModifyApplicationDetails} />
          <PrivateRoute path={`${path}/connection-details`} component={WSGetConnectionDetails} />
          <PrivateRoute path={`${path}/bill-amendment`} component={() => <WSApplicationBillAmendment {...{ path }} />} />
          <PrivateRoute path={`${path}/generate-note-bill-amendment`} component={() => <WSApplicationDetailsBillAmendment {...{ path }} />} />
          <PrivateRoute path={`${path}/response`} component={() => <Response {...{ path }} />} />
          <PrivateRoute path={`${path}/response-bill-amend`} component={() => <ResponseBillAmend {...{ path }} />} />
          <PrivateRoute path={`${path}/required-documents`} component={() => <WSRequiredDocuments {...{ path }} />} />
          <PrivateRoute path={`${path}/activate-connection`} component={WSActivateConnection} />
          <PrivateRoute path={`${path}/water/search-application`} component={(props) => <WSSearch {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/sewerage/search-application`} component={(props) => <WSSearch {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/ws-response`} component={WSResponse} />
          <PrivateRoute path={`${path}/ws-disconnection-response`} component={WSDisconnectionResponse} />
          <PrivateRoute path={`${path}/water/search-connection`} component={(props) => <WSSearchWater {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/sewerage/search-connection`} component={(props) => <WSSearchWater {...props} parentRoute={path} />} />

          <PrivateRoute path={`${path}/consumption-details`} component={WSConsumptionDetails} />
          <PrivateRoute path={`${path}/modify-application`} component={WSModifyApplication} />
          <PrivateRoute path={`${path}/modify-application-edit`} component={WSEditModifyApplication} />
          <PrivateRoute path={`${path}/disconnection-application`} component={WSDisconnectionDocsRequired} />
          <PrivateRoute path={`${path}/new-disconnection`} component={WSDisconnectionApplication} />
          <PrivateRoute path={`${path}/bill-amend/inbox`} component={(props) => <WSBillIAmendMentInbox {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/water/inbox`} component={(props) => <WSInbox {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/sewerage/inbox`} component={(props) => <WSInbox {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/edit-application-by-config`} component={WSEditApplicationByConfig} />
          <PrivateRoute path={`${path}/disconnection-details`} component={WSGetDisconnectionDetails} />
          <PrivateRoute path={`${path}/water/bill-amendment/inbox`} component={(props) => <WSBillIAmendMentInbox {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/sewerage/bill-amendment/inbox`} component={(props) => <WSBillIAmendMentInbox {...props} parentRoute={path} />} />

          {/* <Route path={`${path}/search`} component={SearchConnectionComponent} />
          <Route path={`${path}/search-results`} component={SearchResultsComponent} /> */}
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default App;

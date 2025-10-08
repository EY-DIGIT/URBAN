import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { shouldHideBackButton } from "../../utils";
import Search from "../employee/Search";
import { useTranslation } from "react-i18next";
import { PTMyPayments } from "./MyPayments";
import PropertyCardsLanding from "./PropertyCardsLanding/PropertyCardsLanding";

const hideBackButtonConfig = [
  { screenPath: "property/new-application/acknowledgement" },
  { screenPath: "property/edit-application/acknowledgement" },
  { screenPath: "/digit-ui/citizen/pt/citizen-services" }
];

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  const { t } = useTranslation();
  const inboxInitialState = {
    searchParams: {},
  };

  const CreateProperty = Digit?.ComponentRegistryService?.getComponent("PTCreateProperty");
  const EditProperty = Digit?.ComponentRegistryService?.getComponent("PTEditProperty");
  const SearchPropertyComponent = Digit?.ComponentRegistryService?.getComponent("PTSearchPropertyComponent");
  const SearchResultsComponent = Digit?.ComponentRegistryService?.getComponent("PTSearchResultsComponent");
  const PTApplicationDetails = Digit?.ComponentRegistryService?.getComponent("PTApplicationDetails");
  const PTMyApplications = Digit?.ComponentRegistryService?.getComponent("PTMyApplications");
  const MyProperties = Digit?.ComponentRegistryService?.getComponent("PTMyProperties");
  const MutateProperty = Digit?.ComponentRegistryService?.getComponent("PTMutateProperty");
  const PropertyInformation = Digit?.ComponentRegistryService?.getComponent("PropertyInformation");
  const PropertyOwnerHistory = Digit?.ComponentRegistryService?.getComponent("PropertyOwnerHistory");
  const PreviewDemand = Digit?.ComponentRegistryService?.getComponent("PreviewDemand");
  const PropertyCardsLanding = Digit?.ComponentRegistryService?.getComponent("PropertyCardsLanding");
  const PaymentForm = Digit?.ComponentRegistryService?.getComponent("PaymentForm");
  const CitizenServices = Digit?.ComponentRegistryService?.getComponent("CitizenServicesCards");
  const SuccessPage = Digit?.ComponentRegistryService?.getComponent("SuccessPage");
  const TrackApplication = Digit?.ComponentRegistryService?.getComponent("TrackApplication");

  const PropertyLedger = Digit?.ComponentRegistryService?.getComponent("PropertyLedger");
  const DemandNote = Digit?.ComponentRegistryService?.getComponent("DemandNote");
  const DetailLedgerPage = Digit?.ComponentRegistryService?.getComponent("DetailLedgerPage");

  console.log("Digit.ComponentRegistryService.getComponent",
    Digit.ComponentRegistryService)

  const stateCode = Digit.ULBService.getStateId();

  useEffect(
    () =>
      Digit.LocalizationService.getLocale({
        modules: ["rainmaker-pt"],
        locale: Digit.StoreData.getCurrentLanguage(),
        tenantId: stateCode,
      }),
    []
  );

  return (
    <span className={"pt-citizen"}>
      <Switch>
        <AppContainer>
          {!shouldHideBackButton(hideBackButtonConfig) ? <BackButton>Back</BackButton> : ""}
          <PrivateRoute path={`${path}/property/new-application`} component={CreateProperty} />
          {/* <PrivateRoute path={`${path}/property/PreviewDemand`} component={PreviewDemand} /> */}
          <PrivateRoute path={`${path}/property/Actions`} component={PropertyCardsLanding}></PrivateRoute>
          <PrivateRoute path={`${path}/property/previewPayment/:consumerCode`} component={PaymentForm}></PrivateRoute>

          <PrivateRoute path={`${path}/property/edit-application`} component={EditProperty} />
          <Route path={`${path}/property/citizen-search`} component={SearchPropertyComponent} />
          <Route path={`${path}/property/PreviewDemand`} component={PreviewDemand} />

          <Route path={`${path}/property/search-results`} component={SearchResultsComponent} />
          <PrivateRoute path={`${path}/property/application/:acknowledgementIds/:tenantId`} component={PTApplicationDetails}></PrivateRoute>
          <PrivateRoute path={`${path}/property/my-applications`} component={PTMyApplications}></PrivateRoute>
          <PrivateRoute path={`${path}/property/my-properties`} component={MyProperties}></PrivateRoute>
          <PrivateRoute path={`${path}/property/my-payments`} component={PTMyPayments}></PrivateRoute>
          <PrivateRoute path={`${path}/property/property-mutation`} component={MutateProperty}></PrivateRoute>
          <PrivateRoute path={`${path}/property/properties/:propertyIds`} component={PropertyInformation}></PrivateRoute>
          {/* <PrivateRoute path={`${path}/property/transfer-ownership`} component={MutateProperty}></PrivateRoute> */}
          <PrivateRoute path={`${path}/property/owner-history/:tenantId/:propertyIds`} component={PropertyOwnerHistory}></PrivateRoute>
          {/* <Redirect to={`/`}></Redirect> */}
          <PrivateRoute path={`${path}/property/search`} component={(props) => <Search {...props} t={t} parentRoute={path} />} />

          {/* Citizen Services */}
          <PrivateRoute path={`${path}/citizen-services`} component={CitizenServices}></PrivateRoute>
          <PrivateRoute path={`${path}/property/acknowledgement-pt`} component={SuccessPage}></PrivateRoute>
          <PrivateRoute path={`${path}/property/trackApplication`} component={TrackApplication}></PrivateRoute>

          <PrivateRoute path={`${path}/PropertyLedger`} component={PropertyLedger} />
          <PrivateRoute path={`${path}/DemandNote`} component={DemandNote} />
          <PrivateRoute path={`${path}/DetailLedgerPage`} component={DetailLedgerPage} />

        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;

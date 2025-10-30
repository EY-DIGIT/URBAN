import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

const hideBackButtonConfig = [
  { screenPath: "property/new-application/acknowledgement" },
  { screenPath: "property/edit-application/acknowledgement" },
  { screenPath: "/digit-ui/citizen/pt/citizen-services" }
];

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  const { t } = useTranslation();

  const DeathCertificate = Digit?.ComponentRegistryService?.getComponent("DeathCertificate");
  const BirthCardsLanding = Digit?.ComponentRegistryService?.getComponent("BirthCardsLanding");
  const SearchApplication = Digit?.ComponentRegistryService?.getComponent("SearchApplication");
  const NewbornDetailsSection = Digit?.ComponentRegistryService?.getComponent("NewbornDetailsSection");
  const DocumentsSection = Digit?.ComponentRegistryService?.getComponent("DocumentsSection");
  const SuccessModal = Digit?.ComponentRegistryService?.getComponent("SuccessModal");

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
    <span className={"death-citizen"}>
      <Switch>
        <AppContainer>
          {/* More specific routes should come first */}
          <PrivateRoute 
            path={`${path}/search-certificate`} 
            component={SearchApplication} 
          />
          <PrivateRoute 
            path={`${path}/new-born-certificate`} 
            component={NewbornDetailsSection} 
          />
          <PrivateRoute 
            path={`${path}/new-born-certificate`} 
            component={DocumentsSection} 
          />
          <PrivateRoute 
            path={`${path}/birthcertificate-success`} 
            component={SuccessModal} 
          />

          
          {/* Add exact prop to match only the base path */}
          <PrivateRoute 
            path={`${path}`} 
            exact 
            component={BirthCardsLanding} 
          />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
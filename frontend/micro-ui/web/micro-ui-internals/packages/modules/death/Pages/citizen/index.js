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
    const DeathCardsLanding = Digit?.ComponentRegistryService?.getComponent("DeathCardsLanding");
    const TrackApplication = Digit?.ComponentRegistryService?.getComponent("TrackApplication");

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
                    <PrivateRoute
                        path={`${path}`}
                        exact
                        component={DeathCardsLanding}
                    />

                    <PrivateRoute
                        path={`${path}/new-death-certificate`}
                        component={DeathCertificate}
                    />
                    <PrivateRoute
                        path={`${path}/track-death-certificate`}
                        component={TrackApplication}
                    />
                    <PrivateRoute
                        path={`${path}/view-death-certificate-status/:applicationId`}
                        component={DeathCertificate}
                    />
                </AppContainer>
            </Switch>
        </span>
    );
};

export default App;
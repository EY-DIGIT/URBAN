import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CitizenHomeCard } from "@egovernments/digit-ui-react-components";
import DeathCardsLanding from "../Pages/citizen/DeathCertLanding.jsx";
import DeathCertificate from "../Pages/citizen/NewDeathCertificateApplicationForm.jsx";
import CitizenApp from "../Pages/citizen/index.js";
import EmployeeApp from "../Pages/employee/index.js";
import { Header, PTIcon } from "@egovernments/digit-ui-react-components";
import TrackApplication from "../Pages/citizen/TrackApplication.jsx"

import DashboardLayout from "../Pages/employee/Dashboard.jsx"
import ViewApplication from "../Pages/employee/ViewApplication.jsx"
import UpdateDeathCertificateApplication from "../Pages/employee/UpdateApplicationStatus.jsx"

const componentsToRegister = {
  DeathCardsLanding,
  DeathCertificate,
  TrackApplication,
  ViewApplication,
  DashboardLayout,
  UpdateDeathCertificateApplication,
};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const DeathModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "DEATH";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  addComponentsToRegistry();

  Digit.SessionStorage.set("DEATH_TENANTS", tenants);
  useEffect(
    () =>
      userType === "employee" &&
      Digit.LocalizationService.getLocale({
        modules: [`rainmaker-${Digit.ULBService.getCurrentTenantId()}`],
        locale: Digit.StoreData.getCurrentLanguage(),
        tenantId: Digit.ULBService.getCurrentTenantId(),
      }),
    []
  );

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const deathLinks = [
  {
    link: "/digit-ui/citizen/death",
    i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
    accessTo: ["CITIZEN"],
  },
  {
    link: "/digit-ui/citizen/new-death-certificate",
    i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
    accessTo: ["CITIZEN"],
  },
];

export const DeathLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});

  // useEffect(() => {
  //   clearParams();
  // }, []);

  const links = [
    {
      link: "/digit-ui/citizen/death",
      i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
      accessTo: ["CITIZEN"],
    },
    {
      link: "/digit-ui/citizen/new-death-certificate",
      i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
      accessTo: ["CITIZEN"],
    },
  ];


  return <CitizenHomeCard header={t("ACTION_TEST_PROPERTY_TAX")} links={links} Icon={() => <PTIcon className="fill-path-primary-main" />} />;
};

export const DeathComponents = {
  DeathModule,
  DeathLinks,
};

import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CitizenHomeCard } from "@egovernments/digit-ui-react-components";
import BirthCardsLanding from "../Pages/BirthCertLanding";
//import DeathCertificate from "../Pages/NewDeathCertificateApplicationForm";
import CitizenApp from "../Pages/citizen/index.js";
import { Header, PTIcon } from "@egovernments/digit-ui-react-components";
import SearchApplication from "../components/SearchApplication.js";
import NewbornDetailsSection from "../components/NewbornDetailsSection.js";
import DocumentsSection from "../components/DocumentsSection.js";
import SuccessModal from "../components/Successmodal.js";
//import ApplicationDetailsSection from "../components/Applicationdetailssection.jsx";

console.log("Loaded Death Module");

let userType = "citizen"; // Default fallback
try {
  const userInfo = Digit?.UserService?.getUser()?.info;
  userType = userInfo?.type === "EMPLOYEE" ? "employee" : "citizen";
} catch (error) {
  console.warn("UserService not available, defaulting to citizen:", error);
}

console.log("Determined userType in Birth Module:", userType);

// Component registry
// const componentsToRegister = {
//   // DeathHome: Hello,
//   DeathHome: DeathCardsLanding,
//   DeathCertificate: DeathCertificate,
// };

// const addComponentsToRegistry = () => {
//   Object.entries(componentsToRegister).forEach(([key, value]) => {
//     Digit.ComponentRegistryService.setComponent(key, value);
//   });
// };

// // Main module function component
// export const DeathModule = ({ stateCode, userType, tenants }) => {
//   const { path, url } = useRouteMatch();

//   const moduleCode = "DEATH";
//   const language = Digit.StoreData.getCurrentLanguage();
//   const { isLoading, data: store } = Digit.Services.useStore({ 
//     stateCode, 
//     moduleCode, 
//     language 
//   });

//   // Register components
//   addComponentsToRegistry();

//   // Store tenants in session
//   Digit.SessionStorage.set("DEATH_TENANTS", tenants);

//   useEffect(() => {
//     if (userType === "employee") {
//       Digit.LocalizationService.getLocale({
//         modules: [`rainmaker-${Digit.ULBService.getCurrentTenantId()}`],
//         locale: Digit.StoreData.getCurrentLanguage(),
//         tenantId: Digit.ULBService.getCurrentTenantId(),
//       });
//     }
//   }, []);

//   return <CitizenApp />;
// };

// // Export links as an ARRAY for registration
// export const deathLinks = [
//   {
//     link: "/digit-ui/citizen/death",
//     i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
//     accessTo: ["CITIZEN"],
//   },
//   {
//     link: "/digit-ui/citizen/new-death-certificate",
//     i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
//     accessTo: ["CITIZEN"],
//   },
// ];

// // Links component for rendering in the UI
// export const DeathLinks = ({ matchPath, userType }) => {
//   const { t } = useTranslation();

//   const links = [
//     {
//       link: `${matchPath}/death`,
//       i18nKey: "CS_COMMON_DEATH_CERTIFICATE",
//     },
//   ];

//   return (
//     <CitizenHomeCard 
//       header={t("CS_COMMON_DEATH_CERTIFICATE")} 
//       links={links} 
//       Icon={() => <span className="icon">📄</span>}
//     />
//   );
// };

// // Components to exports
// export const DeathComponents = {
//   DeathModule,
//   DeathLinks,
//   // DeathHome: Hello,
//   DeathHome: DeathCardsLanding,
//   DeathCertificate: DeathCertificate,
// };


const componentsToRegister = {
  BirthCardsLanding,
  //DeathCertificate,
  SearchApplication,
  NewbornDetailsSection,
  DocumentsSection,
  SuccessModal,
  //ApplicationDetailsSection,
};

const addComponentsToRegistry = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export const BirthModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "BIRTH";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  addComponentsToRegistry();

  Digit.SessionStorage.set("BIRTH_TENANTS", tenants);
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

export const birthLinks = [
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

export const BirthLinks = ({ matchPath, userType }) => {
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

export const BirthComponents = {
  BirthModule,
  BirthLinks,
};

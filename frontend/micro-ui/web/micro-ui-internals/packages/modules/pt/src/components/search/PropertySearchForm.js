// import { CardLabelError, SearchField, SearchForm, SubmitBar, TextInput,Localities,MobileNumber } from "@egovernments/digit-ui-react-components";
// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";


// const SwitchComponent = (props) => {
//   let searchBy = props.searchBy;
//   return (
//     <div className="w-fullwidth PropertySearchFormSwitcher">
//       {props.keys.map((key) => (
//         <span key={key} className={searchBy === key ? "selected" : "non-selected"} onClick={() => {key === "searchDetail" && !(sessionStorage.getItem("searchDetailValue"))?sessionStorage.setItem("searchDetailValue",1):""; key==="searchId" && sessionStorage.getItem("searchDetailValue") == 1?sessionStorage.setItem("searchDetailValue",2):"";   props.onSwitch(key);props.onReset(); }}>
//           {props.t(`PT_SEARCH_BY_${key?.toUpperCase()}`)}
//         </span>
//       ))}
//     </div>
//   );
// };
// const SearchPTID = ({ tenantId, t, onSubmit, onReset, searchBy, PTSearchFields, setSearchBy ,payload}) => {
//   console.log("PTSearchFields", PTSearchFields);
//   const { register, control, handleSubmit, setValue, watch,getValues, reset, formState } = useForm({
//     defaultValues: {
//       ...payload,
//         }
//   });
//   const formValue = watch();
//   const fields = PTSearchFields?.[searchBy] || {};
//   sessionStorage.removeItem("revalidateddone");
//   return (
//     <div className="PropertySearchForm">
//       <SearchForm onSubmit={onSubmit} className={"pt-property-search"} handleSubmit={handleSubmit}>
//         <SwitchComponent keys={Object.keys(PTSearchFields || {})} searchBy={searchBy} onReset={onReset} t={t} onSwitch={setSearchBy} />
//         {fields &&
//           Object.keys(fields).map((key) => {
//             let field = fields[key];
//             let validation = field?.validation || {};
//             return (
//               <SearchField key={key} className={"pt-form-field"}>
//                 <label>{t(field?.label)}{`${field?.validation?.required?"*":""}`}</label>
//                 {field?.type==="custom"? 
//                 <Controller
//                  name= {key}
//                 defaultValue={formValue?.[key]}
//                 rules= {field.validation}
//                 control={control}
//                 render={(props, customProps) => (
//                   <field.customComponent
//                     selectLocality={(d) => {
//                       props.onChange(d);
//                     }}
//                     tenantId={tenantId}
//                     selected={formValue?.[key]}
//                     {...field.customCompProps}
//                   />
//                 )}
//                 />
//             :field?.type === "number"?
//             <div>
//             <MobileNumber
//               name="mobileNumber"
//               inputRef={register({
//                 value: getValues(key),
//                 shouldUnregister: true,
//                 ...validation,
//               })}
//               type="number"
//               componentInFront={<div className="employee-card-input employee-card-input--front">+91</div>}
//               //maxlength={10}
//         />
//         </div>
//         :
//             <TextInput
//                   name={key}
//                   type={field?.type}
//                   inputRef={register({
//                     value: getValues(key),
//                     shouldUnregister: true,
//                     ...validation,
//                   })}
//                 />}
//                 <CardLabelError style={{ marginTop: "-10px", marginBottom: "-10px" }}>{t(formState?.errors?.[key]?.message)}</CardLabelError>
//               </SearchField>
//             );
//           })}

//        <div className="pt-search-action" >
//          <SearchField  className="pt-search-action-reset">
//          <p style={{color:"#F47738"}}
//             onClick={() => {
//               onReset({});
//             }}
//           >
//             {t(`ES_COMMON_CLEAR_ALL`)}
//           </p>
//            </SearchField>
//        <SearchField className="pt-search-action-submit">
//           <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
//         </SearchField>
//        </div>
//       </SearchForm>
//     </div>
//   );
// };

// export default SearchPTID;

import React, { useState, useEffect } from "react";
import {
  SearchField,
  SearchForm,
  SubmitBar,
  TextInput,
  Localities,
  MobileNumber
} from "@egovernments/digit-ui-react-components";
import { Controller, useForm } from "react-hook-form";

const SearchPTID = ({ tenantId, t, PTSearchFields = {}, searchBy = "propertyId", setSearchBy = () => { }, onReset = () => { }, onSubmit = (data) => console.log("Submitted Data:", data), payload = {} }) => {
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      ...payload,
    }
  });

  const formValue = watch();
  
  const [gridColumns, setGridColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setGridColumns(1);
      } else if (width <= 768) {
        setGridColumns(2);
      } else if (width <= 1200) {
        setGridColumns(3);
      } else {
        setGridColumns(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    margin: "2rem auto",
    padding: "2rem",
    maxWidth: "1000px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column"
  };

  const labelStyle = {
    display: "block",
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0%',
    whiteSpace: 'nowrap'
  };

  const inputStyle = {
    width: "100%",
    minWidth: "200px",
    padding: "12px",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const selectStyle = {
    ...inputStyle
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: "1rem"
  };

  const colStyle = {
    display: "flex",
    flexDirection: "column"
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "2rem",
    gap: "1rem",
    width: "100%",
    gridColumn: "1 / -1"
  };

  const clearButton = {
    padding: "12px 24px",
    backgroundColor: "white",
    color: "#F47738",
    border: "1px solid #F47738",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    minWidth: "80px"
  };

  const searchButton = {
    padding: "12px 24px",
    backgroundColor: "#6b133f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    minWidth: "80px"
  };
  const dtat = {
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '42.5px',
    letterSpacing: '3%',
    verticalAlign: 'middle',
    color: "#6b133f"
  };
  const headerGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginBottom: "2rem"
  };

  const headerItemStyle = {
    display: "flex",
    flexDirection: "column"
  };

  const sectionTitleStyle = {
    ...dtat,
    marginBottom: "0.5rem"
  };

  const mainWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  };

  return (
    <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit} style={containerStyle} className="pt-property-search">
      <div style={mainWrapperStyle}>
        <div style={headerGridStyle}>
          <div style={headerItemStyle}>
            <h3 style={sectionTitleStyle}>Cash Desk</h3>
          </div>
          
          <div style={headerItemStyle}>
            <label style={labelStyle}>Assessment Year</label>
            <TextInput name="assessmentYear" inputRef={register} style={{...inputStyle, maxWidth: "200px"}} />
          </div>
          
          <div style={headerItemStyle}>
            <h4 style={sectionTitleStyle}>Search Criteria</h4>
          </div>
        </div>
        <div style={rowStyle}>
        <SearchField style={colStyle}>
          <label style={labelStyle}>Property ID</label>
          <TextInput name="propertyIds" inputRef={register} style={inputStyle} />
        </SearchField>

        <SearchField style={colStyle}>
          <label style={labelStyle}>Old Property ID</label>
          <TextInput name="oldPropertyId" inputRef={register} style={inputStyle} />
        </SearchField>

        <SearchField style={colStyle}>
          <label style={labelStyle}>House Number</label>
          <TextInput name="houseNo" inputRef={register} style={inputStyle} />
        </SearchField>
        <SearchField style={colStyle}>
          <label style={labelStyle}>Colony</label>
          <TextInput name="colony" inputRef={register} style={inputStyle} />
        </SearchField>
        <SearchField style={colStyle}>
          <label style={labelStyle}>Ward</label>

          <TextInput name="ward" inputRef={register} style={inputStyle} />
        </SearchField>

        <SearchField style={colStyle}>
          <label style={labelStyle}>Zone</label>
          <TextInput name="zone" inputRef={register} style={inputStyle} />
        </SearchField>

        <SearchField style={colStyle}>
          <label style={labelStyle}>Email ID</label>
          <TextInput name="email" type="email" inputRef={register} style={inputStyle} />
        </SearchField>



        {/* <SearchField style={colStyle}>
          <label style={labelStyle}>Locality / स्थानीयता</label>
          <Controller
            name="locality"
            control={control}
            defaultValue={{ code: "Bhopal", name: "Bhopal" }}
            render={({ onChange, value }) => (
              <Localities
                tenantId={tenantId}
                selected={value}
                selectLocality={(val) => onChange(val)}
              />
            )}
          />
        </SearchField> */}
        <SearchField style={colStyle}>
          <label style={labelStyle}>Address</label>
          <TextInput name="address" inputRef={register} style={inputStyle} />
        </SearchField>
        <SearchField style={colStyle}>
          <label style={labelStyle}>Mobile Number</label>
          <MobileNumber
            name="mobileNumber"
            inputRef={register}
            type="number"
            style={inputStyle}
            componentInFront={<div style={{ marginRight: "5px" }}>+91</div>}
          />
        </SearchField>

        <SearchField style={colStyle}>
          <label style={labelStyle}>Owner Name English</label>
          <TextInput name="ownerEnglish" inputRef={register} style={inputStyle} />
        </SearchField>

        <div style={buttonContainer}>
          <button type="button" style={clearButton} onClick={() => { reset(); onReset(); }}>Clear</button>
          <button type="submit" style={searchButton}>Search</button>
        </div>
        </div>
      </div>
    </SearchForm>
  );
};

export default SearchPTID;

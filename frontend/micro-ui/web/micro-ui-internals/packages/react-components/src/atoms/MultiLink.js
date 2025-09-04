import React, { forwardRef, useCallback, useRef } from "react";
import LinkButton from "./LinkButton";
import { PrimaryDownlaodIcon } from "./svgindex";
import { useTranslation } from "react-i18next";

const MultiLink = forwardRef(({ className, onHeadClick, displayOptions = false, options, label, icon, showOptions, downloadBtnClassName, downloadOptionsClassName, optionsClassName, style, optionsStyle, reportStyles, optionStyle }, ref) => {
  const { t } = useTranslation();
  const menuRef = useRef();
  const handleOnClick = useCallback(() => {
    showOptions?.(false)
  }, [])
  Digit.Hooks.useClickOutside(menuRef, handleOnClick, !displayOptions);

  const MenuWrapper = React.forwardRef((props, ref) => {
    return <div ref={ref} className={`multilink-optionWrap ${optionsClassName} ${downloadOptionsClassName}`} style={optionsStyle}>
      {options.map((option, index) => (
        <div onClick={() => option.onClick()} key={index} className={`multilink-option`} style={optionStyle}>
          {option?.icon}
          {option.label}
        </div>
      ))}
    </div>
  })
  const ackCss={
    background:"Yellow",
  }

  return (

    

    <div className={className} ref={ref} style={{...reportStyles,border:"1px solid",borderRadius:"12px",height:"43px",borderColor:"rgba(107, 19, 63, 1)",backgroundColor:"white",paddingBottom:"6px"}}>
      <div className={`multilink-labelWrap ${downloadBtnClassName}`} onClick={onHeadClick} style={style}>

        
        {icon ? icon : <PrimaryDownlaodIcon />}
        <LinkButton label={label || t("CS_COMMON_DOWNLOAD")+" "+ "Acknowledgment"} className="multilink-link-button" style={{color:"#6B133F"}}/>
       
      </div>
      {displayOptions ? <MenuWrapper ref={ref} /> : null}
    </div>



  );
});

export default MultiLink;

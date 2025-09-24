import React, { useEffect } from "react";

const AppContainer = (props) => {
  useEffect(() => {
    // Dynamically apply the style with !important
    const container = document.querySelector('.app-container');
    if (container) {
      container.style.setProperty('background-color', '#F3F2F7', 'important');
    }
  }, []);
  return (
    <React.Fragment>
      <div className="app-container">
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default AppContainer;

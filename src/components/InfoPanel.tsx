import React, { useState, useMemo } from "react";
import "../style/InfoPanel.css";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";

interface InfoPanelProps {
  label: string;
  info: string;
  isCentered?: boolean;
  isLarge?: boolean;
  visibilityToggleable?: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = (props) => {
  const {
    label,
    info,
    isCentered = false,
    isLarge = false,
    visibilityToggleable = false,
  } = props;

  const [visible, setVisible] = useState(visibilityToggleable ? false : true);
  const infoClassName = useMemo(
    () =>
      [
        "info-panel__info",
        isCentered ? "info-panel__info--centered" : "",
        isLarge ? "info-panel__info--large" : "",
      ].join(" "),
    [isCentered, isLarge]
  );

  const handleToggleVisibility = () => {
    setVisible((state) => !state);
  };

  return (
    <div className="info-panel">
      <label className="info-panel__label">{label}</label>
      <div className={infoClassName}>{visible && info}</div>
      {visibilityToggleable && (
        <button
          className="info-panel__toggle-visibility-button"
          onClick={handleToggleVisibility}
          aria-label={visible ? "Hide content" : "Show content"}
        >
          <img src={visible ? eyeIcon : eyeSlashIcon} aria-hidden={true} />
        </button>
      )}
    </div>
  );
};

export default InfoPanel;

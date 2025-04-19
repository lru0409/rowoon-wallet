import React from "react";
import NavigationBar from "../components/NavigationBar";
import "../style/common.css";
import "../style/ImportPage.css";

const ImportPage = () => {
  return (
    <div className="import-page">
      <NavigationBar />
      <div className="import-page__content">
        <div className="import-page__field">
          <label className="import-page__field-label">Recovery Phrase</label>
          <textarea className="import-page__field-textarea" />
        </div>
        <button className="button import-page__button">Restore</button>
      </div>
    </div>
  );
};

export default ImportPage;

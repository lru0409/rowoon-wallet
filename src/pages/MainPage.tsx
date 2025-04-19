import React from "react";
import NavigationBar from "../components/NavigationBar";
import InfoPanel from "../components/InfoPanel";
import "../style/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <NavigationBar />
      <div className="main-page__content">
        <section className="main-page__section">
          <label className="main-page__section-label">Balance</label>
          <div className="main-page__section-content main-page__section-content--balance">
            <InfoPanel
              label="Ethereum"
              info="10ETH"
              isCentered={true}
              isLarge={true}
            />
            <InfoPanel
              label="G-CRE"
              info="10"
              isCentered={true}
              isLarge={true}
            />
          </div>
        </section>
        <section className="main-page__section">
          <label className="main-page__section-label">About Wallet</label>
          <div className="main-page__section-content main-page__section-content--wallet">
            <InfoPanel label="Address" info="0000000000000000000000000000000" />
            <InfoPanel
              label="Private Key"
              info="0000000000000000000000000000000"
              visibilityToggleable={true}
            />
            <InfoPanel
              label="Mnemonic"
              info="nephew aaaaaa bbbb banana height mmmmm guit rrrrr play radio apple august"
              visibilityToggleable={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;

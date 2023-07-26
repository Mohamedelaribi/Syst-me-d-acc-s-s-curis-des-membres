import React from 'react';

import assets from '../../assets';

const HomePage = () => (
  <div className="home-page d-flex flex-column">
    <div className="page-content flex-grow-1 d-flex flex-column">
      <div className="welcome-block">
        <h4>Welcome to the MNM ClosingRoom Platform</h4>
        <p>The ClosingRoom platform is a global ‘digital closing room’ designed to streamline transactional closing processes in the OTC industry.</p>
        <p>The ClosingRoom handles the deal/transaction from start to finish, from intermediary parties to the closing of the deal, including support for Chain Analyses and Paymaster Services.</p>
        <br/>
        <p>The Application provides an easy to use platform for parties to coordinate on closings, fill and sign documents such as NCNDA’s, eliminates the need for physical closing rooms and greatly reduces the time, cost and effort of producing and signing relevant documents and contracts associated with an OTC transaction.</p>
        <br/>
        <p>MNM’s Closing Room’s signatures comply with the U.S. federal ESIGN Act and UETA, as well as international laws and statutes including European Union Regulation No 910/2014 on electronic identification and trust services (eIDAS).</p>
      </div>
      <div className="features-block flex-grow-1">
        <h2 className="text-center">Features</h2>
        <div className="row m-0">
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.secure} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">Secure, Private Closing Rooms</h4>
            <div className="content">
              <p>MNM Closing Room’s systems and processes meets the industry’s most rigorous security certification standards.</p>
              <p>Each ClosingRoom has its own dedicated, partitioned database so you can chat,</p>
              <p>negotiate and share sensitive documents and files comfortably knowing that your information is safe.</p>
            </div>
          </div>
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.chat} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">Live Communication</h4>
            <div className="content">
              <p>Chat with all parties live, negotiate terms and come to agreements in real time inside the ClosingRoom.</p>
            </div>
          </div>
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.pencil} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">Fill and Sign</h4>
            <div className="content">
              <p>The Closing Room provides pre drafted legal documents, after negotiating terms users can fill the forms with all relevant details of the transaction and send to all users for signatures.</p>
              <p>Fill and sign legally binding documents and contracts, such as; NCNDA’s, IMFPA’s, Paymaster Agreements etc.</p>
              <p> or task other members in the room to fill and sign certain contracts and documents.</p>
            </div>
          </div>
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.fileroom} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">FileRoom Utility</h4>
            <div className="content">
              <p>The FileRoom allows parties to upload, store and manage all files and documents pertinent to the deal being negotiated.</p>
              <p>The FileRoom also allows privileged users to toggle who sees what (in the main closing room) track document signature process, manage signing order and more.</p>
            </div>
          </div>
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.tasks} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">Tasks Utility</h4>
            <div className="content">
              <p>The Tasks feature of the closing room, allows privileged users to pick and choose which documents or contracts are mandatory and in what order they must be complete. Tasks can be delegated to single users or every user in the room.</p>
            </div>
          </div>
          <div className="feature col-md-4 col-sm-6 col-xs-12 mb-5 text-center">
            <img src={assets.verify} className="feature-image mb-2"/>
            <h4 className="subtitle mb-4">Enhanced Verification</h4>
            <div className="content">
              <p>All users participating in the signing of any legal documents are required to pass enhanced ID verification process’s.</p>
              <p> Users who have not yet passed this verification will be marked unverified for other users to see.</p>
              <p>The verification feature even further strengthens the legal documents produced by the ClosingRoom.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;

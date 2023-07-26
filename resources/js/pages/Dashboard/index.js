import React from 'react';

import DefaultHeader from '../../Layout/Header/DefaultHeader';
import assets from '../../assets';
import * as functions from '../../functions';

const DashboardPage = () => (
  <div className="dashboard-page d-flex flex-column">
    <div className="page-content flex-grow-1 container">
      <div className="title px-5 py-3 text-center font-weight-bold">
        Welcome to MNM’s ClosingRoom®
      </div>
      <div className="description mb-5">
        <div className="my-3 text-center">ClosingRoom is currently in development/testing phases and may not be 100% functional at all times.</div>
        <div className="my-3 text-center">For any help/inquiries please contact <b>Michael @ michael@mnmcs.com / +61411118126</b> (WhatsApp).</div>
      </div>
      <div className="news-updates">
        <div className="subtitle text-center font-weight-bold">News/Updates</div>
        <div className="date">{functions.getFormattedDate(new Date())}</div>
        <div className="news paragraph mb-3">
          <div className="heading font-weight-bold">Complete Features (testing):</div>
          <div>- FileRoom</div>
          <div>- MainRoom</div>
          <div>- Invite users</div>
          <div>- E-mail functionality</div>
          <div>- Admin Panel/Functionality</div>
        </div>
        <div className="updates paragraph mb-3">
          <div className="heading font-weight-bold">Features Coming Soon:</div>
          <div>- TaskManager</div>
          <div>- ‘Professional’ registration</div>
          <div>- DocuSign integration</div>
          <div>- Enhanced FileRoom features</div>
          <div>- Audio calling</div>
          <div>- In-house Chain Analyses System</div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;

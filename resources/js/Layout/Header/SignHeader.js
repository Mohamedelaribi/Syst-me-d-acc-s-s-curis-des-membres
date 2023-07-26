import React from 'react';
import { Link } from 'react-router-dom';

import assets from '../../assets';

const SignHeader = () => (
    <div className="sign-header pt-5 pb-4">
        <div className="d-flex justify-content-center align-items-center">
            <div className="logo-image mr-2">
                <img src={assets.logo_transparent}/>
            </div>
            <div className="logo-text text-left text-white">
                <div className="title">
                    MNM
                </div>
                <div className="subtitle">
                    Closing Room
                </div>
            </div>
        </div>
    </div>
);

export default SignHeader;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import AppHeader from 'components/AppHeader';
import Pipeline from 'pages/Pipeline';
import AppFooter from 'components/AppFooter';

import './App.css';
import Playfair from 'pages/Playfair';
import Affine from 'pages/Affine';
import StandardVigenere from 'pages/StandardVigenere';
import AutoVigenere from 'pages/AutoVigenere';
import FullVigenere from 'pages/FullVigenere';
import ExtendedVigenere from 'pages/ExtendedVigenere';
import SuperEcryption from 'pages/SuperChiper';
import HillCipher from 'pages/Hillcipher';

const App: React.FC<{}> = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1 bg-gray-300">
                {/* <Pipeline /> */}
                <Playfair />
                {/* <Affine /> */}
                {/* <StandardVigenere/> */}
                {/* <AutoVigenere/> */}
                {/* <FullVigenere /> */}
                {/* <ExtendedVigenere/> */}
                {/* <SuperEcryption /> */}
                {/* <HillCipher /> */}
                {/* <Playfair /> */}
            </div>
            <AppFooter />
        </div>
    );
};

export default App;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';

import './App.css';
import Playfair from 'pages/Playfair';
import Affine from 'pages/Affine';
import StandardVigenere from 'pages/StandardVigenere';
import AutoVigenere from 'pages/AutoVigenere';
import FullVigenere from 'pages/FullVigenere';
import ExtendedVigenere from 'pages/ExtendedVigenere';
import SuperEncryption from 'pages/SuperChiper';
import HillCipher from 'pages/Hillcipher';
import Enigma from 'pages/Enigma';

const App: React.FC<{}> = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <AppHeader />
                <div className="flex-1 bg-gray-300">
                    <Route
                        path="/"
                        component={(): any => <Redirect to="/affine" />}
                    />
                    <Route path="/playfair" component={Playfair} />
                    <Route path="/affine" component={Affine} />
                    <Route
                        path="/standardvigenere"
                        component={StandardVigenere}
                    />
                    <Route path="/autovigenere" component={AutoVigenere} />
                    <Route path="/fullvigenere" component={FullVigenere} />
                    <Route
                        path="/extendedvigenere"
                        component={ExtendedVigenere}
                    />
                    <Route
                        path="/superencryption"
                        component={SuperEncryption}
                    />
                    <Route path="/hillcipher" component={HillCipher} />
                    <Route path="/enigma" component={Enigma} />
                </div>
                <AppFooter />
            </BrowserRouter>
        </div>
    );
};

export default App;

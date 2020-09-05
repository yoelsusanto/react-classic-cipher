import React from 'react';

import AppHeader from 'components/AppHeader';
import Pipeline from 'pages/Pipeline';
import AppFooter from 'components/AppFooter';

import './App.css';

const App: React.FC<{}> = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1 bg-gray-300">
                <Pipeline />
            </div>
            <AppFooter />
        </div>
    );
};

export default App;

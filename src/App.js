import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Theme } from '@carbon/react';

import './App.scss';
import { SetupQuiz } from "./components/SetupQuiz";
import { NpsHeader } from './components/Header';
import { FileProvider } from './components/FileContext';
import { SelectSections } from './components/SelectSections';


export const App = () => {
  return (
    <FileProvider>
      <Theme theme="white">
        <div className='main-div'>
          <Theme theme="g90">
            <NpsHeader />
          </Theme>
          <main>
            <Switch>
              <Route exact path="/" component={SelectSections} />
              <Route path="/setupquiz" component={SetupQuiz} />
              <Route path="/selectsections" component={SelectSections} />
            </Switch>
          </main>
        </div>
      </Theme>
    </FileProvider>
  );
};

export default App;

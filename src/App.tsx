import React, {Fragment} from 'react';
import RouterComponent from "./router/router";
import './common/style/common.css'
import {isMobile} from "./util/util";

function App() {
  return (
    <Fragment>
        <div className={isMobile ? 'App-mobile' : 'App'}>
            <div className={isMobile ? 'App-container-mobile' : 'App-container'}>
                <RouterComponent></RouterComponent>
            </div>
        </div>
    </Fragment>
  );
}

export default App;

import React, {Fragment} from 'react';
import RouterComponent from "./router/router";
import './common/style/common.css'
import {isMobile} from "./util/util";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextMenu from "./components/Common/ContextMenu/ContextMenu";

function App() {
  return (
    <Fragment>
        <div className={isMobile ? 'App-mobile' : 'App'}>
            <div className={isMobile ? 'App-container-mobile' : 'App-container'}>
                <RouterComponent></RouterComponent>
            </div>
        </div>
        <ContextMenu></ContextMenu>
    </Fragment>
  );
}

export default App;

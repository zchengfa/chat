import React, {Fragment} from 'react';
import RouterComponent from "./router/router";
import './common/style/common.css'


function App() {
  return (
    <Fragment>
        <div className={'App'}>
            <div className={'App-container'}>
                <RouterComponent></RouterComponent>
            </div>
        </div>
    </Fragment>
  );
}

export default App;

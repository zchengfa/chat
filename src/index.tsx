import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import dotenv_expand from "dotenv-expand";
dotenv_expand({})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Suspense>
    <App />
  </Suspense>
);
/**
 * React.StrictMode高阶组件会导致useEffect执行两次
 * <React.StrictMode>
 *     <Suspense>
 *         <App />
 *     </Suspense>
 *   </React.StrictMode>
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";

//mount function to start up the app
const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, authState, onSignIn }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  console.log(defaultHistory);

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    // <Provider store={store}>
      <App history={history} authState={authState} onSignIn={onSignIn} />
    // </Provider>,
    ,el
  );
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

//development and in isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_personal_test-dev-root");
  let authState = {
    currentUser: {
      _id: "61375c3249b82cef63b34cd3",
      userId: "STYL814725",
      name: "Mithun Shenoy",
      emailId: "shenoymithun70@gmail.com",
      role: "Owner",
      region: ["North America"],
      country: ["US"],
      companyId: "COMP02932",
      reportsTo: "STYL02932",
      isVerified: true,
    },
    authToken: "",
    isAuth: true,
  };
  console.log(devRoot);

  if (devRoot) {
    console.log("Hello?");
    mount(devRoot, { defaultHistory: createBrowserHistory(), authState });
  }
}

export { mount };

/** @format */

import React, { lazy, Suspense } from "react";
import LoadingScreen from "./Components/LoadingScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./scss/main.scss";
import { routes as raw_routes, ChangeThemeContext } from "./Other/Constants";
import { Theme, GearResolvedRoute, GearPromisedRoute } from "./Other/Types";
import { VERSION } from "./version";
import { getCurrentTheme, setCurrentTheme } from "./Other/Utils";
import { ThemeContext } from "./Other/Constants";
import CrashScreenErrorBoundary from "./Pages/CrashScreenErrorBoundary";

const NavBar = lazy(() => import("./Components/NavBar"));
const Footer = lazy(() => import("./Components/Footer"));

let routes = raw_routes.map((route) => {
  return {
    exact: route.exact,
    path: route.path,
    component: () => import(`./Pages/${route.component_file_name}`),
  } as GearPromisedRoute;
});

type AppProps = {};

type AppState = {
  width: number;
  height: number;
  theme: Theme;
};

export class App extends React.Component<AppProps, AppState> {
  scrollerRef: React.RefObject<HTMLDivElement>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      theme: getCurrentTheme(),
    };
    this.scrollerRef = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    if (process.env.REACT_APP_VERSIONCHECK === "true") {
      fetch("/version.txt").then((response) =>
        response.text().then((text) => {
          if (text.replace(/\n/g, "") !== VERSION) {
            let attempt = localStorage.getItem("update_attempt");
            if (attempt === null) {
              localStorage.setItem("update_attempt", "1");
              this.unregister_and(() => window.location.reload(true));
            } else if (attempt === "1") {
              localStorage.setItem("update_attempt", "2");
              this.unregister_and(
                () =>
                  (window.location.href =
                    window.location.href +
                    (window.location.href.includes("?") ? "&" : "?") +
                    "update")
              );
            } else {
              localStorage.removeItem("update_attempt");
              alert(
                "Failed to update to the latest version of the dashboard! You are currently using an older version cached by your browser."
              );
            }
          } else {
            localStorage.removeItem("update_attempt");
          }
        })
      );
    }

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  unregister_and(action: Function) {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) {
        reg.unregister().then(function () {
          action();
        });
      } else {
        action();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  async handleRouteComponent(
    route: GearResolvedRoute,
    props: { [key: string]: any }
  ) {
    return (
      <Suspense fallback={LoadingScreen}>
        <route.Component {...props} pageWidth={this.state.width} />
      </Suspense>
    );
  }

  render() {
    return (
      <Router>
        <div className={"main theme-" + this.state.theme}>
          <div className="themed">
            <CrashScreenErrorBoundary>
              <Suspense fallback={<></>}>
                <ThemeContext.Provider value={this.state.theme}>
                  <ChangeThemeContext.Provider
                    value={(theme: Theme) => this.setState({ theme: theme })}
                  >
                    <NavBar
                      pageWidth={this.state.width}
                      scroller={this.scrollerRef.current!!}
                      user={
                      /**{
                      username: "JohnyTheCarrot",
                      discriminator: "0001",
                      id: "132819036282159104",
                      avatar: "cd1027e339b0e0a1001fd84cf7e3be13",
                    }*/ undefined
                      }
                    />
                    <div className="main-scroller" ref={this.scrollerRef}>
                      <div className="page">
                        <Suspense fallback={<LoadingScreen />}>
                          {routes.map(
                            (route: GearPromisedRoute, index: number) => {
                              return (
                                <Route
                                  exact={route.exact}
                                  path={route.path}
                                  key={"route-" + index}
                                  render={(props: { [key: string]: any }) => {
                                    let Component = lazy(route.component);
                                    return (
                                      <Component
                                        {...props}
                                        pageWidth={this.state.width}
                                      />
                                    );
                                  }}
                                />
                              );
                            }
                          )}
                        </Suspense>
                      </div>
                      <Footer
                        pageWidth={this.state.width}
                        scroller={this.scrollerRef.current!!}
                        setTheme={(theme: Theme) => {
                          this.setState({
                            theme: theme,
                          });
                          setCurrentTheme(theme);
                        }}
                      />
                    </div>
                  </ChangeThemeContext.Provider>
                </ThemeContext.Provider>
              </Suspense>
            </CrashScreenErrorBoundary>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

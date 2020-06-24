/** @format */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./scss/main.scss";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { routes } from "./Other/Constants";
import { GearRoute, Theme } from "./Other/Types";
import { VERSION } from "./version";
import { getCurrentTheme, setCurrentTheme } from "./Other/Utils";
import { ThemeContext } from "./Other/Constants";

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
              this.unregister_and(() => window.location.href = window.location.href + (window.location.href.includes("?") ? "&": "?") + "update");
            } else {
              localStorage.removeItem("update_attempt")
              alert("Failed to update to the latest version of the dashboard! You are currently using an older version cached by your browser.")
            }
          } else {
            localStorage.removeItem("update_attempt")
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
          action()
        });
      } else {
        action()
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

  handleRouteComponent(route: GearRoute, props: { [key: string]: any }) {
    return <route.component {...props} pageWidth={this.state.width} />;
  }

  render() {
    return (
      <Router>
        <div className={"main theme-" + this.state.theme}>
          <div className="themed">
            <ThemeContext.Provider value={this.state.theme}>
              <NavBar
                pageWidth={this.state.width}
                scroller={this.scrollerRef.current!!}
              />
              <div className="main-scroller" ref={this.scrollerRef}>
                <div className="page">
                  {routes.map((route: GearRoute, index: number) => {
                    return (
                      <Route
                        exact={route.exact}
                        path={route.path}
                        key={"route-" + index}
                        render={(props: { [key: string]: any }) =>
                          this.handleRouteComponent(route, props)
                        }
                      />
                    );
                  })}
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
            </ThemeContext.Provider>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

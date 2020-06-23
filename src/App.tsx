/** @format */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./scss/main.scss";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { routes } from "./Other/Constants";
import { GearRoute, Theme } from "./Other/Types";
import { VERSION } from "./version";
import { getCurrentTheme } from "./Other/Utils";

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
            navigator.serviceWorker.getRegistration().then(function (reg) {
              if (reg) {
                reg.unregister().then(function () {
                  window.location.reload(true);
                });
              } else {
                window.location.reload(true);
              }
            });
          }
        })
      );
    }

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
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
    return (
      <route.component
        {...props}
        pageWidth={this.state.width}
        theme={this.state.theme}
      />
    );
  }

  render() {
    return (
      <Router>
        <div className={"main theme-" + this.state.theme}>
          <div className="themed">
            <NavBar
              pageWidth={this.state.width}
              scroller={this.scrollerRef.current!!}
              theme={this.state.theme}
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
                theme={this.state.theme}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

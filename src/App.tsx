/** @format */

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/main.scss";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { routes } from "./Other/Constants";
import { GearRoute } from "./Other/Types";

type AppProps = {};

type AppState = {
  width: number;
  height: number;
};

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
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
    return <route.component {...props} pageWidth={this.state.width} />;
  }

  render() {
    return (
      <Router>
        <div className="main">
          <NavBar pageWidth={this.state.width} />
          <div className="main-scroller">
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
            <Footer pageWidth={this.state.width} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

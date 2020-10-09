import React from "react";
import "../scss/pages/loading-screen.scss";

type LoadingScreenProps = {};

type LoadingScreenState = {
  showLoading: boolean;
};

export default class LoadingScreen extends React.Component<
  LoadingScreenProps,
  LoadingScreenState
> {
  constructor(props: LoadingScreenProps) {
    super(props);
    this.state = { showLoading: false };
  }
  timeout?: NodeJS.Timeout;
  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ showLoading: true }), 1000);
  }
  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }
  render() {
    return (
      <div className="loading-screen">
        {this.state.showLoading && <h1 className="loading">Loading...</h1>}
      </div>
    );
  }
}
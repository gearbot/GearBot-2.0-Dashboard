import React from "react";
import "../scss/pages/crash-screen.scss";

type CrashScreenErrorBoundaryProps = {
  children?: React.ReactNode;
};

type CrashScreenErrorBoundaryState = {
  hasError: boolean;
  error?: any;
};

export default class CrashScreenErrorBoundary extends React.Component<
  CrashScreenErrorBoundaryProps,
  CrashScreenErrorBoundaryState
  > {
  constructor(props: CrashScreenErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="crash-screen">
          <div className="content">
            <h1 className="error" data-text="ERROR">
              ERROR
            </h1>
            <h1 className="glow">ERROR</h1>
            <h2 className="error-subtext">Sorry about that.</h2>
            {/**<button
              className="primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>*/}
          </div>
          <p className="error-tip">
            For the techy types, the error has been logged to the console.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
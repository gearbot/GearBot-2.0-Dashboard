/** @format */

import React, { CSSProperties } from "react";

type GridProps = {
  gap?: number;
  className?: string;
  style?: CSSProperties;
  full_width?: boolean;
};

export class Grid extends React.Component<GridProps, {}> {
  render() {
    let style = this.props.style ?? {};
    style.gridGap = this.props.gap;
    return (
      <div
        className={
          "grid " +
          (this.props.full_width !== false ? "full_width " : "") +
          (this.props.className ?? "")
        }
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}

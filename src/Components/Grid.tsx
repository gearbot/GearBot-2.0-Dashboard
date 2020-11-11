/** @format */

import React, { CSSProperties } from "react";

type GridProps = {
  gap?: number;
  className?: string;
  style?: CSSProperties;
  full_width?: boolean;
  child_ref?: React.RefObject<any>;
};

export default class Grid extends React.Component<GridProps, {}> {
  render() {
    let style: CSSProperties = { ...(this.props.style ?? {}) };
    style.gap = this.props.gap;
    return (
      <div
        className={
          "grid " +
          (this.props.full_width !== false ? "full_width " : "") +
          (this.props.className ?? "")
        }
        ref={this.props.child_ref}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}

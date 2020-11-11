import React from "react";

import "../scss/Components/checkbox.scss";

import { ReactComponent as CheckBoxEnabled } from "../SVG/checkbox-enabled.svg";


type CheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default class CheckBox extends React.Component<CheckBoxProps, {}> {
  render() {
    return (
      <div
        className="checkbox pointer-cursor"
        onClick={() => this.props.onChange(!this.props.checked)}
        data-checked={this.props.checked}
      >
        {this.props.checked &&
          <CheckBoxEnabled width={10} height={10} />
        }
      </div>
    );
  }
}
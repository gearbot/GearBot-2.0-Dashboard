import React, { CSSProperties } from "react";

type ToggleSwitchProps = {
  style?: CSSProperties;
  open: boolean;
  onChange: (new_value: boolean) => void;
};

type ToggleSwitchState = {};

export default class ToggleSwitch extends React.Component<
  ToggleSwitchProps,
  ToggleSwitchState
> {
  constructor(props: ToggleSwitchProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={"toggleswitch" + (this.props.open ? " on" : " off")}
        style={this.props.style}
        onClick={() => {
          this.props.onChange(!this.props.open);
        }}
      />
    );
  }
}

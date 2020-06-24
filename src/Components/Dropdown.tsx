import React, { CSSProperties } from "react";
import { getSVGPath, getThemedSVGPath } from "../Other/Utils";
import { ThemeContext } from "../Other/Constants";

type Option = { actualValue: string; value: string };

type DropdownProps = {
  parentStyle?: CSSProperties;
  style?: CSSProperties;
  options: Option[] | string[];
  value: string;
  onChange: (newValue: string, newActualValue?: string) => void;
};

type DropdownState = {
  opened: boolean;
};

export default class Dropdown extends React.Component<
  DropdownProps,
  DropdownState
> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      opened: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  close() {
    this.setState({
      opened: false,
    });
  }

  open() {
    this.setState({
      opened: true,
    });
  }

  changeValue(value: string, actualValue?: string) {
    this.props.onChange(value, actualValue);
    this.close();
  }

  render() {
    return (
      <div className="dropdown-parent" style={this.props.parentStyle}>
        <div className="dropdown" style={this.props.style} onClick={this.open}>
          <div>
            {typeof this.props.options[0] === "string" ? (
              <span>{this.props.value ?? this.props.options[0]}</span>
            ) : (
              <span>{this.props.options[0].value}</span>
            )}
            <img src={getSVGPath("dropdown-closed")} alt="open" />
          </div>
        </div>
        {this.state.opened && (
          <div className="dropdown-opened">
            <ThemeContext.Consumer>
              {(theme) => (
                <img
                  src={getThemedSVGPath(theme, "dropdown-open")}
                  onClick={this.close}
                  alt="close"
                />
              )}
            </ThemeContext.Consumer>
            {typeof this.props.options[0] === "string"
              ? (this.props.options as string[]).map(
                  (option: string, index: number) => {
                    return (
                      <div
                        key={"option-" + index}
                        onClick={() => this.changeValue(option)}
                      >
                        <p>{option}</p>
                      </div>
                    );
                  }
                )
              : (this.props.options as Option[]).map(
                  (option: Option, index: number) => {
                    return <p>{option.value}</p>;
                  }
                )}
          </div>
        )}
      </div>
    );
  }
}

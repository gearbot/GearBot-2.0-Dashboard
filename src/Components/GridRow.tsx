/** @format */

import React, {CSSProperties} from "react";

type GridRowProps = {
	cells?: number | "auto";
	cell_override?: string;
	gap?: number;
	className?: string;
	full_width?: boolean;
	style?: CSSProperties;
};

type GridRowState = {
	width: number;
};

export class GridRow extends React.Component<GridRowProps, GridRowState> {
	ref: React.RefObject<HTMLDivElement>;
	constructor(props: GridRowProps) {
		super(props);
		this.state = {
			width: 0,
		};
		this.ref = React.createRef();
	}
	render() {
		let cells: string;
		if (this.props.cells === undefined) {
			cells = this.props.cell_override ?? "1fr";
		} else if (this.props.cells === "auto") {
			cells = "auto ".repeat(React.Children.count(this.props.children));
		} else {
			cells = "1fr ".repeat(this.props.cells);
		}
		let style = this.props.style ?? {};
		style.gridGap = this.props.gap;
		style.gridTemplateColumns = cells;
		return (
			<div
				ref={this.ref}
				className={
					"grid-row " +
					(this.props.full_width !== false ? "full-width " : "") +
					(this.props.className ?? "")
				}
				style={style}
			>
				{this.props.children}
			</div>
		);
	}
}

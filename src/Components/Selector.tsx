import React, {CSSProperties} from "react";
import Grid from "./Grid";
import {GridRow} from "./GridRow";

import ResizeObserver from "resize-observer-polyfill";

//SVGs
import {ReactComponent as IconNext} from "../SVG/next.svg";
import {ReactComponent as IconPrevious} from "../SVG/previous.svg";

type SelectorProps = {
	title: string;
	style?: CSSProperties;
};

type SelectorState = {
	index: number;
	width: number;
};

// Change these values only when changing them in main.scss (.guild:not(:first-child)), too!
const guildGap = 20;
const guildWidth = 182;
const fadedGuildWidth = 60;

export default class Selector extends React.Component<
	SelectorProps,
	SelectorState
> {
	ref: React.RefObject<any>;

	constructor(props: SelectorProps) {
		super(props);
		this.state = {
			index: 0,
			width: 0,
		};
		this.showSlice = this.showSlice.bind(this);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.ref = React.createRef();
	}

	componentDidMount() {
		let observer = new ResizeObserver((entries) =>
			this.setState({
				width: entries[0].contentRect.width,
			})
		);
		observer.observe(this.ref.current);
	}

	calculateMaxItemsOnScreen() {
		const offset = () => guildGap + guildWidth;

		const pageWidthWithoutFaders = () => this.state.width / offset();

		const isSecondFaderVisible = () =>
			React.Children.count(this.props.children) -
				pageWidthWithoutFaders() !==
			this.state.index;

		const isFirst = () => this.state.index > 0;

		let fadedGuildFactor = 1;

		if (!isFirst() && isSecondFaderVisible()) {
			fadedGuildFactor = 2;
		}

		return Math.floor(
			(this.state.width +
				(fadedGuildWidth + guildGap) * fadedGuildFactor) /
				offset() -
				1
		);
	}

	showSlice() {
		let children = this.props.children;
		return React.Children.map(children, (child, index: number) => {
			if (
				index >= this.state.index &&
				index - this.state.index < this.calculateMaxItemsOnScreen()
			)
				return child;
			else return undefined;
		});
	}
	previous() {
		if (this.state.index - 1 < 0) return;
		this.setState({
			index: this.state.index - 1,
		});
	}
	next() {
		const newIndex = this.state.index;
		const maxItemsOnScreen = this.calculateMaxItemsOnScreen();
		const childCount = React.Children.count(this.props.children);
		if (
			newIndex ===
			React.Children.count(this.props.children) -
				this.calculateMaxItemsOnScreen()
		)
			return;
		if (childCount <= maxItemsOnScreen) return;
		this.setState({
			index: this.state.index + 1,
		});
	}
	render() {
		const maxItemsOnScreen = this.calculateMaxItemsOnScreen();
		const childCount = React.Children.count(this.props.children);
		let hasNext =
			childCount - maxItemsOnScreen !== this.state.index &&
			childCount >= maxItemsOnScreen;
		return (
			<Grid
				gap={8}
				className="selector"
				style={this.props.style}
				child_ref={this.ref}
			>
				<GridRow cell_override="1fr auto">
					<h3 className="selector-title">{this.props.title}</h3>
					<GridRow cells={2} gap={8}>
						<div
							className="selector-control"
							onClick={this.previous}
							style={{
								cursor:
									this.state.index === 0
										? "not-allowed"
										: undefined,
							}}
						>
							<IconPrevious
								className={
									"svg_previous" +
									(this.state.index === 0 ? "-disabled" : "")
								}
							/>
						</div>
						<div
							className="selector-control"
							draggable={false}
							onClick={this.next}
							style={{
								cursor: !hasNext ? "not-allowed" : undefined,
							}}
						>
							<IconNext
								className={
									"svg_next" + (!hasNext ? "-disabled" : "")
								}
							/>
						</div>
					</GridRow>
				</GridRow>
				<div
					className={
						"items" +
						(this.state.index > 0 ? " non-zero-index" : "")
					}
				>
					{this.state.index !== 0 && (
						<div className="faded-item f1">
							<div />
						</div>
					)}
					{this.showSlice()}
					{hasNext && (
						<div className="faded-item f2">
							<div />
						</div>
					)}
				</div>
			</Grid>
		);
	}
}

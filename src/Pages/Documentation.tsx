/** @format */

import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type SectionsSelectorProps = {
  paths?: { [key: string]: string[] };
};

type SectionsSelectorState = {};

export class SectionsSelector extends React.Component<
  SectionsSelectorProps,
  SectionsSelectorState
> {
  constructor(props: SectionsSelectorProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.paths &&
          Object.keys(this.props.paths).map((path: string, index: number) => {
            return (
              <Link key={index} to={`/docs/${path}`} className="doc-section">
                {path}
              </Link>
            );
          })}
      </div>
    );
  }
}

type SubsectionSelectorProps = {
  paths?: { [key: string]: string[] };
  selectedSection: string;
};

type SubsectionSelectorState = {};

export class SubsectionSelector extends React.Component<
  SubsectionSelectorProps,
  SubsectionSelectorState
> {
  constructor(props: SubsectionSelectorProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.paths === undefined) return <></>;
    return this.props.paths[this.props.selectedSection].map(
      (subsection: string, index: number) => {
        return (
          <Link
            to={`/docs/${this.props.selectedSection}/${subsection}`}
            key={index}
            className="doc-section"
          >
            {subsection}
          </Link>
        );
      }
    );
  }
}

type DocumentationProps = {
  match?: {
    params: {
      section: string;
      subsection: string;
    };
  };
};

type DocumentationState = {
  paths?: { [key: string]: string[] };
  markdown?: string;
};

export class Documentation extends React.Component<
  DocumentationProps,
  DocumentationState
> {
  constructor(props: DocumentationProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.match?.params.subsection) {
      fetch(
        `/_documentation/${this.props.match.params.section}/${this.props.match.params.subsection}.md`
      )
        .then((res) => res.text())
        .then((markdown) =>
          this.setState({
            markdown: markdown,
          })
        );
    } else {
      fetch("/_documentation/paths.json")
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            paths: json,
          });
        });
    }
  }

  render() {
    return (
      <div className="page-docs">
        {!this.props.match?.params.section &&
        !this.props.match?.params.subsection ? (
          <div className="center">
            <h1 className="title full-width">Documentation</h1>
            <SectionsSelector paths={this.state.paths} />
          </div>
        ) : this.props.match.params.subsection ? (
          <div>
            <ReactMarkdown source={this.state.markdown} />
          </div>
        ) : (
          <div className="center">
            <h1 className="title full-width">
              {this.props.match.params.section}
            </h1>
            <SubsectionSelector
              paths={this.state.paths}
              selectedSection={this.props.match.params.section}
            />
          </div>
        )}
      </div>
    );
  }
}

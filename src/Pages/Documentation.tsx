/** @format */

import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getString } from "../Language/LanguageHandler";
import paths from "../Data/paths.json";

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
    if (!this.props.paths[this.props.selectedSection])
      return <h1>Doc section not found</h1>;
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
  markdown?: string;
};

export default class Documentation extends React.Component<
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
    }
  }

  render() {
    // sorry for the mess
    // TODO: clean up
    let paths_typed = paths as { [key: string]: string[] };
    return (
      <div className="page-docs">
        {!this.props.match?.params.section &&
          !this.props.match?.params.subsection ? (
            <div className="center">
              <h1 className="title full-width">{getString("documentation")}</h1>
              <SectionsSelector paths={paths} />
            </div>
          ) : this.props.match.params.subsection ? (
            this.state.markdown && (
              <div style={{ maxWidth: "100%" }}>
                {paths_typed && paths_typed[this.props.match.params.section] ? (
                  paths_typed[this.props.match.params.section].includes(
                    this.props.match.params.subsection
                  ) ? (
                      <>
                        <ReactMarkdown source={this.state.markdown} />
                        <div style={{ width: "fit-content" }}>
                          <Link
                            to={`/docs/${this.props.match.params.section}`}
                            className="button primary"
                            style={{ marginBottom: 30 }}
                          >
                            <span style={{ margin: "auto" }}>
                              {getString("back")}
                            </span>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <h1>{getString("doc_not_found")}</h1>
                    )
                ) : (
                    <h1>{getString("doc_section_not_found")}</h1>
                  )}
              </div>
            )
          ) : (
              <div
                className="center"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1 className="title full-width" style={{ marginTop: 30 }}>
                  {this.props.match.params.section}
                </h1>
                <SubsectionSelector
                  paths={paths_typed}
                  selectedSection={this.props.match.params.section}
                />
                <Link
                  to={`/docs`}
                  className="button"
                  style={{ margin: "auto", marginBottom: 30 }}
                >
                  <span style={{ margin: "auto" }}>{getString("back")}</span>
                </Link>
              </div>
            )}
      </div>
    );
  }
}

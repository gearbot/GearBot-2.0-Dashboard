import React from "react";

import "../scss/permissions-preview.scss";
import "../scss/colors.scss";
import "../scss/generic.scss";

import { ReactComponent as PermissionCheckmark } from "../SVG/permission-checkmark.svg";
import { ReactComponent as CrossCircle } from "../SVG/cross-circle.svg";

import { getPermissionName, hasPermissionSimple, PERMISSION, PERMISSIONS, REQUIRED_PERMS } from "../Other/PermissionUtils";
import { getString } from "../Language/LanguageHandler";

type PermissionsPreviewBoxProps = {
  permission_value: number;
  required_perms: PERMISSION[];
}

type PermissionsPreviewBoxState = {
}

export default class PermissionsPreviewBox extends React.Component<PermissionsPreviewBoxProps, PermissionsPreviewBoxState> {

  render() {
    let enabledPerms = Object.keys(PERMISSIONS)
      .filter(perm => hasPermissionSimple(this.props.permission_value, +perm as PERMISSION))
      .filter(perm => !this.props.required_perms.includes(+perm as PERMISSION));
    let enabledButOptionalPerms = Object.keys(PERMISSIONS)
      .filter(perm => hasPermissionSimple(this.props.permission_value, +perm as PERMISSION))
      .filter(perm => this.props.required_perms.includes(+perm as PERMISSION));
    let disabledRequiredPerms = Object.keys(PERMISSION)
      .filter(perm => !hasPermissionSimple(this.props.permission_value, +perm as PERMISSION))
      .filter(
        perm => (
          REQUIRED_PERMS.includes(+perm as PERMISSION)
          ||
          this.props.required_perms.includes(+perm as PERMISSION)
        )
      );
    return (
      <div className="box basic-secondary">
        <h2 className="text-center">{getString("permissions")}</h2>
        <div className="permissions full-width">
          {enabledButOptionalPerms
            .map((perm: string) => {
              return (
                <div className="box-2 secondary" key={`permission-${perm}`}>
                  <PermissionCheckmark
                    width={35}
                    height={35}
                    className="svg_permission-checkmark optional"
                  />
                  <span className="label">{getPermissionName(+perm as PERMISSION)}</span>
                </div>
              )
            })}
          {enabledPerms
            .map((perm: string) => {
              return (
                <div className="box-2 secondary" key={`permission-${perm}`}>
                  <PermissionCheckmark
                    width={35}
                    height={35}
                    className="svg_permission-checkmark"
                  />
                  <span className="label">{getPermissionName(+perm as PERMISSION)}</span>
                </div>
              )
            })}
          {disabledRequiredPerms
              .map((perm: string) => {
                return (
                  <div className="box-2 secondary" key={`permission-${perm}`}>
                    <CrossCircle width={35} height={35} />
                    <span className="label">{getPermissionName(+perm as PERMISSION)}</span>
                  </div>
                )
            })}
        </div>
        {enabledButOptionalPerms.length > 0 && (
          <div className="alert">
            <PermissionCheckmark
              width={25}
              height={25}
              className="svg_permission-checkmark optional"
            />
            <span>
              Permissions with this icon are enabled & required according to your selection in Bot Usage.
            </span>
          </div>
        )}
        {disabledRequiredPerms.length > 0 && (
          <div className="alert">
            <CrossCircle width={25} height={25} />
            <span>
              {getString("required_perms_missing")}
            </span>
          </div>
        )}
      </div>
    )
  }
}
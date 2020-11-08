import React from "react";

import "../scss/Channel Preview/permissions-preview.scss";
import "../scss/colors.scss";

import { ReactComponent as PermissionCheckmark } from "../SVG/permission-checkmark.svg";

import { getPermissionName, hasPermissionSimple, PERMISSION, PERMISSIONS } from "../Other/PermissionUtils";

type PermissionsPreviewBoxProps = {
  permission_value: number;
}

type PermissionsPreviewBoxState = {
}

export default class PermissionsPreviewBox extends React.Component<PermissionsPreviewBoxProps, PermissionsPreviewBoxState> {

  render() {
    let enabledPerms = Object.keys(PERMISSIONS)
      .filter(perm => hasPermissionSimple(this.props.permission_value, +perm as PERMISSION));
    return (
      <div className="perm-preview-box basic-secondary">
        <h2 className="perm-title-center">PERMISSIONS</h2>
        {enabledPerms.length > 0 ?
          (
            <div className="permissions full-width">
              {enabledPerms
                .map((perm: string) => {
                  return <div className="permission secondary" key={`permission-${perm}`}>
                    <PermissionCheckmark width={35} height={35} />
                    <span className="permission-name">{getPermissionName(+perm as PERMISSION)}</span>
                  </div>
                })}
            </div>
          )
          : (<p>No permissions are enabled</p>)
        }
      </div>
    )
  }
}
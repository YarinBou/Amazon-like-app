import React from 'react';
import ActivityLogComponent from './ActivityLog';


export default function AdminScreen() {
  // TODO: get logged in user data. If user is admin - show this. If not - show error message (you do not have privileges)
  // TODO: Add a top bar with links to activity log, and other things
    return (
      <div>
          <ActivityLogComponent></ActivityLogComponent>
      </div>
    );
  }
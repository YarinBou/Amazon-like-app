import React from 'react';
import ActivityLogComponent from './ActivityLog';
import DeleteScreen from './DeleteScreen';
import AddProductScreen from './AddProductScreen';
import { Link, Redirect, Route } from "react-router-dom";


export default function AdminScreen() {
  // TODO: get logged in user data. If user is admin - show this. If not - show error message (you do not have privileges)
    return (
      <div>
        <ul className="adminmenu">
          <li>
            <Link to="/admin/activity">Activity Log</Link>
            </li>
          <li>
            <Link to="/admin/add">Add a product</Link>
          </li>
          <li>
            <Link to="/admin/delete">Delete a product</Link>
          </li>
        </ul>
          <Route path="/admin/activity" component={ActivityLogComponent} />
          <Route path="/admin/add" component={AddProductScreen} />
          <Route path="/admin/delete" component={DeleteScreen} />
          <Route exact path="/admin" render={() => <Redirect to="/admin/activity" />} />
      </div>
    );
  }
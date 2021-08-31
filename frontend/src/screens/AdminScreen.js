import React, { useEffect, useState } from "react";
import ActivityLogComponent from './ActivityLog';
import DeleteScreen from './DeleteScreen';
import AddProductScreen from './AddProductScreen';
import { Link, Redirect, Route } from "react-router-dom";
import Axios from "axios";


export default function AdminScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
   useEffect(async () => {
    try {
      const result = await Axios.get("/api/authenticateUser");
      setIsAdmin(result.data);
    } catch (e) {
      console.log(e.response.data.validationError);
    }
  }, []);
    return isAdmin ? (
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
    ): <div>You are not an admin!. Can't access</div>;
  }
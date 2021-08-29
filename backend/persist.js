import JSON5 from 'json5';
"use strict"
import fs from 'fs';
const USER_DATA_ACTIVITY = 'backend/data/usersActivities.json5'


function createActivityLog(activityType, DateAndTime, username, activityState){
    return {
        username: username,
        DateAndTime: DateAndTime,
        activityType: activityType,
        activityState: activityState,
    };
}
export function insertToUsersActivities(activityType, username, activityState){
        return new Promise((resolve) => {
            const usersActivities = JSON5.parse(fs.readFileSync(USER_DATA_ACTIVITY));

            usersActivities.push(createActivityLog(activityType, new Date(), username, activityState));
            fs.writeFileSync(USER_DATA_ACTIVITY, JSON5.stringify(usersActivities, null, 2));
            resolve('Done!');
        });
    }

export function exmp(){
}

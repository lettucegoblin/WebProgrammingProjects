// import json file DataGenerated.json
// located in ../client/src/assets/DataGenerated.json

const fs = require('fs');
const path = require('path');

const data = require('../client/src/assets/DataGenerated.json');

console.log(data)

// in each user there can exist an activities array that holds an object { "numDaysAgo": ..., "workout": ...} 
// The goal is to collapse the keys and values of workout into activities

// for each user
const users = data.users;
for( user of users ){
  const activities = user.personalData.activities;
  // for each activity
  for( activity of activities ){
    // if activity.workout exists
    if( activity.workout ){
      // move all the keys and values of activity.workout into activity
      for( key in activity.workout ){
        activity[key] = activity.workout[key];
      }
      // delete activity.workout
      delete activity.workout;
    }
  }
  console.log(user)
}

// write the new data to a file
const json = JSON.stringify(data);

fs.writeFile(path.join(__dirname, '../client/src/assets/DataGenerated.json'), json, 'utf8', (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
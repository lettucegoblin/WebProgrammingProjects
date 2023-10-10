// import json file DataGenerated.json
// located in ../client/src/assets/DataGenerated.json

const fs = require('fs');
const path = require('path');

const data = require('../client/src/assets/DataGenerated.json');

console.log(data)

// The goal is to collapse the keys and values of workout into activities
function collapseWorkout() {
  const users = data.users;
  for (user of users) {
    const activities = user.personalData.activities;
    // for each activity
    for (activity of activities) {
      // if activity.workout exists
      if (activity.workout) {
        // move all the keys and values of activity.workout into activity
        for (key in activity.workout) {
          activity[key] = activity.workout[key];
        }
        // delete activity.workout
        delete activity.workout;
      }
    }
    console.log(user)
  }
}

//collapseWorkout()
function changeToBool(a){
  if(a == 'true'){
    return true
  } else {
    return false
  }
}
// The goal is to manually change the values from strings to numbers/bools where appropriate
function fixDataTypes(){
  const users = data.users;
  for (user of users) {
    user.id=parseInt(user.id)
    personalData=user.personalData
    user.personalData.age=parseInt(user.personalData.age)
    user.personalData.height=parseInt(user.personalData.height)
    user.personalData.weight=parseFloat(user.personalData.weight)
    for(activity of user.personalData.activities){
      activity.numDaysAgo=parseInt(activity.numDaysAgo)
      activity.wasDifficult=changeToBool(activity.wasDifficult)
      activity.avgHeartRate=parseInt(activity.avgHeartRate)
      activity.distanceInMeters=parseInt(activity.distanceInMeters)
      activity.reps=parseInt(activity.reps)
      activity.sets=parseInt(activity.sets)
      activity.weightInPounds=parseInt(activity.weightInPounds)
      activity.durationInMinutes=parseInt(activity.durationInMinutes)
      activity.numOfComments=parseInt(activity.numOfComments)
      activity.numOfLikes=parseInt(activity.numOfLikes);
      if(activity.numOfComments > 0)
      for(i = 0; i < activity.comments.length; i++){
        comment = activity.comments[i]
        comment.author_id=parseInt(comment.author_id)
        comment.isLookingForReplyFromAuthor = changeToBool(comment.isLookingForReplyFromAuthor)
        comment.numOfLikes=parseInt(comment.numOfLikes)
      }
    }

  }
}
fixDataTypes()


// write the new data to a file
const json = JSON.stringify(data);

fs.writeFile(path.join(__dirname, '../client/src/assets/DataGenerated.json'), json, 'utf8', (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});

const fs = require('fs');
const path = require('path');

const data = require('../client/src/assets/DataGenerated.json');
const activityPhotos = '../client/src/assets/activities_photos/'; // path to activity photos

console.log(data)
const profilePicturePromptsOutput = 'profilePicturePrompts.txt'; // output file: prompt per new line
const activityPhotosOutput = 'activityPhotos.txt'; // output file: prompt per new line
const profilePicturePrompts = [];
const activityPhotoPrompts = [];
function generateProfilePicturePrompts() {
  const users = data.users;
  for (user of users) {
    userdata = user.personalData;
    let genderSpecific = userdata.genderIdentity == "Female" ? "1girl" : "1boy" 
    // height in inches. output short, average height, tall
    let heightSpecific = "average height"
    if(userdata.genderIdentity == "Female"){
      if(userdata.height < 63){
        heightSpecific = "short"
      } else if(userdata.height > 67){
        heightSpecific = "tall"
      } else {
        heightSpecific = "average height"
      }
    } else { // for men
      if(userdata.height < 67){
        heightSpecific = "short"
      } else if(userdata.height > 71){
        heightSpecific = "tall"
      } else {
        heightSpecific = "average height"
      }
    }
    const profilePicturePrompt = `solo, ${genderSpecific}, portrait, selfie, ${userdata.genderIdentity}, ${userdata.oneAdjectiveToDescribeMe} personality, ${userdata.age} years old, ${heightSpecific}, ${userdata.weight_class}, ${userdata.firstName} ${userdata.lastName} aka ${userdata.online_handle}, ${userdata.aboutMe}`
    profilePicturePrompts.push(profilePicturePrompt);
  }
  fs.writeFileSync(path.join(__dirname, profilePicturePromptsOutput), profilePicturePrompts.join('\n'));
}

function generateActivityPhotos(){
  const users = data.users;
  let i = 0;
  for (user of users) {
    const userdata = user.personalData;
    let genderSpecific = userdata.genderIdentity == "Female" ? "1girl" : "1boy" 

    const userPromptPortion = `${userdata.genderIdentity}, ${userdata.oneAdjectiveToDescribeMe} personality, ${userdata.age} years old, ${userdata.height} inches tall, ${userdata.weight_class}, ${userdata.firstName} ${userdata.lastName} aka ${userdata.online_handle}, ${userdata.aboutMe}`
    const activities = user.personalData.activities;
    for( activity of activities){    
      //const activityPhotoPrompt = `activity, ${activity.location}, ${activity.wasDifficult ? "difficult" : "easy"} workout, extreme wide shot, ${activity.type}, ${activity.notes}, About me: ${userPromptPortion}`
      let activityPhotoPrompt = `photograph, blog photo, (${userdata.genderIdentity}, ${genderSpecific}, ${userdata.oneAdjectiveToDescribeMe} personality, ${userdata.age} years old), ${activity.type}, ${activity.location}, ${activity.wasDifficult ? "difficult" : "easy"} workout, ${activity.notes}`
      // remove new lines from activityPhotoPrompt
      activityPhotoPrompt = activityPhotoPrompt.replace(/(\r\n|\n|\r)/gm, " ");
      activityPhotoPrompts.push(activityPhotoPrompt);
    }
  }
  fs.writeFileSync(path.join(__dirname, activityPhotosOutput), activityPhotoPrompts.join('\n'));
}

//generateProfilePicturePrompts()
//generateActivityPhotos()
activityPhotoRename()

// goal: loop over users and their activities 
function activityPhotoRename(){
  // list out all the files in the acitivty photos folder
  const activityPhotosFolder = path.join(__dirname, activityPhotos);
  const files = fs.readdirSync(activityPhotosFolder);
  const users = data.users;
  let i = 0;
  
  // sort files array by number 
  files.sort(function(a, b) {
    return parseInt(a) - parseInt(b);
  });

  for (user of users) {
    const activities = user.personalData.activities;
    var j = 0;
    for( activity of activities){
      // read 1 file at a time
      console.log(i)
      const file = files[i];
      console.log(file)
      // rename the file to the user id and activity index
      const newFile = `${user.id}_${j}.png`;
      console.log(newFile)
      fs.renameSync(path.join(activityPhotosFolder, file), path.join(activityPhotosFolder, newFile));

      i++; j++;
    }
  }
}


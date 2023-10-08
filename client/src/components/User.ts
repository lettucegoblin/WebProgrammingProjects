interface ActivityComment {
  author_id: string;
  author: string;
  comment: string;
  isLookingForReplyFromAuthor: boolean;
  numOfLikes: number;
}

interface Activity {
  type: string;
  wasDifficult: boolean;
  avgHeartRate: number;
  distanceInMeters: string;
  reps: string;
  sets: string;
  weightInPounds: string;
  durationInMinutes: string;
  location: string;
  notes: string;
  numOfComments: string;
  numOfLikes: number;
  comments: ActivityComment[];
}

interface PersonalData {
  firstName: string;
  lastName: string;
  genderIdentity: string;
  age: string;
  height: string;
  weight_class: string;
  weight: string;
  online_handle: string;
  aboutMe: string;
  oneAdjectiveToDescribeMe: string;
  emails: string[];
  activities: Activity[];
}
/*  Structure of userObject:
{
  users: [
    {
      "personalData": {
        "firstName": "string",
        "lastName": "string",
        "genderIdentity": "string",
        "age": "string",
        "height": "string",
        "weight_class": "string",
        "weight": "string",
        "online_handle": "string",
        "aboutMe": "string",
        "oneAdjectiveToDescribeMe": "string",
        "emails": [
          "string",
          "string"
        ]
        "activities": [
          {
            "type": "[WORKOUT_VALUE]",
            "wasDifficult": "[BOOLEAN_VALUE]",
            "avgHeartRate": "[INT_VALUE]",
            "distanceInMeters": "{randomNumberAsString(1, 16000)}",
            "reps": "{randomNumberAsString(0, 40)}",
            "sets": "{randomNumberAsString(1, 20)}",
            "weightInPounds": "{randomNumberAsString(1, 250)}",
            "durationInMinutes": "{randomNumberAsString(1, 60*3)}",
            "location": "[STRING_VALUE]",
            "notes": "[STRING_VALUE]",
            "numOfComments": "{randomNumberAsString(0, 4)}",
            "numOfLikes": "[INT_VALUE]",
            "comments": [
              {
                "author_id": "{author["id"]}",
                "author": "{author["personalData"]["online_handle"]}",
                "comment": "[STRING_VALUE]",
                "isLookingForReplyFromAuthor": "[BOOLEAN_VALUE]",
                "numOfLikes": "[INT_VALUE]"
              }, ...
            ]
          }, ...
        ]
      },
      "isAdmin": "boolean"
    }, ...
  ]
}

*/
export default class User {
  personalData: PersonalData;
  isAdmin: boolean;
  id: number;

  constructor(userObject: any) {
    this.id = parseInt(userObject.id);
    this.personalData = userObject.personalData;
    this.isAdmin = userObject.isAdmin === "true" ? true : false;
  }
}
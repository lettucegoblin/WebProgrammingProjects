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

export default class User {
  personalData: PersonalData;
  isAdmin: boolean;

  constructor( isAdmin: boolean) {
    
    this.isAdmin = isAdmin;
  }
}
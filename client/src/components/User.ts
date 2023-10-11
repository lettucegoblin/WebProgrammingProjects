export interface ActivityComment {
  author_id: number;
  author: string;
  comment: string;
  isLookingForReplyFromAuthor: boolean;
  numOfLikes: number;
  likedBy: number[];
}
export interface TimeCheckpoint {
  displayString: string;
  numDaysAgo: number;
}

export interface ActivityAverage {
  avgDistanceInMeters: number;
  avgDurationInMinutes: number;
  avgHeartRate: number;
  avgReps: number;
  avgSets: number;
  avgWeightInPounds: number;
  totalCaloriesBurned: number;
  avgPace: number;
  avgDifficulty: number;
  avgNumOfComments: number;
  avgNumOfLikes: number;
  [key: string]: number; // index signature to allow for dynamic keys
}

export interface Activity {
  type: string;
  wasDifficult: boolean;
  avgHeartRate: number;
  distanceInMeters: number;
  reps: number;
  sets: number;
  weightInPounds: number;
  durationInMinutes: number;
  location: string;
  notes: string;
  numOfComments: number;
  numOfLikes: number;
  numDaysAgo: number;
  comments: ActivityComment[];
  likedBy: number[];
}

interface PersonalData {
  firstName: string;
  lastName: string;
  genderIdentity: string;
  age: number;
  height: number;
  weight_class: string;
  weight: number;
  online_handle: string;
  aboutMe: string;
  oneAdjectiveToDescribeMe: string;
  emails: string[];
  activities: Activity[];
}

export class User {
  personalData: PersonalData;
  isAdmin: boolean;
  id: number;
  activitiesAndTheirMET: { [key: string]: number } = { "run": 7.0, "bike": 7.5, "walk": 5.3, "cardio": 3.8, "strength": 6.0 };

  weightClassTypes: string[] = ["underweight", "normal", "overweight", "obese", "clinically_obese"];

  // Returns the id of the user's friends(people who have commented on their activities)
  getFriendsIds(users: User[]): number[] {
    // for activities
    let friends: number[] = User.getAllIdsWhoCommentedOnActivities(this);
    for (let user of users) {
      User.getAllIdsWhoCommentedOnActivities(user).forEach((id:Number) => {
        //check if I commented on their activity
        if (id == this.id && !friends.includes(user.id)) { // if I commented on their activity and they're not already in friends
          friends.push(user.id);
        }
      });
    }
    return friends;
  }

  private static getAllIdsWhoCommentedOnActivities(user: User): number[] {
    let friends: number[] = [];
    if (user.personalData.activities == undefined) return friends;
    user.personalData.activities.forEach(activity => {
      if (activity.comments == undefined) return;
      activity.comments.forEach(comment => {
        if (!friends.includes(comment.author_id)) {
          friends.push(comment.author_id);
        }
      });
    });
    return friends;
  }

  static like(item: Activity | ActivityComment, userID: number): void {
    // awful but this is how interface instanceof has to work https://stackoverflow.com/a/31748606
    if ("notes" in item) { // something only activities have
      this.likeActivity(item, userID);
    } else if ("comment" in item) { // something only activity comments have
      this.likeActivityComment(item, userID);
    }
  }

  static hasLiked(item: Activity | ActivityComment, userID: number): boolean {
    if (item.likedBy == undefined) return false;
    if ("notes" in item) { // something only activities have
      return item.likedBy.includes(userID);
    } else if ("comment" in item) { // something only activity comments have
      return item.likedBy.includes(userID);
    }
    return false;
  }

  private static likeActivity(activity: Activity, userID: number): void {
    let amountToAdd = 1;
    if (activity.likedBy == undefined) activity.likedBy = new Array<number>();
    if (activity.likedBy.includes(userID)) {
      amountToAdd = -1;
      activity.likedBy.splice(activity.likedBy.indexOf(userID), 1);
    } else {
      activity.likedBy.push(userID);
    }

    activity.numOfLikes += amountToAdd;
  }

  private static likeActivityComment(comment: ActivityComment, userID: number): void {
    let amountToAdd = 1;
    if (comment.likedBy == undefined) comment.likedBy = new Array<number>();
    if (comment.likedBy.includes(userID)) {
      amountToAdd = -1;
      comment.likedBy.splice(comment.likedBy.indexOf(userID), 1);
    } else {
      comment.likedBy.push(userID);
    }

    comment.numOfLikes += amountToAdd;
  }

  // calculate calories burned based on activity type and duration
  // MET info: https://www.acefitness.org/resources/pros/expert-articles/6434/5-things-to-know-about-metabolic-equivalents/
  // Compendium of Physical Activities and their MET: https://sites.google.com/site/compendiumofphysicalactivities/Activity-Categories/conditioning-exercise
  calculateCaloriesBurned(activity: Activity): number {
    let caloriesBurned: number = 0;
    let durationInMinutes: number = activity.durationInMinutes;
    // calories burned = METs x 3.5 x BW (kg) / 200 = Kcal/min.
    let weightInKg = this.personalData.weight / 2.2;
    let MET = this.activitiesAndTheirMET[activity.type];
    caloriesBurned = MET * 3.5 * weightInKg / 200 * durationInMinutes;
    return caloriesBurned;
  }

  // calculate average pace
  static averagePace(activity: Activity): number {
    const distanceInMiles = activity.distanceInMeters / 1609.34;
    const durationInHours = activity.durationInMinutes / 60;
    return distanceInMiles / durationInHours;
  }

  static isDistanceActivity(type: string): boolean {
    return type == "run" || type == "bike" || type == "walk";
  }
  static isLooselyDistanceActivity(type: string, notes: string): boolean {
    const keywords = ["walk", "run", "jog", "hike", "bike", "swim", "ski", "skate", "skateboard", "scooter", "wheelchair"]
    const notesContainsKeyword = keywords.some((keyword) => {
      return notes.toLowerCase().includes(keyword);
    });
    return User.isDistanceActivity(type) || notesContainsKeyword;
  }
  static isLooselyStrengthActivity(type: string, notes: string): boolean {
    // lol thanks co-pilot
    const keywords = ["curl", "rep", "lift", "pushup", "push-up", "push up", "pullup", "pull-up", "pull up", "chinup", "chin-up", "chin up", "dip", "dumbbell", "barbell", "bench", "squat", "deadlift", "press", "crunch", "situp", "sit-up", "sit up", "plank", "lunge", "burpee", "jumping jack", "jumping-jack", "jumping-jacks", "jumping jacks", "jumpingjack", "jumpingjack", "jumpingjacks", "jumpingjacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks"];
    const notesContainsKeyword = keywords.some((keyword) => {
      return notes.toLowerCase().includes(keyword);
    });
    return !User.isDistanceActivity(type) || notesContainsKeyword;
  }

  // First and Last name as string
  getName(): string {
    return this.personalData.firstName + " " + this.personalData.lastName;
  }

  constructor(userObject: any) {
    this.id = parseInt(userObject.id);
    this.personalData = userObject.personalData;
    this.isAdmin = userObject.isAdmin == "true" ? true : false;
  }
}
interface ActivityComment {
  author_id: number;
  author: string;
  comment: string;
  isLookingForReplyFromAuthor: boolean;
  numOfLikes: number;
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
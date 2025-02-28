import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  _id?: string;
  icon: any;
  clerkUserId: string;
  name: string;
};

export type HabitType = {
  _id?: string;
  name: string;
  icon: any;
  clerkUserId: string;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: completedDays[];
};

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

type completedDays = {
  _id?: string;
  date: string;
};

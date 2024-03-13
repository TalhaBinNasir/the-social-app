export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: any[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

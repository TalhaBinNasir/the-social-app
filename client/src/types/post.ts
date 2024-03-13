export interface Post {
  _id: any;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string | null;
  description?: string | null;
  picturePath?: string | null;
  userPicturePath?: string | null;
  likes?: Map<string, boolean> | null;
  comments?: any[] | null;
}

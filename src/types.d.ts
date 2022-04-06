export interface IUserBody {
  userId: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
  authType: "custom" | "google";
}

export interface IUserBody {
  userId: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
  authType: "custom" | "google";
}

export interface IRegisterBody {
  displayName: string;
  email: string;
  password: string;
  authType: "custom";
}

export interface ILoginBody {
  email: string;
  password: string;
}

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

export interface IMemoryAuthor {
  userId: string;
  displayName: string;
  photoUrl: string;
  email: string;
}

export interface IComment {
  userId: string;
  displayName: string;
  photoUrl: string;
  email: string;
  comment: string;
}

export interface IMemory {
  _id: string;
  author: IMemoryAuthor;
  createdAt: Date;
  tags: string[];
  comments: IComment[];
  memoryPhotoUrl: string;
  memoryTitle: string;
  memoryMessage: string;
  like: ILikeAuthor[];
}

export interface IMemoryPage extends IMemory {
  likeMemories: IMemory[];
}

export interface ILikeAuthor {
  userId: string;
  displayName: string;
  photoUrl: string;
  email: string;
}

export interface IMemoryPost {
  tags: string[];
  memoryPhotoUrl: string;
  memoryTitle: string;
  memoryMessage: string;
}

export interface InputData {
  title: string;
  message: string;
  image: string;
  tags: string[];
}

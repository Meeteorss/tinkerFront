import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AdminLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AdminRegisterInput = {
  confirmedPassword: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  userName: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  skillId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  worker: Scalars['String'];
  workerId: Scalars['String'];
};

export type CreateSkillResponse = {
  __typename?: 'CreateSkillResponse';
  errors?: Maybe<Array<ErrorField>>;
  skill?: Maybe<Skill>;
};

export type CreateSkillS1Input = {
  category: Scalars['String'];
  title: Scalars['String'];
  zone: Scalars['String'];
};

export type CreateSkillS2Input = {
  description: Scalars['String'];
};

export type CreateSkillS3Input = {
  duration: Scalars['Float'];
  pricing: Scalars['String'];
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FormattedMessage = {
  __typename?: 'FormattedMessage';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  otherId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  reciever: Scalars['String'];
  recieverId: Scalars['String'];
  sender: Scalars['String'];
  senderId: Scalars['String'];
  state: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: RegisterAdminResponse;
  addPicture: Scalars['Boolean'];
  addProfilePicture: Scalars['Boolean'];
  adminLogin: RegisterAdminResponse;
  changeEmail: Scalars['Boolean'];
  changePassword: UserResponse;
  changePasswordFromProfil: UserResponse;
  comment: Scalars['Boolean'];
  confirmPassword: UserResponse;
  confirmUser: Scalars['Boolean'];
  createSkillS1: CreateSkillResponse;
  createSkillS2: CreateSkillResponse;
  createSkillS3: CreateSkillResponse;
  deleteAdmin: Scalars['Boolean'];
  deletePicture: Scalars['Boolean'];
  deleteProfilePicture: Scalars['Boolean'];
  deleteSkill: Scalars['Boolean'];
  deleteSkillPics: Scalars['Boolean'];
  deleteUserProfilePic: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
  favorite: Scalars['Boolean'];
  forgetPassword: Scalars['Boolean'];
  hideSkill: Scalars['Boolean'];
  like: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  rate: Scalars['Boolean'];
  register: UserResponse;
  registerWorker: WorkerResponse;
  removeMessage: Scalars['Boolean'];
  sendConfirmationEmail: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  unfavorite: Scalars['Boolean'];
  unsendMessage: Scalars['Boolean'];
  updateSkill: CreateSkillResponse;
  updateWorker: WorkerResponse;
  uploadPicture: S3SignResponse;
  uploadProfilePicture: S3SignResponse;
};


export type MutationAddAdminArgs = {
  options: AdminRegisterInput;
};


export type MutationAddPictureArgs = {
  index: Scalars['Int'];
  pictureUrl: Scalars['String'];
  skillId: Scalars['String'];
};


export type MutationAddProfilePictureArgs = {
  pictureUrl: Scalars['String'];
};


export type MutationAdminLoginArgs = {
  options: AdminLoginInput;
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  confirmedPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordFromProfilArgs = {
  confirmedPassword: Scalars['String'];
  oldPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCommentArgs = {
  content: Scalars['String'];
  skillId: Scalars['String'];
};


export type MutationConfirmPasswordArgs = {
  password: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateSkillS1Args = {
  options: CreateSkillS1Input;
};


export type MutationCreateSkillS2Args = {
  options: CreateSkillS2Input;
  skillId: Scalars['String'];
};


export type MutationCreateSkillS3Args = {
  options: CreateSkillS3Input;
  skillId: Scalars['String'];
};


export type MutationDeleteAdminArgs = {
  username: Scalars['String'];
};


export type MutationDeletePictureArgs = {
  index: Scalars['Int'];
  skillId: Scalars['String'];
};


export type MutationDeleteSkillArgs = {
  skillId: Scalars['String'];
};


export type MutationDeleteSkillPicsArgs = {
  skillId: Scalars['String'];
};


export type MutationDeleteUserProfilePicArgs = {
  userId: Scalars['String'];
};


export type MutationDislikeArgs = {
  skillId: Scalars['String'];
};


export type MutationFavoriteArgs = {
  workerId: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationHideSkillArgs = {
  skillId: Scalars['String'];
};


export type MutationLikeArgs = {
  skillId: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRateArgs = {
  value: Scalars['Int'];
  workerId: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationRegisterWorkerArgs = {
  options: WorkerRegisterInput;
};


export type MutationRemoveMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String'];
  recieverId: Scalars['String'];
};


export type MutationUnfavoriteArgs = {
  workerId: Scalars['String'];
};


export type MutationUnsendMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationUpdateSkillArgs = {
  options: UpdateSkillInput;
  skillId: Scalars['String'];
};


export type MutationUpdateWorkerArgs = {
  options: WorkerRegisterInput;
};


export type MutationUploadPictureArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
  skillId: Scalars['String'];
};


export type MutationUploadProfilePictureArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};

export type NavbarResponse = {
  __typename?: 'NavbarResponse';
  favs?: Maybe<Array<Worker>>;
  likes?: Maybe<Array<Skill>>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  commentsBySkill: Array<Comment>;
  commentsByWorker: Array<Comment>;
  getAllSkills: Array<Skill>;
  getAllUsers: Array<User>;
  getAllWorkers: Array<Worker>;
  getConversation: Array<Message>;
  getConversations: Array<FormattedMessage>;
  getCurrentAdmin?: Maybe<Admin>;
  getFavoriteWorkers: Array<Skill>;
  getFavsCount: Scalars['Int'];
  getLikedSkills: Array<Skill>;
  getLikesCount: Scalars['Int'];
  getMessages: Array<Message>;
  getSkill: Skill;
  getSkillByTitle?: Maybe<Skill>;
  getSkillCount: Array<Skill>;
  getSkills: Array<Skill>;
  isWorker: Scalars['Boolean'];
  me?: Maybe<User>;
  navbarQuery: NavbarResponse;
  searchSkills: Array<Skill>;
  skillPageQuery: SkillPageResponse;
  workerById?: Maybe<Worker>;
  workerByUsername?: Maybe<Worker>;
  workerPageQuery: WorkerPageResponse;
  workers: Array<Worker>;
};


export type QueryCommentsBySkillArgs = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  title: Scalars['String'];
  worker: Scalars['String'];
};


export type QueryCommentsByWorkerArgs = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  worker: Scalars['String'];
};


export type QueryGetConversationArgs = {
  otherId: Scalars['String'];
};


export type QueryGetFavsCountArgs = {
  workerId: Scalars['String'];
};


export type QueryGetLikesCountArgs = {
  skillId: Scalars['String'];
};


export type QueryGetSkillArgs = {
  skillId: Scalars['String'];
};


export type QueryGetSkillByTitleArgs = {
  title: Scalars['String'];
  workerId: Scalars['String'];
};


export type QueryGetSkillsArgs = {
  workerId: Scalars['String'];
};


export type QueryIsWorkerArgs = {
  userId: Scalars['String'];
};


export type QuerySearchSkillsArgs = {
  category: Scalars['String'];
  city: Scalars['String'];
  keyword: Scalars['String'];
  limit: Scalars['Int'];
  orderBy: Scalars['String'];
  skip: Scalars['Int'];
};


export type QuerySkillPageQueryArgs = {
  title: Scalars['String'];
  username: Scalars['String'];
};


export type QueryWorkerByIdArgs = {
  id: Scalars['String'];
};


export type QueryWorkerByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryWorkerPageQueryArgs = {
  username: Scalars['String'];
};

export type Rating = {
  __typename?: 'Rating';
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  value: Scalars['Float'];
  workerId: Scalars['String'];
};

export type RegisterAdminResponse = {
  __typename?: 'RegisterAdminResponse';
  admin?: Maybe<Admin>;
  errors?: Maybe<Array<ErrorField>>;
};

export type RegisterInput = {
  confirmedPassword: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type S3SignResponse = {
  __typename?: 'S3SignResponse';
  error?: Maybe<Scalars['String']>;
  objectUrl?: Maybe<Scalars['String']>;
  signedS3Url?: Maybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['String'];
  likesCount?: Maybe<Scalars['Int']>;
  pictures?: Maybe<Array<Scalars['String']>>;
  pricing?: Maybe<Scalars['Int']>;
  rating: Scalars['Float'];
  ratingsNumber?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  worker?: Maybe<Scalars['String']>;
  workerId: Scalars['String'];
  workerPicUrl?: Maybe<Scalars['String']>;
  zone?: Maybe<Scalars['String']>;
};

export type SkillPageResponse = {
  __typename?: 'SkillPageResponse';
  otherSkills?: Maybe<Array<Skill>>;
  skill?: Maybe<Skill>;
  worker?: Maybe<Worker>;
};

export type UpdateSkillInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['Float'];
  pricing: Scalars['String'];
  title: Scalars['String'];
  zone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favoritesIds?: Maybe<Array<Scalars['String']>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  isWorker: Scalars['Boolean'];
  lastName: Scalars['String'];
  likesIds?: Maybe<Array<Scalars['String']>>;
  profilePicture?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorField>>;
  user?: Maybe<User>;
};

export type Worker = {
  __typename?: 'Worker';
  age: Scalars['Int'];
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  description: Scalars['String'];
  email: Scalars['String'];
  favsCount?: Maybe<Scalars['Int']>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  isActive?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
  rating: Scalars['Float'];
  ratings: Array<Rating>;
  ratingsNumber: Scalars['Float'];
  ratingsValue: Scalars['Float'];
  sexe: Scalars['String'];
  skills: Array<Skill>;
  skillsIds?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['DateTime'];
  userName: Scalars['String'];
};

export type WorkerPageResponse = {
  __typename?: 'WorkerPageResponse';
  skills?: Maybe<Array<Skill>>;
  worker?: Maybe<Worker>;
};

export type WorkerRegisterInput = {
  city: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  description: Scalars['String'];
  phone: Scalars['String'];
  sexe: Scalars['String'];
};

export type WorkerResponse = {
  __typename?: 'WorkerResponse';
  errors?: Maybe<Array<ErrorField>>;
  worker?: Maybe<Worker>;
};

export type AddAdminMutationVariables = Exact<{
  options: AdminRegisterInput;
}>;


export type AddAdminMutation = { __typename?: 'Mutation', addAdmin: { __typename?: 'RegisterAdminResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, admin?: { __typename?: 'Admin', id: string, firstName: string, lastName: string, username: string, email: string, role: string } | null | undefined } };

export type AddPictureMutationVariables = Exact<{
  pictureUrl: Scalars['String'];
  index: Scalars['Int'];
  skillId: Scalars['String'];
}>;


export type AddPictureMutation = { __typename?: 'Mutation', addPicture: boolean };

export type AddProfilePictureMutationVariables = Exact<{
  addProfilePicturePictureUrl: Scalars['String'];
}>;


export type AddProfilePictureMutation = { __typename?: 'Mutation', addProfilePicture: boolean };

export type AdminLoginMutationVariables = Exact<{
  options: AdminLoginInput;
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'RegisterAdminResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, admin?: { __typename?: 'Admin', id: string, firstName: string, lastName: string, username: string, email: string, role: string } | null | undefined } };

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  confirmedPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, confirmed: boolean } | null | undefined } };

export type ChangePasswordFromProfilMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  password: Scalars['String'];
  confirmedPassword: Scalars['String'];
}>;


export type ChangePasswordFromProfilMutation = { __typename?: 'Mutation', changePasswordFromProfil: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, confirmed: boolean } | null | undefined } };

export type CommentMutationVariables = Exact<{
  content: Scalars['String'];
  skillId: Scalars['String'];
}>;


export type CommentMutation = { __typename?: 'Mutation', comment: boolean };

export type ConfirmPasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ConfirmPasswordMutation = { __typename?: 'Mutation', confirmPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, confirmed: boolean } | null | undefined } };

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = { __typename?: 'Mutation', confirmUser: boolean };

export type CreateSkillS1MutationVariables = Exact<{
  options: CreateSkillS1Input;
}>;


export type CreateSkillS1Mutation = { __typename?: 'Mutation', createSkillS1: { __typename?: 'CreateSkillResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, skill?: { __typename?: 'Skill', id: string, workerId: string, status: string, rating: number, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined } | null | undefined } };

export type CreateSkillS2MutationVariables = Exact<{
  options: CreateSkillS2Input;
  skillId: Scalars['String'];
}>;


export type CreateSkillS2Mutation = { __typename?: 'Mutation', createSkillS2: { __typename?: 'CreateSkillResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, skill?: { __typename?: 'Skill', id: string, workerId: string, status: string, rating: number, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined } | null | undefined } };

export type CreateSkillS3MutationVariables = Exact<{
  options: CreateSkillS3Input;
  skillId: Scalars['String'];
}>;


export type CreateSkillS3Mutation = { __typename?: 'Mutation', createSkillS3: { __typename?: 'CreateSkillResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, skill?: { __typename?: 'Skill', id: string, workerId: string, status: string, rating: number, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined } | null | undefined } };

export type DeleteAdminMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type DeleteAdminMutation = { __typename?: 'Mutation', deleteAdmin: boolean };

export type DeletePictureMutationVariables = Exact<{
  index: Scalars['Int'];
  skillId: Scalars['String'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture: boolean };

export type DeleteProfilePictureMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteProfilePictureMutation = { __typename?: 'Mutation', deleteProfilePicture: boolean };

export type DeleteSkillMutationVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type DeleteSkillMutation = { __typename?: 'Mutation', deleteSkill: boolean };

export type DeleteSkillPicsMutationVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type DeleteSkillPicsMutation = { __typename?: 'Mutation', deleteSkillPics: boolean };

export type DeleteUserProfilePicMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserProfilePicMutation = { __typename?: 'Mutation', deleteUserProfilePic: boolean };

export type DislikeMutationVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type DislikeMutation = { __typename?: 'Mutation', dislike: boolean };

export type FavoriteMutationVariables = Exact<{
  workerId: Scalars['String'];
}>;


export type FavoriteMutation = { __typename?: 'Mutation', favorite: boolean };

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', forgetPassword: boolean };

export type HideSkillMutationVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type HideSkillMutation = { __typename?: 'Mutation', hideSkill: boolean };

export type LikeMutationVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, confirmed: boolean } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RateMutationVariables = Exact<{
  rateWorkerId: Scalars['String'];
  rateValue: Scalars['Int'];
}>;


export type RateMutation = { __typename?: 'Mutation', rate: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string } | null | undefined } };

export type RegisterWorkerMutationVariables = Exact<{
  options: WorkerRegisterInput;
}>;


export type RegisterWorkerMutation = { __typename?: 'Mutation', registerWorker: { __typename?: 'WorkerResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, worker?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, email: string, phone: string, city: string, sexe: string, dateOfBirth: any } | null | undefined } };

export type SendConfirmationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type SendConfirmationEmailMutation = { __typename?: 'Mutation', sendConfirmationEmail: boolean };

export type SendMessageMutationVariables = Exact<{
  recieverId: Scalars['String'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UnfavoriteMutationVariables = Exact<{
  workerId: Scalars['String'];
}>;


export type UnfavoriteMutation = { __typename?: 'Mutation', unfavorite: boolean };

export type UpdateSkillMutationVariables = Exact<{
  options: UpdateSkillInput;
  skillId: Scalars['String'];
}>;


export type UpdateSkillMutation = { __typename?: 'Mutation', updateSkill: { __typename?: 'CreateSkillResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, skill?: { __typename?: 'Skill', id: string, workerId: string, status: string, rating: number, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined } | null | undefined } };

export type UpdateWorkerMutationVariables = Exact<{
  options: WorkerRegisterInput;
}>;


export type UpdateWorkerMutation = { __typename?: 'Mutation', updateWorker: { __typename?: 'WorkerResponse', errors?: Array<{ __typename?: 'ErrorField', message: string, field: string }> | null | undefined, worker?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, email: string, phone: string, city: string, dateOfBirth: any } | null | undefined } };

export type UploadPictureMutationVariables = Exact<{
  fileType: Scalars['String'];
  fileName: Scalars['String'];
  skillId: Scalars['String'];
}>;


export type UploadPictureMutation = { __typename?: 'Mutation', uploadPicture: { __typename?: 'S3SignResponse', signedS3Url?: string | null | undefined, objectUrl?: string | null | undefined, error?: string | null | undefined } };

export type UploadProfilePictureMutationVariables = Exact<{
  uploadProfilePictureFileType: Scalars['String'];
  uploadProfilePictureFileName: Scalars['String'];
}>;


export type UploadProfilePictureMutation = { __typename?: 'Mutation', uploadProfilePicture: { __typename?: 'S3SignResponse', signedS3Url?: string | null | undefined, objectUrl?: string | null | undefined, error?: string | null | undefined } };

export type CommentsBySkillQueryVariables = Exact<{
  title: Scalars['String'];
  worker: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type CommentsBySkillQuery = { __typename?: 'Query', commentsBySkill: Array<{ __typename?: 'Comment', id: string, content: string, author: string, worker: string, userId: string, skillId: string, workerId: string, createdAt: any, updatedAt: any }> };

export type CommentsByWorkerQueryVariables = Exact<{
  worker: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type CommentsByWorkerQuery = { __typename?: 'Query', commentsByWorker: Array<{ __typename?: 'Comment', id: string, content: string, author: string, worker: string, userId: string, skillId: string, workerId: string, createdAt: any, updatedAt: any }> };

export type GetAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSkillsQuery = { __typename?: 'Query', getAllSkills: Array<{ __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, rating: number, ratingsNumber?: number | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, status: string, likesCount?: number | null | undefined, createdAt: any }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, profilePicture?: string | null | undefined, createdAt: any }> };

export type GetAllWorkersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWorkersQuery = { __typename?: 'Query', getAllWorkers: Array<{ __typename?: 'Worker', id: string, firstName: string, lastName: string, userName: string, email: string, sexe: string, phone: string, city: string, dateOfBirth: any, description: string, skillsIds?: Array<string> | null | undefined, rating: number, ratingsNumber: number, profilePicture?: string | null | undefined, createdAt: any }> };

export type GetConversationQueryVariables = Exact<{
  otherId: Scalars['String'];
}>;


export type GetConversationQuery = { __typename?: 'Query', getConversation: Array<{ __typename?: 'Message', id: string, senderId: string, recieverId: string, sender: string, reciever: string, content: string, state: string, createdAt: any }> };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'FormattedMessage', user?: string | null | undefined, other?: string | null | undefined, userId?: string | null | undefined, otherId?: string | null | undefined, content?: string | null | undefined, state?: string | null | undefined, createdAt?: string | null | undefined, id?: string | null | undefined }> };

export type GetCurrentAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentAdminQuery = { __typename?: 'Query', getCurrentAdmin?: { __typename?: 'Admin', id: string, firstName: string, lastName: string, username: string, email: string, profilePicture?: string | null | undefined, role: string } | null | undefined };

export type GetLikedSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLikedSkillsQuery = { __typename?: 'Query', getLikedSkills: Array<{ __typename?: 'Skill', id: string, worker?: string | null | undefined, title?: string | null | undefined, pictures?: Array<string> | null | undefined }> };

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', id: string, senderId: string, recieverId: string, sender: string, reciever: string, content: string, state: string, createdAt: any }> };

export type GetSkillQueryVariables = Exact<{
  skillId: Scalars['String'];
}>;


export type GetSkillQuery = { __typename?: 'Query', getSkill: { __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined } };

export type GetSkillByTitleQueryVariables = Exact<{
  title: Scalars['String'];
  workerId: Scalars['String'];
}>;


export type GetSkillByTitleQuery = { __typename?: 'Query', getSkillByTitle?: { __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined } | null | undefined };

export type GetSkillsQueryVariables = Exact<{
  workerId: Scalars['String'];
}>;


export type GetSkillsQuery = { __typename?: 'Query', getSkills: Array<{ __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined }> };

export type IsworkerQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IsworkerQuery = { __typename?: 'Query', isWorker: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, profilePicture?: string | null | undefined, confirmed: boolean, likesIds?: Array<string> | null | undefined, favoritesIds?: Array<string> | null | undefined } | null | undefined };

export type NavbarQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type NavbarQueryQuery = { __typename?: 'Query', navbarQuery: { __typename?: 'NavbarResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, userName: string, email: string, isWorker: boolean, profilePicture?: string | null | undefined, confirmed: boolean, likesIds?: Array<string> | null | undefined } | null | undefined, likes?: Array<{ __typename?: 'Skill', id: string, title?: string | null | undefined, worker?: string | null | undefined, pictures?: Array<string> | null | undefined }> | null | undefined, favs?: Array<{ __typename?: 'Worker', id: string, userName: string, profilePicture?: string | null | undefined, rating: number, ratingsNumber: number }> | null | undefined } };

export type SearchSkillsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  orderBy: Scalars['String'];
  keyword: Scalars['String'];
  city: Scalars['String'];
  category: Scalars['String'];
}>;


export type SearchSkillsQuery = { __typename?: 'Query', searchSkills: Array<{ __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined }> };

export type SkillPageQueryQueryVariables = Exact<{
  username: Scalars['String'];
  title: Scalars['String'];
}>;


export type SkillPageQueryQuery = { __typename?: 'Query', skillPageQuery: { __typename?: 'SkillPageResponse', skill?: { __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined } | null | undefined, worker?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, userName: string, email: string, phone: string, city: string, sexe: string, age: number, dateOfBirth: any, description: string, skillsIds?: Array<string> | null | undefined, isActive?: boolean | null | undefined, ratingsValue: number, ratingsNumber: number, rating: number, profilePicture?: string | null | undefined, createdAt: any } | null | undefined, otherSkills?: Array<{ __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined }> | null | undefined } };

export type WorkerByIdQueryVariables = Exact<{
  workerByIdId: Scalars['String'];
}>;


export type WorkerByIdQuery = { __typename?: 'Query', workerById?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, userName: string, email: string, phone: string, city: string, sexe: string, age: number, skillsIds?: Array<string> | null | undefined, dateOfBirth: any, description: string, isActive?: boolean | null | undefined, ratingsValue: number, ratingsNumber: number, rating: number, profilePicture?: string | null | undefined, createdAt: any } | null | undefined };

export type WorkerByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type WorkerByUsernameQuery = { __typename?: 'Query', workerByUsername?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, userName: string, email: string, phone: string, city: string, sexe: string, age: number, dateOfBirth: any, description: string, skillsIds?: Array<string> | null | undefined, isActive?: boolean | null | undefined, ratingsValue: number, ratingsNumber: number, rating: number, profilePicture?: string | null | undefined, createdAt: any } | null | undefined };

export type WorkerPageQueryQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type WorkerPageQueryQuery = { __typename?: 'Query', workerPageQuery: { __typename?: 'WorkerPageResponse', worker?: { __typename?: 'Worker', id: string, firstName: string, lastName: string, userName: string, email: string, phone: string, city: string, sexe: string, age: number, dateOfBirth: any, description: string, skillsIds?: Array<string> | null | undefined, isActive?: boolean | null | undefined, ratingsValue: number, ratingsNumber: number, rating: number, profilePicture?: string | null | undefined, createdAt: any } | null | undefined, skills?: Array<{ __typename?: 'Skill', id: string, workerId: string, worker?: string | null | undefined, status: string, rating: number, ratingsNumber?: number | null | undefined, category?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, pricing?: number | null | undefined, duration: number, zone?: string | null | undefined, pictures?: Array<string> | null | undefined, workerPicUrl?: string | null | undefined }> | null | undefined } };


export const AddAdminDocument = gql`
    mutation AddAdmin($options: AdminRegisterInput!) {
  addAdmin(options: $options) {
    errors {
      message
      field
    }
    admin {
      id
      firstName
      lastName
      username
      email
      role
    }
  }
}
    `;

export function useAddAdminMutation() {
  return Urql.useMutation<AddAdminMutation, AddAdminMutationVariables>(AddAdminDocument);
};
export const AddPictureDocument = gql`
    mutation AddPicture($pictureUrl: String!, $index: Int!, $skillId: String!) {
  addPicture(pictureUrl: $pictureUrl, index: $index, skillId: $skillId)
}
    `;

export function useAddPictureMutation() {
  return Urql.useMutation<AddPictureMutation, AddPictureMutationVariables>(AddPictureDocument);
};
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($addProfilePicturePictureUrl: String!) {
  addProfilePicture(pictureUrl: $addProfilePicturePictureUrl)
}
    `;

export function useAddProfilePictureMutation() {
  return Urql.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument);
};
export const AdminLoginDocument = gql`
    mutation AdminLogin($options: AdminLoginInput!) {
  adminLogin(options: $options) {
    errors {
      message
      field
    }
    admin {
      id
      firstName
      lastName
      username
      email
      role
    }
  }
}
    `;

export function useAdminLoginMutation() {
  return Urql.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(AdminLoginDocument);
};
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($email: String!) {
  changeEmail(email: $email)
}
    `;

export function useChangeEmailMutation() {
  return Urql.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $confirmedPassword: String!, $token: String!) {
  changePassword(
    password: $password
    confirmedPassword: $confirmedPassword
    token: $token
  ) {
    errors {
      message
      field
    }
    user {
      id
      firstName
      lastName
      userName
      email
      isWorker
      confirmed
    }
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ChangePasswordFromProfilDocument = gql`
    mutation ChangePasswordFromProfil($oldPassword: String!, $password: String!, $confirmedPassword: String!) {
  changePasswordFromProfil(
    oldPassword: $oldPassword
    password: $password
    confirmedPassword: $confirmedPassword
  ) {
    errors {
      message
      field
    }
    user {
      id
      firstName
      lastName
      userName
      email
      isWorker
      confirmed
    }
  }
}
    `;

export function useChangePasswordFromProfilMutation() {
  return Urql.useMutation<ChangePasswordFromProfilMutation, ChangePasswordFromProfilMutationVariables>(ChangePasswordFromProfilDocument);
};
export const CommentDocument = gql`
    mutation Comment($content: String!, $skillId: String!) {
  comment(content: $content, skillId: $skillId)
}
    `;

export function useCommentMutation() {
  return Urql.useMutation<CommentMutation, CommentMutationVariables>(CommentDocument);
};
export const ConfirmPasswordDocument = gql`
    mutation ConfirmPassword($password: String!) {
  confirmPassword(password: $password) {
    errors {
      message
      field
    }
    user {
      id
      firstName
      lastName
      userName
      email
      isWorker
      confirmed
    }
  }
}
    `;

export function useConfirmPasswordMutation() {
  return Urql.useMutation<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>(ConfirmPasswordDocument);
};
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;

export function useConfirmUserMutation() {
  return Urql.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument);
};
export const CreateSkillS1Document = gql`
    mutation CreateSkillS1($options: CreateSkillS1Input!) {
  createSkillS1(options: $options) {
    errors {
      message
      field
    }
    skill {
      id
      workerId
      status
      rating
      category
      title
      description
      pricing
      duration
      zone
      pictures
    }
  }
}
    `;

export function useCreateSkillS1Mutation() {
  return Urql.useMutation<CreateSkillS1Mutation, CreateSkillS1MutationVariables>(CreateSkillS1Document);
};
export const CreateSkillS2Document = gql`
    mutation CreateSkillS2($options: CreateSkillS2Input!, $skillId: String!) {
  createSkillS2(options: $options, skillId: $skillId) {
    errors {
      message
      field
    }
    skill {
      id
      workerId
      status
      rating
      category
      title
      description
      pricing
      duration
      zone
      pictures
    }
  }
}
    `;

export function useCreateSkillS2Mutation() {
  return Urql.useMutation<CreateSkillS2Mutation, CreateSkillS2MutationVariables>(CreateSkillS2Document);
};
export const CreateSkillS3Document = gql`
    mutation CreateSkillS3($options: CreateSkillS3Input!, $skillId: String!) {
  createSkillS3(options: $options, skillId: $skillId) {
    errors {
      message
      field
    }
    skill {
      id
      workerId
      status
      rating
      category
      title
      description
      pricing
      duration
      zone
      pictures
    }
  }
}
    `;

export function useCreateSkillS3Mutation() {
  return Urql.useMutation<CreateSkillS3Mutation, CreateSkillS3MutationVariables>(CreateSkillS3Document);
};
export const DeleteAdminDocument = gql`
    mutation DeleteAdmin($username: String!) {
  deleteAdmin(username: $username)
}
    `;

export function useDeleteAdminMutation() {
  return Urql.useMutation<DeleteAdminMutation, DeleteAdminMutationVariables>(DeleteAdminDocument);
};
export const DeletePictureDocument = gql`
    mutation DeletePicture($index: Int!, $skillId: String!) {
  deletePicture(index: $index, skillId: $skillId)
}
    `;

export function useDeletePictureMutation() {
  return Urql.useMutation<DeletePictureMutation, DeletePictureMutationVariables>(DeletePictureDocument);
};
export const DeleteProfilePictureDocument = gql`
    mutation DeleteProfilePicture {
  deleteProfilePicture
}
    `;

export function useDeleteProfilePictureMutation() {
  return Urql.useMutation<DeleteProfilePictureMutation, DeleteProfilePictureMutationVariables>(DeleteProfilePictureDocument);
};
export const DeleteSkillDocument = gql`
    mutation DeleteSkill($skillId: String!) {
  deleteSkill(skillId: $skillId)
}
    `;

export function useDeleteSkillMutation() {
  return Urql.useMutation<DeleteSkillMutation, DeleteSkillMutationVariables>(DeleteSkillDocument);
};
export const DeleteSkillPicsDocument = gql`
    mutation DeleteSkillPics($skillId: String!) {
  deleteSkillPics(skillId: $skillId)
}
    `;

export function useDeleteSkillPicsMutation() {
  return Urql.useMutation<DeleteSkillPicsMutation, DeleteSkillPicsMutationVariables>(DeleteSkillPicsDocument);
};
export const DeleteUserProfilePicDocument = gql`
    mutation DeleteUserProfilePic($userId: String!) {
  deleteUserProfilePic(userId: $userId)
}
    `;

export function useDeleteUserProfilePicMutation() {
  return Urql.useMutation<DeleteUserProfilePicMutation, DeleteUserProfilePicMutationVariables>(DeleteUserProfilePicDocument);
};
export const DislikeDocument = gql`
    mutation Dislike($skillId: String!) {
  dislike(skillId: $skillId)
}
    `;

export function useDislikeMutation() {
  return Urql.useMutation<DislikeMutation, DislikeMutationVariables>(DislikeDocument);
};
export const FavoriteDocument = gql`
    mutation Favorite($workerId: String!) {
  favorite(workerId: $workerId)
}
    `;

export function useFavoriteMutation() {
  return Urql.useMutation<FavoriteMutation, FavoriteMutationVariables>(FavoriteDocument);
};
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email)
}
    `;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
};
export const HideSkillDocument = gql`
    mutation HideSkill($skillId: String!) {
  hideSkill(skillId: $skillId)
}
    `;

export function useHideSkillMutation() {
  return Urql.useMutation<HideSkillMutation, HideSkillMutationVariables>(HideSkillDocument);
};
export const LikeDocument = gql`
    mutation Like($skillId: String!) {
  like(skillId: $skillId)
}
    `;

export function useLikeMutation() {
  return Urql.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      message
      field
    }
    user {
      id
      firstName
      lastName
      userName
      email
      isWorker
      confirmed
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RateDocument = gql`
    mutation Rate($rateWorkerId: String!, $rateValue: Int!) {
  rate(workerId: $rateWorkerId, value: $rateValue)
}
    `;

export function useRateMutation() {
  return Urql.useMutation<RateMutation, RateMutationVariables>(RateDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      message
      field
    }
    user {
      id
      firstName
      lastName
      userName
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RegisterWorkerDocument = gql`
    mutation RegisterWorker($options: WorkerRegisterInput!) {
  registerWorker(options: $options) {
    errors {
      message
      field
    }
    worker {
      id
      firstName
      lastName
      email
      phone
      city
      sexe
      dateOfBirth
    }
  }
}
    `;

export function useRegisterWorkerMutation() {
  return Urql.useMutation<RegisterWorkerMutation, RegisterWorkerMutationVariables>(RegisterWorkerDocument);
};
export const SendConfirmationEmailDocument = gql`
    mutation SendConfirmationEmail {
  sendConfirmationEmail
}
    `;

export function useSendConfirmationEmailMutation() {
  return Urql.useMutation<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>(SendConfirmationEmailDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($recieverId: String!, $content: String!) {
  sendMessage(recieverId: $recieverId, content: $content)
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const UnfavoriteDocument = gql`
    mutation Unfavorite($workerId: String!) {
  unfavorite(workerId: $workerId)
}
    `;

export function useUnfavoriteMutation() {
  return Urql.useMutation<UnfavoriteMutation, UnfavoriteMutationVariables>(UnfavoriteDocument);
};
export const UpdateSkillDocument = gql`
    mutation UpdateSkill($options: UpdateSkillInput!, $skillId: String!) {
  updateSkill(options: $options, skillId: $skillId) {
    errors {
      message
      field
    }
    skill {
      id
      workerId
      status
      rating
      category
      title
      description
      pricing
      duration
      zone
      pictures
    }
  }
}
    `;

export function useUpdateSkillMutation() {
  return Urql.useMutation<UpdateSkillMutation, UpdateSkillMutationVariables>(UpdateSkillDocument);
};
export const UpdateWorkerDocument = gql`
    mutation UpdateWorker($options: WorkerRegisterInput!) {
  updateWorker(options: $options) {
    errors {
      message
      field
    }
    worker {
      id
      firstName
      lastName
      email
      phone
      city
      dateOfBirth
    }
  }
}
    `;

export function useUpdateWorkerMutation() {
  return Urql.useMutation<UpdateWorkerMutation, UpdateWorkerMutationVariables>(UpdateWorkerDocument);
};
export const UploadPictureDocument = gql`
    mutation UploadPicture($fileType: String!, $fileName: String!, $skillId: String!) {
  uploadPicture(fileType: $fileType, fileName: $fileName, skillId: $skillId) {
    signedS3Url
    objectUrl
    error
  }
}
    `;

export function useUploadPictureMutation() {
  return Urql.useMutation<UploadPictureMutation, UploadPictureMutationVariables>(UploadPictureDocument);
};
export const UploadProfilePictureDocument = gql`
    mutation UploadProfilePicture($uploadProfilePictureFileType: String!, $uploadProfilePictureFileName: String!) {
  uploadProfilePicture(
    fileType: $uploadProfilePictureFileType
    fileName: $uploadProfilePictureFileName
  ) {
    signedS3Url
    objectUrl
    error
  }
}
    `;

export function useUploadProfilePictureMutation() {
  return Urql.useMutation<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>(UploadProfilePictureDocument);
};
export const CommentsBySkillDocument = gql`
    query CommentsBySkill($title: String!, $worker: String!, $limit: Int!, $skip: Int!) {
  commentsBySkill(title: $title, worker: $worker, limit: $limit, skip: $skip) {
    id
    content
    author
    worker
    userId
    skillId
    workerId
    createdAt
    updatedAt
  }
}
    `;

export function useCommentsBySkillQuery(options: Omit<Urql.UseQueryArgs<CommentsBySkillQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentsBySkillQuery>({ query: CommentsBySkillDocument, ...options });
};
export const CommentsByWorkerDocument = gql`
    query CommentsByWorker($worker: String!, $limit: Int!, $skip: Int!) {
  commentsByWorker(worker: $worker, limit: $limit, skip: $skip) {
    id
    content
    author
    worker
    userId
    skillId
    workerId
    createdAt
    updatedAt
  }
}
    `;

export function useCommentsByWorkerQuery(options: Omit<Urql.UseQueryArgs<CommentsByWorkerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentsByWorkerQuery>({ query: CommentsByWorkerDocument, ...options });
};
export const GetAllSkillsDocument = gql`
    query GetAllSkills {
  getAllSkills {
    id
    workerId
    worker
    rating
    ratingsNumber
    pictures
    workerPicUrl
    category
    title
    description
    pricing
    duration
    zone
    status
    likesCount
    createdAt
  }
}
    `;

export function useGetAllSkillsQuery(options: Omit<Urql.UseQueryArgs<GetAllSkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllSkillsQuery>({ query: GetAllSkillsDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    userName
    email
    isWorker
    profilePicture
    createdAt
  }
}
    `;

export function useGetAllUsersQuery(options: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllUsersQuery>({ query: GetAllUsersDocument, ...options });
};
export const GetAllWorkersDocument = gql`
    query GetAllWorkers {
  getAllWorkers {
    id
    firstName
    lastName
    userName
    email
    sexe
    phone
    city
    dateOfBirth
    description
    skillsIds
    rating
    ratingsNumber
    profilePicture
    createdAt
  }
}
    `;

export function useGetAllWorkersQuery(options: Omit<Urql.UseQueryArgs<GetAllWorkersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllWorkersQuery>({ query: GetAllWorkersDocument, ...options });
};
export const GetConversationDocument = gql`
    query GetConversation($otherId: String!) {
  getConversation(otherId: $otherId) {
    id
    senderId
    recieverId
    sender
    reciever
    content
    state
    createdAt
  }
}
    `;

export function useGetConversationQuery(options: Omit<Urql.UseQueryArgs<GetConversationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationQuery>({ query: GetConversationDocument, ...options });
};
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    user
    other
    userId
    otherId
    content
    state
    createdAt
    id
  }
}
    `;

export function useGetConversationsQuery(options: Omit<Urql.UseQueryArgs<GetConversationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationsQuery>({ query: GetConversationsDocument, ...options });
};
export const GetCurrentAdminDocument = gql`
    query GetCurrentAdmin {
  getCurrentAdmin {
    id
    firstName
    lastName
    username
    email
    profilePicture
    role
  }
}
    `;

export function useGetCurrentAdminQuery(options: Omit<Urql.UseQueryArgs<GetCurrentAdminQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCurrentAdminQuery>({ query: GetCurrentAdminDocument, ...options });
};
export const GetLikedSkillsDocument = gql`
    query GetLikedSkills {
  getLikedSkills {
    id
    worker
    title
    pictures
  }
}
    `;

export function useGetLikedSkillsQuery(options: Omit<Urql.UseQueryArgs<GetLikedSkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetLikedSkillsQuery>({ query: GetLikedSkillsDocument, ...options });
};
export const GetMessagesDocument = gql`
    query GetMessages {
  getMessages {
    id
    senderId
    recieverId
    sender
    reciever
    content
    state
    createdAt
  }
}
    `;

export function useGetMessagesQuery(options: Omit<Urql.UseQueryArgs<GetMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMessagesQuery>({ query: GetMessagesDocument, ...options });
};
export const GetSkillDocument = gql`
    query GetSkill($skillId: String!) {
  getSkill(skillId: $skillId) {
    id
    workerId
    worker
    status
    rating
    category
    title
    description
    pricing
    duration
    zone
    pictures
  }
}
    `;

export function useGetSkillQuery(options: Omit<Urql.UseQueryArgs<GetSkillQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSkillQuery>({ query: GetSkillDocument, ...options });
};
export const GetSkillByTitleDocument = gql`
    query GetSkillByTitle($title: String!, $workerId: String!) {
  getSkillByTitle(title: $title, workerId: $workerId) {
    id
    workerId
    worker
    status
    rating
    ratingsNumber
    category
    title
    description
    pricing
    duration
    zone
    pictures
    workerPicUrl
  }
}
    `;

export function useGetSkillByTitleQuery(options: Omit<Urql.UseQueryArgs<GetSkillByTitleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSkillByTitleQuery>({ query: GetSkillByTitleDocument, ...options });
};
export const GetSkillsDocument = gql`
    query GetSkills($workerId: String!) {
  getSkills(workerId: $workerId) {
    id
    workerId
    worker
    status
    rating
    ratingsNumber
    category
    title
    description
    pricing
    duration
    zone
    pictures
    workerPicUrl
  }
}
    `;

export function useGetSkillsQuery(options: Omit<Urql.UseQueryArgs<GetSkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSkillsQuery>({ query: GetSkillsDocument, ...options });
};
export const IsworkerDocument = gql`
    query Isworker($userId: String!) {
  isWorker(userId: $userId)
}
    `;

export function useIsworkerQuery(options: Omit<Urql.UseQueryArgs<IsworkerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsworkerQuery>({ query: IsworkerDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    userName
    email
    isWorker
    profilePicture
    confirmed
    likesIds
    favoritesIds
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const NavbarQueryDocument = gql`
    query NavbarQuery {
  navbarQuery {
    user {
      id
      firstName
      lastName
      userName
      email
      isWorker
      profilePicture
      confirmed
      likesIds
    }
    likes {
      id
      title
      worker
      pictures
    }
    favs {
      id
      userName
      profilePicture
      rating
      ratingsNumber
    }
  }
}
    `;

export function useNavbarQueryQuery(options: Omit<Urql.UseQueryArgs<NavbarQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NavbarQueryQuery>({ query: NavbarQueryDocument, ...options });
};
export const SearchSkillsDocument = gql`
    query SearchSkills($limit: Int!, $skip: Int!, $orderBy: String!, $keyword: String!, $city: String!, $category: String!) {
  searchSkills(
    limit: $limit
    skip: $skip
    orderBy: $orderBy
    keyword: $keyword
    city: $city
    category: $category
  ) {
    id
    workerId
    worker
    status
    rating
    ratingsNumber
    category
    title
    description
    pricing
    duration
    zone
    pictures
    workerPicUrl
  }
}
    `;

export function useSearchSkillsQuery(options: Omit<Urql.UseQueryArgs<SearchSkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchSkillsQuery>({ query: SearchSkillsDocument, ...options });
};
export const SkillPageQueryDocument = gql`
    query SkillPageQuery($username: String!, $title: String!) {
  skillPageQuery(username: $username, title: $title) {
    skill {
      id
      workerId
      worker
      status
      rating
      ratingsNumber
      category
      title
      description
      pricing
      duration
      zone
      pictures
      workerPicUrl
    }
    worker {
      id
      firstName
      lastName
      userName
      email
      phone
      city
      sexe
      age
      dateOfBirth
      description
      skillsIds
      isActive
      ratingsValue
      ratingsNumber
      rating
      profilePicture
      createdAt
    }
    otherSkills {
      id
      workerId
      worker
      status
      rating
      ratingsNumber
      category
      title
      description
      pricing
      duration
      zone
      pictures
      workerPicUrl
    }
  }
}
    `;

export function useSkillPageQueryQuery(options: Omit<Urql.UseQueryArgs<SkillPageQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SkillPageQueryQuery>({ query: SkillPageQueryDocument, ...options });
};
export const WorkerByIdDocument = gql`
    query WorkerById($workerByIdId: String!) {
  workerById(id: $workerByIdId) {
    id
    firstName
    lastName
    userName
    email
    phone
    city
    sexe
    age
    skillsIds
    dateOfBirth
    description
    isActive
    ratingsValue
    ratingsNumber
    rating
    profilePicture
    createdAt
  }
}
    `;

export function useWorkerByIdQuery(options: Omit<Urql.UseQueryArgs<WorkerByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkerByIdQuery>({ query: WorkerByIdDocument, ...options });
};
export const WorkerByUsernameDocument = gql`
    query WorkerByUsername($username: String!) {
  workerByUsername(username: $username) {
    id
    firstName
    lastName
    userName
    email
    phone
    city
    sexe
    age
    dateOfBirth
    description
    skillsIds
    isActive
    ratingsValue
    ratingsNumber
    rating
    profilePicture
    createdAt
  }
}
    `;

export function useWorkerByUsernameQuery(options: Omit<Urql.UseQueryArgs<WorkerByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkerByUsernameQuery>({ query: WorkerByUsernameDocument, ...options });
};
export const WorkerPageQueryDocument = gql`
    query WorkerPageQuery($username: String!) {
  workerPageQuery(username: $username) {
    worker {
      id
      firstName
      lastName
      userName
      email
      phone
      city
      sexe
      age
      dateOfBirth
      description
      skillsIds
      isActive
      ratingsValue
      ratingsNumber
      rating
      profilePicture
      createdAt
    }
    skills {
      id
      workerId
      worker
      status
      rating
      ratingsNumber
      category
      title
      description
      pricing
      duration
      zone
      pictures
      workerPicUrl
    }
  }
}
    `;

export function useWorkerPageQueryQuery(options: Omit<Urql.UseQueryArgs<WorkerPageQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkerPageQueryQuery>({ query: WorkerPageQueryDocument, ...options });
};
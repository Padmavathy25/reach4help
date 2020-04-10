import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { firestore } from 'firebase-admin';
// eslint-disable-next-line import/no-cycle
import { IQuestionnaire } from '../questionnaires';
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum ApplicationPreference {
  pin = 'pin',
  cav = 'cav',
}

export interface IUser extends DocumentData {
  cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  averageRating: number | null;
  casesCompleted: number;
  requestsMade: number;
  pinRatingsReceived: number;
  cavRatingsReceived: number;
  username: string;
  displayName: string | null;
  displayPicture: string | null;
  applicationPreference?: ApplicationPreference;
}

export class User implements IUser {
  constructor(
    cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    username: string,
    casesCompleted = 0,
    requestsMade = 0,
    pinRatingsReceived = 0,
    cavRatingsReceived = 0,
    averageRating: number | null = null,
    displayName: string | null = null,
    displayPicture: string | null = null,
    applicationPreference = ApplicationPreference.pin,
  ) {
    this._cavQuestionnaireRef = cavQuestionnaireRef;
    this._pinQuestionnaireRef = pinQuestionnaireRef;
    this._averageRating = averageRating;
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._pinRatingsReceived = pinRatingsReceived;
    this._cavRatingsReceived = cavRatingsReceived;
    this._username = username;
    this._displayName = displayName;
    this._displayPicture = displayPicture;
    this._applicationPreference = applicationPreference;
  }

  @IsObject()
  @IsOptional()
  private _cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  get cavQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._cavQuestionnaireRef;
  }

  set cavQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._cavQuestionnaireRef = value;
  }

  @IsObject()
  @IsOptional()
  private _pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  get pinQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._pinQuestionnaireRef;
  }

  set pinQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._pinQuestionnaireRef = value;
  }

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  private _averageRating: number | null;

  get averageRating(): number | null {
    return this._averageRating;
  }

  set averageRating(value: number | null) {
    this._averageRating = value;
  }

  @IsInt()
  @Min(0)
  private _casesCompleted: number;

  get casesCompleted(): number {
    return this._casesCompleted;
  }

  set casesCompleted(value: number) {
    this._casesCompleted = value;
  }

  @IsInt()
  @Min(0)
  private _requestsMade: number;

  get requestsMade(): number {
    return this._requestsMade;
  }

  set requestsMade(value: number) {
    this._requestsMade = value;
  }

  @IsInt()
  @Min(0)
  private _pinRatingsReceived: number;

  get pinRatingsReceived(): number {
    return this._pinRatingsReceived;
  }

  set pinRatingsReceived(value: number) {
    this._pinRatingsReceived = value;
  }

  @IsInt()
  @Min(0)
  private _cavRatingsReceived: number;

  get cavRatingsReceived(): number {
    return this._cavRatingsReceived;
  }

  set cavRatingsReceived(value: number) {
    this._cavRatingsReceived = value;
  }

  @IsString()
  @IsNotEmpty()
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  @IsString()
  @IsOptional()
  private _displayName: string | null;

  get displayName(): string | null {
    return this._displayName;
  }

  set displayName(value: string | null) {
    this._displayName = value;
  }

  @IsUrl()
  @IsOptional()
  private _displayPicture: string | null;

  get displayPicture(): string | null {
    return this._displayPicture;
  }

  set displayPicture(value: string | null) {
    this._displayPicture = value;
  }

  @IsEnum(ApplicationPreference)
  private _applicationPreference: ApplicationPreference;

  get applicationPreference(): ApplicationPreference {
    return this._applicationPreference;
  }

  set applicationPreference(value: ApplicationPreference) {
    this._applicationPreference = value;
  }

  static factory = (data: IUser): User =>
    new User(
      data.cavQuestionnaireRef,
      data.pinQuestionnaireRef,
      data.username,
      data.casesCompleted,
      data.requestsMade,
      data.pinRatingsReceived,
      data.cavRatingsReceived,
      data.averageRating,
      data.displayName,
      data.displayPicture,
      data.applicationPreference,
    );
}

export const UserFirestoreConverter: FirestoreDataConverter<User> = {
  fromFirestore: (data: QueryDocumentSnapshot<IUser>): User => {
    return User.factory(data.data());
  },
  toFirestore: (modelObject: User): IUser => {
    return {
      cavQuestionnaireRef: modelObject.cavQuestionnaireRef,
      pinQuestionnaireRef: modelObject.pinQuestionnaireRef,
      averageRating: modelObject.averageRating,
      casesCompleted: modelObject.casesCompleted,
      requestsMade: modelObject.requestsMade,
      pinRatingsReceived: modelObject.pinRatingsReceived,
      cavRatingsReceived: modelObject.cavRatingsReceived,
      username: modelObject.username,
      displayName: modelObject.displayName,
      displayPicture: modelObject.displayPicture,
      applicationPreference: modelObject.applicationPreference,
    };
  },
};

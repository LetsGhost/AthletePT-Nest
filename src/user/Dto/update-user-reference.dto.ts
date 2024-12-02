import { Types } from 'mongoose';

export class UpdateUserReferenceDto {
  userId: string;
  referenceName: string;
  referenceId: Types.ObjectId;
}

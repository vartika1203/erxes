import { IConditionsRule } from '@erxes/ui/src/types';
import { IAttachment } from '@erxes/ui/src/types';

export type IEngageScheduleDate = {
  type: string;
  month: string;
  day: string;
  dateTime: string;
} | null;


export interface IEngageMessenger {
  brandId: string;
  kind?: string;
  sentAs: string;
  content: string;
  rules?: IConditionsRule[];
}

export interface IEngageEmail {
  templateId?: string;
  subject: string;
  sender?: string;
  replyTo?: string;
  content: string;
  attachments?: IAttachment[];
}

export interface IEngageSms {
  from?: string;
  content: string;
  fromIntegrationId: string;
}

export interface IEngageMessageDoc {
  kind?: string;
  type?: string;
  segmentIds?: string[];
  tagIds?: string[];
  customerTagIds?: string[];
  brandIds?: string[];
  customerIds?: string[];
  title: string;
  fromUserId?: string;
  method: string;
  isDraft?: boolean;
  isLive?: boolean;
  email?: IEngageEmail;
  messenger?: IEngageMessenger;
  scheduleDate?: IEngageScheduleDate;
  shortMessage?: IEngageSms;
}

export type AddMutationResponse = {
  messagesAddMutation: (params: {
    variables: IEngageMessageDoc;
  }) => Promise<any>;
};

export interface IIntegrationWithPhone {
  _id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
}
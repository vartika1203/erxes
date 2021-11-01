import * as DataLoader from 'dataloader';
import * as _ from 'underscore';
import productCategory from './productCategory';
import tag from './tag';
import company from './company';
import form from './form';
import integration from './integration';
import user from './user';
import segmentsBySubOf from './segmentsBySubOf';
import segment from './segment';
import customer from './customer';
import conversationMessagesByConversationId from './conversationMessagesByConversationId';
import conversationsByCustomerId from './conversationsByCustomerId';
import brand from './brand';
import deal from './deal';
import task from './task';
import growthHack from './growthHack';
import ticket from './ticket';
import stage from './stage';
import checklist from './checklist';
import checklistItem from './checklistItem';

export interface IDataLoaders {
  productCategory: DataLoader<string, any>;
  tag: DataLoader<string, any>;
  company: DataLoader<string, any>;
  form: DataLoader<string, any>;
  integration: DataLoader<string, any>;
  user: DataLoader<string, any>;
  segmentsBySubOf: DataLoader<string, any[]>;
  segment: DataLoader<string, any>;
  customer: DataLoader<string, any>;
  conversationMessagesByConversationId: DataLoader<string, any[]>;
  conversationsByCustomerId: DataLoader<string, any[]>;
  brand: DataLoader<string, any>;
  deal: DataLoader<string, any>;
  task: DataLoader<string, any>;
  growthHack: DataLoader<string, any>;
  ticket: DataLoader<string, any>;
  stage: DataLoader<string, any>;
  checklist: DataLoader<string, any>;
  checklistItem: DataLoader<string, any>;
}

export function generateAllDataLoaders(): IDataLoaders {
  return {
    productCategory: productCategory(),
    tag: tag(),
    company: company(),
    form: form(),
    integration: integration(),
    user: user(),
    segmentsBySubOf: segmentsBySubOf(),
    segment: segment(),
    customer: customer(),
    conversationMessagesByConversationId: conversationMessagesByConversationId(),
    conversationsByCustomerId: conversationsByCustomerId(),
    brand: brand(),
    deal: deal(),
    task: task(),
    growthHack: growthHack(),
    ticket: ticket(),
    stage: stage(),
    checklist: checklist(),
    checklistItem: checklistItem()
  };
}

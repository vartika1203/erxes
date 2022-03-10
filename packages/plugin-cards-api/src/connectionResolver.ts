import { MongoClient } from 'mongodb';
import * as mongoose from 'mongoose';
import { mainDb } from './configs';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { IBoardModel, IPipelineModel, IStageModel, loadBoardClass, loadPipelineClass, loadStageClass } from './models/Boards';
import { IChecklistItemModel, IChecklistModel, loadChecklistClass, loadChecklistItemClass } from './models/Checklists';
import { IDealModel, loadDealClass } from './models/Deals';
import { IGrowthHackModel, loadGrowthHackClass } from './models/GrowthHacks';
import { IPipelineLabelModel, loadPipelineLabelClass } from './models/PipelineLabels';
import { IPipelineTemplateModel, loadPipelineTemplateClass } from './models/PipelineTemplates';
import { ITaskModel, loadTaskClass } from './models/Tasks';
import { ITicketModel, loadTicketClass } from './models/Tickets';
import { IBoardDocument, IPipelineDocument, IPipelineStage, IStageDocument } from './models/definitions/boards';
import { IChecklistDocument, IChecklistItemDocument } from './models/definitions/checklists';
import { IDealDocument } from './models/definitions/deals';
import { IGrowthHackDocument } from './models/definitions/growthHacks';
import { IPipelineLabelDocument } from './models/definitions/pipelineLabels';
import { IPipelineTemplateDocument } from './models/definitions/pipelineTemplates';
import { ITaskDocument } from './models/definitions/tasks';
import { ITicketDocument } from './models/definitions/tickets';

export interface ICoreIModels {
  Forms;
  FormSubmissions;
  Fields;
  FieldsGroups;
  Users;
  InternalNotes;
}
export interface IModels {
  Boards: IBoardModel;
  Pipelines: IPipelineModel;
  Stages: IStageModel;

  Checklists: IChecklistModel;
  ChecklistItems: IChecklistItemModel;

  Deals: IDealModel;
  
  GrowthHacks: IGrowthHackModel;

  PipelineLabels: IPipelineLabelModel;

  PipelineTemplates: IPipelineTemplateModel;

  Tasks: ITaskModel;

  Tickets: ITicketModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
  coreModels: ICoreIModels;
}

export let models: IModels;
export let coreModels: ICoreIModels;

export const generateModels = async (
  _hostnameOrSubdomain: string
): Promise<IModels> => {
  if (models) {
    return models;
  }

  coreModels = await connectCore();

  loadClasses(mainDb);

  return models;
};

export const generateCoreModels = async (
  _hostnameOrSubdomain: string
): Promise<ICoreIModels> => {
    return coreModels;
};

const connectCore = async () => {
  const url = process.env.API_MONGO_URL || 'mongodb://localhost/erxes';
  const client = new MongoClient(url);

  let db;

  await client.connect();

  console.log(`Connected successfully to ${url}`);

  db = client.db();

  return {
    Fields: await db.collection('form_fields'),
    Forms: await db.collection('forms'),
    FormSubmissions: await db.collection('form_submissions'),
    FieldsGroups: await db.collection('form_field_groups'),
    Users: await db.collection('users'),
    InternalNotes: await db.collection('internal_notes'),
  }
}

export const loadClasses = (db: mongoose.Connection): IModels => {
  models = {} as IModels;

  models.Boards = db.model<IBoardDocument, IBoardModel>('boards', loadBoardClass(models));
  models.Pipelines = db.model<IPipelineDocument, IPipelineModel>('pipelines', loadPipelineClass(models));
  models.Stages = db.model<IStageDocument, IStageModel>('stages', loadStageClass(models));

  models.Checklists = db.model<IChecklistDocument, IChecklistModel>('checklists', loadChecklistClass(models));
  models.ChecklistItems = db.model<IChecklistItemDocument, IChecklistItemModel>('checklist_items', loadChecklistItemClass(models));

  models.Deals = db.model<IDealDocument, IDealModel>('deals', loadDealClass(models));

  models.GrowthHacks = db.model<IGrowthHackDocument, IGrowthHackModel>('growth_hacks', loadGrowthHackClass(models));

  models.PipelineLabels = db.model<IPipelineLabelDocument, IPipelineLabelModel>('pipeline_labels', loadPipelineLabelClass(models));

  models.PipelineTemplates = db.model<IPipelineTemplateDocument, IPipelineTemplateModel>('pipeline_templates', loadPipelineTemplateClass(models));
  
  models.Tasks = db.model<ITaskDocument, ITaskModel>('tasks', loadTaskClass(models));

  models.Tickets = db.model<ITicketDocument, ITicketModel>('tickets', loadTicketClass(models));

  return models;
};
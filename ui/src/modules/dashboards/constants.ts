import { __ } from 'modules/common/utils';

// export const ACTIONS = [
//   {
//     type: 'if',
//     icon: 'sitemap-1',
//     label: __('Branches'),
//     description: __('Create simple or if/then branches'),
//     isAvailable: true
//   },
//   {
//     type: 'setProperty',
//     icon: 'calcualtor',
//     label: __('Manage properties'),
//     description: __(
//       'Update existing default or custom properties for Contacts, Companies, Cards, Conversations'
//     ),
//     isAvailable: true
//   },
//   {
//     type: 'createTask',
//     icon: 'file-plus-alt',
//     label: __('Create task'),
//     description: __('Create task'),
//     isAvailable: true
//   },
//   {
//     type: 'createDeal',
//     icon: 'piggy-bank',
//     label: __('Create deal'),
//     description: __('Create deal'),
//     isAvailable: true
//   },
//   {
//     type: 'createTicket',
//     icon: 'file-plus',
//     label: __('Create ticket'),
//     description: __('Create ticket'),
//     isAvailable: true
//   },
//   {
//     type: 'delay',
//     icon: 'arrows-up-right',
//     label: __('Delay'),
//     description: __(
//       'Delay the next action with a timeframe, a specific event or activity'
//     ),
//     isAvailable: true
//   },
//   {
//     type: 'workflow',
//     icon: 'hourglass',
//     label: __('Workflow'),
//     description: __(
//       'Enroll in another workflow,  trigger outgoing webhook or write custom code'
//     ),
//     isAvailable: false
//   },
//   {
//     type: 'externalCommunications',
//     icon: 'fast-mail',
//     label: __('External communications'),
//     description: __('Send email, SMS or in-app messenger messages to Contacts'),
//     isAvailable: false
//   }
// ];

export const TRIGGERS = [
  {
    type: 'customer',
    img: 'automation2.svg',
    icon: 'file-plus',
    label: __('Leads')
  },
  {
    type: 'company',
    img: 'automation2.svg',
    icon: 'file-plus',
    label: __('Customer')
  },
  {
    type: 'conversation',
    img: 'automation4.svg',
    icon: 'file-plus',
    label: __('Companies')
  },
  {
    type: 'task',
    img: 'automation3.svg',
    icon: 'file-plus',
    label: __('Visitors')
  },
  {
    type: 'ticket',
    img: 'automation3.svg',
    icon: 'file-plus',
    label: __('Deals')
  },
  {
    type: 'deal',
    img: 'automation3.svg',
    icon: 'file-plus',
    label: __('Tasks')
  },
  {
    type: 'user',
    img: 'automation4.svg',
    icon: 'file-plus',
    label: __('Tickets')
  },
  {
    type: 'user',
    img: 'automation4.svg',
    icon: 'file-plus',
    label: __('Conversation')
  },
  {
    type: 'user',
    img: 'automation4.svg',
    icon: 'file-plus',
    label: __('Custom properties')
  }
];

export const TRIGGER_TYPES = [
  'user',
  'deal',
  'ticket',
  'task',
  'conversation',
  'company',
  'customer'
];

export const statusFilters = [
  { key: 'active', value: 'Active' },
  { key: 'draft', value: 'Draft' }
];

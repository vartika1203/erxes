import { __ } from 'modules/common/utils';

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

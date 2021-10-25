import { __ } from 'modules/common/utils';
import RTG from 'react-transition-group';
import Wrapper from 'modules/layout/components/Wrapper';
import React from 'react';
import { FormControl } from 'modules/common/components/form';
import { BarItems, HeightedWrapper } from 'modules/layout/styles';
import Button from 'modules/common/components/Button';
import Icon from 'modules/common/components/Icon';
import PageContent from 'modules/layout/components/PageContent';
import { Link } from 'react-router-dom';
import {
  CenterFlexRow,
  BackButton,
  AutomationFormContainer,
  RightDrawerContainer,
  ActionBarButtonsWrapper
} from 'modules/automations/styles';
import ChartForm from 'modules/dashboards/components/forms/ChartForm';
import { Title } from 'modules/dashboards/styles';

// import { IAction, ITrigger } from 'modules/automations/types';
// import Toggle from 'modules/common/components/Toggle';

// const plumb: any = jsPlumb;
// let instance;

// type Props = {
//   save: (params: any) => void;
//   saveLoading: boolean;
//   id: string;
//   history: any;
//   queryParams: any;
// };

type State = {
  // name: string;
  currentTab: string;
  activeId: string;
  showDrawer: boolean;
  // showTrigger: boolean;
  // triggers: ITrigger[];
  // activeTrigger: ITrigger;
};

class DashboardForm extends React.Component<{}, State> {
  // private wrapperRef;
  // private setZoom;

  constructor(props) {
    super(props);

    this.state = {
      // triggers: JSON.parse(JSON.stringify(automation.triggers || [])),
      // activeTrigger: {} as ITrigger,
      // name: automation.name,
      activeId: '',
      currentTab: 'triggers',
      // isActionTab: true,
      // showNoteForm: false,
      // showTemplateForm: false,
      // showTrigger: false,
      showDrawer: false
      // showAction: false,
      // isZoomable: false,
      // zoomStep: 0.025,
      // zoom: 1,
      // percentage: 100,
      // activeAction: {} as IAction,
    };
  }

  toggleDrawer = (type: string) => {
    this.setState({ showDrawer: !this.state.showDrawer, currentTab: type });
  };

  // onClickTrigger = (trigger: ITrigger) => {
  // const config = trigger && trigger.config;
  // const selectedContentId = config && config.contentId;

  // this.setState({
  // showTrigger: true,
  // showDrawer: true,
  // showAction: false,
  // currentTab: 'triggers',
  // selectedContentId,
  // activeTrigger: trigger ? trigger : ({} as ITrigger)
  //   });
  // };

  // onClickAction = (action: IAction) => {
  //   this.setState({
  //     // showAction: true,
  //     showDrawer: true,
  //     // showTrigger: false,
  //     // activeAction: action ? action : ({} as IAction)
  //   });
  // };

  // addTrigger = (data: ITrigger, triggerId?: string, config?: any) => {
  //   const { triggers, activeTrigger } = this.state;

  //   let trigger: any = {
  //     ...data,
  //     id: this.getNewId(triggers.map(t => t.id))
  //   };
  //   const triggerIndex = triggers.findIndex(t => t.id === triggerId);

  //   if (triggerId && activeTrigger.id === triggerId) {
  //     trigger = activeTrigger;
  //   }

  //   trigger.config = { ...trigger.config, ...config };

  //   if (triggerIndex !== -1) {
  //     triggers[triggerIndex] = trigger;
  //   } else {
  //     triggers.push(trigger);
  //   }

  //   this.setState({ triggers, activeTrigger: trigger }, () => {
  //     if (!triggerId) {
  //       this.renderControl('trigger', trigger, this.onClickTrigger);
  //     }
  //   });
  // };

  // renderControl = (key: string, item: ITrigger | IAction, onClick: any) => {
  //   const idElm = `${key}-${item.id}`;

  //   jquery('#canvas').append(`
  //     <div class="${key} control" id="${idElm}" style="${item.style}">
  //       <div class="trigger-header">
  //         <div class='custom-menu'>
  //           <div>
  //             <i class="icon-notes add-note" title=${__('Write Note')}></i>
  //             <i class="icon-trash-alt delete-control" id="${idElm}" title=${__(
  //     'Delete control'
  //   )}></i>
  //           </div>
  //         </div>
  //         <div>
  //           <i class="icon-${item.icon}"></i>
  //           ${item.label} ${this.renderCount(item)}
  //         </div>
  //       </div>
  //       <p>${item.description}</p>
  //       ${this.renderNotes(idElm)}

  //     </div>
  //   `);

  //   jquery('#canvas').on('dblclick', `#${idElm}`, event => {
  //     event.preventDefault();

  //     onClick(item);
  //   });

  //   jquery('#canvas').on('click', `.note-badge-${idElm}`, event => {
  //     event.preventDefault();

  //     this.onClickNote(event.currentTarget.id);
  //   });

  //   if (key === 'trigger') {
  //     instance.addEndpoint(idElm, sourceEndpoint, {
  //       anchor: [1, 0.5]
  //     });

  //     if (instance.getSelector(`#${idElm}`).length > 0) {
  //       instance.draggable(instance.getSelector(`#${idElm}`));
  //     }
  //   }

  //   if (key === 'action') {
  //     if (item.type === 'if') {
  //       instance.addEndpoint(idElm, targetEndpoint, {
  //         anchor: ['Left']
  //       });

  //       instance.addEndpoint(idElm, yesEndPoint);
  //       instance.addEndpoint(idElm, noEndPoint);
  //     } else {
  //       instance.addEndpoint(idElm, targetEndpoint, {
  //         anchor: ['Left']
  //       });

  //       instance.addEndpoint(idElm, sourceEndpoint, {
  //         anchor: ['Right']
  //       });
  //     }

  //     instance.draggable(instance.getSelector(`#${idElm}`));
  //   }
  // };

  renderLeftActionBar() {
    // const { name } = this.state;

    return (
      <CenterFlexRow>
        <Link to={`/reports`}>
          <BackButton>
            <Icon icon="angle-left" size={20} />
          </BackButton>
        </Link>
        <Title>
          <FormControl
            name="name"
            // value={name}
            required={true}
            autoFocus={true}
          />
          <Icon icon="edit-alt" size={16} />
        </Title>
      </CenterFlexRow>
    );
  }

  rendeRightActionBar() {
    // const { isActive } = this.state;

    return (
      <BarItems>
        <ActionBarButtonsWrapper>
          {
            <Button
              btnStyle="primary"
              size="small"
              icon={'check-circle'}
              onClick={this.toggleDrawer.bind(this, 'triggers')}
            >
              Create a chart
            </Button>
          }
        </ActionBarButtonsWrapper>
      </BarItems>
    );
  }
  renderTabContent() {
    return <ChartForm />;
  }

  render() {
    return (
      <>
        <HeightedWrapper>
          <AutomationFormContainer>
            <Wrapper.Header
              title={'Reports'}
              breadcrumb={[{ title: __('Reports'), link: '/reports' }]}
            />
            <PageContent
              actionBar={
                <Wrapper.ActionBar
                  left={this.renderLeftActionBar()}
                  right={this.rendeRightActionBar()}
                />
              }
              transparent={false}
            ></PageContent>
          </AutomationFormContainer>

          <RTG.CSSTransition
            in={this.state.showDrawer}
            timeout={300}
            classNames="slide-in-right"
            unmountOnExit={true}
          >
            <RightDrawerContainer>
              {this.renderTabContent()}
            </RightDrawerContainer>
          </RTG.CSSTransition>
        </HeightedWrapper>
      </>
    );
  }
}

export default DashboardForm;

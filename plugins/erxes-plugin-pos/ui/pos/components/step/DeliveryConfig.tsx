import React from 'react';
import Select from 'react-select-plus';
import {
  __,
  BoardSelectContainer,
  ControlLabel,
  FormGroup,
  SelectTeamMembers
} from 'erxes-ui';
import {
  Block,
  BlockRow,
  FlexColumn,
  FlexItem
} from '../../../styles';
import { FieldsCombinedByType } from 'erxes-ui/lib/properties/types';
import { IPos } from '../../../types';
import { LeftItem } from 'erxes-ui/lib/components/step/styles';

type Props = {
  onChange: (name: "deliveryConfig", value: any) => void;
  pos?: IPos;
  fieldsCombined: FieldsCombinedByType[];
};

class DeliveryConfig extends React.Component<Props, { config: any }> {
  constructor(props: Props) {
    super(props);

    const config = props.pos && props.pos.deliveryConfig ? props.pos.deliveryConfig : {
      boardId: '',
      pipelineId: '',
      stageId: '',
      watchedUserIds: [],
      assignedUserIds: [],
    }

    this.state = {
      config
    };
  }

  onChangeConfig = (code: string, value) => {
    const { config } = this.state;
    config[code] = value;

    this.setState({ config }, () => {
      this.props.onChange('deliveryConfig', config);
    });
  };

  selectConfigOptions = (array: string[] = [], CONSTANT: any) => {
    return array.map(item => ({
      value: item,
      label: CONSTANT.find(el => el.value === item).label
    }));
  }


  render() {
    const { fieldsCombined } = this.props;
    const { config } = this.state;

    const onChangeBoard = (boardId: string) => {
      this.onChangeConfig('boardId', boardId);
    };

    const onChangePipeline = (pipelineId: string) => {
      this.onChangeConfig('pipelineId', pipelineId);
    };

    const onChangeStage = (stageId: string) => {
      this.onChangeConfig('stageId', stageId);
    };

    const onWatchedUsersSelect = (users) => {
      this.onChangeConfig('watchedUserIds', users);
    };

    const onAssignedUsersSelect = (users) => {
      this.onChangeConfig('assignedUserIds', users);
    };

    const onMapCustomFieldChange = (option) => {
      const value = !option ? '' : option.value.toString();
      this.onChangeConfig('mapCustomField', value)

    }

    return (
      <FlexItem>
        <FlexColumn>
          <LeftItem>
            <Block>
              <h4>{__("Stage")}</h4>
              <BlockRow>
                <BoardSelectContainer
                  type='deal'
                  autoSelectStage={false}
                  boardId={config.boardId}
                  pipelineId={config.pipelineId}
                  stageId={config.stageId}
                  onChangeBoard={onChangeBoard}
                  onChangePipeline={onChangePipeline}
                  onChangeStage={onChangeStage}

                />
              </BlockRow>
              <BlockRow>
                <FormGroup>
                  <ControlLabel>{__('Choose map field')}</ControlLabel>
                  <Select
                    name="mapCustomField"
                    value={config.mapCustomField}
                    onChange={onMapCustomFieldChange}
                    options={fieldsCombined.map(f => ({
                      value: f.name,
                      label: f.label
                    }))}
                  />
                </FormGroup>

              </BlockRow>
            </Block>

            <Block>
              <h4>{__("Deal users")}</h4>
              <BlockRow>
                <FormGroup>
                  <ControlLabel>{__('Watched Users')}</ControlLabel>
                  <SelectTeamMembers
                    label={__("Choose team member")}
                    name="watchedUserIds"
                    initialValue={config.watchedUserIds}
                    onSelect={onWatchedUsersSelect}
                  />
                </FormGroup>
              </BlockRow>
              <BlockRow>
                <FormGroup>
                  <ControlLabel>{__('Assigned Users')}</ControlLabel>
                  <SelectTeamMembers
                    label={__("Choose team member")}
                    name="assignedUserIds"
                    initialValue={config.assignedUserIds}
                    onSelect={onAssignedUsersSelect}
                  />
                </FormGroup>

              </BlockRow>
            </Block>
          </LeftItem>
        </FlexColumn>
      </FlexItem>
    )
  }
}

export default DeliveryConfig;
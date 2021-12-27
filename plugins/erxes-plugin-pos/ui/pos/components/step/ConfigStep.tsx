import {
  FormGroup,
  ControlLabel,
  Button,
  Icon,
  Tip,
  ModalTrigger,
  __,
} from "erxes-ui";
import { LeftItem } from "erxes-ui/lib/components/step/styles";
import React from "react";
import { IProductCategory, IProduct } from 'erxes-ui/lib/products/types';

import {
  ActionButtons,
  Description,
  FlexColumn,
  FlexItem,
  Block,
  BlockRow,
} from "../../../styles";
import { IPos, IProductGroup, CatProd } from "../../../types";
import GroupForm from "../../components/productGroup/GroupForm";

type Props = {
  onChange: (name: "pos" | "description" | "groups", value: any) => void;
  pos?: IPos;
  groups: IProductGroup[];
  catProdMappings: CatProd[];
  products: IProduct[];
  productCategories: IProductCategory[];
};

type State = {
  groups: IProductGroup[];
  currentMode: "create" | "update" | undefined;
  mappings: CatProd[];
};

class OptionsStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { groups = [], catProdMappings = [] } = props;

    this.state = {
      groups,
      currentMode: undefined,
      mappings: catProdMappings
    };
  }

  onMappingChange(item: CatProd) {
    const mappings = this.state.mappings.map(m => {
      if (m._id === item._id) {
        m.categoryId = item.categoryId;
        m.productId = item.productId;
      }

      return m;
    });

    this.props.onChange('catProdMappings', mappings);
  }

  onSubmitGroup = (group: IProductGroup) => {
    const { groups } = this.state;

    const index = groups.findIndex((e) => e._id === group._id);

    if (index !== -1) {
      groups[index] = group;
    } else {
      groups.push(group);
    }

    this.props.onChange('groups', groups);
  };

  onSaveMapping(item: CatProd) {
    const { mappings } = this.state;
    const { onChange } = this.props;

    const index = mappings.findIndex(m => m._id === item._id);

    if (index !== -1) {
      mappings[index] = item;
    } else {
      mappings.push(item);
    }

    onChange('catProdMappings', mappings);
  }

  renderGroupFormTrigger(trigger: React.ReactNode, group?: IProductGroup) {
    const { productCategories, products } = this.props;

    const content = (props) => (
      <GroupForm
        {...props}
        group={group}
        onSubmit={this.onSubmitGroup}
        categories={productCategories}
        products={products}
      />
    );

    const title = group ? "Edit group" : "Add group";

    return <ModalTrigger title={title} trigger={trigger} content={content} />;
  }

  renderEditAction(group: IProductGroup) {
    const trigger = (
      <Button btnStyle="link" style={{ float: "right" }}>
        <Tip text={__("Edit")} placement="bottom">
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    return this.renderGroupFormTrigger(trigger, group);
  }

  renderRemoveAction(group: IProductGroup) {
    const remove = () => {
      let { groups } = this.state;

      groups = groups.filter((e) => e._id !== group._id);

      this.setState({ groups });
      this.props.onChange("groups", groups);
    };

    return (
      <Button btnStyle="link" onClick={remove} style={{ float: "right" }}>
        <Tip text={__("Remove")} placement="bottom">
          <Icon icon="cancel-1" />
        </Tip>
      </Button>
    );
  }

  renderGroup(group: IProductGroup) {
    return (
      <FormGroup key={group._id}>
        <BlockRow>
          <ControlLabel>
            {group.name}
            <Description>{group.description}</Description>
          </ControlLabel>
          <ActionButtons>
            {this.renderEditAction(group)}
            {this.renderRemoveAction(group)}
          </ActionButtons>
        </BlockRow>
      </FormGroup>
    );
  }

  render() {
    const { groups } = this.props;

    const groupTrigger = (
      <Button btnStyle="primary" icon="plus-circle">
        Add group
      </Button>
    );

    return (
      <FlexItem>
        <FlexColumn>
          <LeftItem>
            <Block>
              <h4>{__("Product Groups")}</h4>
              <FormGroup>
                {groups.map((group) => this.renderGroup(group))}
              </FormGroup>

              {this.renderGroupFormTrigger(groupTrigger)}
            </Block>
            <Block>
              <h4>{__("Product & category mappings")}</h4>
              <Description>
                Map a product to category. When a product within that category is sold in pos system
                with "take" option, then the mapped product will be added to the price.
              </Description>
              <FormGroup>
                {/* {this.state.mappings.map(item => this.renderMapping(item))} */}
              </FormGroup>  
            </Block>
          </LeftItem>
        </FlexColumn>
      </FlexItem>
    );
  }
}

export default OptionsStep;

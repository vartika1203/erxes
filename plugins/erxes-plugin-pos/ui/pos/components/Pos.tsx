import {
  ControlWrapper,
  Indicator,
  StepWrapper
} from 'erxes-ui/lib/components/step/styles';
import {
  Step,
  Steps,
  Button,
  Alert,
  __,
  Wrapper,
  ButtonMutate
} from 'erxes-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProductCategory, IProduct } from 'erxes-ui/lib/products/types';

import { IIntegration, IPos, IProductGroup } from '../../types';
import { LeftContent, Content } from '../../styles';
import ConfigStep from './step/ConfigStep';
import GeneralStep from './step/GeneralStep';
import { PLUGIN_URL } from '../../constants';
import Appearance, { IUIOptions } from './step/Appearance';
import EbarimtConfig from './step/EbarimtConfig';

type Props = {
  integration?: IIntegration;
  pos?: IPos;
  loading?: boolean;
  isActionLoading: boolean;
  groups: IProductGroup[];
  formIntegrations: IIntegration[];
  save: (params: any) => void;
  productCategories: IProductCategory[];
  products: IProduct[];
  branches: any[];
};

type State = {
  brand?: string;
  name?: string;
  description?: string;
  pos?: IPos;
  groups: IProductGroup[];
  currentMode?: 'create' | 'update' | undefined;
  logoPreviewStyle?: any;
  logoPreviewUrl?: string;
  uiOptions: IUIOptions;
  carousel: string;
  formData?: any;
  isSkip: boolean;
  ebarimtConfig: any;
};

class Pos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const integration = props.integration || ({} as IIntegration);
    const pos = props.pos || ({} as IPos);

    const uiOptions = pos.uiOptions || {
      colors: {
        bodyColor: '#FFFFFF',
        headerColor: '#6569DF',
        footerColor: '#3CCC38'
      },
      logo: '/images/erxes.png',
      bgImage: '',
      favIcon: '/images/erxes.png',
      receiptIcon: '/images/erxes.png'
    };

    this.state = {
      brand: integration.brandId,
      pos,
      carousel: 'pos',
      groups: props.groups || [],
      uiOptions,
      isSkip: false,
      ebarimtConfig: pos.ebarimtConfig,
    };
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { brand, pos, groups, uiOptions, ebarimtConfig } = this.state;

    if (!pos.name) {
      return Alert.error('Enter POS name');
    }

    if (!brand) {
      return Alert.error('Choose a Brand');
    }

    if (!pos.adminIds || !pos.adminIds.length) {
      return Alert.error('Choose admin users');
    }

    if (!pos.cashierIds || !pos.cashierIds.length) {
      return Alert.error('Choose cashier users');
    }

    const cleanMappings = (pos.catProdMappings || []).map(
      m => ({ _id: m._id, categoryId: m.categoryId, productId: m.productId })
    );

    const doc = {
      name: pos.name,
      brandId: brand,
      description: pos.description,
      productDetails: pos.productDetails || [],
      groups,
      adminIds: pos.adminIds,
      cashierIds: pos.cashierIds,
      kioskMachine: pos.kioskMachine,
      waitingScreen: pos.waitingScreen,
      kitchenScreen: pos.kitchenScreen,
      formSectionTitle: pos.formSectionTitle,
      formIntegrationIds: pos.formIntegrationIds,
      uiOptions,
      ebarimtConfig,
      catProdMappings: cleanMappings,
      isOnline: pos.isOnline,
      branchId: pos.branchId,
      allowBranches: pos.allowBranches
    };

    this.props.save(doc);
  };

  onChange = (key: string, value: any) => {
    this.setState({ [key]: value } as any);
  };

  onChangeAppearance = (key: string, value: any) => {
    let uiOptions = this.state.uiOptions || {};
    const { pos } = this.state || {};
    uiOptions[key] = value;

    if (uiOptions[key]) {
      uiOptions[key] = value;
    } else {
      uiOptions = { [key]: value };
    }

    if (pos.uiOptions) {
      pos.uiOptions = uiOptions;
    }

    this.setState({ pos });
  };

  onFormDocChange = formData => {
    this.setState({ formData });
  };

  onStepClick = currentStepNumber => {
    const { isSkip } = this.state;

    let carousel = 'form';
    switch (currentStepNumber) {
      case 1:
        carousel = isSkip ? 'form' : 'callout';
        break;
      case 2:
        carousel = isSkip ? 'form' : 'callout';
        break;
      case 7:
        carousel = 'success';
        break;
      default:
        break;
    }

    return this.setState({ carousel });
  };

  renderButtons = () => {
    const { isActionLoading } = this.props;

    const SmallLoader = ButtonMutate.SmallLoader;

    const cancelButton = (
      <Link to={`${PLUGIN_URL}/pos`}>
        <Button btnStyle="simple" icon="times-circle">
          Cancel
        </Button>
      </Link>
    );

    return (
      <Button.Group>
        {cancelButton}

        <Button
          disabled={isActionLoading}
          btnStyle="success"
          icon={isActionLoading ? undefined : 'check-circle'}
          onClick={this.handleSubmit}
        >
          {isActionLoading && <SmallLoader />}
          Save
        </Button>
      </Button.Group>
    );
  };

  render() {
    const { pos, groups, currentMode, uiOptions } = this.state;
    const { integration, formIntegrations, productCategories, products, branches } = this.props;
    const brand = integration && integration.brand;
    const breadcrumb = [
      { title: 'POS List', link: `${PLUGIN_URL}/pos` },
      { title: 'POS' }
    ];

    const name = pos.name || '';
    const logoPreviewUrl = uiOptions.logo;

    return (
      <StepWrapper>
        <Wrapper.Header title={__('Pos')} breadcrumb={breadcrumb} />
        <Content>
          <LeftContent>
            <Steps>
              <Step
                img="/images/icons/erxes-12.svg"
                title={`General`}
                onClick={this.onStepClick}
              >
                <GeneralStep
                  onChange={this.onChange}
                  pos={pos}
                  brand={brand}
                  currentMode={currentMode}
                  formIntegrations={formIntegrations}
                  branches={branches}
                />
              </Step>
              <Step
                img="/images/icons/erxes-10.svg"
                title={`Product & Service`}
                onClick={this.onStepClick}
              >
                <ConfigStep
                  onChange={this.onChange}
                  pos={pos}
                  groups={groups}
                  catProdMappings={pos.catProdMappings}
                  productCategories={productCategories}
                  products={products}
                />
              </Step>
              <Step
                img="/images/icons/erxes-04.svg"
                title={'Appearance'}
                onClick={this.onStepClick}
                noButton={true}
              >
                <Appearance
                  onChange={this.onChange}
                  uiOptions={uiOptions}
                  logoPreviewUrl={logoPreviewUrl}
                />
              </Step>
              <Step
                img="/images/icons/erxes-05.svg"
                title={'ebarimt Config'}
                onClick={this.onStepClick}
                noButton={true}
              >
                <EbarimtConfig
                  onChange={this.onChange}
                  pos={pos}
                />
              </Step>
            </Steps>
            <ControlWrapper>
              <Indicator>
                {__('You are')} {integration ? 'editing' : 'creating'}{' '}
                <strong>{name}</strong> {__('pos')}
              </Indicator>
              {this.renderButtons()}
            </ControlWrapper>
          </LeftContent>
        </Content>
      </StepWrapper>
    );
  } // end render()
}

export default Pos;

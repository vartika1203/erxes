import { FormControl, getEnv } from 'erxes-ui';
import FormGroup from 'modules/common/components/form/Group';
import ControlLabel from 'modules/common/components/form/Label';
import { LeftItem } from 'modules/common/components/step/styles';
import {
  IGolomtConfig,
  IQPayConfig,
  ISocialPayConfig
} from 'modules/leads/types';
import React from 'react';
import { FlexItem } from './style';

type Props = {
  paymentConfig?: ISocialPayConfig | IQPayConfig | IGolomtConfig;
  onChange: (name: string, value: any) => void;
};

class PaymentOptionStep extends React.Component<Props> {
  onChangeType = e => {
    const { REACT_APP_API_URL } = getEnv();
    const paymentConfig: any = { type: 'none' };

    const value = e.currentTarget.value;
    paymentConfig.type = value;

    if (value === 'golomtEcommerce') {
      paymentConfig.redirectUrl = `${REACT_APP_API_URL}/golomt/e-commerce`;
    }

    if (value === 'socialPay') {
      paymentConfig.pushNotification = `${REACT_APP_API_URL}/socialpay/notification`;
    }

    this.props.onChange('paymentConfig', paymentConfig);
  };

  onChangeConfig = (code: string, e) => {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };

    paymentConfig[code] = e.target.value;

    this.props.onChange('paymentConfig', paymentConfig);
  };

  renderItem = (
    key: string,
    title: string,
    description?: string,
    disabled?: boolean
  ) => {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };
    const value = paymentConfig[key] || '';

    return (
      <FormGroup>
        <ControlLabel>{title}</ControlLabel>
        {description && <p>{description}</p>}
        <FormControl
          defaultValue={value}
          onChange={this.onChangeConfig.bind(this, key)}
          value={value}
          disabled={disabled}
        />
      </FormGroup>
    );
  };

  renderGolomtEcommerce() {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };
    if (paymentConfig.type !== 'golomtEcommerce') {
      return null;
    }

    return (
      <>
        {this.renderItem('checksumKey', 'Голомт E-Commerce checksum key')}
        {this.renderItem('token', 'Голомт E-Commerce token')}
        {this.renderItem('redirectUrl', 'Голомт E-Commerce redirect', '', true)}
      </>
    );
  }

  renderSocialPay() {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };

    if (paymentConfig.type !== 'socialPay') {
      return null;
    }

    return (
      <>
        {this.renderItem('terminal', 'Terminal')}
        {this.renderItem('key', 'Key')}
        {this.renderItem(
          'pushNotification',
          'Push notification',
          'Register following url on Golomt bank',
          true
        )}
      </>
    );
  }

  renderQpay() {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };

    if (paymentConfig.type !== 'qPay') {
      return null;
    }

    return (
      <>
        {this.renderItem('merchantUser', 'Username')}
        {this.renderItem('merchantPassword', 'Password')}
        {this.renderItem('invoiceCode', 'Invoice code')}
        {this.renderItem('qPayUrl', 'Qpay url')}
        {this.renderItem('callbackUrl', 'Call back url with /payments')}
      </>
    );
  }

  render() {
    const paymentConfig = this.props.paymentConfig || { type: 'none' };
    return (
      <FlexItem>
        <LeftItem>
          <FormGroup>
            <ControlLabel htmlFor="paymentOptions">Options:</ControlLabel>
            <FormControl
              id="paymentOptions "
              componentClass="select"
              value={paymentConfig.type}
              onChange={this.onChangeType}
            >
              <option value={'none'}>None</option>
              <option value={'golomtEcommerce'}>Golomt E-Commerce</option>
              <option value={'socialPay'}>Social Pay</option>
            </FormControl>
          </FormGroup>
          {this.renderGolomtEcommerce()}
          {this.renderSocialPay()}
          {this.renderQpay()}
        </LeftItem>
      </FlexItem>
    );
  }
}

export default PaymentOptionStep;

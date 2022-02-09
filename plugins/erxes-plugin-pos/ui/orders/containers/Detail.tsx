import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import Detail from '../components/Detail';
import React from 'react';
import { graphql } from 'react-apollo';
import { IOrder } from '../types';
import { ProductsQueryResponse } from 'erxes-ui/lib/products/types';
import { queries } from 'erxes-ui/lib/products/graphql';
import { Spinner, withProps } from 'erxes-ui';

type Props = {
  order: IOrder
};

type FinalProps = {
  productsQuery: ProductsQueryResponse;
} & Props;

class OrdersDetailContainer extends React.Component<FinalProps> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      productsQuery
    } = this.props;

    if (productsQuery.loading) {
      return <Spinner />
    }

    const products = productsQuery.products;
    const productById = {};
    for (const product of products) {
      productById[product._id] = product;
    }

    const updatedProps = {
      ...this.props,
      productById
    };

    return <Detail {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, ProductsQueryResponse, { ids: string[] }>(
      gql(queries.products),
      {
        name: 'productsQuery',
        options: ({ order }) => ({
          variables: {
            ids: order.items.map(i => i.productId)
          },
          fetchPolicy: 'network-only'
        })
      }
    ),
  )(OrdersDetailContainer)
);
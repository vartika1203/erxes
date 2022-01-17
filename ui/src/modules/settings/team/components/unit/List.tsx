import React, { useState } from 'react';
import BlockList from '../common/BlockList';
import Form from '../../containers/unit/Form';
import Item from '../../containers/unit/Item';

type Props = {
  listQuery: any;
};

export default function List({ listQuery }: Props) {
  const [clicked, setClicked] = useState('');
  const allUnits = listQuery.data.units || [];
  const clickParent = clickedId => {
    setClicked(clickedId);
  };
  const renderForm = ({ closeModal }) => {
    return <Form closeModal={closeModal} />;
  };

  const renderItems = () => {
    return allUnits.map(unit => (
      <Item
        key={unit._id}
        unit={unit}
        refetch={listQuery.refetch}
        clickParent={clickParent}
        clicked={clicked}
      />
    ));
  };

  return (
    <BlockList
      allDatas={allUnits}
      renderForm={renderForm}
      renderItems={renderItems()}
      title="Unit"
    />
  );
}

import React, { useState } from 'react';

import Form from '../../containers/department/Form';
import Item from '../../containers/department/Item';
import BlockList from '../common/BlockList';
import { generateTree } from '../../utils';

type Props = {
  listQuery: any;
};

export default function List({ listQuery }: Props) {
  const [clicked, setClicked] = useState('');
  const allDepartments = listQuery.data.departments || [];

  const renderForm = ({ closeModal }) => {
    return <Form closeModal={closeModal} />;
  };

  const clickParent = clickedId => {
    setClicked(clickedId);
  };
  const renderChildren = (parentId?) => {
    return generateTree(
      allDepartments,
      parentId,
      (node, level) => {
        return (
          (clicked === node.parentId || node.parentId === null) && (
            <Item
              key={node._id}
              level={level}
              department={node}
              refetch={listQuery.refetch}
              clickParent={clickParent}
              clicked={clicked}
            />
          )
        );
      },
      -1
    );
  };

  return (
    <BlockList
      allDatas={allDepartments}
      renderForm={renderForm}
      renderItems={renderChildren(null)}
      title="Department"
    />
  );
}

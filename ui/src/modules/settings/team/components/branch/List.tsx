import React, { useState } from 'react';

import Form from '../../containers/branch/Form';
import Item from '../../containers/branch/Item';
import { generateTree } from '../../utils';
import BlockList from '../common/BlockList';

type Props = {
  listQuery: any;
};

export default function List({ listQuery }: Props) {
  const [clicked, setClicked] = useState('');
  const allBranches = listQuery.data.branches || [];
  const clickParent = clickedId => {
    setClicked(clickedId);
  };

  const renderChildren = parentId => {
    return generateTree(
      allBranches,
      parentId,
      (node, level) =>
        (clicked === node.parentId || node.parentId === null) && (
          <Item
            key={node._id}
            branch={node}
            level={level}
            refetch={listQuery.refetch}
            clickParent={clickParent}
            clicked={clicked}
          />
        )
    );
  };

  const renderForm = ({ closeModal }) => {
    return <Form closeModal={closeModal} />;
  };
  return (
    <BlockList
      allDatas={allBranches}
      renderForm={renderForm}
      renderItems={renderChildren(null)}
      title="Branch"
    />
  );
}

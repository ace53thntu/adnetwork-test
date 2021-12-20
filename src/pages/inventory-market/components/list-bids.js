import React from 'react';

const ListBids = ({listBids = []}) => {
  return (
    <div>
      {listBids?.map((item, idx) => {
        return <div key={`pr-${item?.id}`}>test</div>;
      })}
    </div>
  );
};

export default ListBids;

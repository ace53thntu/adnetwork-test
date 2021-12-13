/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules

//---> Internal Modules
import {InventoryList} from './inventory-list';

const InventoryContainer = ({page}) => {
  return <InventoryList page={page} />;
};

export default React.memo(InventoryContainer);

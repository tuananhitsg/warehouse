import React, { useState } from "react";
import WareHouseDiagram from "./shelf/Warehouse";
import IndexWareHouse from "./Index";

const IndexRouteWarehouse = () => {
  const [tab, setTab] = useState(0);
  return (
    <React.Fragment>
      {tab === 0 ? (
        <WareHouseDiagram setTab={setTab} />
      ) : (
        <IndexWareHouse setTab={setTab} />
      )}
    </React.Fragment>
  );
};

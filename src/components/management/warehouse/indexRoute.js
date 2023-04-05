import React, { useState } from "react";
import WareHouseDiagram from "./Warehouse";
import IndexWareHouse from "./Index";

const IndexRouteWarehouse = () => {
  const [tab, setTab] = useState(0);
  return (
    <React.Fragment>
      {tab === 0 ? (
        <IndexWareHouse setTab={setTab} />
      ) : (
        <WareHouseDiagram setTab={setTab} />
      )}
    </React.Fragment>
  );
};

export default IndexRouteWarehouse;

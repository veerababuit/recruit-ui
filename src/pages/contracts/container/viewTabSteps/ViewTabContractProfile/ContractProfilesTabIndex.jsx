import React, { useState } from "react";
import ContractProfileTabMode from "./ContractProfilesTabMode";

const ContractProfilesTabIndex = () => {
  const [active, setActive] = useState("all")
  return (
    <>
      {(active === 'all' || active === 'ContractProfileTabMode') &&
        <ContractProfileTabMode setActive={setActive} active={active} />}
    </>
  )
};

export default ContractProfilesTabIndex;
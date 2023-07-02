import React, { useState } from "react";

import EventOrganiser from "./components/EventOrganiser";
import Navbar from "./components/Navbar";
const EventOrg = () => {
  return (
    <>
      <Navbar />
     <EventOrganiser />
    </>
  );
};

export default EventOrg;

import { Notification } from "@mantine/core";
import React from "react";

const Notify = ({ notify, title, children }) => {
  return (
    <div
      style={{
        display: notify ? "flex" : "none",
        right: "2%",
        bottom: "14%",
        height: "4rem",
        zIndex: "2022",
        width: "19.2rem",
        position: "fixed",
      }}
    >
      <Notification
        color="teal"
        title={title}
        style={{ width: "100%", height: "100%" }}
        disallowClose
      >
        {children}
      </Notification>
    </div>
  );
};

export default Notify;

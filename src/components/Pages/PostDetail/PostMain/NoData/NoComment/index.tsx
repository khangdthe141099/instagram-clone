import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

function NoComment() {
  return (
    <div className="no-comment">
      <Text className="title">No comments yet.</Text>
      <Text className="detail">Start the conversation.</Text>
    </div>
  );
}

export default NoComment;

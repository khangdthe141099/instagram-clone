import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

function NoLike() {
  return (
    <div className="no-like">
      <Text style={{fontWeight: 400 }}>
        Be the first to <span style={{fontWeight: 500 }}>like this</span>
      </Text>
    </div>
  );
}

export default NoLike;

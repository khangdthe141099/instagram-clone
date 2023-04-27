import React from "react";
import { Typography } from "antd";

interface IName {
  name?: string;
  fontSize?: any;
  lineHeight?: any;
  fontWeight?: any;
  fontFamily?: any;
  style?: any;
  isVerified?: boolean;
}

const { Text } = Typography;

function Name({
  name,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  style,
  isVerified,
}: IName) {
  const tagnameStyle = {
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily,
  };

  return (
    <div style={style} className="namecontainer">
      <Text style={tagnameStyle}>{name}</Text>
      {isVerified && <div className="verified-icon"></div>}
    </div>
  );
}

export default Name;

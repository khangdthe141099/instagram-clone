import React from "react";
import Image from "next/image";
import { Typography } from "antd";

const { Text } = Typography;

interface INormalButton {
  width?: number;
  height?: number;
  color?: string | any;
  type?: "text" | "icon";
  text?: string;
  suffix?: boolean;
  suffixWidth?: number;
  suffixHeight?: number;
  srcIcon?: string;
}

function NormalButton({
  color,
  height = 32,
  suffix = false,
  type,
  width = 32,
  text,
  suffixHeight,
  suffixWidth,
  srcIcon = "",
}: INormalButton) {
  return (
    <button style={{ width, height }} className="normal-button">
      <Text>{text}</Text>
      {suffix && (
        <Image
          width={suffixWidth || 12}
          height={suffixHeight || 12}
          src={srcIcon}
          alt="suffix icon"
        />
      )}
    </button>
  );
}

export default NormalButton;

import React from "react";
import { Box } from "@adminjs/design-system";
import { BasePropertyProps } from "adminjs";

const Show: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;

  if (!record) return null;
  const srcImg = record.params["source"];
  return <Box>{srcImg ? <img src={srcImg} width="100px" /> : "No image"}</Box>;
};

export default Show;

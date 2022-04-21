import React from "react";
import { Box } from "@adminjs/design-system";
import { BasePropertyProps } from "adminjs";

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record, property } = props;
  console.log("RECORD: ", record?.params);

  const images: [] = record?.params.images;

  return (
    <Box>
      {/* loop through items in image */}
      {/* <img src={images.0} width="100px" /> */}
      Images
      <br />
    </Box>
  );
};

export default Edit;

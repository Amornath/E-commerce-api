import React from "react";
import {
  Label,
  Box,
  DropZone,
  DropZoneProps,
  DropZoneItem,
} from "@adminjs/design-system";

import { BasePropertyProps } from "adminjs";

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props;

  if (!record || !onChange) return null;
  const handleDropZoneChange: DropZoneProps["onChange"] = (files) => {
     onChange(property.name, files[0]);
  };

  const uploadedImage = record.params.source;
  const imageToUpload = record.params[property.name];

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {uploadedImage && !imageToUpload && <DropZoneItem src={uploadedImage} />}
    </Box>
  );
};

export default Edit;

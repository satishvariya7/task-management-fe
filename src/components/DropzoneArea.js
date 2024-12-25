import { Grid2 } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";

const DropzoneArea = ({ handleOnchange, imgSrc, note }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [], // Accept only images
    },
    onDrop: (acceptedFiles) => {
      handleOnchange({ target: { name: "image", files: acceptedFiles } });
    },
  });

  return (
    <section>
      <Grid2
        container
        spacing={1}
        {...getRootProps({ className: "dropzone dropzone-root" })}
      >
        <Grid2 size={{ md: 9, sm:8, xs: 12 }}>
          <input name="image" {...getInputProps()} />
          <span className="drag-drop">{note}</span>
        </Grid2>
        <Grid2 size={{ md: 3, sm: 4, xs: 12 }}>
          {imgSrc !== "" && (
            <img
              crossOrigin="anonymous"
              src={imgSrc}
              className="user-profile-picture"
              alt="profile-picture"
              aria-label={true}
            />
          )}
        </Grid2>
      </Grid2>
    </section>
  );
};

export default DropzoneArea;

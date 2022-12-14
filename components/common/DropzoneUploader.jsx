import React from "react";
import Image from "next/image";
import { Box, Typography, Button, styled } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useAppTheme, useTranslation, useMediaBreakpoints } from "../../hooks";
import { ArrayErrorStack } from ".";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

const DropzoneUploader = ({
  name,
  icon: Icon,
  file,
  setFile,
  height = 200,
}) => {
  const theme = useAppTheme();
  const t = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const onDrop = React.useCallback((acceptedFiles) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: imageTypes,
  });

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.palette.gray.main,
    borderStyle: "dashed",
    backgroundColor: theme.palette.secondary.main,
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
    minHeight: height,
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#A4A4A4",
    },
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return <ArrayErrorStack key={file.path} errors={errors} />;
  });

  // clean up
  // React.useEffect(
  //   () => () => {
  //     URL.revokeObjectURL((file as any)?.preview);
  //   },
  //   [file]
  // );

  const handleRemove = () => {
    () => () => {
      URL.revokeObjectURL(file?.preview);
    };
    setFile(null);
  };

  return (
    <Box>
      {fileRejectionItems}
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} name={name} />
        {file === null && (
          <Box>
            <Icon />
            {!isMobile && (
              <Box>
                <Typography color="gray.main" mt={2}>
                  {t.drag_and_drop}
                </Typography>
                {t?.or}
              </Box>
            )}
            <Button>{t.browse}</Button>
          </Box>
        )}
        <Box component="aside">
          {file !== null && (
            <Box>
              <img
                src={file?.preview ? file.preview : file}
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      {file != null && (
        <Button sx={{ color: "red" }} onClick={handleRemove} fullWidth>
          {t?.remove}
        </Button>
      )}
    </Box>
  );
};

export default DropzoneUploader;

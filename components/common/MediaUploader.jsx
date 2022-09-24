import React, { useEffect } from "react";
import { Box, Button, Backdrop, Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";

import { useAppTheme, useTranslation, useMediaBreakpoints } from "../../hooks";
import { uploadMediaFile } from "../../services";
import { CircularProgressWithLabel, ArrayErrorStack } from ".";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const videoTypes = [
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/wmv",
  "video/avi",
];
const docTypes = [
  "application/x-abiword",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/rtf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.oasis.opendocument.spreadsheet",
];

const MediaUploader = ({
  fileType = "image",
  fileUrl,
  width = 150,
  height = 150,
  setEntry,
  setUploadedFile,
  setFileName,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState(fileUrl ? fileUrl : null);
  const [progress, setProgress] = React.useState(0);
  const { isMobile } = useMediaBreakpoints();
  const mutation = useMutation(uploadMediaFile, {
    onSuccess: (data) => setEntry(data.data),
    onError: (err) => {
      setIsOpen(true);
      setFile(null);
    },
  });
useEffect(() => {
  setFile(fileUrl)
}, [fileUrl])
  const onUploadProgress = (event) => {
    const progress = (event.loaded / event.total) * 100;
    setProgress(Math.round(progress));
  };

  const onDrop = React.useCallback((acceptedFiles) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
    setFileName && setFileName(acceptedFiles[0].name);
    setUploadedFile &&
      setUploadedFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    mutation.mutate({ file: acceptedFiles[0], onUploadProgress });
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
    maxSize: fileType === "image" ? 5242880 : 104857600,
    accept:
      fileType === "image"
        ? imageTypes
        : fileType === "video"
        ? videoTypes
        : fileType === "doc"
        ? docTypes
        : "",
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
    height: height,
    width: width,
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
  React.useEffect(
    () => () => {
      URL.revokeObjectURL(file?.preview);
    },
    [file]
  );

  return (
    <>
      <Backdrop open={mutation.isLoading}>
        <CircularProgressWithLabel value={progress} />
      </Backdrop>
      <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
        <Alert severity="error">{t?.upload_failed}</Alert>
      </Snackbar>
      {fileRejectionItems}
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {(file === null || fileType === "doc") && (
          <>
            <Button>{t.browse}</Button>
          </>
        )}
        <Box
          component="aside"
          sx={{ position: "relative", width: "100%", height: "100%" }}
        >
          {file !== null &&
            (fileType === "image" ? (
              <img
                src={file?.preview ? file.preview : file}
                alt="image"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
              />
            ) : fileType === "video" ? (
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
              >
                <source src={file?.preview ? file.preview : file} />
              </video>
            ) : null)}
        </Box>
      </Box>
    </>
  );
};

export default MediaUploader;

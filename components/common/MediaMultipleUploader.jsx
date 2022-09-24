import React from "react";
import { Box, Button, Backdrop, Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";

import { useAppTheme, useTranslation, useMediaBreakpoints } from "../../hooks";
import { uploadMediaFiles } from "../../services";
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
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   "application/msword",
  "application/rtf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.oasis.opendocument.spreadsheet",
];

const MediaMultipleUploader = ({
  fileType = "image",
  width = 150,
  height = 150,
  setEntries
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const [fileNames , setFileNames] = React.useState([])
  const { isMobile } = useMediaBreakpoints();
  const mutation = useMutation(uploadMediaFiles, {
    onSuccess: (data) => {
      console.log("fileNames" , fileNames)
      const doc = data?.data?.map((item , index) => {
        return {
          documents:item,
          fileName:fileNames?.[index]
        }
      })
      setEntries(doc)},
    onError: (err) => {
      setIsOpen(true);
      setFiles([]);
    },
  });

  const onUploadProgress = (event) => {
    const progress = (event.loaded / event.total) * 100;
    setProgress(Math.round(progress));
  };

  const onDrop = React.useCallback((acceptedFiles) => {

    console.log("fileName" , acceptedFiles)
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setFileNames(acceptedFiles?.map((item) => item?.name))
    acceptedFiles.map((file) => file.name);
    mutation.mutate({ files: acceptedFiles, onUploadProgress });
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
    maxFiles: 5,
    multiple: true,
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
      files.map((file) => URL.revokeObjectURL(file?.preview));
    },
    [files]
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
        {(files.length > 0 || fileType === "doc") && (
          <>
            <Button>{t.browse}</Button>
          </>
        )}
        <Box component="aside">
          {files.length > 0 &&
            (fileType === "image"
              ? files.map((file, index) => (
                  <img
                    key={index}
                    src={file?.preview ? file.preview : file}
                    alt="image"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                    }}
                  />
                ))
              : fileType === "video"
              ? files.map((file, index) => (
                  <video
                    key={index}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                    }}
                  >
                    <source src={file?.preview ? file.preview : file} />
                  </video>
                ))
              : null)}
        </Box>
      </Box>
    </>
  );
};

export default MediaMultipleUploader;

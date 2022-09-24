import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { Box } from "@mui/material";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RichTextEditor = ({ name, onChange , defaultValue }) => {
  return (
    <Box>
      <SunEditor
        height="320"
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        setOptions={{
          buttonList: [
            // [
            //   "undo",
            //   "redo",
            //   "font",
            //   "fontSize",
            //   "formatBlock",
            //   "bold",
            //   "underline",
            //   "italic",
            //   "fontColor",
            //   "hiliteColor",
            //   "textStyle",
            //   "indent",
            //   "align",
            //   "horizontalRule",
            //   "list",
            //   "lineHeight",
            //   "table",
            //   "link",
            //   "image",
            //   "video",
            //   "fullScreen",
            //   "preview",
            // ],
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            // ['paragraphStyle', 'blockquote'],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video"],
            // You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            ["fullScreen"],
            ["preview"],
            // ['save', 'template'],
            // ['dir', 'dir_ltr', 'dir_rtl'],
            // '/', Line break
          ],
        }}
      />
    </Box>
  );
};

export default RichTextEditor;

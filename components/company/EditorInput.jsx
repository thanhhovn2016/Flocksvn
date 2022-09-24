import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
} from "@mui/material";

import { RichTextEditor } from "../common";
import { ExpandIcon } from "../icons";

const EditorInput = ({
  label,
  isOptional = false,
  isNew = false,
  isRequired = false,
  titleErr,
  detailErr,
  onTitleChange,
  onContentChange,
  defaultValue
}) => {
  return (
    <Grid item md={12} xs={12} mb={3}>
      <Accordion defaultExpanded square variant="standard">
        <AccordionSummary expandIcon={<ExpandIcon />}>
          {isNew ? (
            <TextField
              placeholder={"Title"}
              sx={{ width: "50%" }}
              onChange={onTitleChange}
              error={titleErr && titleErr != ""}
              helperText={titleErr}
              autoFocus
              InputProps={{
                style: {
                  height: "42px",
                },
              }}
            />
          ) : (
            <InputLabel
              required={isRequired}
              sx={{
                backgroundColor: "#EAEAEA",
                width: "105px",
                p: 1,
                borderRadius: "6px",
              }}
            >
              {label}
            </InputLabel>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <RichTextEditor onChange={onContentChange} defaultValue={defaultValue} />
          <FormHelperText error>{detailErr}</FormHelperText>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default EditorInput;

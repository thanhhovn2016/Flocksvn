import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";

import { ExpandIcon } from "../icons";

const FormSection = ({ headerSection, children }) => {
  return (
    <Accordion defaultExpanded square variant="standard">
      <AccordionSummary expandIcon={<ExpandIcon />}>
        {headerSection ? headerSection : ""}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
      <Divider />
    </Accordion>
  );
};

export default FormSection;

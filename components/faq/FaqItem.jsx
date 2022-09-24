import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@mui/material";

import { PlusIcon, MinusIcon } from "../icons";

const FaqItem = ({ id, question, answer }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(id);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedId(panel);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded == expandedId}
      onChange={handleChange(expandedId)}
      disableGutters
      sx={{
        py: 2,
        px: 2,
        borderRadius: "0px",
        ":before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        id={id}
        expandIcon={expanded && expandedId == id ? <MinusIcon /> : <PlusIcon />}
      >
        <Typography color="primary.dark" fontWeight="bold">
          {question}
        </Typography>
        <Divider />
      </AccordionSummary>
      <AccordionDetails>
        <Typography color="secondary.dark">{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqItem;

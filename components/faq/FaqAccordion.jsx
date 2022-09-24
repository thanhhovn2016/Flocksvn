import { Box, Accordion } from "@mui/material";

import { FaqItem } from "./";
import { renderRawHTML } from "../../utils/functions";

const FaqAccordion = ({ questions }) => {
  return (
    <Box
      sx={{
        borderRadius: "0px 20px 20px 0px",
        backgroundColor: "#fff",
      }}
    >
      {questions?.map((question) => (
        <FaqItem
          key={question?.id}
          id={question?.id}
          question={question?.title}
          answer={renderRawHTML(question?.content)}
        />
      ))}
    </Box>
  );
};

export default FaqAccordion;

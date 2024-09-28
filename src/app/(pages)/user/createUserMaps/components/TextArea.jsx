"use client";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { ThemeContext } from "@/context/ThemeContext";

export default function TextArea({ helperHtml, setHelperHtml }) {
  // const [editorHtml, setEditorHtml] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (html) => {
    setHelperHtml(html);
  };

  // console.log(editorHtml);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "0.1rem",
        backgroundColor: "primary.bgHero",
        // margin: "0 2",
        borderRadius: "16px",
        minHeight: "200px",
        // marginTop: "2rem",
        "--txtClr": !darkMode ? "#000" : "#fff",
      }}
    >
      <ReactQuill
        value={helperHtml}
        onChange={handleChange}
        modules={TextArea.modules}
        formats={TextArea.formats}
        style={{ height: "79%" }}
      />
    </Box>
  );
}

TextArea.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

TextArea.formats = [
  "header",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "link",
];

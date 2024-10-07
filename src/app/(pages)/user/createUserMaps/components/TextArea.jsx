'use client';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useContext, useRef } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { ThemeContext } from '@/context/ThemeContext';

export default function TextArea({ helperHtml, setHelperHtml }) {
  const { data: session } = useSession();
  const { darkMode } = useContext(ThemeContext);
  const quillRef = useRef(null);

  const isFree = session?.user?.subscriptionType === 'BASIC';

  const handleChange = (html) => {
    const blockTagsRegex = /<(p|h[1-6]|ol|ul)(\s|>|\/>)/g;
    const blockTagMatches = html.match(blockTagsRegex);

    const lineCount = blockTagMatches ? blockTagMatches.length : 0;

    if (lineCount <= 13) {
      setHelperHtml(html);
    } else {
      const editor = quillRef.current.getEditor();

      editor.setContents(editor.clipboard.convert(helperHtml));
    }
  };

  return (
    <Box
      sx={{
        '--txtClr': !darkMode ? '#000' : '#fff',
        width: '100%',
        padding: '0.1rem',
        backgroundColor: 'primary.bgHero',
        borderRadius: '16px',
        minHeight: '200px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isFree ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: '#5c5c5cea',
            zIndex: 800,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',

            '& .MuiTypography-root': { color: '#fff', textAlign: 'center' },
          }}
        >
          <Typography>
            Please subscribe to one of our plans to add custom text
          </Typography>
        </Box>
      ) : (
        <ReactQuill
          ref={quillRef}
          value={helperHtml}
          onChange={handleChange}
          modules={TextArea.modules}
          formats={TextArea.formats}
          style={{ height: '79%' }}
        />
      )}
    </Box>
  );
}

TextArea.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
};

TextArea.formats = [
  'header',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'link',
];

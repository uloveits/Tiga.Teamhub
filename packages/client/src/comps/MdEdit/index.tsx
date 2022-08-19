/*
 * @Author: your name
 * @Date: 2021-12-15 15:29:51
 * @LastEditTime: 2021-12-16 11:08:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Happy.Points.Client\src\comps\MdEdit\index.tsx
 */

import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import emoji from 'markdown-it-emoji';
import 'react-markdown-editor-lite/lib/index.css';
import { AutoSize } from 'ronds-react-ui';
import './index.less';

interface IMdEditProps {
  value: string;
  onChange: (txt: string) => void;
}

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        // ...
      }
    }
    return '';
  },
}).use(emoji);

const MdEdit = (props: IMdEditProps) => {
  const { value, onChange } = props;

  const onValueChange = (v: any) => {
    onChange && onChange(v.text);
  };
  return (
    <>
      <AutoSize>
        {({ width, height }) => {
          return (
            <MdEditor
              value={value}
              style={{ width: `${width}px`, height: `${height}px` }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={onValueChange}
            />
          );
        }}
      </AutoSize>
    </>
  );
};

export default MdEdit;

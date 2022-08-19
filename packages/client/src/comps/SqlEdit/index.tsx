import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

import './index.less';

interface ISqlEditProps {
  theme?: 'neat' | 'neo' | 'panda-syntax' | 'idea';
  mode?: 'text/javascript' | 'text/x-mysql' | 'application/json';
  isSetValue?: boolean;
  isLineNumbers?: boolean;
  value?: string;
  isExtraDico?: boolean;
  extraDico?: any[];
  readOnly?: boolean;
  onCallback?: () => void;
  onChange?: (txt: string) => void;
  onReWriteEnter?: () => void;
}

const SqlEdit = (props: ISqlEditProps) => {
  const {
    theme = 'idea',
    isExtraDico = false,
    extraDico = [],
    mode = 'text/x-mysql',
    isLineNumbers = true,
    readOnly = false,
    value,
    isSetValue = false,
    onChange,
    onCallback,
    onReWriteEnter,
  } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const extraKeys = React.useMemo(() => {
    const _extraKeys: any = {
      'Ctrl-Space': (__editor: any) => {
        if (mode === 'text/x-mysql') {
          __editor.showHint();
        }
      },
      F7: (__editor: any) => {
        const textJson = JSON.parse(__editor.getValue());
        const result = JSON.stringify(textJson, undefined, 2);
        __editor.setValue(result);
      }, // 代码格式化
    };

    if (onReWriteEnter) {
      _extraKeys.Enter = (__editor: any) => {
        onReWriteEnter();
      };
    }

    return _extraKeys;
  }, [mode, onReWriteEnter]);

  const [editor, setEditor] = React.useState<any>(null);
  const [dico, setDico] = React.useState<any[]>([
    { className: 'sql', text: 'SELECT' },
    { className: 'sql', text: 'FROM' },
    { className: 'sql', text: 'WHERE' },
    { className: 'sql', text: 'INNER' },
    { className: 'sql', text: 'JOIN' },
    { className: 'sql', text: 'UNION' },
    { className: 'sql', text: 'EXEC' },
    { className: 'sql', text: 'INSERT' },
    { className: 'sql', text: 'INTO' },
    { className: 'sql', text: 'VALUES' },
    { className: 'sql', text: 'UPDATE' },
    { className: 'sql', text: 'DELETE' },
    { className: 'sql', text: 'GROUP' },
    { className: 'sql', text: 'BY' },
    { className: 'sql', text: 'HAVING' },
    { className: 'sql', text: 'IS' },
    { className: 'sql', text: 'DISTINCT' },
    { className: 'sql', text: 'OUTER' },
    { className: 'sql', text: 'TOP' },
    { className: 'sql', text: 'EXISTS' },
    { className: 'sql', text: 'WHEN' },
    { className: 'sql', text: 'CASE' },
    { className: 'sql', text: 'CAST' },
    { className: 'sql', text: 'IN' },
    { className: 'sql', text: 'NULL' },
  ]);

  React.useEffect(() => {
    if (isExtraDico) {
      setDico([...dico, ...extraDico]);
    }
    // eslint-disable-next-line
  }, [extraDico, isExtraDico]);

  React.useEffect(() => {
    if (editor && isSetValue) {
      editor.setValue(value);
      onCallback && onCallback();
      setTimeout(() => {
        editor.refresh();
      }, 100);
    }
    // eslint-disable-next-line
  }, [value, isSetValue]);

  React.useEffect(() => {
    console.log('====');
    if (!isExtraDico) {
      initEdit();
    } else if (dico.length > 25) {
      initEdit();
    }
    // eslint-disable-next-line
  }, [textareaRef, dico]);

  const initEdit = () => {
    if (textareaRef.current === null) return;
    const _editor = CodeMirror.fromTextArea(textareaRef.current, {
      tabSize: 4,
      mode,
      theme,
      readOnly,
      lineNumbers: isLineNumbers,
      lineWrapping: true,
      foldGutter: true,
      lint: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      hintOptions: {
        completeSingle: false,
        hint,
      },
      extraKeys,
    });
    _editor.on('keypress', (__editor: any) => {
      if (mode === 'text/x-mysql') {
        __editor.showHint();
      }
    });
    _editor.on('change', (__editor: any) => {
      onChange && onChange(__editor.getValue());
    });

    setEditor(_editor);
  };

  const hint = (__editor: any) => {
    const cur = __editor.getCursor();
    const token = __editor.getTokenAt(cur);
    const searchString = token.string;
    return {
      list: suggest(searchString),
      from: CodeMirror.Pos(cur.line, token.start),
      to: CodeMirror.Pos(cur.line, token.end),
    };
  };

  const suggest = (searchString: string) => {
    /*
     we will score which suggesion should appears first, the higer the score, the higer is the appearance order
    */
    let token = searchString;
    let isDot = false;
    if (searchString.startsWith('.')) {
      token = searchString.substring(1);
      isDot = true;
    }
    token = searchString.toLowerCase();
    const resu = [];
    const N = dico.length;

    // init scoring: only retains and score suggestions which contain the searchString
    for (let i = 0; i < N; i++) {
      let suggestion = null;
      // 支持.之后联想
      const _suggestion = {
        className: dico[i].className,
        text: `${isDot ? '.' : ''}${dico[i].text}`,
      };
      const keyword = _suggestion.text.toLowerCase();

      if (keyword.startsWith(token)) {
        // add N to the score of keywords which begin with the token to make them raise up in the suggestion list
        suggestion = { ...{ score: N + (N - i) }, ..._suggestion };
      } else if (keyword.includes(token)) {
        suggestion = { ...{ score: N - i }, ..._suggestion };
      }
      if (suggestion) resu.push(suggestion);
    }

    // case suggestion for "."
    if (searchString.startsWith('.')) {
      // raise score of columns, decrease the score of sql keyword
      resu.forEach((s) => {
        if (s.className === 'column') s.score += N;
        else if (s.className === 'sql') s.score -= N;
        return s;
      });
    }

    // console.log(searchString);
    return resu.sort((a, b) => b.score - a.score);
  };

  return (
    <>
      <textarea ref={textareaRef} defaultValue={value} className="my-txt" />
    </>
  );
};

export default SqlEdit;

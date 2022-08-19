import React from 'react';
import './index.less';

interface IJsonViewProps {
  json: string;
}
const JsonView = (props: IJsonViewProps) => {
  const { json } = props;

  const [myJson, setMyJson] = React.useState<string>('');

  React.useEffect(() => {
    try {
      const textJson = JSON.parse(json);
      const result = syntaxHighlight(JSON.stringify(textJson, undefined, 2));
      setMyJson(result);
    } catch (e) {
      setMyJson('This is not right JSON');
    }
    // eslint-disable-next-line
  }, [json]);

  // JSON格式转化
  const syntaxHighlight = (_json: string) => {
    if (typeof json != 'string') {
      _json = JSON.stringify(json, undefined, 2);
    }
    let index = 0;
    _json = _json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
 
    return _json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|{|}|\[|\])/g,
      (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        } else if (/{/.test(match)) {
          index = index + 1;
          return `<i class="open"></i><span class="Object{...}">${match}`;
        } else if (/}/.test(match)) {
          return `${match}</span>`;
        } else if (/\[/.test(match)) {
          return `<i class="open"></i><span class="Array">${match}`;
        } else if (/\]/.test(match)) {
          return `${match}</span>`;
        }
        return `<span class='${cls}'>${match}</span>`;
      }
    );
  };

  const onClickDom = (e: any) => {
    const target = e.target;
    if (target.nodeName === 'I') {
      if (target.className === 'open') {
        target.className = 'close';
        const dom = e.target.nextSibling;
        dom.style.display = 'none';
        const childNode = document.createElement('em');
        if (dom.className === 'Array') {
          const childrenList = dom.children;
          const newList = [];
          for (let i = 0; i < childrenList.length; i++) {
            if (childrenList[i].nodeName === 'SPAN') {
              newList.push(childrenList[i]);
            }
          }
          childNode.innerHTML = `${dom.className}[<em style="color:#25aae2;">${newList.length}</em>]`;
        } else {
          childNode.innerHTML = dom.className;
        }
        e.target.parentNode.insertBefore(childNode, e.target.nextSibling);
      } else if (target.className === 'close') {
        e.target.parentNode.removeChild(e.target.nextSibling);
        target.className = 'open';
        const dom = e.target.nextSibling;
        dom.style.display = '';
      }
    }
  };

  return (
    <>
      {/* <div>{syntaxHighlight(json)}</div> */}
      <div style={{ height: '100%', overflow: 'auto' }}>
        <pre
          onClick={(e) => {
            onClickDom(e);
          }}
          dangerouslySetInnerHTML={{ __html: myJson }}
        />
      </div>
    </>
  );
};

export default JsonView;

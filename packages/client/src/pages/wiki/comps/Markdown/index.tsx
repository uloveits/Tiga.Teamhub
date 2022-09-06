/*
 * @Author: wangxian
 * @Date: 2022-08-29 15:50:35
 * @LastEditTime: 2022-09-06 17:25:01
 */

import { FormOutlined } from '@ant-design/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// import rehypeHighlight from 'rehype-highlight';
import MarkNav from 'markdown-navbar';
import DocApi from '@/api/DocApi';
import AuthButton from '@/comps/common/AuthButton';
import 'markdown-navbar/dist/navbar.css';
import 'github-markdown-css';
import { exportText } from '@/utils';
import { message } from 'antd';

import AddOrEditDocContentModal from '../AddOrEditDocContent';
import './index.less';

interface IDocMarkdownProps {
  id?: number;
  name?: string;
}
const DocMarkdown = (props: IDocMarkdownProps) => {
  const { id, name } = props;
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [content, setContent] = React.useState<string>('');

  const getContent = React.useCallback(async () => {
    if (id) {
      const res = await DocApi.getDocContent(id);
      if (res.successed) {
        setContent(res.data?.content);
      }
    }
  }, [id]);

  React.useEffect(() => {
    getContent();
  }, [getContent]);

  React.useEffect(() => {
    document.querySelectorAll('a').forEach((a) => {
      a.onclick = () => {
        const href = a.getAttribute('href');
        console.log('我被点击了=>', href, a);
        // if (href === '/') return (location.pathname = 'www.baidu.com');
        // event.preventDefault();
      };
    });
  }, []);

  const onExportMd = () => {
    exportText(`${name}.md`, content);
  };

  return (
    <>
      {name && (
        <div className="flex p-1 items-center" style={{ background: '#f7f7f7' }}>
          <div className="text-gray-800 flex-1">
            {name}
            <AuthButton
              type="link"
              icon={<FormOutlined />}
              onClick={() => {
                if (id) {
                  setIsModal(true);
                }
              }}
            />
          </div>
          <div>
            <AuthButton
              type="primary"
              size="small"
              onClick={() => {
                message.warn('分享地址已复制');
              }}
            >
              分享
            </AuthButton>
            <AuthButton
              size="small"
              onClick={() => {
                message.warn('暂未开放');
              }}
            >
              上传
            </AuthButton>
            <AuthButton type="primary" size="small" onClick={onExportMd}>
              下载
            </AuthButton>
          </div>
        </div>
      )}

      <div className="flex relative" style={{ height: 'calc(100% - 40px)' }}>
        <div className="flex-1 p-6 markdown-body overflow-y-auto react-mark-down">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
        <div className="h-full " style={{ width: '250px' }}>
          <MarkNav className="h-full w-full" source={content} ordered={false} />
        </div>
      </div>

      <AddOrEditDocContentModal
        isModal={isModal}
        content={content}
        docId={id}
        onCancel={() => {
          setIsModal(false);
        }}
        onSuccess={() => {
          getContent();
          setIsModal(false);
        }}
      />
    </>
  );
};

export default DocMarkdown;

/*
 * @Author: wangxian
 * @Date: 2022-08-29 15:50:35
 * @LastEditTime: 2022-09-07 08:43:16
 */

import { FormOutlined } from '@ant-design/icons';
import React from 'react';
import { MdView } from 'ronds-metadata';
import DocApi from '@/api/DocApi';
import AuthButton from '@/comps/common/AuthButton';
import { exportText, getElementByAttr } from '@/utils';
import { message } from 'antd';
import Copy from 'copy-to-clipboard';
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

  const onExportMd = () => {
    exportText(`${name}.md`, content);
  };

  const onNavItemClick = (event: any, element: any, hashValue: string) => {
    console.log('onNavItemClick', event, element, hashValue, window.location);
    const anchorElement = getElementByAttr('h2', 'data-id', hashValue);
    console.log(anchorElement);

    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
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
                console.log(window.location);
                const shareUrl = `${window.location.origin}/#/shared?docId=${id}&docName=${name}`;
                Copy(encodeURI(shareUrl));
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
        <MdView source={content} isMarkNav={true} navOptions={{ onNavItemClick }} />
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

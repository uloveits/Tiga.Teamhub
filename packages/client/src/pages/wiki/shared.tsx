import { GetRequest } from '@/utils';
import React from 'react';
import DocMarkdown from './comps/Markdown';

const SharedPage = () => {
  const [docId, setDocId] = React.useState<number>();

  React.useEffect(() => {
    const request = GetRequest(window.location.href);
    console.log(request);
    setDocId(request.docId);
  }, []);

  React.useEffect(() => {}, []);

  return (
    <>
      <div className="p-2 pl-4 font-bold text-xl">cp命令 – 复制文件或目录</div>
      <DocMarkdown id={docId} />
    </>
  );
};

export default SharedPage;

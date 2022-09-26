import { GetRequest } from '@/utils';
import React from 'react';
import DocMarkdown from './comps/Markdown';

const SharedPage = () => {
  const [docId, setDocId] = React.useState<number>();
  const [docName, setDocName] = React.useState<string>();

  React.useEffect(() => {
    const request = GetRequest(decodeURI(window.location.href));
    setDocId(request.docId);
    setDocName(request.docName);
  }, []);

  return (
    <>
      <div className="p-2 pl-5 font-bold text-xl">{docName}</div>
      <DocMarkdown id={docId} />
    </>
  );
};

export default SharedPage;

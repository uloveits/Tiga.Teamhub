import React from 'react';
import { SheetData } from 'x-data-spreadsheet';
import ReactSheet from '../XDataSpreadSheet';

interface IWebExcelProps {
  data: SheetData[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (_data: any) => void;
}

const WebExcel = (props: IWebExcelProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const { data, className, style, onChange } = props;

  return (
    <div style={{ height: '100%', width: '100%' }} ref={container}>
      <ReactSheet
        data={data}
        className={className}
        style={style}
        onChange={(_data) => {
          onChange && onChange(_data);
        }}
        options={{
          view: {
            width: () => (container.current ? container.current.clientWidth : document.documentElement.clientWidth - 140),
            height: () => (container.current ? container.current.clientHeight : document.documentElement.clientHeight),
          },
        }}
      />
    </div>
  );
};
export default WebExcel;

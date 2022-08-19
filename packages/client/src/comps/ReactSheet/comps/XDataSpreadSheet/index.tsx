import React from 'react';
import XDataSpreadSheet, { Options, SheetData } from 'x-data-spreadsheet';
// import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';

import './index.less';

interface IWebExcelProps {
  data: SheetData[];
  options?: Options;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (_data: any) => void;
}

const ReactSheet = (props: IWebExcelProps) => {
  const { data, options, className, style, onChange } = props;
  const [xDataSpreadSheet, setXDataSpreadSheet] = React.useState<XDataSpreadSheet>();

  const container = React.useRef<HTMLDivElement>(null);

  // only to initialize the spreadsheet once.
  React.useLayoutEffect(() => {
    if (container.current === null) return;
    setXDataSpreadSheet(new XDataSpreadSheet(container.current, options));
  }, [options]);

  React.useLayoutEffect(() => {
    if (xDataSpreadSheet) {
      //   xDataSpreadSheet.locale('zh-cn', zhCN);
      xDataSpreadSheet.loadData(data);
      xDataSpreadSheet.change((_data) => {
        console.log('xDataSpreadSheet===change');
        console.log(_data);
        onChange && onChange(_data);
      });
    }
  }, [data, onChange, xDataSpreadSheet]);

  return <div ref={container} className={className} style={{ height: '100%', ...style }} />;
};

export default ReactSheet;

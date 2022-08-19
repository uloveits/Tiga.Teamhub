import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { formatPath } from '@/utils';

export interface IconFontProps extends IconBaseProps {
  type: string;
}

const IconFont = createFromIconfontCN({
  scriptUrl: formatPath('/fonts/Icons.js', 'assets'),
});

const Icon: React.FC<IconFontProps> = (props: IconFontProps) => {
  return <IconFont {...props} />;
};

export default Icon;

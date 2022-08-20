import React from 'react';

interface IProps {
  children: React.ReactElement;
  /**
   * 捕获错误后的自定义处理, 比如埋点上传
   * @param {Object} error 错误
   * @param {Object} errorInfo 错误详细信息
   */
  afterCatch?: (error: any, errorInfo: any) => void;
  /**
   * 捕获错误后的展现 自定义组件
   * @param {Object} error 错误
   * @param {Object} errorInfo 错误详细信息
   * @returns {Element} 捕获错误后的处理
   */
  fallbackUI?: any;
}
/**
 *
 *
 * 默认错误UI
 */
function DefaultUI({ error, errorInfo }: any): React.ReactElement | React.ReactText {
  return (
    <div>
      <p>系统发生错误,请重试刷新界面</p>
      <p>{error?.message}</p>
      {/* <p>{errorInfo || ''}</p> */}
    </div>
  );
}
/**
 * 错误边界
 *
 * @export
 * @class ErrorBoundary
 * @extends {React.Component<IProps, { error: any; errorInfo: any }>}
 */
export default class ErrorBoundary extends React.Component<IProps, { error: any; errorInfo: any }> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });

    console.error('ErrorBoundary', error, errorInfo);
    const { afterCatch } = this.props;

    if ('afterCatch' in this.props && typeof afterCatch === 'function') {
      this.props.afterCatch && this.props.afterCatch(error, errorInfo);
    }
  }

  render() {
    const { fallbackUI: FallbackUI = DefaultUI } = this.props;

    if (this.state.errorInfo) {
      return <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />;
    }
    // Normally, just render children
    return this.props.children;
  }
}

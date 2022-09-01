/*
 * @Author: wangxian
 * @Date: 2022-01-06 19:17:59
 * @LastEditTime: 2022-09-01 11:20:52
 */
import React from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd';

interface IAuthButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'children';
  icon?: React.ReactNode;
  shape?: 'circle' | 'round';
  menuItem?: string;
  size?: 'large' | 'middle' | 'small';
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  loading?: boolean | { delay?: number };
  disabled?: boolean;
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  permission?: string;
  allPermission?: string[];
  dropDown?: any;
  placement?: 'bottomLeft' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter' | 'bottomRight' | undefined;
  onClick?: (event: any) => void;
}

const AuthButton = (props: IAuthButtonProps) => {
  const {
    type = 'default',
    menuItem,
    icon,
    shape,
    ghost = false,
    size = 'middle',
    dropDown,
    placement = 'bottomLeft',
    loading = false,
    disabled = false,
    children,
    title,
    style,
    onClick,
    ...restProps
  } = props;

  const onMyClick = (e: any) => {
    onClick && onClick(e);
  };

  return (
    <>
      {type === 'children' && children}
      {type !== 'children' && menuItem && (
        <Menu.Item key={menuItem} className="p-1">
          <Tooltip title={title}>
            {dropDown ? (
              <Dropdown overlay={dropDown} placement={placement}>
                <Button
                  style={{ marginRight: '10px', ...style }}
                  type={type}
                  shape={shape}
                  ghost={ghost}
                  size={size}
                  disabled={disabled}
                  loading={loading}
                  icon={icon}
                  onClick={onMyClick}
                  {...restProps}
                >
                  {children}
                </Button>
              </Dropdown>
            ) : (
              <Button
                style={{ marginRight: '10px', ...style }}
                type={type}
                shape={shape}
                ghost={ghost}
                size={size}
                disabled={disabled}
                loading={loading}
                icon={icon}
                onClick={onMyClick}
                {...restProps}
              >
                {children}
              </Button>
            )}
          </Tooltip>
        </Menu.Item>
      )}
      {type !== 'children' && !menuItem && (
        <Tooltip title={title}>
          {dropDown ? (
            <Dropdown overlay={dropDown} placement={placement}>
              <Button
                style={{ marginRight: '10px', ...style }}
                type={type}
                shape={shape}
                size={size}
                ghost={ghost}
                disabled={disabled}
                loading={loading}
                icon={icon}
                onClick={onMyClick}
                {...restProps}
              >
                {children}
              </Button>
            </Dropdown>
          ) : (
            <Button
              style={{ marginRight: '10px', ...style }}
              type={type}
              shape={shape}
              size={size}
              ghost={ghost}
              disabled={disabled}
              loading={loading}
              icon={icon}
              onClick={onMyClick}
              {...restProps}
            >
              {children}
            </Button>
          )}
        </Tooltip>
      )}
    </>
  );
};

export default AuthButton;

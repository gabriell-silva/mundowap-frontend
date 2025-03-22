import React from 'react';

export type ButtonProps = {
  disabled?: boolean;
  form?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}
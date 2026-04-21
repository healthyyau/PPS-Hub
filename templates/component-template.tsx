/**
 * @component ComponentTemplate
 * @description [Describe what this component does and when to use it]
 * @example
 * <ComponentTemplate variant="primary" size="md" disabled={false}>
 *   Label text
 * </ComponentTemplate>
 */
import React from 'react';
import styles from './component-template.module.css';

interface ComponentTemplateProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disables interaction */
  disabled?: boolean;
  /** Content rendered inside the component */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export const ComponentTemplate: React.FC<ComponentTemplateProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.root} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

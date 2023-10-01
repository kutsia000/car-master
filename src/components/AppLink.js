import React from 'react';

export default function AppLink({ href, title, children, target = '_blank', ...rest }) {
  return (
    <a
      style={{ cursor: 'pointer' }}
      title={title}
      href={href}
      {...rest}
      target={target}
      referrerPolicy="no-referrer"
    >
      {children}
    </a>
  );
}

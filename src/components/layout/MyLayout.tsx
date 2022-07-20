import { Layout } from 'antd';
import MyContent from 'components/layout/MyContent';
import MyFooter from 'components/layout/MyFooter';
import MyHeader from 'components/layout/MyHeader';
import React, { ReactNode } from 'react';

interface Props {
  fluidContent?: boolean;
  centeredContent?: boolean;
  isAuthorized?: boolean;
  contentOnly?: boolean;
  children: ReactNode;
}

function MyLayout({
  fluidContent,
  centeredContent,
  isAuthorized,
  contentOnly = false,
  children,
}: Props) {
  return (
    <Layout>
      {
        !contentOnly && <MyHeader isAuthorized={isAuthorized} />
      }
      <MyContent
        centeredContent={centeredContent}
        fluidContent={fluidContent}
      >
        {children}
      </MyContent>
      {
        !contentOnly && <MyFooter />
      }
    </Layout>
  );
}

export default MyLayout;

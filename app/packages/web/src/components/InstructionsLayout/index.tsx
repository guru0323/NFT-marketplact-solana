import React, { ReactNode } from 'react';
import { Layout } from 'antd';

import { CreditCardOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

interface ContentCardProps {
  title: string;
  description: string;
  endElement?: ReactNode;
  imgSrc?: string;
}

export const ContentCard = (props: ContentCardProps) => {
  const {
    title = '',
    description = '',
    endElement = <div />,
    imgSrc = '',
  } = props;
  return (
    <Card
      cover={
        <div>{imgSrc ? <img src={imgSrc} /> : <CreditCardOutlined />}</div>
      }
    >
      <div>{title}</div>
      <div>{description}</div>
      {endElement}
    </Card>
  );
};

interface PageProps {
  pageTitle: string;
  cardProps: [
    ContentCardProps, ContentCardProps, ContentCardProps,
    ContentCardProps, ContentCardProps, ContentCardProps
  ];
}

export const InstructionsLayout: React.FC<PageProps> = ({
  pageTitle,
  cardProps,
}) => {

  return (
    <>
      <Layout
        className="metaplex-instructions-modal" // why is "metaplex-instructions-layout" not working?
        title={pageTitle}
      >
        <Row gutter={16}>
          {cardProps.map((props, i) => (
            <Col key={i} span={24} xl={8}>
              <ContentCard {...props} />
            </Col>
          ))}
        </Row>
      </Layout>
    </>
  );
};
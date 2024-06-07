import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Card, List, Typography } from 'antd';
import type { CardListItemDataType } from './data.d';
import { queryFakeList } from './service';


import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import { Row, Col } from 'antd';
import { page5 } from './data';
import '../../../assets/static/style';


const { Paragraph } = Typography;

const Clients = () => {
  const { data, loading } = useRequest(() => {
    return queryFakeList({
      count: 5,
    });
  });
  const list = data?.list || [];


  const nullData: Partial<CardListItemDataType> = {};

  const children = page5.map((img, i) => (
    <Col
      key={i.toString()}
      md={6}
      sm={8}
      xs={24}
      style={{
          height: 80,
      }}
    >
      <img width={220} src={img} alt="" />
    </Col>
  ));


  return (
    <>
 
    <PageContainer style={{backgroundColor:"#F0F0F0"}} className="page-wrapper page2">
    <OverPack component="section" className="page-wrapper page2">
                <QueueAnim
                    type="bottom"
                    className="page text-center"
                    leaveReverse
                    key="page"
                >
                    <h2 key="title">AntV 可视化解决方案</h2>
                    <span key="line" className="separator" />
                    <QueueAnim type="bottom" className="info-content" key="content">
                    <p className="main-info" key="1">已全面全新升级，主要包含 G2、G6、F2 以及一套完整的图表使用和设计规范。</p>
                    <p className="main-info" key="2">得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 2000+ 业务系统，通过了百万级 UV 产品的严苛考验后方敢与君见。</p>
                    </QueueAnim>
                    <Row
                      className="page text-center"
                      key="a"
                    >
                      {children}
                    </Row>
                </QueueAnim>
                </OverPack>
      
    </PageContainer>
    </>
  );
};
export default Clients;

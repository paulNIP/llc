import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Card, List, Typography } from 'antd';
import type { CardListItemDataType } from './data';
import Consulting from '../consulting';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Banner from '../../../components/Banner';
import Clients from '../clients';
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';

import { queryFakeList } from './service';
import useStyles from './style.style';
import '../../../assets/static/style';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,GlobalOutlined,SettingOutlined,FundProjectionScreenOutlined,AuditOutlined,
  SyncOutlined,PhoneOutlined,CaretDownOutlined,CaretRightOutlined,MobileFilled,AreaChartOutlined 
} from '@ant-design/icons';
import Faq from '../../faq';



const { Paragraph } = Typography;
const Home = () => {
  const { styles } = useStyles();

  const data = [
    {
      id:1,
      title: 'Mobile App Design & Development',
      description: 'Mobile App Design & Development',
      url: '/mobile',
      icon:<MobileFilled style={{ fontSize: '220%',color:'#5DCAF5'}}/>
    },
    {
      id:2,
      title: 'Web Design & Development',
      description: 'Web App Design & Development',
      url: '/web',
      icon:<GlobalOutlined  style={{ fontSize: '220%',color:'#5DCAF5'}}/>
    },
    {
      id:3,
      title: 'Data analysis & Visualization',
      description: 'Web App Design & Development',
      url: '/data-analysis',
      icon:<FundProjectionScreenOutlined style={{ fontSize: '220%',color:'#5DCAF5'}}/>
      
    },
    {
      id:4,
      title: 'Automation',
      description: 'Web App Design & Development',
      url: '/automation',
      icon:<SettingOutlined  style={{ fontSize: '220%',color:'#5DCAF5'}}/>  
    },
    {
      id:5,
      title: 'Micro Services Development',
      description: 'Web App Design & Development',
      url: '/micro-services',
      icon:<MobileFilled style={{ fontSize: '220%',color:'#5DCAF5'}}/>
    },
    {
      id:6,
      title: 'Field Survey Development',
      description: 'Web App Design & Development',
      url: '/survey',
      icon:<AuditOutlined  style={{ fontSize: '220%',color:'#5DCAF5'}}/>
    },
  ];


  return (
    <>

    <Header/>
    <Banner/>
    <Clients/>

    <PageContainer style={{backgroundColor:"#F0F0F0"}}>
      <div className={styles.cardList}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
                  <List.Item >
                      <Card
                        hoverable
                        className={styles.card} 
                        actions={[<a key="option2" style={{color: "#da3451", fontFamily:"IBM Plex Mono",fontWeight:'bold'}}>READ MORE</a>]}
                      >
                        <Card.Meta
                          avatar={item.icon}
                          title={<p style={{color: "#22262a", fontFamily:"IBM Plex Mono",fontWeight:'bold',textTransform: 'uppercase'}}>{item.title}</p>}
                          description={
                            <Paragraph
                              className={styles.item}
                              ellipsis={{
                                rows: 3,
                              }}
                            >
                              在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很 ，会出现不同的设计规范和实现方式，但其中往往存在很
                            </Paragraph>
                          }
                        />
                      </Card>
                    </List.Item>
            )}
          />

          
    
      </div>

      {/* consultation process */}

     

    </PageContainer>
     <Consulting/>
     <Faq/>
     <Footer/>
     </>
    

  );
};
export default Home;

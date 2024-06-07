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

import { queryFakeList } from './service';
import useStyles from './style.style';
import '../../../assets/static/style';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,PhoneOutlined,CaretDownOutlined,CaretRightOutlined
} from '@ant-design/icons';
import Faq from '../../faq';



const { Paragraph } = Typography;
const Home = () => {
  const { styles } = useStyles();
  const { data, loading } = useRequest(() => {
    return queryFakeList({
      count: 5,
    });
  });
  const list = data?.list || [];


  const nullData: Partial<CardListItemDataType> = {};
  return (
    <>

    <Header/>
    <Banner/>
    <Clients/>
    <PageContainer style={{backgroundColor:"#F0F0F0"}}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={[nullData, ...list]}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card} 
                    // actions={[<a key="option1">操作一</a>, <a key="option2"></a>]}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a>{item.title}</a>}
                      description={
                        <>
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.description}
                        </Paragraph>
                        <Link to="/home" className="link-span" relative="path">
                          Learn More<span>  <CaretRightOutlined /></span>
                        </Link>
                        </>

                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card} 
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a>Bootstrap</a>}
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
            );
          }}
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

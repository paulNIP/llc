import React, { useRef, useEffect, useState } from 'react';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,PhoneOutlined,MailFilled,PhoneFilled,EnvironmentFilled
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,ProFormTextArea
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { flushSync } from 'react-dom';
import Settings from '../../../config/defaultSettings';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import { PageContainer } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { page5 } from './data';
import '../../assets/static/style';

import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';



import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDg1YWxleCIsImEiOiJja2lhMnpoaGIwbG9vMnJsYnB6bjd1ODM4In0.Ob_S63pgWYX5l5FCLEcKNQ';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Contact: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <>
    <Header/>
    <div>
        <OverPack component="section" className="page-wrapper page2">
        <QueueAnim
            type="bottom"
            className="page text-center"
            leaveReverse
            key="page"
        >
            <h2 key="title">Contact Us</h2>
            <span key="line" className="separator" />
            <QueueAnim type="bottom" className="info-content" key="content">
            <p className="main-info" key="1">已全面全新升级，主要包含 G2、G6、F2 以及一套完整的图表使用和设计规范。</p>
            <p className="main-info" key="2">得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 2000+ 业务系统，通过了百万级 UV 产品的严苛考验后方敢与君见。</p>
            </QueueAnim>
        </QueueAnim>
        </OverPack>
    </div>
    <div className="container">
        <PageContainer >
        {/* <footer id="footer" > */}
            <div className="footer-wrap container">
                <Row className="container">
                <Col lg={12} sm={24} xs={24}>
                    <div
                          style={{
                            flex: '1',
                          }}
                        >
                          <LoginForm
                            contentStyle={{
                              minWidth: 280,
                              maxWidth: '75vw',
                            }}
                            subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                            title="Ant Design"
                            
                            initialValues={{
                              autoLogin: true,
                            }}
                            onFinish={async (values) => {
                              await handleSubmit(values as API.LoginParams);
                            }}
                          >


                            {status === 'error'  && (
                              <LoginMessage
                                content={intl.formatMessage({
                                  id: 'pages.login.accountLogin.errorMessage',
                                  defaultMessage: '账户或密码错误(admin/ant.design)',
                                })}
                              />
                            )}

                              <>
                                <ProFormText
                                  name="username"
                                  fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined />,
                                  }}
                                  placeholder={intl.formatMessage({
                                    id: 'pages.login.username.placeholder',
                                    defaultMessage: '用户名: admin or user',
                                  })}
                                  rules={[
                                    {
                                      required: true,
                                      message: (
                                        <FormattedMessage
                                          id="pages.login.username.required"
                                          defaultMessage="请输入用户名!"
                                        />
                                      ),
                                    },
                                  ]}
                                />
                                <ProFormText.Password
                                  name="password"
                                  fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                  }}
                                  placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: ant.design',
                                  })}
                                  rules={[
                                    {
                                      required: true,
                                      message: (
                                        <FormattedMessage
                                          id="pages.login.password.required"
                                          defaultMessage="请输入密码！"
                                        />
                                      ),
                                    },
                                  ]}
                                />

                                <ProFormTextArea
                                  name="text"
                                  fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                  }}
                                  placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: ant.design',
                                  })}
                                  rules={[
                                    {
                                      required: true,
                                      message: (
                                        <FormattedMessage
                                          id="pages.login.password.required"
                                          defaultMessage="请输入密码！"
                                        />
                                      ),
                                    },
                                  ]}
                                />
                              </>
                          </LoginForm>
                        </div>
                </Col>
                <Col lg={12} sm={24} xs={24}>
                    <div className="footer-center">
                      <h2>Talk to one of our experts.</h2>
                      <Avatar.Group
                        size="large"
                        max={{
                          count: 4,
                          style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
                          popover: { trigger: 'click' },
                        }}
                      >
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>
                        <Avatar style={{ backgroundColor: '#f56a00' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}>K</Avatar>
                        <Tooltip title="Ant User" placement="top">
                          <Avatar style={{ backgroundColor: '#87d068' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<UserOutlined />} />
                        </Tooltip>
                        <Avatar style={{ backgroundColor: '#1677ff' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<AntDesignOutlined />} />
                      </Avatar.Group>

                      <br></br>
                      <Row style={{marginTop:20}}>
                        <Col lg={4} sm={4} xs={4}>
                        <div className="icon-bg" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                             {/* <PhoneOutlined /> */}
                             <PhoneFilled style={{fontSize:25,color:'#ffffff'}}/>
                          </div>

                        </Col>
                        <Col lg={20} sm={20} xs={20}>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p> 
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col lg={4} sm={4} xs={4}>
                          <div className="icon-bg" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                             {/* <PhoneOutlined /> */}
                             <MailFilled  style={{fontSize:25,color:'#ffffff'}}/>
                          </div>

                        </Col>
                        <Col lg={20} sm={20} xs={20}>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p> 
                        </Col>
                      </Row>
                      <br></br>

                      <Row>
                        <Col lg={4} sm={4} xs={4}>
                          <div className="icon-bg" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                             {/* <PhoneOutlined /> */}
                             <EnvironmentFilled  style={{fontSize:25,color:'#ffffff'}}/>
                          </div>

                        </Col>
                        <Col lg={20} sm={20} xs={20}>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p>
                        <p key="content" className="main-info">
                          开箱即用的中台前端/设计解决方案
                        </p> 
                        </Col>
                      </Row>
                    </div>
                </Col>

                </Row>
            </div>
        </PageContainer>
        </div>
    <div ref={mapContainer} className="map-container" />
    <Footer/>
    </>
  );
};

export default Contact;

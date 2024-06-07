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
import { Button } from 'antd';
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

import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import { PageContainer } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { page5 } from './data';
import '../../assets/static/style';

import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
// import { Collapse, theme } from 'antd';

// import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import '../../assets/static/style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Faq: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  

  useEffect(() => {

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

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: <p 
      style={{
      fontFamily: "IBM Plex Sans",
      fontSize: 18,
      fontWeight: 600,
      color: '#22262a'
      }}
    >This is panel header 1</p>,
      children: <p 
        style={{
        fontFamily: "IBM Plex Sans",
        marginTop:-20,
        fontSize: 16,
        fontWeight: 400,
        color: '#686c72'
        }}
      >
        
        {text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: <p 
      style={{
      fontFamily: "IBM Plex Sans",
      fontSize: 18,
      fontWeight: 600,
      color: '#22262a'
      }}
    >This is panel header 1</p>,
      children: <p 
        style={{
        fontFamily: "IBM Plex Sans",
        marginTop:-20,
        fontSize: 16,
        fontWeight: 400,
        color: '#686c72'
        }}
      >
        
        {text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: <p 
      style={{
      fontFamily: "IBM Plex Sans",
      fontSize: 18,
      fontWeight: 600,
      color: '#22262a'
      }}
    >This is panel header 1</p>,
      children: <p 
        style={{
        fontFamily: "IBM Plex Sans",
        marginTop:-20,
        fontSize: 16,
        fontWeight: 400,
        color: '#686c72'
        }}
      >
        
        {text}</p>,
      style: panelStyle,
    },
    {
      key: '4',
      label: <p 
      style={{
      fontFamily: "IBM Plex Sans",
      fontSize: 18,
      fontWeight: 600,
      color: '#22262a'
      }}
    >This is panel header 1</p>,
      children: <p 
        style={{
        fontFamily: "IBM Plex Sans",
        marginTop:-20,
        fontSize: 16,
        fontWeight: 400,
        color: '#686c72'
        }}
      >
        
        {text}</p>,
      style: panelStyle,
    },
    {
      key: '5',
      label: <p 
      style={{
      fontFamily: "IBM Plex Sans",
      fontSize: 18,
      fontWeight: 600,
      color: '#22262a'
      }}
    >This is panel header 1</p>,
      children: <p 
        style={{
        fontFamily: "IBM Plex Sans",
        marginTop:-20,
        fontSize: 16,
        fontWeight: 400,
        color: '#686c72'
        }}
      >
        
        {text}</p>,
      style: panelStyle,
    }
  ];


  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <>
    <Header/>
    <div className="container">
        <PageContainer >
            <div className="footer-wrap container">
                <Row className="container">
                <Col lg={12} sm={24} xs={24}>
                    <div className="footer-center">
                      <Row style={{marginTop:20}}>
                        <Col lg={24} sm={24} xs={24}>
                          <h1 className="banner-title-wrapper h1">FAQS</h1>
                        </Col>
                      </Row>
                      <Row style={{marginTop:10}}>
                        
                        <Col lg={24} sm={24} xs={24}>
                        <p key="content" className="main-info" 
                        style={{
                          fontFamily: "IBM Plex Sans",
                          fontSize: 18,
                          fontWeight: 400,
                          color:'#686c72'
                          }}

                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderi
                        </p>
                        <Button type="primary">
                          Ask Question
                        </Button>
                        </Col>
                      </Row>
                    </div>
                </Col>


                <Col lg={12} sm={24} xs={24}>
                    <div className="footer-center">
                      {/* <h2>Talk to one of our experts.</h2> */}
                      <br></br>
                      <Row style={{marginTop:20}}>
                        <Col lg={24} sm={24} xs={24}>
                          <Collapse
                              bordered={false}
                              defaultActiveKey={['1']}
                              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                              style={{
                                background: token.colorBgContainer
                              }}
                              items={getItems(panelStyle)}
                            />


                        </Col>


                      </Row>
                      <br></br>


  
                    </div>
                </Col>

                </Row>
            </div>
        </PageContainer>
        </div>
        <Footer/>
    </>
  );
};

export default Faq;

import React,{useState} from 'react';
import { Row, Col, Menu, Button, Popover } from 'antd';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,PhoneOutlined,CaretDownOutlined
  } from '@ant-design/icons';
  import { Dropdown, Space } from 'antd';
  import { Link } from "react-router-dom";
  import { createStyles } from 'antd-style';
  import { FormattedMessage, Helmet, SelectLang, useIntl, useModel } from '@umijs/max';
 
  

import { enquireScreen } from 'enquire-js';

const LOGO_URL = 'https://gw.alipayobjects.com/zos/rmsportal/gVAKqIsuJCepKNbgbSwE.svg';
import '../assets/static/style';

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

      lineHeight: '28px',
      borderRadius: token.borderRadius,
      fontFamily:"IBM Plex Mono",
      fontWeight:500,
      fontStyle:'normal',
      fontSize:14,
      color:'#22262a',
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

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }



  render() {
    const { menuMode, menuVisible } = this.state;
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to="/home" relative="path">
                       HOME
           </Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <a><span>文档</span></a>
        </Menu.Item>
        {
          menuMode === 'inline' && (
            <Menu.Item key="preview">
              <a target="_blank" href="http://preview.pro.ant.design/" rel="noopener noreferrer">
                预览
              </a>
            </Menu.Item>
          )
        }
        <Menu.Item key="components">
          {/* <a >LOGIN</a> */}
          <Link to="/user/login" relative="path">
                       LOGIN
           </Link>
        </Menu.Item>


        
       
        <Dropdown menu={{ items }} placement="bottomRight" arrow style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Button type="text" danger icon={ <CaretDownOutlined />} iconPosition="end"  >
               <a><span >组件 bottomRight</span></a>
            </Button>
        </Dropdown>
        <Menu.Item key="components677" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           <Lang />
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="header" className="header">
        {/* {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            {/* <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            /> */}
            {/* <PhoneOutlined />
          </Popover>
        ) : null} */} 
        <Row>
          <Col xxl={4} xl={10} lg={8} md={8} sm={24} xs={24}>
            <div id="logo" to="/">
              <img src={LOGO_URL} alt="logo" />
              <span style={{fontSize:18}}>OPOLOS TECHNOLOGIES</span>
            </div>
          </Col>
          <Col xxl={20} xl={14} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                {/* <a
                  id="preview-button"
                  target="_blank"
                  href="http://preview.pro.ant.design"
                  rel="noopener noreferrer"
                > */}
                  <Button type="primary">
                    {/* <a><span>CONTACT US</span></a> */}
                    <Link to="/contact" relative="path">
                       CONTACT US
                    </Link>
                  </Button>
                {/* </a> */}
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button,Flex,Modal } from 'antd';
import BannerSVGAnim from './BannerSVGAnim';
import StepForm from '../pages/form/step-form';

function Banner(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1" className="text-h-48 color-black">Empowering You to the Next Frontier in IT innovative Solutions</h1>
        <p key="content">
          开箱即用的中台前端/设计解决方案
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        </p>
        <div key="button" className="button-wrapper">
          

          <Flex gap="small">
              
                <Button type="primary" style={{ background: "#da3451", fontFamily:"IBM Plex Mono",fontWeight:'bold'}}>
                  LEARN MORE
                </Button>
              
              
              <Button type="text" danger onClick={showModal}  style={{ fontFamily:"IBM Plex Mono",fontWeight:'bold',borderWidth:1,borderColor:'#da3451',marginTop:2}}>
                BOOK A MEETING
              </Button>
              

          </Flex>
          {/* <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="ant-design"
            repo="ant-design-pro"
          /> */}
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}

      <Modal title="Book an Introduction meeting with our team" width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <StepForm/>
      </Modal>
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
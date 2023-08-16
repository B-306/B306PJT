import React from "react";
import styled from 'styled-components';
// import palette from '../../lib/styles/palette';
// import { Link } from 'react-router-dom';

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    // background: white;
    backdrop-filter: blur(10px);
    background : transparent;
    border-radius: 2px;
`;

const AuthTemplate = ( { children } ) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    {/* <Link to="/">두뇌 풀 가동</Link> */}
                    <h2 style={{color: 'white'}}>두뇌 풀 가동</h2>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;
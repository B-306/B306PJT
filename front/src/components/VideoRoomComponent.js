import axios from 'axios';
import tokenHttp from './api/tokenHttp';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';
import Counter from './secCounter';
import Check from './game/Check';
import { decodeState } from './common/CodedState';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './common/Button';
import { Card } from 'primereact/card';

import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Carousel } from 'primereact/carousel';


const WhiteBox = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 310px;
    height: 400px;
    background-color: white;
    // backdrop-filter: blur(10px);
    // background : transparent;
    border-radius: 2px;
    position: absolute;
    z-index: 999;
    left: 70%;
    top: 40%;

`;

const ResultCard = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    color: white;
    z-index: 999;
    text-align: center;
`;



var localUser = new UserModel();
console.log('NODE_ENV 상태 : ' + process.env.NODE_ENV);
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b306.q.ssafy.io/api2' : 'https://i9b306.q.ssafy.io/api2';
const openvidu_key = process.env.REACT_APP_OPENVIDU_KEY;

class VideoRoomComponent extends Component {
    
    constructor(props) {
        super(props);
        this.hasBeenUpdated = false;
        let sessionName = this.props.sessionName ? this.props.sessionName : localStorage.getItem('roomCode'); // 'sessionA' 대신 방 코드 
        let userName = this.props.userName;
        console.log('-------------------------userName : ' + userName);
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            myScore: 0,
            scores: {}, // 플레이어들의 누적 점수
            oneScore: {}, // 플레이어들의 직전 문제 점수
            gameText: null,
            gameAnswer: null,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            currentVideoDevice: undefined,
            showCounter: false, // Counter 컴포넌트를 표시할지 여부를 나타내는 상태 변수
            capturedImage: null, // 이미지 데이터를 저장할 상태 변수
            capturedImageArray: {}, // 모든 플레이어들의 직전 문제 캡쳐
            captureRender: false,
            onceStarted: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.sendGameSignal = this.sendGameSignal.bind(this);
        this.sendScoreSignal = this.sendScoreSignal.bind(this);
    }

    

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.joinSession();
        
    }

    

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }


    joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            async () => {
                this.subscribeToStreamCreated();
                await this.connectToSession();
                
            },
        );
        console.log(this.state)
    }

    async connectToSession() {
        console.log(this.props)
        if (this.props.token !== undefined) {
            console.log('token received: ', this.props.token);
            this.connect(this.props.token);
        } else {
            try {
                var token = await this.getToken();
                console.log(token);
                this.connect(token);
            } catch (error) {
                console.error('There was an error getting the token:', error.code, error.message);
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error getting the token:', error.message);
            }
        }
    }

    connect(token) {
        this.state.session
            .connect(
                token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                this.connectWebCam();
            })
            .catch((error) => {
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    }

    async connectWebCam() {
        await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
        var devices = await this.OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');
        let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed' , () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    }
                });
            });

        }
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setStreamManager(publisher);
        this.receiveGameSignal();
        this.receiveScoreSignal();
        this.receiveCaptureRenderSignal();
        this.subscribeToStreamDestroyed();

        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        });
    }

    updateSubscribers() {
        var subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) {
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                    });
                }
            },
        );
    }


    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'ses_MBQXIRXOvg',
            myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
            localUser: undefined,
        });
        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }
    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if(this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }




    subscribeToStreamDestroyed() {
        this.state.session.on('streamDestroyed', (event) => {
            this.deleteSubscriber(event.stream);
            event.preventDefault();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
            );
        });
    }



    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }
    

// Start Game

    async fnc (num) {
        console.log('num, response.data, response.data.quizTemplateId')
        console.log(num)
        const response = await tokenHttp.get(`https://i9b306.q.ssafy.io/api1/quiz/` + num)
        console.log(response.data)
        console.log(response.data.quizTemplateId)
        return response.data;
    }



    async sendGameSignal() {
        if (this.state.onceStarted) {
            alert('게임이 이미 시작되었습니다.')
            return null;
        }
        const selectedQuizesString = localStorage.getItem('selectedQuizes');
        const selectedQuizesArray = selectedQuizesString.split(',');
        this.setState({
            onceStarted: true,
        })
        for (let index = 0; index < selectedQuizesArray.length; index++) {
            const quiz = selectedQuizesArray[index];
            const quizData = await this.fnc(quiz);
            
            setTimeout(() => {
                const signalOptions = {
                    type: 'gameStart',
                    data: JSON.stringify({
                        templateImage: quizData.quizTemplateId.templateImage,
                        quizText: quizData.quizText,
                        quizAnswer: quizData.quizAnswer,
                        otherInfo: 'some other data',
                        // ... 다른 정보들
                    }),
                };
                this.state.session.signal(signalOptions);
            }, index * 23000);
            setTimeout(() => {
                const signalOptions = {
                    type: 'gameStart',
                    data: JSON.stringify({})
                };
                this.state.session.signal(signalOptions);
                const signalOptions2 = {
                    type: 'captureRender',
                    data: JSON.stringify({})
                };
                this.state.session.signal(signalOptions2);
            }, index * 23000 + 20000);
        }
    }    

    receiveGameSignal() {
        this.state.session.on('signal:gameStart', (event) => {
            console.log('변경 전 showCounter : ' + this.state.showCounter)
            const data = JSON.parse(event.data);
            console.log(data.templateImage);
            console.log(data.otherInfo);
            // ... 다른 정보 처리
            this.setState(
                {
                    showCounter: !this.state.showCounter,
                    gameText: data.quizText,
                    gameAnswer: data.quizAnswer,
                }
            )
            localStorage.setItem('templateURL', data.templateImage)
        })
    }



    async sendScoreSignal() {
        const { myUserName, myScore, capturedImage } = this.state;
        const signalOptions = {
            type: 'scoreUpdate',
            data: JSON.stringify({
                userName: myUserName,
                userScore: myScore,
                capturedImage: capturedImage,
                otherInfo: 'some other data',
                // ... 다른 정보들
            }),
        };
        this.state.session.signal(signalOptions);
        const signalOptions2 = {
            type: 'captureRender',
            data: JSON.stringify({})
        };
        this.state.session.signal(signalOptions2);
    }

    receiveScoreSignal() {
        this.state.session.on('signal:scoreUpdate', (event) => {
            const data = JSON.parse(event.data);
            const { userName, userScore, capturedImage } = data;
            let score;
            if (userScore < 0) {
                score = 0;
            } else {
                score = userScore;
            }
            // ... 다른 정보 처리
            this.setState((prevState) => {
                const updatedScores = { ...prevState.scores };
                const updatedImageArray = {...prevState.capturedImageArray}
                const updatedOneScore = {...prevState.oneScore};
                updatedOneScore[userName] = userScore;
                updatedImageArray[userName] = capturedImage;
                if (updatedScores[userName] === undefined) {
                  updatedScores[userName] = score;
                } else {
                  updatedScores[userName] += score;
                }
                return { scores: updatedScores, capturedImageArray: updatedImageArray };
            });

        });
    }

    receiveCaptureRenderSignal() {
        this.state.session.on('signal:captureRender', (event) => {
            this.setState({
                captureRender: !this.state.captureRender
            })
        })
        console.log('captureRender : ' + this.state.captureRender)
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }


    toggleChat(property) {
        let display = property;

        if (display === undefined) {
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            this.setState({ chatDisplay: display, messageReceived: false });
        } else {
            console.log('chat', display);
            this.setState({ chatDisplay: display });
        }
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }

    handleImageCaptured = (capturedImageBlob) => {
        this.setState(
            {
                capturedImage: capturedImageBlob,
            },
            () => {
                console.log('캡처된이미지 변경 : ' + this.state.capturedImage);
            }
        );
    }
    
    handleScoreUpdate = (similarityScore) => {
        // Check 컴포넌트나 Scoring 컴포넌트로부터 받은 유사도 점수를 상태에 저장
        this.setState({
            myScore: similarityScore,
        }, () => {
            // 유사도 점수가 업데이트된 후에 sendScoreSignal 실행
            if (similarityScore !== 0) {
                this.sendScoreSignal();
            }
        });
    }

    render() {
        var chatDisplay = { display: this.state.chatDisplay };
        const { showCounter, capturedImage, gameText, mySessionId, localUser, myScore, scores, captureRender, capturedImageArray, oneScore } = this.state;
        const templateURL = localStorage.getItem('templateURL')
        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const sortedUsers = Object.keys(capturedImageArray).sort((a, b) => oneScore[b] - oneScore[a]);

        return (
            <div className="container" id="container">
                <ResultCard show={captureRender}>
                    {sortedUsers.map(userName => (
                        <div key={userName}>
                            <h2>{userName}'s Capture</h2>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={URL.createObjectURL(capturedImageArray[userName])} alt="User Capture" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                                <img src={templateURL} alt="Template" style={{ maxWidth: '80%', maxHeight: '80%', opacity: 0.5 }} />
                            </div>
                        </div>
                    ))}
                </ResultCard>
                <div className='bgimg'/>
                <ToolbarComponent
                    sessionId={mySessionId}
                    user={localUser}
                    showNotification={this.state.messageReceived}
                    camStatusChanged={this.camStatusChanged}
                    micStatusChanged={this.micStatusChanged}
                    toggleFullscreen={this.toggleFullscreen}
                    leaveSession={this.leaveSession}
                    toggleChat={this.toggleChat}
                />
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                    // 채팅 컴포넌트
                    <div style={chatDisplay}>
                        <ChatComponent
                            user={localUser}
                            chatDisplay={this.state.chatDisplay}
                            close={this.toggleChat}
                            messageReceived={this.checkNotification}
                        />
                    </div>
                )}

                {/* Counter 컴포넌트를 렌더링하고 필요한 props를 전달합니다 */}
                {showCounter && (
                    <div className="counter-container">
                        {/* localUser와 onImageCaptured props를 전달합니다 */}
                        <Counter localUser={localUser} onImageCaptured={this.handleImageCaptured} showCounter={showCounter} />
                    </div>
                )}
                {/* Check 컴포넌트를 여기에 렌더링합니다 */}
                {showCounter && capturedImage && (
                    <div style={{ position: 'absolute', zIndex: 9999, overflow: 'visible', top:'60%', transform: 'translate(-50%, -50%)', left:'35%'}}>
                        <Check image={this.state.capturedImage} answer={this.state.gameAnswer} showCounter={showCounter} onScoreUpdate={this.handleScoreUpdate} />
                    </div>
                )}

                <DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />
                
                <div className="bounds">
                    {/* 시그널 보내는 버튼 */}
                    <WhiteBox>
                        <h1>스코어보드</h1>
                        <ul>
                            {sortedScores.map(([nickName, totalScore], index) => (
                                <li key={nickName}>
                                {index + 1}. {nickName}: {totalScore.toFixed(0)}점
                                </li>
                            ))}
                        </ul>
                        {localStorage.getItem('hostOf') === localStorage.getItem('roomCode') && (
                            <Button onClick={this.sendGameSignal} style={{ position: 'absolute', zIndex: '999999999999', left:'30%', top:'85%' }}> 게임 시작 </Button>
                        )}
                    </WhiteBox>
                        {showCounter && (
                            <Card
                                style={{ 
                                    whiteSpace: 'pre-line',
                                    fontSize: '20px', 
                                    height: '20%',
                                    width: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                 }}
                                >
                                <p className="m-0">
                                    {gameText}
                                    <br />
                                    유사도 점수: {myScore.toFixed(2)}%
                                </p>
                            </Card>
                        )}
                    <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', minHeight: '150px' }}>
                        {!showCounter && this.state.subscribers.map((sub, i) => (
                            <Carousel
                            value={this.state.subscribers}
                            numVisible={3} // You can adjust the number of visible items
                            numScroll={1}
                            responsiveOptions={[
                              {
                                breakpoint: '1024px',
                                numVisible: 2,
                                numScroll: 1,
                              },
                              {
                                breakpoint: '768px',
                                numVisible: 1,
                                numScroll: 1,
                              },
                            ]}
                          >
                            <div key={i} id="remoteUsers" style={{ 
                                display:'inline-block',
                                width:'200px',
                                height:'115px',
                                position:'relative',
                                margin: '0px 1px 0px', // 스트림 간격 조절
                                transform: `translate(-50%, -50%) translateX(${20 * i}%)`, // i에 따라서 x 방향으로 이동
                                top: '75px',
                                left: '135px',
                                }}>
                                    <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                                </div>
                                </Carousel>
                    ))}
                    </div>
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        // 화면 위치 및 크기 조정
                        <div id="localUser" style={{ display:'inline-block', width:'720px', height:'540px', top:'62%', transform: 'translate(-50%, -50%)', left:'32%', position:'absolute'}}>
                            <StreamComponent user={localUser} handleNickname={this.nicknameChanged} />
                            <img
                                src={templateURL}
                                alt="Sample"
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    zIndex: '1',
                                    opacity: '0.3',
                                }}
                            />
                        </div>
                    )}
                    
                    
                </div>
            </div>
        );
    }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */



    async getToken() {
        try {
            console.log('1번 후보 : ')
            console.log(`${APPLICATION_SERVER_URL}/openvidu/api/sessions/${this.state.mySessionId}`);
            console.log('2번 후보 : ' + APPLICATION_SERVER_URL + '/openvidu/api/sessions/' + this.state.mySessionId);
            const sessionData = await axios.get(`${APPLICATION_SERVER_URL}/openvidu/api/sessions/${this.state.mySessionId}`, {
                headers: { "Authorization": openvidu_key, 'Content-Type': 'application/json' },});
            console.log(sessionData.data);    
            const sessionId = sessionData.data.sessionId;
            console.log(sessionId)
            console.log('이미 있는 방' + sessionId);
            return await this.createToken(sessionId);
        }
        catch(error){
                    
            const sessionData = await this.createSession(this.state.mySessionId);
            const sessionId = sessionData.sessionId;
            console.log('새로운 방' + sessionId);
            return await this.createToken(sessionId);
        }
        
    }

    async createSession(sessionId) {
        console.log('세션 생성')
        console.log(APPLICATION_SERVER_URL + '/openvidu/api/sessions')
        const response = await axios.post(APPLICATION_SERVER_URL + '/openvidu/api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*", "Authorization": openvidu_key,},
        });
        console.log('createSession 리턴값------------')
        console.log(response.data)
        return response.data; // The sessionId
    }




    async createToken(sessionId) {
        
        console.log(APPLICATION_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection')
        const response = await axios.post(APPLICATION_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', {}, {
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin" : "*", "Authorization": openvidu_key,},
        });
        console.log('토큰 생성 확인')
        console.log(response.data.token)
        return response.data.token; // The token
    }
}

const mapStateToProps = (state) => ({
  userName: decodeState(state.auth.userName), // 리덕스 스토어에서 가져올 값의 키
});

export default connect(mapStateToProps)(VideoRoomComponent);

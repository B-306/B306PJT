import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';
import Counter from './secCounter';
import Check from './game/Check';
import Button from './common/Button';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
// import { v4 } from 'uuid';




var localUser = new UserModel();
console.log('NODE_ENV 상태 : ' + process.env.NODE_ENV);
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b306.q.ssafy.io/api2' : 'https://i9b306.q.ssafy.io/api2';
const openvidu_key = process.env.REACT_APP_OPENVIDU_KEY;

class VideoRoomComponent extends Component {

    constructor(props) {
        // let roomCode = v4();
        super(props);
        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();
        let sessionName = this.props.sessionName ? this.props.sessionName : localStorage.getItem('roomCode'); // 'sessionA' 대신 방 코드 
        let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName,
            myUserName: userName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            currentVideoDevice: undefined,
            showCounter: false, // Counter 컴포넌트를 표시할지 여부를 나타내는 상태 변수
            capturedImage: null, // 이미지 데이터를 저장할 상태 변수
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        // this.updateLayout = this.updateLayout.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }

    componentDidMount() {
        const openViduLayoutOptions = {
            maxRatio: 3 / 4, // The narrowest ratio that will be used (default 2x3)
            minRatio: 3 / 4, // The widest ratio that will be used (default 16x9)
            fixedRatio: true, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: true, // fixedRatio for the big ones
            bigMaxRatio: 3 / 4, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 3 / 4, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };

        this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', this.onbeforeunload);
        // window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);
        // 게임시작 버튼을 누르면 이벤트리스너가 발동될까?
        this.state.session.on('signal:gameStart', (event) => {
            // gameStart 시그널을 수신했을 때 실행될 로직을 작성
            console.log('게임시작 시그널 수신')
            this.startCounter(); // 예시로 Counter를 시작하는 함수를 호출
        });
        this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        // window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    startCounter() {
        this.setState(
            {
            showCounter:true,
        }
        )
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
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                // this.updateLayout();
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
                        isScreenShareActive: this.state.localUser.isScreenShareActive(),
                    });
                }
                // this.updateLayout();
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
            // var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
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
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            // this.updateLayout();
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
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }





    // updateLayout() {
    //     setTimeout(() => {
    //         this.layout.updateLayout();
    //     }, 20);
    // }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }
    

    sendSignal = () => {
        const signalOptions ={
            data: localStorage.getItem('selectedQuizes'),
            type: 'gameStart',
        }
        this.state.session.signal(signalOptions);
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

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: localUser.isAudioActive(),
                        publishVideo: localUser.isVideoActive(),
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.localUser.getStreamManager());
                    await this.state.session.publish(newPublisher)
                    this.state.localUser.setStreamManager(newPublisher);
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        const publisher = this.OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            (error) => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    this.setState({ showExtensionDialog: true });
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            },
        );

        publisher.once('accessAllowed', () => {
            this.state.session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            this.state.session.publish(localUser.getStreamManager()).then(() => {
                localUser.setScreenShareActive(true);
                this.setState({ localUser: localUser }, () => {
                    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                });
            });
        });
        publisher.on('streamPlaying', () => {
            // this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        this.layout.setLayoutOptions(openviduLayoutOptions);
        // this.updateLayout();
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
        // this.updateLayout();
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }

    handleImageCaptured = (capturedImageBlob) => {
        this.setState({
            capturedImage: capturedImageBlob,
        });
    }
    
    render() {
        const mySessionId = this.state.mySessionId;
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };
        const { showCounter, capturedImage } = this.state;


        return (
            <div className="container" id="container">
                <ToolbarComponent
                    sessionId={mySessionId}
                    user={localUser}
                    showNotification={this.state.messageReceived}
                    camStatusChanged={this.camStatusChanged}
                    micStatusChanged={this.micStatusChanged}
                    screenShare={this.screenShare}
                    stopScreenShare={this.stopScreenShare}
                    toggleFullscreen={this.toggleFullscreen}
                    switchCamera={this.switchCamera}
                    leaveSession={this.leaveSession}
                    toggleChat={this.toggleChat}
                />
                
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                    <div className="OT_root OT_publisher custom-class" id="localUser" style={{ display:'inline-block', width:'80%', height:'80%', top:'50%', transform: 'translate(-50%, -50%)', left:'50%', position:'absolute'}}>
                        <StreamComponent user={localUser} handleNickname={this.nicknameChanged} />
                    </div>
                )}
                {/* Counter 컴포넌트를 렌더링하고 필요한 props를 전달합니다 */}
                {showCounter && (
                    <div className="counter-container">
                        {/* localUser와 onImageCaptured props를 전달합니다 */}
                        <Counter localUser={localUser} onImageCaptured={this.handleImageCaptured} />
                    </div>
                )}
                {/* Check 컴포넌트를 여기에 렌더링합니다 */}
                {capturedImage && (
                    <div style={{ position: 'absolute', zIndex: 9999, overflow: 'visible', top:'60%', transform: 'translate(-50%, -50%)', left:'50%'}}>
                        <Check image={this.state.capturedImage} />
                    </div>
                )}

                <DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />
                
                <div id="layout" className="bounds">
                    {/* 시그널 보내는 버튼 */}
                    {localStorage.getItem('hostOf') === localStorage.getItem('roomCode') && (
                        <Button onClick={this.sendSignal} style={{ position: 'relative', zIndex: '999999999999'}}> 이 버튼 누르기 </Button>
                    )}
                    {this.state.subscribers.map((sub, i) => (
                        <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers" style={{ display:'inline-block', width:'20%', height:'20%', position:'relative'}}>
                            <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                        </div>
                    ))}
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div className="OT_root OT_publisher custom-class" id="localUser" style={{ display:'inline-block', width:'640px', height:'480px', top:'60%', transform: 'translate(-50%, -50%)', left:'50%', position:'absolute'}}>
                            <StreamComponent user={localUser} handleNickname={this.nicknameChanged} />
                            <img
                                src={require('../assets/images/test_sample.png')}
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
                    
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        // 채팅 컴포넌트
                        <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                            <ChatComponent
                                user={localUser}
                                chatDisplay={this.state.chatDisplay}
                                close={this.toggleChat}
                                messageReceived={this.checkNotification}
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
export default VideoRoomComponent;

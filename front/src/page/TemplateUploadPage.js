import React from 'react';
import TemplateUploader from '../components/templates/templateUploader'; // TemplateUploader 컴포넌트의 경로를 정확하게 설정해야 함

function TemplateUploadPage() {
    const handleUploadButtonClick = () => {
        // 업로드 버튼이 클릭되었을 때 실행될 로직을 작성
        // 예: 서버에 데이터 전송, 알림 메시지 표시 등
    };

    return (
        <div>
            {/* 다른 내용 */}
            <TemplateUploader />
            <button onClick={handleUploadButtonClick}>템플릿 업로드</button>
        </div>
    );
}

export default TemplateUploadPage;

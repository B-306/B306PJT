package com.ssafy.B306.domain.mail;

import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import com.ekiras.exception.BaseException;

@Service
public class MailService {
    private MimeMessage createMessage(String code, String email) throws Exception{
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("B306 회원가입 인증 이메일");
        message.setText("이메일 인증코드" + code);

        message.setFrom(new InternetAddress(Secert.PECIPIENT));

        return message;
    }

    public void sendMail(String code, String email) throws Exception{
        try{
            MimeMessage mimeMessage = createMessage(code, email);
            javaMailSender.send(mimeMessage);
        } catch (MailException mailException){
            mailException.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public long sendCertificationMail(String email) throws BaseException{
        if(userPro)
    }
}

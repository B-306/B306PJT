package com.ssafy.B306.domain.ImageUpload;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class ImageController {

    @Autowired
    private AmazonS3 amazonS3Client; // Amazon S3 클라이언트 주입

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @GetMapping("/getimage")
    public ResponseEntity<byte[]> getImageFromS3(String imageUrl) throws IOException {
        System.out.println(bucket);
        System.out.println(imageUrl);
        int lastSlashIndex = imageUrl.lastIndexOf('/');

        String url = imageUrl.substring(lastSlashIndex + 1);
        S3Object s3Object = amazonS3Client.getObject(bucket, url);
        System.out.println(s3Object.getObjectMetadata());
        InputStream inputStream = s3Object.getObjectContent();

        byte[] imageBytes = IOUtils.toByteArray(inputStream);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG); // 이미지 유형에 맞게 설정
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}

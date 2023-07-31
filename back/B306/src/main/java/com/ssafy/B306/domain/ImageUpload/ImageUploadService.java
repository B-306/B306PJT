package com.ssafy.B306.domain.ImageUpload;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageUploadService {

    private String basePath = "src/main/resources/image/";

    public String makeImagePath(MultipartFile file, String type) {

        String originFileName = file.getOriginalFilename();
        String fileName = originFileName.substring(originFileName.lastIndexOf("\\") + 1);
        String uuid = UUID.randomUUID().toString();
        String saveName = basePath + File.separator + type + File.separator + uuid + "_" + fileName;

        Path savePath = Paths.get(saveName);

        try{
            file.transferTo(savePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return saveName;
    }
}

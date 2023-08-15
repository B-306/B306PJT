package com.ssafy.B306.domain.exception;

import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class JwtExceptionResponse {

    private final String message;

    @Builder
    public JwtExceptionResponse(String message) {
        this.message = message;
    }

    public String convertToJson() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);

        return jsonObject.toString();
    }
}

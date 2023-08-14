package com.ssafy.B306.domain.exception;

import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class JwtExceptionResponse {

    private final String message;
    private final HttpStatus httpStatus;

    @Builder
    public JwtExceptionResponse(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public String convertToJson() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        jsonObject.put("HttpStatus", httpStatus);

        return jsonObject.toString();
    }
}

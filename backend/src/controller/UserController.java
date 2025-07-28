package com.example.erp.controller;

import com.example.erp.entity.User;
import com.example.erp.dto.UserLoginRequest;
import com.example.erp.dto.UserSignupRequest;
import com.example.erp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody UserSignupRequest request) {
        userService.signup(request.getUsername(), request.getPassword());
        return "회원가입 성공!";
    }

    //로그인
    @PostMapping("/login")
    public String login(@RequestBody UserLoginRequest request) {
        return userService.login(request.getUsername(), request.getPassword());
    }


    @GetMapping("/api/mypage")
    public String mypage(@AuthenticationPrincipal String username) {
        return "안녕하세요, " + username + "님!";
    }



}

package com.sgt.hrisportal.web;
import com.sgt.hrisportal.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class userResource {
    @Autowired
    userService userService;

    @PostMapping("/user")
    public ResponseEntity<Map<String,Object>> insertUser(@RequestBody Map<String,Object> body){
        return userService.insertUser(body);

    }

    @PostMapping("/qualifications")
    public ResponseEntity<Map<String,Object>> insertQualifications(@RequestBody Map<String,Object> body){
        return userService.insertQualification(body);

    }

    @PostMapping("/jobHistory")
    public ResponseEntity<Map<String,Object>> insertJobHistory(@RequestBody Map<String,Object> body){
        return userService.insertJobHistory(body);


    }

    @PostMapping("/additionalInfo")
    public ResponseEntity<Map<String,Object>> insertAdditionalInfo(@RequestBody Map<String,Object> body){
        return userService.insertAdditionalInfo(body);
    }

    @PostMapping("/photo")
    public ResponseEntity<Map<String,Object>> insertPhoto(@RequestBody Map<String,Object> body){
        return userService.insertPhoto(body);
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String,Object> body){
        return userService.login(body);
    }


    @PostMapping("/uploadFile")
    public void UploadFile(@RequestParam("file") MultipartFile file,@RequestParam("name") String name){
        userService.uploadFile(file,name);
    }

}


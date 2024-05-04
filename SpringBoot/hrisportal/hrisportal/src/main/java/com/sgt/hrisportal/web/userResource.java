package com.sgt.hrisportal.web;
import com.sgt.hrisportal.service.userService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins={"http://localhost:4200","http://localhost:63145"},allowCredentials = "true")
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
    public void UploadFile(@RequestParam("file") MultipartFile file,@RequestParam("name") String name,
                           @RequestParam("userid") int userid){
        userService.uploadFile(file,name,userid);
    }



    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getCount(HttpServletRequest httpServletRequest){
        return userService.getCount(httpServletRequest);
    }

    @GetMapping("/singleUserDetails")
    public ResponseEntity<Map<String,Object>> getUserDetails(HttpServletRequest httpServletRequest){
        return userService.getUserDetails(httpServletRequest);
    }

    @GetMapping("/userApplicationDetails")
    public ResponseEntity<List<Map<String,Object>>> userApplicationDetails(HttpServletRequest httpServletRequest){
        return userService.userApplicationDetails(httpServletRequest);
    }

    @PostMapping("/sendMail")
    public ResponseEntity<Map<String,Object>> validateAndSendMail(@RequestBody String email){
        return userService.validateAndSendMail(email);
    }

    @GetMapping("/getQualificationsOfUser/{id}")
    public ResponseEntity<List<Map<String ,Object>>> getQualificationsOfUser(@PathVariable("id") int id,
            HttpServletRequest httpServletRequest){
        return userService.getQualificationsOfUser(id,httpServletRequest);
    }

    @GetMapping("/getJobHistoryOfUser/{id}")
    public ResponseEntity<List<Map<String ,Object>>> getJobHistoryOfUser(@PathVariable("id") int id,
            HttpServletRequest httpServletRequest){
        return userService.getJobHistoryOfUser(id,httpServletRequest);
    }


    @PostMapping("/changePwd")
    public ResponseEntity<Map<String,Object>> changePwd(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return userService.changePwd(body,httpServletRequest);
    }

    @GetMapping("/depts")
    public List<Map<String,Object>> fetchDepts(){
            return userService.fetchDepts();
    }


    @PostMapping("/sendAnything")
    public void sendAnything(@RequestBody Map<String,Object> body){
        userService.sendAnything(body);
    }

    @GetMapping(value = "/GetFiles/{userid}/{folder}",produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getFiles(@PathVariable String userid,@PathVariable String folder) throws IOException{
        int user_id=Integer.parseInt(userid);
        String extension=userService.getExtension(user_id,folder);
        String fileName=userid+"."+extension;

        return Files.readAllBytes(Paths.get(folder+"/"+fileName));
    }

    @PostMapping("/insertDocuments")
    public ResponseEntity<Map<String, Object>> insertDocuments(@RequestBody Map<String,Object> body){
        return userService.insertDocuments(body);
    }

    @PostMapping("/validateFpToken")
    public ResponseEntity<Map<String,Object>> validateFpToken(@RequestBody String token){
        return userService.validateFpToken(token);
    }


    @PostMapping("/resetPwd")
    public ResponseEntity<Map<String,Object>> resetPwd(@RequestBody Map<String,Object> form){
        return userService.resetPwd(form);
    }



    @GetMapping("/alreadyExists/{username}/{email}")
    public Map<String,Object> alreadyExists(@PathVariable String username, @PathVariable String email){
        return userService.alreadyExists(username,email);
    }


}


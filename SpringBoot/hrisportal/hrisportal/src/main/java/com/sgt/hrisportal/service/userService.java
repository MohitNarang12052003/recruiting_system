package com.sgt.hrisportal.service;

import com.sgt.hrisportal.repository.userRepository;
import com.sgt.hrisportal.utils.AppConstants;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class userService {
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    userRepository userRepository;

    public boolean isValidToken(HttpServletRequest httpServletRequest){
        System.out.println("Here");
        Cookie[] cookies=httpServletRequest.getCookies();
        for(Cookie c:cookies){
            System.out.println(c.getName());
        }

        Map<String,String> cookieMap =getCookiesAsHashMap(cookies);
        System.out.println(cookieMap);
        if(cookieMap.containsKey("user_id")){
            Map<String,Object> result=userRepository.validateToken(Integer.parseInt(cookieMap.get("user_id")),
                    cookieMap.get("token"));
            Integer validYN=(Integer) result.get("validYN");
            return validYN == -1;
        }

        if(cookieMap.containsKey("employee_id")){
            Map<String,Object> result= userRepository.validateToken(Integer.parseInt(cookieMap.get("employee_id")),cookieMap.get("token"));
            Integer validYN=(Integer) result.get("validYN");
            return validYN == 0;
        }

        if(cookieMap.containsKey("hr_id")){
            Map<String,Object> result= userRepository.validateToken(Integer.parseInt(cookieMap.get("hr_id")),cookieMap.get("token"));
            Integer validYN=(Integer) result.get("validYN");
            return validYN == 1;
        }


        return false;
    }

    private Map<String,String> getCookiesAsHashMap(Cookie[] cookies){
        Map<String,String> cookieMap = new HashMap<>();
        for(Cookie c : cookies){
            cookieMap.put(c.getName(),c.getValue());

        }

        return cookieMap;
    }


    public Map<String,Object> alreadyExists(String username,String password){

        return userRepository.alreadyExists(username,password);

    }

    public ResponseEntity<Map<String, Object>> insertUser(Map<String, Object> body) {
        String fullname = (String) body.get("full_name");
        String username = (String) body.get("username");
        String email = (String) body.get("email");
        String password = (String) body.get("password");
        String dob = (String) body.get("dob");
        String phone = (String) body.get("phone");
        String work_exp = (String) body.get("work_exp");
        String resume = (String) body.get("resume");
        int exp_ctc = (int) body.get("exp_ctc");
        int curr_ctc = (int) body.get("curr_ctc");
        int workexp=0;
        if(work_exp.equals("Y"))  {
            workexp=1;
        }
        int insertedRows = userRepository.insertUser(fullname, username, email, password, dob, phone, workexp, resume,
                exp_ctc, curr_ctc);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public ResponseEntity<Map<String, Object>> insertQualification(Map<String, Object> body) {
        int uid = (int) body.get("uid");
        String deg = (String) body.get("deg");
        String institute = (String) body.get("institute");
        int admission_yr = (int) body.get("admission_yr");
        int completion_yr = (int) body.get("completion_yr");
        double gpa = ((double) body.get("gpa"));

        int insertedRows = userRepository.insertQualification(uid, deg, institute, admission_yr, completion_yr, gpa);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public ResponseEntity<Map<String, Object>> insertJobHistory(Map<String, Object> body) {
        int uid = (int) body.get("uid");
        String cname = (String) body.get("cname");
        String jtitle = (String) body.get("jtitle");
        int fyear = (int) body.get("fyear");
        int tyear = (int) body.get("tyear");
        String desc = (String) body.get("desc");

        int insertedRows = userRepository.insertJobHistory(uid, cname, jtitle, fyear, tyear, desc);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }


    public ResponseEntity<Map<String, Object>> insertAdditionalInfo(Map<String, Object> body) {
        int uid = (int) body.get("uid");
        String gender = (String) body.get("gender");
        String nationality = (String) body.get("nationality");
        String address = (String) body.get("address");
        String state = (String) body.get("state");
        String city = (String) body.get("city");
        String pincode = (String) body.get("pincode");
        String marital_status = (String) body.get("marital_status");
        int insertedRows = userRepository.insertAdditionalInfo(uid, gender, nationality, address, state, city,pincode,marital_status);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }



    public ResponseEntity<Map<String, Object>> insertPhoto(Map<String, Object> body) {
        int uid = Integer.parseInt((String)body.get("uid")) ;
        String photo = (String) body.get("photo");

        int insertedRows = userRepository.insertPhoto(uid, photo);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public void uploadFile(MultipartFile data,String name,int id) {
        System.out.println(name);
        Path path = Paths.get(name);
        try {
            if (!Files.exists(path)) {
                Files.createDirectory(path);
            }
            String fileName = StringUtils.cleanPath(data.getOriginalFilename());
            System.out.println(fileName);
            String[] extension=fileName.split(Pattern.quote("."));
            for(int i=0;i<extension.length;i++){
                System.out.println(extension[i]);
            }
            Path finalPath = path.resolve(id+"."+extension[1]);

            InputStream inputStream = data.getInputStream();
            System.out.println(inputStream);
            Files.copy(inputStream, finalPath, StandardCopyOption.REPLACE_EXISTING);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Map<String, Object> login(Map<String, Object> body) {
        String email = (String) body.get("email");
        String pwd = (String) body.get("pwd");

        return userRepository.login(email, pwd);



    }

    public ResponseEntity<Map<String ,Object>> getCount(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(userRepository.getCount());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.EMPTY_MAP);

    }


    public ResponseEntity<Map<String,Object>> getUserDetails(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Cookie[] cookies=httpServletRequest.getCookies();
            Map<String,String> map=getCookiesAsHashMap(cookies);


            return ResponseEntity.ok(userRepository.getUserDetails(Integer.parseInt(map.get("user_id"))));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }

    public ResponseEntity<List<Map<String,Object>>> userApplicationDetails(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Cookie[] cookies=httpServletRequest.getCookies();
            Map<String,String> map=getCookiesAsHashMap(cookies);


            return ResponseEntity.ok(userRepository.userApplicationDetails(Integer.parseInt(map.get("user_id"))));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    public ResponseEntity<Map<String,Object>> validateAndSendMail(String email){
            int isValidEmail=verifyEmail(email);

            if(isValidEmail!=-2){
                String token=generateFPToken(email,isValidEmail);

                String link=generateLink(token);

                sendMail(link,email);

                return ResponseEntity.ok(Collections.emptyMap());
            }
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Collections.emptyMap());
        }



    public void sendMail(String link,String email){
        MimeMessage mimeMessage= javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage);

        try{
            mimeMessageHelper.setSubject("Reset Password");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setText(
                    "<h3>Reset Password Link </h3>"+link
                    ,true);

        }
        catch (MessagingException e){
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);
    }



    public int verifyEmail(String email){
        Map<String,Object> result=userRepository.verifyMail(email);
        return (int) result.get("validYN");
    }

    public String generateFPToken(String email,int role){
        Map<String,Object> result=userRepository.generateFPToken(email,role);
        String fp_roken=(String) result.get("fp_token");

        return fp_roken;
    }

    public String generateLink(String token){
        return AppConstants.RESET_URL+token;
    }

    public ResponseEntity<List<Map<String ,Object>>> getQualificationsOfUser(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(userRepository.getQualificationsOfUser(id));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }
    public ResponseEntity<List<Map<String ,Object>>> getJobHistoryOfUser(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(userRepository.getJobHistoryOfUser(id));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }


    public ResponseEntity<Map<String,Object>> changePwd(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Map<String,String> cookieMap=getCookiesAsHashMap(httpServletRequest.getCookies());
            String email=cookieMap.get("email");
            String old_pwd=(String) body.get("old_pwd");
            String new_pwd=(String) body.get("new_pwd");

            int insertedRows = userRepository.changePwd(email,old_pwd,new_pwd);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));

            }




        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<Map<String,Object>> validateFpToken(String token){
        Map<String,Object> result=userRepository.validateFpToken(token);

        if((int)result.get("validYN")==-2){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Collections.emptyMap());
        }

        return ResponseEntity.ok(Collections.emptyMap());

    }

    public ResponseEntity<Map<String,Object>> resetPwd(Map<String,Object> form){
        String token=(String) form.get("token");
        String password=(String) form.get("new_pwd");

        Map<String,Object> result=userRepository.validateFpToken(token);
        int role=(int) result.get("validYN");

        int insertedRows=userRepository.resetPwd(token,password,role);
        if(insertedRows>0){
            return ResponseEntity.ok(Collections.emptyMap());
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Collections.emptyMap());

    }


    public List<Map<String, Object>> fetchDepts() {
        return userRepository.fetchDepts();
    }

    public void sendAnything(Map<String,Object> body) {
        MimeMessage mimeMessage =javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage);
        String email=(String)body.get("email");
        String text=(String)body.get("anything");
//        String sender=(String)body.get("emailSender");
        String sender="mohitnarang2003.mn@gmail.com";

        try {
            mimeMessageHelper.setSubject("Contact Us Queries - HRIS");
            mimeMessageHelper.setTo(sender);
            mimeMessageHelper.setText(text);
//            mimeMessageHelper.setFrom(email); // Set the from address
            mimeMessageHelper.setReplyTo(email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);

    }

    public String getExtension(int userid,String folder){
        Map<String,Object> body=userRepository.getExtension(userid,folder);
        System.out.println("1002"+body);
        String fileName=(String)body.get("document");
        String[] extension=fileName.split(Pattern.quote("."));
        return extension[1];
    }

    public ResponseEntity<Map<String, Object>> insertDocuments(Map<String, Object> body) {
        String aadhar=(String)body.get("aadhar");
        String pan=(String)body.get("pan");
        String voter=(String)body.get("voter");
        String ifsc_code=(String)body.get("ifsc_code");
        String account_no=(String)body.get("account_no");
        String passport_no=(String)body.get("passport_no");
        String name_of_acc_holder=(String)body.get("name_of_acc_holder");
        String esign=(String)body.get("esign");
        int user_id=(int) body.get("user_id");

        int insertedRows = userRepository.insertDocuments(aadhar,pan,voter,ifsc_code,name_of_acc_holder,passport_no,
                esign,user_id,account_no);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }



        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());

    }


}

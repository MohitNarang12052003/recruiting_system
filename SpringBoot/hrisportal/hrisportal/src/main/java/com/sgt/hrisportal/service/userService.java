package com.sgt.hrisportal.service;

import com.sgt.hrisportal.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@Service
public class userService {
    @Autowired
    userRepository userRepository;

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
        float gpa = (int) body.get("gpa");

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
        int uid = (int) body.get("uid");
        String photo = (String) body.get("photo");

        int insertedRows = userRepository.insertPhoto(uid, photo);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));

        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public void uploadFile(MultipartFile data,String name) {
        System.out.println(name);
        Path path = Paths.get(name);
        try {
            if (!Files.exists(path)) {
                Files.createDirectory(path);
            }
            String fileName = StringUtils.cleanPath(data.getOriginalFilename());
            Path finalPath = path.resolve(fileName);
            ///uploads/harsh_cha
            InputStream inputStream = data.getInputStream();
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




}

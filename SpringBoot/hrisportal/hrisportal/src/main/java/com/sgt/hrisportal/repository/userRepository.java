package com.sgt.hrisportal.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class userRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int insertUser(String fullname, String username, String email, String password, String dob, String phone,int workexp,String resume,int exp_ctc,int curr_ctc){
        return jdbcTemplate.update("EXEC  hrisportal.sp_insert_user ?,?,?,?,?,?,?,?,?,?",username,email,password,fullname,dob,phone,workexp,resume,exp_ctc,curr_ctc);
    }

    public int insertQualification(int uid,String deg, String institute,int admission_yr,int completion_yr,float gpa){
        return jdbcTemplate.update("EXEC hrisportal.sp_insert_qualifications ?,?,?,?,?,?",uid,deg,institute,admission_yr,completion_yr,gpa);
    }

    public int insertJobHistory(int uid,String cname, String jtitle,int fyear,int tyear,String desc){
        return jdbcTemplate.update("EXEC hrisportal.sp_insert_jobHistory ?,?,?,?,?,?",uid,cname,jtitle,fyear,tyear,desc);
    }

    public int insertAdditionalInfo(int uid,String gender, String nationality,String address,String state,String city,String pincode,String marital_status){
        return jdbcTemplate.update("EXEC hrisportal.sp_insert_additionalInfo ?,?,?,?,?,?,?,?",uid,gender,nationality,address,state,city,pincode,marital_status);
    }

    public int insertPhoto(int uid,String photo){
        return jdbcTemplate.update("EXEC hrisportal.sp_insert_photo ?,?",uid,photo);
    }

    public Map<String,Object> login(String email, String password){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_login ?,?",email,password);
    }



}


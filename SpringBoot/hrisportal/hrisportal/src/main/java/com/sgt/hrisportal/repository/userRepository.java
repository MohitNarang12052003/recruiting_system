package com.sgt.hrisportal.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    public Map<String,Object> getCount(){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_get_count");
    }

    public Map<String, Object> validateToken(int userid, String token){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_validate_token ?,?",token,userid);
    }

    public Map<String,Object> getUserDetails(int id){
        return jdbcTemplate.queryForMap("EXEC [hrisportal].[sp_user_details] ?",id);
    }

    public List<Map<String,Object>> userApplicationDetails(int id){
        return jdbcTemplate.queryForList("EXEC [hrisportal].sp_user_applications_detail ?",id);
    }

    public Map<String ,Object> verifyMail(String email){
        return jdbcTemplate.queryForMap("EXEC [hrisportal].sp_verify_email ?",email);
    }

    public Map<String ,Object> generateFPToken(String email,int role){
        return jdbcTemplate.queryForMap("EXEC [hrisportal].sp_generate_fp_token ?,?",email,role);
    }

    public List<Map<String,Object>> getQualificationsOfUser(int id){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_get_qualifications_of_user ?",id);
    }

    public List<Map<String,Object>> getJobHistoryOfUser(int id){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_get_job_history_of_user ?",id);
    }

    public int changePwd(String email,String old_pwd,String new_pwd){
        return jdbcTemplate.update("EXEC hrisportal.sp_change_pwd ?,?,?",email,old_pwd,new_pwd);
    }

    public Map<String ,Object> validateFpToken(String token){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_validate_fp_token ?",token);
    }

    public int resetPwd(String token,String password,int role){
        return jdbcTemplate.update("EXEC hrisportal.sp_reset_pwd ?,?,?",token,password,role);
    }

}


package com.sgt.hrisportal.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class jobRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> fetchJobs(){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_fetch_all_jobs");
    }

    public Map<String,Object> insertJob(String jobTitle,String jobDescription,String minQualification,
                                     String employmentType,
                         String keyRole,
                         String location,String departmentName,String skills,int hrid){
        System.out.println("print");
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_insert_jobs ?,?,?,?,?,?,?,?,?",jobTitle,jobDescription,
                minQualification,employmentType,keyRole,
                location,departmentName,skills,hrid);
    }

    public int applyJob(int userid,int j_id){
        return jdbcTemplate.update("EXEC hrisportal.sp_insert_applications ?,?",userid,j_id);
    }

    public List<Map<String,Object>> viewApplications(){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_view_applications");
    }

    public List<Map<String,Object>> viewEmployees(){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_view_employees");
    }

    public List<Map<String,Object>> viewVacancies(){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_view_vacancies");
    }

    public Map<String,Object> viewSingleApplicant(int id){
        return jdbcTemplate.queryForMap("EXEC  hrisportal.sp_single_applicant ?",id);
    }

    public int updateApplication(int id,int round_1,int round_2,int round_3,int offer_letter,int doc_verification){
        return jdbcTemplate.update("EXEC hrisportal.sp_update_applicant ?,?,?,?,?,?",id,round_1,round_2,round_3,doc_verification,offer_letter);
    }

    public Map<String, Object> validateToken(int userid, String token){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_validate_token ?,?",token,userid);
    }

    public Map<String,Object> viewSingleEmployee(int id){
        return jdbcTemplate.queryForMap("EXEC  hrisportal.sp_view_single_employee ?",id);
    }

    public int toggleVacancy(int id){
        System.out.println(5);
        return jdbcTemplate.update("EXEC hrisportal.sp_toggle_vacancy ?",id);
    }

}

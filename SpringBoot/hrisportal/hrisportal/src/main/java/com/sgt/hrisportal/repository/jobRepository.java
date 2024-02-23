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
}

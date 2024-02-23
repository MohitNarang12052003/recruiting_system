package com.sgt.hrisportal.service;


import com.sgt.hrisportal.repository.jobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class jobService {

    @Autowired
    jobRepository jobRepository;

    public List<Map<String,Object>> fetchJobs(){
        return jobRepository.fetchJobs();
    }

    public ResponseEntity<Map<String, Object>> insertJob(Map<String, Object> body) {
        String jobTitle =(String)body.get("jobTitle");
        String jobDescription=(String)body.get("jobDescription");
        String minQualification=(String)body.get("minQualification");
        String employmentType =(String)body.get("employmentType");
        String keyRole  =(String)body.get("keyRole");
        String location =(String)body.get("location");
        String departmentName =(String)body.get("departmentName");
        String skills =(String)body.get("skills");
        int hr_id =(int)body.get("hrid");
        Map<String,Object> insertedRows = jobRepository.insertJob(jobTitle,jobDescription,minQualification,
                employmentType,keyRole,
                location,departmentName,skills,hr_id);

        System.out.println(insertedRows);
        if ((int)insertedRows.get("valid") == 1) {
            return ResponseEntity.ok(Map.of("status", "Successful"));
        }
        System.out.println("Kya hua Sir");
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }

    public ResponseEntity<Map<String, Object>> applyJob(Map<String, Object> body){
        int uid=(int) body.get("userid");
        int j_id=(int)body.get("j_id");
        int insertedRows = jobRepository.applyJob(uid,j_id);

        if (insertedRows > 0) {
            return ResponseEntity.ok(Map.of("status", "Successful"));
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }
    public List<Map<String,Object>> viewApplications(){
        return jobRepository.viewApplications();
    }

}

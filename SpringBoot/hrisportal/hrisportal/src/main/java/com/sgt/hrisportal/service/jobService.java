package com.sgt.hrisportal.service;


import com.sgt.hrisportal.repository.jobRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class jobService {

    @Autowired
    jobRepository jobRepository;

    public boolean isValidToken(HttpServletRequest httpServletRequest){
        System.out.println("Here");
        Cookie[] cookies=httpServletRequest.getCookies();
        for(Cookie c:cookies){
            System.out.println(c.getName());
        }

        Map<String,String> cookieMap =getCookiesAsHashMap(cookies);

        if(cookieMap.containsKey("userid")){
            Map<String,Object> result= jobRepository.validateToken(Integer.parseInt(cookieMap.get("userid")),cookieMap.get("token"));
            Integer validYN=(Integer) result.get("validYN");
            return validYN == -1;
        }

        if(cookieMap.containsKey("employee_id")){
            Map<String,Object> result= jobRepository.validateToken(Integer.parseInt(cookieMap.get("employee_id")),cookieMap.get("token"));
            Integer validYN=(Integer) result.get("validYN");
            return validYN == 0;
        }

        if(cookieMap.containsKey("hr_id")){
            Map<String,Object> result= jobRepository.validateToken(Integer.parseInt(cookieMap.get("hr_id")),cookieMap.get("token"));
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

    public List<Map<String,Object>> unsuccessfulList(){
        Map<String,Object> map=new HashMap<>();
        List<Map<String,Object>> list=new ArrayList<>();
        map.put("status","unsuccessful");
        list.add(map);

        return list;
    }
    public Map<String,Object> unsuccessfulMap(){
        Map<String,Object> map=new HashMap<>();
        map.put("status","unsuccessful");

        return map;
    }

    public List<Map<String,Object>> fetchJobs(){
            return jobRepository.fetchJobs();

    }

    public ResponseEntity<Map<String, Object>> insertJob(Map<String, Object> body,HttpServletRequest httpServletRequest) {
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
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
        }


        System.out.println("Kya hua Sir");
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }

    public ResponseEntity<Map<String, Object>> applyJob(Map<String, Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            int uid=(int) body.get("userid");
            int j_id=(int)body.get("j_id");
            int insertedRows = jobRepository.applyJob(uid,j_id);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }
    public List<Map<String,Object>> viewApplications(HttpServletRequest httpServletRequest){

        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return jobRepository.viewApplications();
        }

        List<Map<String,Object>> list=unsuccessfulList();

        return list;
    }


    public List<Map<String,Object>> viewEmployees(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return jobRepository.viewEmployees();
        }

        List<Map<String,Object>> list=unsuccessfulList();

        return list;

    }

    public List<Map<String,Object>> viewVacancies(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return jobRepository.viewVacancies();
        }

        List<Map<String,Object>> list=unsuccessfulList();

        return list;

    }

    public Map<String,Object> viewSingleApplicant(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return jobRepository.viewSingleApplicant(id);
        }

        Map<String,Object> map=unsuccessfulMap();

        return map;

    }

    public ResponseEntity<Map<String ,Object>> updateApplication(int id, Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            int round_1=(int) body.get("round_1");
            int round_2=(int) body.get("round_2");
            int round_3=(int) body.get("round_3");
            int offer_letter=(int) body.get("offer_letter");
            int doc_verification=(int) body.get("doc_verification");

            int insertedRows = jobRepository.updateApplication(id,round_1,round_2,round_3,offer_letter,doc_verification);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

}

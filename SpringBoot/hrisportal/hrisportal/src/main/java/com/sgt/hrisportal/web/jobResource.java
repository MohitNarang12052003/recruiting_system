package com.sgt.hrisportal.web;


import com.sgt.hrisportal.service.jobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class jobResource {

    @Autowired
    jobService jobService;

    @GetMapping("/jobs")
    public List<Map<String,Object>> fetchjobs(){
        return jobService.fetchJobs();
    }

    @PostMapping("/insertJobs")
    public ResponseEntity<Map<String,Object>> insertJob(@RequestBody Map<String,Object> body){
        return jobService.insertJob(body);
    }

    @PostMapping("/applyJobs")
    public ResponseEntity<Map<String,Object>> applyJob(@RequestBody Map<String,Object> body){
        return jobService.applyJob(body);
    }

    @GetMapping("/viewApplications")
    public List<Map<String,Object>> viewApplications(){
        return jobService.viewApplications();
    }


}

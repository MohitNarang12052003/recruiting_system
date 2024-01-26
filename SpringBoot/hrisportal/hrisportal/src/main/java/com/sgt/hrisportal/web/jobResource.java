package com.sgt.hrisportal.web;


import com.sgt.hrisportal.service.jobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class jobResource {

    @Autowired
    jobService jobService;

    @GetMapping("/jobs")
    public List<Map<String,Object>> fetchjobs(){
        return jobService.fetchJobs();
    }
}

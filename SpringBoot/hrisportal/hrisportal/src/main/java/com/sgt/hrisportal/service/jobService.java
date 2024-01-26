package com.sgt.hrisportal.service;


import com.sgt.hrisportal.repository.jobRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}

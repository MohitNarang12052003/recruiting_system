package com.sgt.hrisportal.web;


import com.sgt.hrisportal.service.jobService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins={"http://localhost:4200"},allowCredentials = "true")
public class jobResource {

    @Autowired
    jobService jobService;

    @GetMapping("/jobs")
    public List<Map<String,Object>> fetchjobs(){

        return jobService.fetchJobs();
    }

    @PostMapping("/insertJobs")
    public ResponseEntity<Map<String,Object>> insertJob(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.insertJob(body,httpServletRequest);
    }

    @PostMapping("/applyJobs")
    public ResponseEntity<Map<String,Object>> applyJob(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.applyJob(body,httpServletRequest);
    }

    @GetMapping("/viewApplications")
    public ResponseEntity<List<Map<String, Object>>> viewApplications(HttpServletRequest httpServletRequest){
        return jobService.viewApplications(httpServletRequest);
    }

    @GetMapping("/viewEmployees")
    public ResponseEntity<List<Map<String, Object>>> viewEmployees(HttpServletRequest httpServletRequest){
        return jobService.viewEmployees(httpServletRequest);
    }

    @GetMapping("/viewVacancies")
    public ResponseEntity<List<Map<String, Object>>> viewVacancies(HttpServletRequest httpServletRequest){

        return jobService.viewVacancies(httpServletRequest);
    }

    @GetMapping("/viewSingleApplicant/{id}")
    public ResponseEntity<Map<String, Object>> viewSingleApplicant(@PathVariable int id, HttpServletRequest httpServletRequest){
        return jobService.viewSingleApplicant(id,httpServletRequest);
    }

    @PostMapping("/updateApplication/{id}")
    public ResponseEntity<Map<String ,Object>> updateApplication(@PathVariable int id,@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.updateApplication(id,body,httpServletRequest);
    }

    @GetMapping("/viewSingleEmployee/{id}")
    public ResponseEntity<Map<String, Object>> viewSingleEmployee(@PathVariable int id, HttpServletRequest httpServletRequest){
        return jobService.viewSingleEmployee(id,httpServletRequest);
    }

    @PostMapping("/toggleVacancy/{id}")
    public ResponseEntity<Map<String, Object>> toggleVacancy(@PathVariable int id,HttpServletRequest httpServletRequest){
        System.out.println(1);
        return jobService.toggleVacancy(id,httpServletRequest);
    }

    @PostMapping("/sendRoundMail")
    public ResponseEntity<Map<String,Object>> sendRoundMail(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.sendRoundMail(body,httpServletRequest);
    }

    @PostMapping("/sendDocumentMail")
    public ResponseEntity<Map<String,Object>> sendDocumentMail(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        System.out.println("map");
        System.out.println(body.size()+" "+body.get("email"));
        return jobService.sendDocumentMail(body,httpServletRequest);
    }

    @PostMapping("/sendEmployeeMail")
    public ResponseEntity<Map<String,Object>> sendEmployeeMail(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.sendEmployeeMail(body,httpServletRequest);
    }


}

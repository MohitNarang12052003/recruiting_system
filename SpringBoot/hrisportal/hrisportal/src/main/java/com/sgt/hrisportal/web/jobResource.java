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

    @GetMapping("/getSkills")
    public ResponseEntity<List<Map<String, Object>>> getSkills(HttpServletRequest httpServletRequest){
        return jobService.getSkills(httpServletRequest);
    }

    @PostMapping("/addSkill")
    public ResponseEntity<Map<String,Object>> addSkill(@RequestBody String body, HttpServletRequest httpServletRequest){
        return  jobService.addSkill(body,httpServletRequest);
    }

    @GetMapping("/fetchGoals")
    public ResponseEntity<List<Map<String, Object>>> fetchGoals(HttpServletRequest httpServletRequest){
        return jobService.fetchGoals(httpServletRequest);
    }


    @PostMapping("/addGoal")
    public ResponseEntity<Map<String,Object>> addGoal(@RequestBody Map<String,Object> body, HttpServletRequest httpServletRequest){
        return  jobService.addGoal(body,httpServletRequest);
    }

    @PostMapping("/deleteGoal")
    public ResponseEntity<Map<String,Object>> deleteGoal(@RequestBody int id, HttpServletRequest httpServletRequest){
        return  jobService.deleteGoal(id,httpServletRequest);
    }

    @GetMapping("/singleGoalData/{id}")
    public ResponseEntity<Map<String, Object>> singleGoalData(@PathVariable int id, HttpServletRequest httpServletRequest){
        return jobService.singleGoalData(id,httpServletRequest);
    }


    @PostMapping("/updateGoal")
    public ResponseEntity<Map<String,Object>> updateGoal(@RequestBody Map<String,Object> body, HttpServletRequest httpServletRequest){
        return  jobService.updateGoal(body,httpServletRequest);
    }



    //nidhi
    @PostMapping("/applyLeave")
    public ResponseEntity<Map<String,Object>> applyLeave(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.applyLeave(body,httpServletRequest);
    }

    @GetMapping("/totalLeavesCount/{id}")
    public ResponseEntity<Map<String, Object>> totalLeavesCount(@PathVariable int id, HttpServletRequest httpServletRequest){
//        System.out.println("inside total leaves count");
        return jobService.totalLeavesCount(id,httpServletRequest);
    }

    @GetMapping("/CategoryWiseCount/{id}")
    public ResponseEntity<List<Map<String, Object>>> CategoryWiseCount(@PathVariable int id, HttpServletRequest httpServletRequest){
        return jobService.CategoryWiseCount(id,httpServletRequest);
    }

    @PostMapping("/addAnnouncement")
    public ResponseEntity<Map<String,Object>> addAnnouncement(@RequestBody Map<String,Object> body,HttpServletRequest httpServletRequest){
        return jobService.addAnnouncement(body,httpServletRequest);
    }

    @GetMapping("/announcement")
    public List<Map<String,Object>> fetchAnnouncement(){

        return jobService.fetchAnnouncement();
    }

    @GetMapping("/allAnnouncement")
    public List<Map<String,Object>> fetchAllAnnouncement(){

        return jobService.fetchAllAnnouncement();
    }



}

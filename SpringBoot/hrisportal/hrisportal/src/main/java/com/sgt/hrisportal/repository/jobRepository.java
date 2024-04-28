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

    public int updateApplication(int id,String round_1,String round_2,String round_3,String offer_letter,String doc_verification){
        return jdbcTemplate.update("EXEC hrisportal.sp_update_applicant ?,?,?,?,?,?",id,round_1,round_2,round_3,doc_verification,offer_letter);
    }

    public Map<String, Object> validateToken(int userid, String token){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_validate_token ?,?",token,userid);
    }

    public Map<String,Object> viewSingleEmployee(int id){
        return jdbcTemplate.queryForMap("EXEC  hrisportal.sp_view_single_employee ?",id);
    }

    public Map<String,Object> getEidFromEmail(String email){
        return jdbcTemplate.queryForMap("EXEC  hrisportal.sp_get_eid_from_email ?",email);
    }


    public int toggleVacancy(int id){
        return jdbcTemplate.update("EXEC hrisportal.sp_toggle_vacancy ?",id);
    }

    public int sendEmployeeMail(int user_id,String job_title,String salary,String department,String new_email,String password,String date_of_joining){
        return jdbcTemplate.update("EXEC hrisportal.sp_create_employee ?,?,?,?,?,?,?",user_id,job_title,salary,department,new_email,password,date_of_joining);
    }

    public List<Map<String,Object>> getSkills(int id){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_fetch_employee_skill ?",id);
    }

    public Map<String, Object> addSkill(String skillName, int id){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_insert_new_employee_skill ?,?",skillName,id);
    }

    public List<Map<String,Object>> fetchGoals(int id){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_fetch_goals ?",id);
    }


    public int addGoal(String title,String description,int id){
        return jdbcTemplate.update("EXEC  hrisportal.sp_add_goal ?,?,?",title,description,id);
    }
    public int deleteGoal(int id){
        return jdbcTemplate.update("EXEC  hrisportal.sp_delete_goal ?",id);
    }

    public Map<String,Object> singleGoalData(int id){
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_single_goal_data ?",id);
    }

    public int updateGoal(int id,String title,String description){
        return jdbcTemplate.update("EXEC  hrisportal.sp_update_goal ?,?,?",id,title,description);
    }



    //nidhi

    public List<Map<String,Object>> fetchAnnouncement(){
        return jdbcTemplate.queryForList("EXEC  hrisportal.fetch_announcements");
    }

    public List<Map<String,Object>> fetchAllAnnouncement(){
        return jdbcTemplate.queryForList("EXEC  hrisportal.fetch_all_announcements");
    }

    public int addAnnouncement(int hrid,String announcement){
        System.out.println("print");
        return jdbcTemplate.update("EXEC hrisportal.insert_announcement ?,?",hrid,announcement);
    }


    public Map<String,Object>  totalLeavesCount(int id){
        return jdbcTemplate.queryForMap("EXEC hrisportal.total_count ?",id);
    }

    public List<Map<String,Object>>  CategoryWiseCount(int id){
        return jdbcTemplate.queryForList("EXEC hrisportal.category_count ?",id);
    }

    public int applyLeave(int employee_id,String category_name,String applied_at,String taken_for){
        return jdbcTemplate.update("EXEC hrisportal.ApplyForLeave ?,?,?,?",employee_id,category_name,applied_at,taken_for);
    }

    public List<Map<String,Object>>  empDeptCount(){
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_count_emp_in_dept");
    }


    public Map<String, Object> markAttendance(int employeeID) {
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_insert_datetime ?", employeeID);
    }

    public List<Map<String, Object>> getNationalHolidays(int month) {
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_fetch_nationalHolidays ?",  month);
    }

    public Map<String,Object> checkDocuments(int user_id){
//        System.out.println(jdbcTemplate.update("EXEC hrisportal.sp_check_documents ?",user_id));
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_check_documents ?",user_id);
    }


}

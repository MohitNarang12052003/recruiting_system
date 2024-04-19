package com.sgt.hrisportal.service;


import com.sgt.hrisportal.repository.jobRepository;
import com.sgt.hrisportal.utils.AppConstants;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.*;




@Service
public class jobService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    jobRepository jobRepository;

    public boolean isValidToken(HttpServletRequest httpServletRequest){
        System.out.println("Here");
        Cookie[] cookies=httpServletRequest.getCookies();

        if(cookies==null)   return false;

        Map<String,String> cookieMap =getCookiesAsHashMap(cookies);

        if(cookieMap.containsKey("user_id")){
            Map<String,Object> result= jobRepository.validateToken(Integer.parseInt(cookieMap.get("user_id")),
                    cookieMap.get("token"));
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
            System.out.println("checking validYN "+validYN);
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
    public ResponseEntity<List<Map<String,Object>>> viewApplications(HttpServletRequest httpServletRequest){

        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.viewApplications());
        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }


    public ResponseEntity<List<Map<String,Object>>> viewEmployees(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.viewEmployees());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }

    public ResponseEntity<List<Map<String,Object>>> viewVacancies(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.viewVacancies());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }

    public ResponseEntity<Map<String,Object>> viewSingleApplicant(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.viewSingleApplicant(id));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());

    }

    public ResponseEntity<Map<String ,Object>> updateApplication(int id, Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){

            String round_1=(String) body.get("round_1");
            String round_2=(String) body.get("round_2");
            String round_3=(String) body.get("round_3");
            String offer_letter=(String) body.get("offer_letter");
            String doc_verification=(String) body.get("doc_verification");

            int insertedRows = jobRepository.updateApplication(id,round_1,round_2,round_3,offer_letter,doc_verification);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public ResponseEntity<Map<String,Object>> viewSingleEmployee(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.viewSingleEmployee(id));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());

    }

    public ResponseEntity<Map<String,Object>> getEidFromEmail(String email,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.getEidFromEmail(email));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }

    public ResponseEntity<Map<String ,Object>> toggleVacancy(int id, HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        System.out.println(2);
        if(isValid){
            System.out.println(3);
            int insertedRows = jobRepository.toggleVacancy(id);
            System.out.println(insertedRows+" 4");

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));


    }

    public ResponseEntity<Map<String,Object>> sendRoundMail(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            String email=(String) body.get("email");
            String username=(String) body.get("uname");
            int rnumber=(int) body.get("number");
            String date=(String) body.get("date");
            String place=(String) body.get("place");
            String time=(String) body.get("time");

            MimeMessage mimeMessage= javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage);

            try{
                mimeMessageHelper.setSubject("Interview Round for JPMC");
                mimeMessageHelper.setTo(email);
                mimeMessageHelper.setText(
                        "Dear "+username+
                                "<div>You have round "+rnumber+" interview scheduled on "+date+
                                " at "+place+" . Please be present by "+time

                        ,true);



            }
            catch (MessagingException e){
                System.out.println("error"+e);
                throw new RuntimeException(e);
            }

            javaMailSender.send(mimeMessage);
            return ResponseEntity.ok(Collections.emptyMap());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<Map<String,Object>> sendDocumentMail(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            String email=(String) body.get("email");
            String username=(String) body.get("username");


            String login=AppConstants.LOGIN_URL;
            String link= AppConstants.DOCUMENT_URL;
            MimeMessage mimeMessage= javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage);

            try{
                mimeMessageHelper.setSubject("Upload Documents");
                mimeMessageHelper.setTo(email);
                mimeMessageHelper.setText(
                        "Dear "+username+
                                "<div> You have to upload Original Documents within seven days.</div>" +
                                "<div> To upload documents, follow the following steps- </div><div> 1. Login to our website</div>- "+login+
                                "<div>2. Visit the following link- </div>"+link

                        ,true);



            }
            catch (MessagingException e){
                System.out.println("error"+e);
                throw new RuntimeException(e);
            }

            javaMailSender.send(mimeMessage);
            return ResponseEntity.ok(Collections.emptyMap());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<Map<String,Object>> sendEmployeeMail(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            int user_id=(int) body.get("userid");
            String job_title=(String) body.get("job_title");
            String salary=(String) body.get("salary");
            String department=(String) body.get("department");
            String new_email=(String) body.get("nemail");
            String password=(String) body.get("password");
            String date_of_joining=(String) body.get("date_of_joining");
            String old_email=(String) body.get("oemail");



            String login=AppConstants.LOGIN_URL;
            MimeMessage mimeMessage= javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage);

            try{
                mimeMessageHelper.setSubject("New Login Credentials");
                mimeMessageHelper.setTo(old_email);
                mimeMessageHelper.setText(
                                "<div> Welcome to the team. Congratulations on becoming a part of our family. Your login credentails are attached below- </div>" +
                                "<div> Email- </div>"+new_email+
                                "<div> Password- </div>"+password+"<div>Donot share credentials with anyone.</div>"

                        ,true);



            }
            catch (MessagingException e){
                System.out.println("error"+e);
                throw new RuntimeException(e);
            }


            javaMailSender.send(mimeMessage);

            int insertedRows = jobRepository.sendEmployeeMail(user_id,job_title,salary,department,new_email,password,date_of_joining);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<List<Map<String ,Object>>> getSkills(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Map<String ,String> cookieMap=getCookiesAsHashMap(httpServletRequest.getCookies());

            int id= Integer.parseInt(cookieMap.get("employee_id"));

            return ResponseEntity.ok(jobRepository.getSkills(id));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }


    public ResponseEntity<Map<String,Object>> addSkill(String skillName,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Map<String,String> cookieMap=getCookiesAsHashMap(httpServletRequest.getCookies());
            int id=Integer.parseInt(cookieMap.get("employee_id"));

            Map<String,Object> result = jobRepository.addSkill(skillName,id);

            if ((int) result.get("validYN") > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }

    public ResponseEntity<List<Map<String ,Object>>> fetchGoals(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Map<String ,String> cookieMap=getCookiesAsHashMap(httpServletRequest.getCookies());

            int id= Integer.parseInt(cookieMap.get("employee_id"));

            return ResponseEntity.ok(jobRepository.fetchGoals(id));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());

    }



    public ResponseEntity<Map<String,Object>> addGoal(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Map<String,String> cookieMap=getCookiesAsHashMap(httpServletRequest.getCookies());
            int id=Integer.parseInt(cookieMap.get("employee_id"));
            String title=(String) body.get("goal_title");
            String description=(String) body.get("goal_description");

            int insertedRows = jobRepository.addGoal(title,description,id);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<Map<String,Object>> deleteGoal(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){


            int insertedRows = jobRepository.deleteGoal(id);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    public ResponseEntity<Map<String ,Object>> singleGoalData(String goalid,HttpServletRequest httpServletRequest){
        int id=Integer.parseInt(goalid);
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){

            return ResponseEntity.ok(jobRepository.singleGoalData(id));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());

    }


    public ResponseEntity<Map<String,Object>> updateGoal(Map<String,Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            int id=(int) body.get("goal_id");
            String title=(String) body.get("goal_title");
            String description=(String) body.get("goal_description");

            int insertedRows = jobRepository.updateGoal(id,title,description);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }


    //nidhi

    public ResponseEntity<Map<String, Object>> applyLeave(Map<String, Object> body,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid) {
            int employee_id = (int) body.get("employee_id");
            String category_name = (String) body.get("category_name");
            String applied_at = (String) body.get("applied_at");
            String taken_for = (String) body.get("taken_for");
            System.out.println("time- "+    applied_at);
            int insertedRows = jobRepository.applyLeave(employee_id, category_name, applied_at, taken_for);

            if (insertedRows > 0) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }


    public ResponseEntity<Map<String,Object>> totalLeavesCount(int id,HttpServletRequest httpServletRequest){
//        int id1 = Integer.parseInt(id);
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.totalLeavesCount(id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());

    }
    public ResponseEntity<List<Map<String,Object>>> CategoryWiseCount(int id,HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.CategoryWiseCount(id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }


    public List<Map<String,Object>> fetchAnnouncement(){
        return jobRepository.fetchAnnouncement();

    }

    public List<Map<String,Object>> fetchAllAnnouncement(){
        return jobRepository.fetchAllAnnouncement();

    }


    public ResponseEntity<Map<String, Object>> addAnnouncement(Map<String, Object> body,HttpServletRequest httpServletRequest) {
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            int hr_id =(int)body.get("hrid");
            String announcement =(String)body.get("announcement");
            int insertedRows = jobRepository.addAnnouncement(hr_id,announcement);

            System.out.println(insertedRows);
            if (insertedRows>= 1) {
                return ResponseEntity.ok(Map.of("status", "Successful"));
            }
        }
        System.out.println("Kya hua Sir");
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("status", "failed"));
    }


    public ResponseEntity<List<Map<String,Object>>> empDeptCount(HttpServletRequest httpServletRequest){
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            return ResponseEntity.ok(jobRepository.empDeptCount());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    public static String getOfferLetterContent(String fullname,String jobtitle,String employmentType,int salary,String hrEmail){
        String html="<div class=\"container\">\n" +
                "        <h1>Offer Letter</h1>\n" +
                "        <p>Dear "+fullname+",</p>\n" +
                "        <p>We are pleased to offer you the position of "+jobtitle+", as a "+employmentType+" employee. After careful consideration of your qualifications and experience, we believe that you will be a valuable addition to our team.</p>\n" +
                "        <p>Your starting salary will be "+salary+" lakhs per year.</p>\n" +
                "        <p>Please review this offer carefully and let us know if you accept the terms by the end of the week. If you have any questions or need further information, feel free to contact us.</p>\n" +
                "            <p>Sincerely,</p>\n" +
                "            <p>"+hrEmail+" \n"+"<br></br>HR</p>\n" +
                "</div>";

        return html;
    }


    public ResponseEntity<Map<String,Object>> offerLetterMail(Map<String ,Object> body,HttpServletRequest httpServletRequest) throws MessagingException {
        boolean isValid=isValidToken(httpServletRequest);
        if(isValid){
            Cookie[] cookies=httpServletRequest.getCookies();
            Map<String,String> cookieMap =getCookiesAsHashMap(cookies);

            String hr_email=cookieMap.get("email");

            String fullname=(String) body.get("fullname");
            String jobtitle=(String) body.get("job_title");
            String employmentType=(String) body.get("employmentType");
            int salary=(int) body.get("salary");
            String email=(String) body.get("email");

            String htmlContent=getOfferLetterContent(fullname,jobtitle,employmentType,salary,hr_email);

            byte[] pdfBytes=generatePDF(htmlContent);

            String subject="Offer Letter";
            String text="Attached is your official Offer Letter document:";


            sendOfferLetterMail(email,subject,text,pdfBytes,fullname);

            return ResponseEntity.ok(Collections.emptyMap());


        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyMap());
    }

    public byte[] generatePDF(String htmlContent){
        ITextRenderer renderer = new ITextRenderer();
        OutputStream os = new ByteArrayOutputStream();
        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(os);
        renderer.finishPDF();
        byte[] pdfBytes = ((ByteArrayOutputStream) os).toByteArray();

        return pdfBytes;
    }

    public void sendOfferLetterMail(String email,String subject,String text,byte[] pdfBytes,String fullname) throws MessagingException {
        MimeMessage mimeMessage= javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);

        try{
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setText(text,true);
            mimeMessageHelper.addAttachment(fullname+".pdf", new ByteArrayResource(pdfBytes));

        }
        catch (MessagingException e){
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);

    }


    public ResponseEntity<Map<String, Object>> markAttendance(Map<String, Object> body) {
        int employeeId = Integer.parseInt((String)body.get("employeeId"));
        return ResponseEntity.ok(jobRepository.markAttendance(employeeId));
//
//        if(noOfRows > 0)
//        {
//            return ResponseEntity.ok(Map.of("status","Marked Attendance"));
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status","Cannot Mark Attendance"));
    }

    public List<Map<String, Object>> getNationalHolidays(Map<String, Object> body) {
        int month = (int)body.get("month");
        return jobRepository.getNationalHolidays(month);
    }


}

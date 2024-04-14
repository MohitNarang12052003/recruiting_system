package com.sgt.hrisportal.service;


import com.sgt.hrisportal.repository.AttendanceRepository;
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
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;

    public Map<String, Object> markAttendance(Map<String, Object> body) {
        int employeeId = Integer.parseInt((String)body.get("employeeId"));
        return attendanceRepository.markAttendance(employeeId);
//
//        if(noOfRows > 0)
//        {
//            return ResponseEntity.ok(Map.of("status","Marked Attendance"));
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status","Cannot Mark Attendance"));
    }

    public List<Map<String, Object>> getNationalHolidays(Map<String, Object> body) {
        int month = (int)body.get("month");
        return attendanceRepository.getNationalHolidays(month);
    }



}
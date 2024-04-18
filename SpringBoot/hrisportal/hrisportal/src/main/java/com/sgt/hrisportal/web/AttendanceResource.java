package com.sgt.hrisportal.web;
import com.sgt.hrisportal.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins={"http://localhost:4200"},allowCredentials = "true")
public class AttendanceResource {
    @Autowired
    AttendanceService attendanceService;

    @PostMapping("/attendance")
    public Map<String, Object> markAttendance(@RequestBody Map<String, Object> body) {
        return attendanceService.markAttendance(body);
    }

    @PostMapping("/getHolidays")
    public List<Map<String, Object>> getNationalHolidays(@RequestBody Map<String, Object> body) {
        return attendanceService.getNationalHolidays(body);
    }
}

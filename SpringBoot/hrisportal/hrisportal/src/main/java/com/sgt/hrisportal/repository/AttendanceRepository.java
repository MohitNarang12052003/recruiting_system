package com.sgt.hrisportal.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AttendanceRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public Map<String, Object> markAttendance(int employeeID) {
        return jdbcTemplate.queryForMap("EXEC hrisportal.sp_insert_datetime ?", employeeID);
    }

    public List<Map<String, Object>> getNationalHolidays(int month) {
        return jdbcTemplate.queryForList("EXEC hrisportal.sp_fetch_nationalHolidays ?",  month);
    }

}
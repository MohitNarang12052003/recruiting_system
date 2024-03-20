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

    public Map<String, Object> markAttendance() {
        return jdbcTemplate.queryForMap("EXEC sp_insert_datetime");
    }

    public List<Map<String, Object>> getNationalHolidays(int month) {
        return jdbcTemplate.queryForList("EXEC sp_fetch_nationalHolidays ?",  month);
    }

}

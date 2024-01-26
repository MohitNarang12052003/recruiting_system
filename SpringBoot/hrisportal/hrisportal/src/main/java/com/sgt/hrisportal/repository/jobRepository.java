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
}

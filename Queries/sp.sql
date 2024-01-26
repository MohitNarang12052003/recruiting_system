CREATE OR ALTER PROCEDURE [hrisportal].[sp_fetch_all_jobs]
AS
BEGIN
	DROP TABLE IF EXISTS #temptable

	SELECT j.j_id,STRING_AGG(s.skill_name,',') as skills
	INTO #temptable
	FROM hrisportal.job_skill j
	INNER JOIN hrisportal.skill s
	ON j.skill_id=s.skill_id
	GROUP BY j.j_id

	SELECT j.job_title,
	j.job_description,
	j.minimum_qualifications,
	j.employment_type,
	j.key_role,
	j.location,
	j.date_posted,
	d.department_name,
	t.skills
	FROM hrisportal.job_vacancy j INNER JOIN hrisportal.department d ON j.department_id=d.department_id INNER JOIN #temptable t ON j.j_id=t.j_id
END


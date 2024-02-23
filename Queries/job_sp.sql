CREATE OR ALTER PROCEDURE [hrisportal].[sp_insert_jobs]
@jobTitle NVARCHAR(MAX),
@jobDescription NVARCHAR(MAX),
@minQualification NVARCHAR(MAX),
@employmentType NVARCHAR(MAX),
@keyRole NVARCHAR(MAX),
@location NVARCHAR(MAX),
@departmentName NVARCHAR(MAX),
@skills NVARCHAR(MAX),
@hrid INT,
@postedDate DATETIME =NULL
AS
BEGIN
	DROP TABLE IF EXISTS #temp
	IF @postedDate IS NULL
	BEGIN
		SET @postedDate = GETDATE()
	END
	PRINT @postedDate
	SELECT value as skills
	INTO #temp FROM string_split(@skills,',',1)

	DECLARE @deptid int = (select department_id from hrisportal.department where department_name=@departmentName)

	INSERT INTO hrisportal.job_vacancy(job_title,job_description,minimum_qualifications,employment_type,key_role,location,department_id,date_posted,active_yn,hr_id) values 
	(@jobTitle,@jobDescription,@minQualification,@employmentType,@keyRole,@location,@deptid,@postedDate,'Y',@hrid );
	
	INSERT INTO hrisportal.skill(skill_name) 
	SELECT skills
	FROM #temp
	WHERE NOT EXISTS( SELECT 1
	FROM hrisportal.skill
	where skill_name = skills)

	DECLARE @jobid INT =(select TOP 1 j_id from hrisportal.job_vacancy ORDER BY j_id DESC) 
	INSERT INTO hrisportal.job_skill(j_id,skill_id)
	SELECT @jobid,s.skill_id
	from hrisportal.skill s
	where EXISTS (SELECT 1 
	FROM #temp
	where s.skill_name=skills)

	select 1 as valid
END

EXEC hrisportal.sp_insert_jobs 'Junior Software Engineer','Do coding 24 hours and flex rest of time','12th pass','Full time','Java Programming','California','Product Development','Java,C,Flutter',5;


CREATE OR ALTER PROCEDURE hrisportal.sp_view_applications
AS
BEGIN
	SELECT a.*,u.full_name,j.job_title FROM hrisportal.applicants a inner join hrisportal.job_vacancy j on j.j_id=a.j_id inner join hrisportal.users u on a.user_id=u.user_id ;
END

EXEC hrisportal.sp_view_applications


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

	SELECT j.j_id,j.job_title,
	j.job_description,
	j.minimum_qualifications,
	j.employment_type,
	j.key_role,
	j.location,
	j.date_posted,
	d.department_name,
	t.skills,
	j.active_yn
	FROM hrisportal.job_vacancy j INNER JOIN hrisportal.department d ON j.department_id=d.department_id INNER JOIN #temptable t ON j.j_id=t.j_id WHERE active_yn='Y'
END
EXEC hrisportal.sp_fetch_all_jobs

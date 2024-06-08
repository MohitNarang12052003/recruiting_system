--HR
--HR Dashboard stats sp

CREATE OR ALTER PROCEDURE hrisportal.sp_get_count
AS
BEGIN
SELECT 
    (SELECT COUNT(employee_id) FROM hrisportal.employee WHERE active_yn = 1) AS emp_count,
    (SELECT COUNT(user_id) FROM hrisportal.users WHERE active_yn = 1) AS user_count,
    (SELECT COUNT(j_id) FROM hrisportal.job_vacancy WHERE active_yn = 'Y') AS vacancies_count,
    (SELECT COUNT(a.applicant_id) 
     FROM hrisportal.applicants AS a
     INNER JOIN hrisportal.job_vacancy AS jv ON a.j_id = jv.j_id
     WHERE jv.active_yn = 'Y') AS applicant_count;
END


CREATE OR ALTER PROCEDURE hrisportal.sp_count_emp_in_dept
AS
BEGIN
	SELECT count(*) AS count,department_name
	FROM hrisportal.department AS d
	INNER JOIN hrisportal.employee AS e
	ON d.department_name = e.department
	GROUP BY d.department_name
	
END

CREATE OR ALTER PROCEDURE [hrisportal].[insert_announcement]
    @hr_id INT,
    @announcement NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO hrisportal.announcement (hr_id, announcement)
    VALUES (@hr_id, @announcement);
END;
GO


--Job Vacancy Toggle
CREATE OR ALTER   PROCEDURE [hrisportal].[sp_toggle_vacancy]
@id INT
AS
BEGIN 
UPDATE hrisportal.job_vacancy
SET active_yn= CASE 
				WHEN active_yn='Y' THEN 'N'
				ELSE 'Y'
			END
WHERE j_id=@id
END;
GO

CREATE OR ALTER PROCEDURE hrisportal.sp_check_documents
@user_id int
AS
BEGIN
	
	SELECT count(1) as result from hrisportal.documents d WHERE d.user_id=@user_id;

END


--Showing details of applicant
CREATE OR ALTER     PROCEDURE [hrisportal].[sp_user_applications_detail]
@user_id INT
AS
BEGIN
SELECT a.*,j.job_title
FROM hrisportal.applicants AS a
INNER JOIN job_vacancy AS j
ON a.j_id = j.j_id
WHERE user_id=@user_id
END
GO

CREATE OR ALTER     PROCEDURE [hrisportal].[sp_view_applications]
AS
BEGIN
	SELECT a.*,u.full_name ,j.job_title 
	FROM hrisportal.applicants a
	inner join hrisportal.job_vacancy j 
	on j.j_id=a.j_id 
	inner join hrisportal.users u
	on a.user_id=u.user_id
	WHERE j.active_yn='Y'
END
GO
CREATE OR ALTER       PROCEDURE [hrisportal].[sp_view_applications]
AS
BEGIN
	SELECT a.*,u.full_name ,j.job_title 
	FROM hrisportal.applicants a
	inner join hrisportal.job_vacancy j 
	on j.j_id=a.j_id 
	inner join hrisportal.users u
	on a.user_id=u.user_id
	WHERE j.active_yn='Y'
	ORDER BY a.applied_at DESC
END
GO

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_update_applicant]
@applicant_id VARCHAR(100),
@round_1 VARCHAR(100),
@round_2 VARCHAR(100),
@round_3 VARCHAR(100),
@doc_verification VARCHAR(100),
@offer_letter VARCHAR(100)
AS
BEGIN
UPDATE hrisportal.applicants
SET round_1=@round_1,
	round_2=@round_2,
	round_3=@round_3,
	doc_verification=@doc_verification,
	offer_letter=@offer_letter
WHERE applicant_id=@applicant_id
END
GO


--Showing Employees
CREATE OR ALTER     PROCEDURE [hrisportal].[sp_view_employees]
AS
BEGIN
SELECT e.email,u.full_name,u.phone_number,job_title, department,salary,date_of_joining,e.active_yn
FROM hrisportal.employee AS e
INNER JOIN hrisportal.users AS u
ON e.user_id=u.user_id
ORDER BY e.active_yn DESC
END

GO

CREATE OR ALTER PROCEDURE hrisportal.sp_view_single_employee
@emp_id INT
AS
BEGIN
SELECT e.*,u.*,a.*
FROM hrisportal.employee AS e
INNER JOIN hrisportal.users AS u
ON e.user_id=u.user_id
INNER JOIN hrisportal.additional_info AS a
ON e.user_id=a.user_id
WHERE employee_id=@emp_id
END


CREATE OR ALTER PROCEDURE hrisportal.sp_view_vacancies
AS
BEGIN
SELECT j.job_title,
	j.job_description,
	j.minimum_qualifications,
	j.employment_type,
	j.key_role,
	j.location,
	d.department_name,
	j.date_posted,
	j.active_yn,
	u.full_name
FROM hrisportal.job_vacancy as j
INNER JOIN hrisportal.department as d
ON j.department_id=d.department_id
INNER JOIN hrisportal.hr as h
ON j.hr_id = h.hr_id
INNER JOIN hrisportal.employee AS e
ON h.employee_id = e.employee_id
INNER JOIN hrisportal.users as u
ON e.user_id = u.user_id
ORDER BY j.active_yn DESC
END


CREATE OR ALTER     PROCEDURE [hrisportal].[sp_create_employee]
@user_id INT,
@job_title VARCHAR(100),
@salary VARCHAR(100),
@deparment VARCHAR(100),
@email VARCHAR(100),
@pwd NVARCHAR(100),
@date_of_joining DATE
AS
BEGIN
	DECLARE @emp_id INT,
	@hashed_pwd VARBINARY(MAX)
	SELECT @hashed_pwd =HASHBYTES('SHA2_256',@pwd)

	INSERT INTO hrisportal.employee(user_id,job_title,salary,department,email,password,date_of_joining)
	VALUES(@user_id,@job_title,@salary,@deparment,@email,@hashed_pwd,@date_of_joining)

	

	SET @emp_id = SCOPE_IDENTITY()


	INSERT INTO hrisportal.employee_skill (emp_id, skill_id)
	SELECT @emp_id, skill_id 
	FROM hrisportal.job_skill
	WHERE j_id = (
		SELECT j_id 
		FROM hrisportal.job_vacancy 
		WHERE job_title = @job_title
	);



	INSERT INTO hrisportal.goals(title, description,emp_id,created_at)
	VALUES 
		('Continuous Learning and Skill Development', 'Strive for continuous improvement of skills and knowledge relevant to the role and company objectives.',@emp_id,GETDATE()),
		('Team Collaboration and Communication', 'Actively engage with colleagues, share ideas, and work together towards common goals.',@emp_id,GETDATE()),
		('Goal Alignment and Performance Excellence', 'Align individual goals with company objectives, track progress, and maintain high performance standards.',@emp_id,GETDATE());

 
END


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



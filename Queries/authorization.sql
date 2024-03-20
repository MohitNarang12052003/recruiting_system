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






CREATE OR ALTER PROCEDURE hrisportal.sp_view_employees
AS
BEGIN
SELECT job_title, salary, department, email,date_of_joining,date_of_departure,active_yn
FROM hrisportal.employee
ORDER BY active_yn DESC
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

EXEC hrisportal.sp_view_vacancies







CREATE OR ALTER PROCEDURE hrisportal.sp_single_applicant
@app_id INT
AS
BEGIN
SELECT applicant_id,
	a.user_id,
	a.j_id,
	applied_at,
	round_1,
	round_2,
	round_3,
	doc_verification,
	offer_letter,
	u.username,
	j.job_title
FROM hrisportal.applicants AS a
INNER JOIN hrisportal.users AS u
ON a.user_id=u.user_id
INNER JOIN hrisportal.job_vacancy AS j
ON j.j_id=a.j_id
WHERE a.applicant_id=@app_id
END








CREATE OR ALTER PROCEDURE hrisportal.sp_update_applicant
@applicant_id int,
@round_1 int,
@round_2 int,
@round_3 int,
@doc_verification int,
@offer_letter int
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








ALTER TABLE hrisportal.users ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.users ADD time_to_expire DATETIME

ALTER TABLE hrisportal.employee ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.employee ADD time_to_expire DATETIME

ALTER TABLE hrisportal.hr ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.hr ADD time_to_expire DATETIME


CREATE OR ALTER PROCEDURE hrisportal.sp_login
@email NVARCHAR(100),
@pwd NVARCHAR(100)
AS
BEGIN
 DECLARE @hashedpwd VARBINARY(MAX) = HASHBYTES('SHA2_256',@pwd)
	PRINT @pwd
	PRINT @email
	PRINT @hashedpwd
	DECLARE @count int=0,@ecount int=0,@hcount int =0
	select @count=count(*) from hrisportal.users where email=@email and password=@hashedpwd
	select @ecount=count(*) from hrisportal.employee where email=@email and password=@hashedpwd
	select @hcount=count(*) from hrisportal.hr where email=@email and password=@hashedpwd
	PRINT @count
	PRINT @ecount
	PRINT @hcount
	IF @count=1 and @ecount=0 and @hcount=0
	BEGIN
		UPDATE hrisportal.users
		SET token = NEWID(),
		time_to_expire = DATEADD(mi,30,GETDATE())
		WHERE email= @email

		select * ,-1 as role, token,time_to_expire
		FROM hrisportal.users where email=@email
	END
	
	ELSE IF @count=0 and @ecount=1 and @hcount=0
	BEGIN
		UPDATE hrisportal.employee
		SET token = NEWID(),
		time_to_expire = DATEADD(mi,30,GETDATE())
		select *,0 as role,token,time_to_expire
		FROM hrisportal.employee where email=@email
	END

	ELSE IF @count=0 and @ecount=0 and @hcount=1
	BEGIN
		UPDATE hrisportal.hr
		SET token=NEWID(),
		time_to_expire=DATEADD(mi,30,GETDATE())
		select *,1 as role,token,time_to_expire
		FROM hrisportal.hr where email=@email
	END
	ELSE
	BEGIN
		select -2 as role
	END
END









CREATE OR ALTER PROCEDURE hrisportal.sp_validate_token
@token VARCHAR(MAX),
@id INT
AS
BEGIN
	DECLARE @count int=0,@ecount int=0,@hcount int =0
	select @count=count(*) from hrisportal.users where token=@token and user_id=@id
	select @ecount=count(*) from hrisportal.employee where token=@token and employee_id=@id
	select @hcount=count(*) from hrisportal.hr where token=@token and hr_id=@id
	IF @count = 1 and @ecount=0 and @hcount=0
	BEGIN
		select -1 as ValidYN
	END
	ELSE IF @count = 0 and @ecount=1 and @hcount=0
	BEGIN
		select 0 as ValidYN
	END
	ELSE IF @count = 0 and @ecount=0 and @hcount=1
	BEGIN
		select 1 as ValidYN
	END
	ELSE
	BEGIN
		SELECT -2 as ValidYN
	END
END





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





CREATE OR ALTER PROCEDURE [hrisportal].[sp_user_details]
@user_id INT
AS
BEGIN
SELECT u.*,
		i.*
FROM  hrisportal.users AS u
INNER JOIN hrisportal.additional_info AS i
ON i.user_id=u.user_id
WHERE u.user_id=@user_id
END
GO



CREATE OR ALTER   PROCEDURE [hrisportal].[sp_user_applications_detail]
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




EXEC hrisportal.sp_user_applications_detail 8

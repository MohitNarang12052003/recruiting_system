--Common


CREATE OR ALTER PROCEDURE  hrisportal.sp_already_exists
    @username VARCHAR(100),
    @email VARCHAR(100)
AS 
BEGIN
    DECLARE @already_exists INT;

    SET @already_exists = 
        CASE
            WHEN EXISTS (SELECT 1 FROM hrisportal.users WHERE username = @username AND email != @email)
                THEN 1
            WHEN EXISTS (SELECT 1 FROM hrisportal.users WHERE username != @username AND email = @email)
                THEN 2
            WHEN EXISTS (SELECT 1 FROM hrisportal.users WHERE username = @username AND email = @email)
                THEN 3
            ELSE 0
        END;

    SELECT @already_exists AS already_exists;
END;

--Login
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


--Validate Token
CREATE   PROCEDURE [hrisportal].[sp_validate_token]
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
GO

--Reset Password
CREATE OR ALTER PROCEDURE hrisportal.sp_reset_pwd
@token VARCHAR(100),
@pwd NVARCHAR(100),
@role INT
AS
BEGIN
	DECLARE @hashed_pwd VARBINARY(MAX)

	SELECT @hashed_pwd=HASHBYTES('SHA2_256',@pwd)
	IF @role=-1
	BEGIN
		UPDATE hrisportal.users
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END

	IF @role=0
	BEGIN
		UPDATE hrisportal.employee
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END

	IF @role=1
	BEGIN
		UPDATE hrisportal.hr
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END
END

CREATE OR ALTER PROCEDURE hrisportal.sp_change_pwd
@email NVARCHAR(MAX),
@old_pwd NVARCHAR(100),
@new_pwd NVARCHAR(100)
AS
BEGIN
	DECLARE @old VARBINARY(MAX),
			@new VARBINARY(MAX)
	SELECT @old=HASHBYTES('SHA2_256',@old_pwd)
	SELECT @new=HASHBYTES('SHA2_256',@new_pwd)

	UPDATE hrisportal.users
	SET password=@new
	WHERE email=@email AND password=@old

	UPDATE hrisportal.employee
	SET password=@new
	WHERE email=@email AND password=@old

	UPDATE hrisportal.hr
	SET password=@new
	WHERE email=@email AND password=@old


END


CREATE OR ALTER PROCEDURE hrisportal.sp_validate_fp_token
@fp_token VARCHAR(100)
AS
BEGIN
	DECLARE @ucount INT = 0,
	 @ecount INT = 0,
	 @hcount INT = 0
	 
	 SELECT @ucount=count(*) 
	 FROM hrisportal.users
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()

	 SELECT @ecount=count(*) 
	 FROM hrisportal.employee
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()

	 SELECT @hcount=count(*) 
	 FROM hrisportal.hr
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()


	 IF @ucount=1 AND @ecount=0 AND @hcount=0
	 BEGIN
		SELECT -1 AS validYN
	END
	ELSE IF @ucount=0 AND @ecount=1 AND @hcount=0
	 BEGIN
		SELECT 0 AS validYN
	END

	ELSE IF @ucount=0 AND @ecount=0 AND @hcount=1
	 BEGIN
		SELECT 1 AS validYN
	END

	ELSE 
	BEGIN
		SELECT -2 AS validYN
	END

END


--Get File Name
CREATE OR ALTER PROCEDURE hrisportal.sp_get_fileName
@userid INT,
@folder VARCHAR(MAX)
AS
BEGIN
	IF @folder = 'photo'
	BEGIN
		select up.photo as document from hrisportal.userPhoto up where up.user_id=@userid
	END
	IF @folder = 'resume'
	BEGIN
		select u.resume as document from hrisportal.users u where u.user_id=@userid
	END
	IF @folder = 'aadhar' OR @folder = 'voter' OR @folder = 'pan'
	BEGIN
		SELECT CASE 
				WHEN @folder = 'aadhar'  THEN d.aadhar
				WHEN @folder = 'voter'  THEN d.voter
				WHEN @folder = 'pan' THEN d.pan
			END AS document
			FROM hrisportal.documents d WHERE d.user_id = @userid;
	END

END

--Showing single job to user
CREATE OR ALTER PROCEDURE hrisportal.sp_fetch_single_job
@j_id int
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
	j.active_yn from hrisportal.job_vacancy j INNER JOIN hrisportal.department d ON j.department_id=d.department_id INNER JOIN #temptable t ON j.j_id=t.j_id WHERE j.j_id=@j_id;
END

CREATE OR ALTER PROCEDURE hrisportal.sp_get_eid_from_email
@email VARCHAR(100)
AS
BEGIN
	SELECT employee_id
	FROM hrisportal.employee
	WHERE email=@email
END

CREATE OR ALTER   PROCEDURE [hrisportal].[fetchDepts]
AS
BEGIN
	SELECT d.department_name as dept_name, COUNT(1) as count
	FROM hrisportal.job_vacancy j
	INNER JOIN hrisportal.department d ON d.department_id = j.department_id 
	WHERE j.active_yn = 'Y'
	GROUP BY d.department_name;


END

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_verify_email]  
@email VARCHAR(MAX)
AS
BEGIN 
	DECLARE @count INT
	SELECT @count=count(-1) 
	FROM hrisportal.users
	WHERE email=@email
	AND active_yn=1

	SELECT @count=count(0) 
	FROM hrisportal.employee
	WHERE email=@email
	AND active_yn=1

	SELECT @count=count(1) 
	FROM hrisportal.hr
	WHERE email=@email
	AND active_yn=1


	SELECT @count AS validYN

END

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_generate_fp_token]
@email VARCHAR(MAX),
@role int
AS
BEGIN 
	DECLARE @token VARCHAR(MAX)
	DECLARE @time_to_expire DATETIME
	SELECT @token =NEWID(),
	@time_to_expire = DATEADD(mi,15,GETDATE())

	IF @role=-1
	UPDATE hrisportal.users
	SET fp_token=@token,
	fp_time_to_expire=@time_to_expire
	WHERE email=@email

	ELSE IF @role=0
	UPDATE hrisportal.employee
	SET fp_token=@token,
	fp_time_to_expire=@time_to_expire
	WHERE email=@email

	ELSE IF @role=1
	UPDATE hrisportal.hr
	SET fp_token=@token,
	fp_time_to_expire=@time_to_expire
	WHERE email=@email



	SELECT @token AS fp_token
END

GO





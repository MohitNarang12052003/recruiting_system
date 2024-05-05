
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

CREATE OR ALTER PROCEDURE hrisportal.sp_insert_user
@username NVARCHAR(50),
@email NVARCHAR(100),
@password NVARCHAR(100),
@full_name NVARCHAR(100),
@dob DATE,
@phone NVARCHAR(20),
@workexp INT,
@resume NVARCHAR(MAX),
@exp_ctc INT,
@curr_ctc INT
AS 
BEGIN
	INSERT INTO hrisportal.users(username,email,password,full_name,date_of_birth,phone_number,work_experience,resume,expected_ctc,current_ctc) VALUES
	(@username,@email,HASHBYTES('SHA2_256',@password),@full_name,@dob,@phone,@workexp,@resume,@exp_ctc,@curr_ctc)
END


CREATE OR ALTER PROCEDURE hrisportal.sp_insert_qualifications
@uid INT,
@deg NVARCHAR(100),
@institute NVARCHAR(100),
@admission_yr INT ,
@completion_yr INT,
@GPA DECIMAL(5,2)
AS
BEGIN
	INSERT INTO hrisportal.qualifications(user_id,degree_name,institute_name,admission_year,completion_year,GPA) VALUES (@uid,@deg,@institute,@admission_yr,@completion_yr,@GPA)
END

CREATE OR ALTER PROCEDURE hrisportal.sp_insert_jobHistory
@uid INT,
@cname NVARCHAR(100),
@jtitle NVARCHAR(100),
@fyear INT,
@tyear INT,
@desc NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO hrisportal.jobHistory(user_id,company_name,job_title,from_year,to_year,description) VALUES (@uid,@cname,@jtitle,@fyear,@tyear,@desc)
END


CREATE OR ALTER PROCEDURE hrisportal.sp_insert_additionalInfo
@uid INT,
@gender VARCHAR(100),
@nationality VARCHAR(100),
@address NVARCHAR(MAX),
@state VARCHAR(100),
@city VARCHAR(100),
@pincode INT,
@martial_status VARCHAR(100)
AS
BEGIN
	INSERT INTO hrisportal.additional_info(user_id,gender,nationality,address,state,city,pincode,martial_status) VALUES (@uid,@gender,@nationality,@address,@state,@city,@pincode,@martial_status)
END

CREATE OR ALTER PROCEDURE hrisportal.sp_insert_photo
@uid INT,
@photo NVARCHAR(MAX)=NULL
AS
BEGIN
	INSERT INTO hrisportal.userPhoto(user_id,photo) VALUES (@uid,@photo)
END

USE [notemate]
GO



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
		select * ,-1 as role 
		FROM hrisportal.users where email=@email
	END
	
	ELSE IF @count=0 and @ecount=1 and @hcount=0
	BEGIN
		select *,0 as role
		FROM hrisportal.employee where email=@email
	END

	ELSE IF @count=0 and @ecount=0 and @hcount=1
	BEGIN
		select *,1 as role
		FROM hrisportal.hr where email=@email
	END
	ELSE
	BEGIN
		select -2 as role
	END
END


SELECT * FROM hrisportal.employee WHERE email = 'employee1@fintechcompany.com' AND password = HASHBYTES('SHA2_256', '123');
SELECT * FROM hrisportal.hr WHERE email = 'hr_rep@fintechcompany.com' AND password=HASHBYTES('SHA2_256','securepassword123');
EXEC hrisportal.sp_login 'hr_rep@fintechcompany.com','securepassword123'
EXEC hrisportal.sp_login 'employee1@fintechcompany.com','123'



CREATE OR ALTER PROCEDURE hrisportal.sp_insert_applications
@userid INT,
@j_id INT
AS
BEGIN
	INSERT INTO hrisportal.applicants(user_id,j_id) VALUES (@userid,@j_id)
END

EXEC hrisportal.sp_login 'pk@g.com','1234567890'

EXEC hrisportal.sp_login 'jay@email.com' ,'hash'


select * from dbo.users


CREATE OR ALTER PROCEDURE hrisportal.sp_get_qualifications_of_user
@user_id INT
AS
BEGIN
	SELECT * 
	FROM hrisportal.qualifications
	WHERE user_id=@user_id
END


CREATE OR ALTER PROCEDURE hrisportal.sp_get_job_history_of_user
@user_id INT
AS
BEGIN
	SELECT * 
	FROM hrisportal.jobHistory
	WHERE user_id=@user_id
END


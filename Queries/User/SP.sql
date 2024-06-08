--Users

--Basic Info Insertion
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

CREATE OR ALTER PROCEDURE hrisportal.sp_insert_documents
@user_id int,
@aadhar NVARCHAR(MAX),
@pan NVARCHAR(MAX),
@voter NVARCHAR(MAX),
@account_no INT,
@ifsc_code NVARCHAR(MAX),
@passport_no  NVARCHAR(MAX),
@name_of_acc_holder VARCHAR(MAX),
@esign NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO hrisportal.documents(user_id,aadhar,pan,voter,account_no,ifsc_code,passport_no,name_of_acc_holder, esign) values (@user_id,@aadhar,@pan,@voter,@account_no,@ifsc_code,@passport_no,@name_of_acc_holder,@esign)
END


--Insert Applications
CREATE OR ALTER PROCEDURE hrisportal.sp_insert_applications
@userid INT,
@j_id INT
AS
BEGIN
	INSERT INTO hrisportal.applicants(user_id,j_id) VALUES (@userid,@j_id)
END

--Getting data
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

--Showing applications to user as well as hr
CREATE OR ALTER   PROCEDURE [hrisportal].[sp_user_applications_detail]
@user_id INT
AS
BEGIN
SELECT a.*,j.*
FROM hrisportal.applicants AS a
INNER JOIN job_vacancy AS j
ON a.j_id = j.j_id
WHERE user_id=@user_id
END

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_single_applicant]
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
	j.job_title,
	u.email
FROM hrisportal.applicants AS a
INNER JOIN hrisportal.users AS u
ON a.user_id=u.user_id
INNER JOIN hrisportal.job_vacancy AS j
ON j.j_id=a.j_id
WHERE a.applicant_id=@app_id
END
GO

CREATE OR ALTER     PROCEDURE [hrisportal].[sp_user_details]
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
SELECT a.*,j.*
FROM hrisportal.applicants AS a
INNER JOIN job_vacancy AS j
ON a.j_id = j.j_id
WHERE user_id=@user_id
END
GO

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
	FROM hrisportal.job_vacancy j INNER JOIN hrisportal.department d ON j.department_id=d.department_id INNER JOIN #temptable t ON j.j_id=t.j_id WHERE active_yn='Y' ORDER BY j.date_posted DESC
END



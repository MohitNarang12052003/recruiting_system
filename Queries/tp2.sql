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

EXEC hrisportal.sp_get_fileName 48 , 'aadhar'

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


CREATE OR ALTER PROCEDURE hrisportal.sp_check_documents
@user_id int
AS
BEGIN
	
	SELECT count(1) as result from hrisportal.documents d WHERE d.user_id=@user_id;

END

EXEC hrisportal.sp_check_documents 54

CREATE OR ALTER PROCEDURE hrisportal.sp_count_emp_in_dept
AS
BEGIN
	SELECT count(*) AS count,department_name
	FROM hrisportal.department AS d
	INNER JOIN hrisportal.employee AS e
	ON d.department_name = e.department
	GROUP BY d.department_name
	
END
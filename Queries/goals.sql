CREATE OR ALTER PROCEDURE hrisportal.sp_fetch_employee_skill
@emp_id INT
AS
BEGIN
	SELECT DISTINCT s.skill_name 
	FROM hrisportal.skill AS s
	WHERE s.skill_id IN
	( SELECT es.skill_id 
		FROM hrisportal.employee_skill AS es
		WHERE es.emp_id=@emp_id )
END





CREATE OR ALTER PROCEDURE hrisportal.sp_insert_new_employee_skill
@skill_name VARCHAR(MAX),
@emp_id INT
AS
BEGIN
	DECLARE @new_skill_id INT
	INSERT INTO hrisportal.skill(skill_name)
	SELECT @skill_name
	WHERE NOT EXISTS (
		SELECT 1
		FROM hrisportal.skill
		WHERE skill_name = @skill_name
	);

	SELECT @new_skill_id=SCOPE_IDENTITY();

		IF @new_skill_id IS NULL
			INSERT INTO hrisportal.employee_skill(emp_id,skill_id)
			SELECT @emp_id,(SELECT skill_id 
			FROM hrisportal.skill WHERE skill_name=@skill_name)
			WHERE NOT EXISTS (
				SELECT 1
				FROM hrisportal.employee_skill
				WHERE skill_id = (SELECT TOP 1 skill_id
					FROM hrisportal.skill WHERE skill_name=@skill_name)
				AND emp_id=@emp_id
		)
		ELSE
			INSERT INTO hrisportal.employee_skill(emp_id,skill_id)
			VALUES (@emp_id,@new_skill_id)

END




CREATE TABLE hrisportal.goals(
goal_id INT IDENTITY(1,1) NOT NULL,
title VARCHAR(100),
description VARCHAR(MAX),
emp_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
created_at DATETIME ,
edited_at DATETIME DEFAULT GETDATE(),
active_YN VARCHAR(5) DEFAULT 'Y'
)


INSERT INTO hrisportal.goals(title, description,emp_id,created_at)
	VALUES 
		('Continuous Learning and Skill Development', 'Strive for continuous improvement of skills and knowledge relevant to the role and company objectives.',10,GETDATE()),
		('Team Collaboration and Communication', 'Actively engage with colleagues, share ideas, and work together towards common goals.',10,GETDATE()),
		('Goal Alignment and Performance Excellence', 'Align individual goals with company objectives, track progress, and maintain high performance standards.',10,GETDATE());





CREATE OR ALTER PROCEDURE hrisportal.sp_fetch_goals
@emp_id INT
AS
BEGIN
SELECT goals.goal_id, goals.title, goals.description, goals.edited_at
FROM hrisportal.goals
WHERE emp_id=@emp_id
AND active_YN = 'Y'
ORDER BY edited_at DESC

END



CREATE OR ALTER PROCEDURE hrisportal.sp_add_goal
@title VARCHAR(100),
@description VARCHAR(MAX),
@emp_id INT
AS
BEGIN
	INSERT INTO hrisportal.goals(title, description,emp_id,edited_at)
	VALUES(@title,@description,@emp_id,GETDATE())
END





CREATE OR ALTER PROCEDURE hrisportal.sp_delete_goal
@goal_id INT
AS
BEGIN
	UPDATE hrisportal.goals
	SET active_YN='N'
	WHERE goal_id=@goal_id
END




CREATE OR ALTER PROCEDURE hrisportal.sp_single_goal_data
@goal_id INT
AS 
BEGIN
	SELECT goals.title,goals.description
	FROM hrisportal.goals
	WHERE goal_id=@goal_id
END




CREATE OR ALTER PROCEDURE hrisportal.sp_update_goal
@goal_id INT,
@goal_title VARCHAR(100),
@goal_description VARCHAR(MAX)
AS
BEGIN
	UPDATE hrisportal.goals
	SET title = @goal_title,
		description = @goal_description,
		edited_at = GETDATE()
	WHERE goal_id = @goal_id;
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

EXEC hrisportal.sp_create_employee 4,'Software Engineer','50000','Product Development','employee4@fintechcompany.com','123','2024-05-15'
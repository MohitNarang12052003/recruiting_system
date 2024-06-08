--Employee

--Apply for leave
CREATE OR ALTER   PROCEDURE [hrisportal].[ApplyForLeave]
@employee_id INT,
@category_name NVARCHAR(MAX),
@applied_at NVARCHAR(MAX),
@taken_for VARCHAR(MAX)
AS
BEGIN
    DECLARE @leave_cat_id INT;

    -- Retrieve category_id based on category_name
    SELECT @leave_cat_id = category_id
    FROM hrisportal.category
    WHERE category_name = @category_name;

	DECLARE @converted_date DATE;
	SET @converted_date = CONVERT(DATE, @applied_at, 23);                 

            -- Insert into emp_leaves table
            INSERT INTO hrisportal.emp_leaves (employee_id, leave_cat_id, applied_at, taken_for)
            VALUES (@employee_id, @leave_cat_id, @converted_date, @taken_for);
END;
GO

CREATE OR ALTER     PROCEDURE [hrisportal].[total_count]
@employee_id INT
AS
BEGIN
    SELECT COUNT(*) AS leave_count
    FROM hrisportal.emp_leaves
    WHERE employee_id = @employee_id;
END;
GO

CREATE OR ALTER     PROCEDURE [hrisportal].[category_count]
@employee_id INT
AS
BEGIN
    SELECT lc.category_name, COUNT(la.leave_id) AS leave_count
    FROM hrisportal.category lc
    LEFT JOIN hrisportal.emp_leaves la ON lc.category_id = la.leave_cat_id
                                               AND la.employee_id = @employee_id
    GROUP BY lc.category_name;
END;
GO


CREATE OR ALTER   PROCEDURE [hrisportal].[fetch_announcements]
AS
BEGIN
    SELECT announcement, edited_at
    FROM hrisportal.announcement
    WHERE active_yn = 1;
END;
GO

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_insert_new_employee_skill]
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

SELECT @@ROWCOUNT AS validYN
	

END
GO


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
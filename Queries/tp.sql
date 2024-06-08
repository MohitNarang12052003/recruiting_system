select * from hrisportal.job_vacancy 
select * from hrisportal.goals
select * from hrisportal.department

select * from hrisportal.skill

select * from hrisportal.additional_info

select * from hrisportal.applicants

select * from hrisportal.documents

select * from hrisportal.employee

select * from hrisportal.employee_skill

select * from hrisportal.hr

select * from hrisportal.job_skill

select * from hrisportal.jobHistory

select * from hrisportal.qualifications
select * from hrisportal.emp_leaves
select * from hrisportal.users

select * from hrisportal.userPhoto

DROP TABLE hrisportal.users

DROP TABLE hrisportal.qualifications

DROP TABLE hrisportal.job_vacancy

DROP TABLE hrisportal.department

DROP TABLE hrisportal.skill

DROP TABLE hrisportal.additional_info

DROP TABLE hrisportal.applicants

DROP TABLE hrisportal.documents

DROP TABLE hrisportal.employee

DROP TABLE hrisportal.employee_skill

DROP TABLE hrisportal.hr

DROP TABLE hrisportal.job_skill

DROP TABLE hrisportal.jobHistory


DELETE FROM hrisportal.employee where employee_id=7
DELETE FROM hrisportal.goals where emp_id=7
DELETE FROM hrisportal.documents where document_id=2

USE [hrisportal]
GO

/****** Object:  Table [hrisportal].[users]    Script Date: 16-04-2024 20:24:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [hrisportal].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[password] [varbinary](max) NOT NULL,
	[full_name] [nvarchar](100) NOT NULL,
	[date_of_birth] [date] NOT NULL,
	[phone_number] [nvarchar](20) NOT NULL,
	[work_experience] [int] NOT NULL,
	[resume] [nvarchar](max) NOT NULL,
	[expected_ctc] [int] NOT NULL,
	[current_ctc] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[active_yn] [int] NULL,
	[token] [varchar](max) NULL,
	[time_to_expire] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [hrisportal].[users] ADD  CONSTRAINT [df_created_at]  DEFAULT (getdate()) FOR [created_at]
GO

UPDATE TABLE hrisportal.
ALTER TABLE [hrisportal].[users] ADD  CONSTRAINT [df_active_yn]  DEFAULT ((1)) FOR [active_yn]
GO

USE [hrisportal]
GO

/****** Object:  StoredProcedure [hrisportal].[sp_validate_token]    Script Date: 17-04-2024 09:40:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
USE [hrisportal]
GO

/****** Object:  StoredProcedure [hrisportal].[sp_user_applications_detail]    Script Date: 17-04-2024 09:46:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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

EXEC hrisportal.sp_user_applications_detail 54




UPDATE hrisportal.applicants SET round_3=1 where user_id=54

USE [hrisportal]
GO

/****** Object:  StoredProcedure [hrisportal].[sp_single_applicant]    Script Date: 18-04-2024 23:54:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
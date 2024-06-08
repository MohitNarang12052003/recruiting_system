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
	FROM hrisportal.job_vacancy j INNER JOIN hrisportal.department d ON j.department_id=d.department_id INNER JOIN #temptable t ON j.j_id=t.j_id WHERE active_yn='Y' ORDER BY j.date_posted DESC
END
EXEC hrisportal.sp_fetch_all_jobs


CREATE OR ALTER PROCEDURE hrisportal.fetchDepts
AS
BEGIN
	SELECT d.department_name as dept_name,count(1) as count from hrisportal.job_vacancy j INNER JOIN hrisportal.department d on d.department_id=j.department_id GROUP BY d.department_name

END

EXEC hrisportal.fetchDepts


USE [hrisportal]
GO

/****** Object:  StoredProcedure [hrisportal].[sp_update_applicant]    Script Date: 19-04-2024 00:17:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER   PROCEDURE [hrisportal].[sp_update_applicant]
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
DROP TABLE hrisportal.applicants
CREATE TABLE [hrisportal].[applicants](
	[applicant_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[j_id] [int] NULL,
	[applied_at] [datetime] NULL,
	[round_1] [varchar](100) NULL,
	[round_2] [varchar](100) NULL,
	[round_3] [varchar](100) NULL,
	[doc_verification] [varchar](100) NULL,
	[offer_letter] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[applicant_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT (getdate()) FOR [applied_at]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT ('N/A') FOR [round_1]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT ('N/A') FOR [round_2]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT ('N/A') FOR [round_3]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT ('N/A') FOR [doc_verification]
GO

ALTER TABLE [hrisportal].[applicants] ADD  DEFAULT ('N/A') FOR [offer_letter]
GO

ALTER TABLE [hrisportal].[applicants]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [hrisportal].[users] ([user_id])
GO

ALTER TABLE [hrisportal].[applicants]  WITH CHECK ADD FOREIGN KEY([j_id])
REFERENCES [hrisportal].[job_vacancy] ([j_id])
GO

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
	j.j_id
FROM hrisportal.applicants AS a
INNER JOIN hrisportal.users AS u
ON a.user_id=u.user_id
INNER JOIN hrisportal.job_vacancy AS j
ON j.j_id=a.j_id
WHERE a.applicant_id=@app_id
END


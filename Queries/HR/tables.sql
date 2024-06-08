
CREATE TABLE hrisportal.hr(
hr_id INT PRIMARY KEY IDENTITY(1,1),
employee_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
email NVARCHAR(100) UNIQUE NOT NULL,
password VARBINARY(MAX) NOT NULL,
active_yn VARCHAR(1)
);

ALTER TABLE hrisportal.hr ADD created_at DATETIME  
ALTER TABLE hrisportal.hr ADD CONSTRAINT df_create DEFAULT GETDATE() FOR created_at
ALTER TABLE hrisportal.hr ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.hr ADD time_to_expire DATETIME



CREATE TABLE hrisportal.job_vacancy(
j_id INT PRIMARY KEY IDENTITY(1,1),
job_title VARCHAR(MAX) NOT NULL,
job_description VARCHAR(MAX) NOT NULL,
minimum_qualifications VARCHAR(MAX) NOT NULL,
employment_type VARCHAR(200) NOT NULL,
key_role VARCHAR(MAX) NOT NULL,
location VARCHAR(MAX) NOT NULL,
department_id int FOREIGN KEY REFERENCES hrisportal.department(department_id),
date_posted DATETIME ,
active_yn VARCHAR(1),
hr_id INT FOREIGN KEY REFERENCES hrisportal.hr(hr_id),
)

ALTER TABLE hrisportal.job_vacancy ADD CONSTRAINT df_active DEFAULT 'Y' FOR active_yn


CREATE TABLE hrisportal.job_skill(
id INT PRIMARY KEY IDENTITY(1,1),
j_id INT FOREIGN KEY REFERENCES hrisportal.job_vacancy(j_id),
skill_id INT FOREIGN KEY REFERENCES hrisportal.skill(skill_id)
)


CREATE TABLE [hrisportal].[announcement](
	[announcement_id] [int] IDENTITY(1,1) NOT NULL,
	[hr_id] [int] NULL,
	[announcement] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[edited_at] [datetime] NULL,
	[active_yn] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[announcement_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [hrisportal].[announcement] ADD  DEFAULT (getdate()) FOR [created_at]
GO

ALTER TABLE [hrisportal].[announcement] ADD  DEFAULT (getdate()) FOR [edited_at]
GO

ALTER TABLE [hrisportal].[announcement] ADD  DEFAULT ((1)) FOR [active_yn]
GO

ALTER TABLE [hrisportal].[announcement]  WITH CHECK ADD FOREIGN KEY([hr_id])
REFERENCES [hrisportal].[hr] ([hr_id])
GO

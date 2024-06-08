CREATE TABLE hrisportal.employee
	(
		employee_id INT PRIMARY KEY IDENTITY(1,1),
		user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
		job_title VARCHAR(100),
		salary INT,
		department VARCHAR(100),
		email NVARCHAR(100),
		password VARBINARY(MAX),
		date_of_joining DATE,
		date_of_departure DATE,
		created_at DATETIME DEFAULT GETDATE(),
		active_yn INT DEFAULT 1
	)

	ALTER TABLE hrisportal.employee ADD CONSTRAINT df_create_at DEFAULT GETDATE() FOR created_at

ALTER TABLE hrisportal.employee ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.employee ADD time_to_expire DATETIME

CREATE TABLE hrisportal.emp_leave_count (
    employee_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
	category_id INT FOREIGN KEY REFERENCES hrisportal.category(category_id),
    total_leaves_taken INT DEFAULT 0
);



CREATE TABLE [hrisportal].[emp_leaves](
	[leave_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NULL,
	[leave_cat_id] [int] NULL,
	[applied_at] [datetime] NULL,
	[taken_for] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[leave_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [hrisportal].[emp_leaves]  WITH CHECK ADD FOREIGN KEY([employee_id])
REFERENCES [hrisportal].[employee] ([employee_id])
GO

ALTER TABLE [hrisportal].[emp_leaves]  WITH CHECK ADD FOREIGN KEY([leave_cat_id])
REFERENCES [hrisportal].[category] ([category_id])
GO

CREATE TABLE hrisportal.employee_skill(
id INT PRIMARY KEY IDENTITY(1,1),
emp_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
skill_id INT FOREIGN KEY REFERENCES hrisportal.skill(skill_id)
)


CREATE TABLE hrisportal.goals(
goal_id INT IDENTITY(1,1) NOT NULL,
title VARCHAR(100),
description VARCHAR(MAX),
emp_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
created_at DATETIME ,
edited_at DATETIME DEFAULT GETDATE(),
active_YN VARCHAR(5) DEFAULT 'Y'
)


CREATE TABLE hrisportal.department(
department_id INT PRIMARY KEY IDENTITY(1,1),
department_name VARCHAR(MAX) NOT NULL
);


CREATE TABLE hrisportal.skill(
skill_id INT PRIMARY KEY IDENTITY(1,1),
skill_name VARCHAR(MAX)
);

CREATE TABLE [hrisportal].[category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

create database hrisportal

create schema hrisportal

CREATE TABLE hrisportal.users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password VARBINARY(MAX) NOT NULL,
    full_name NVARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number NVARCHAR(20) NOT NULL, 
    work_experience INT NOT NULL,
    resume NVARCHAR(MAX) NOT NULL,
    expected_ctc INT NOT NULL,
    current_ctc INT NOT NULL,
	created_at DATETIME,
	active_yn INT 
);

ALTER TABLE hrisportal.users ADD CONSTRAINT df_created_at DEFAULT GETDATE() FOR created_at
ALTER TABLE hrisportal.users ADD CONSTRAINT df_active_yn  DEFAULT 1 FOR active_yn

CREATE TABLE hrisportal.qualifications (
    qualification_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    degree_name NVARCHAR(100) NOT NULL,
    institute_name NVARCHAR(100) NOT NULL,
    admission_year INT,
    completion_year INT,
    GPA DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES hrisportal.users(user_id)
);


CREATE TABLE hrisportal.jobHistory (
    job_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    company_name NVARCHAR(100) NOT NULL,
    job_title NVARCHAR(100) NOT NULL,
    from_year INT NOT NULL,
    to_year INT NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES hrisportal.users(user_id)
);


CREATE TABLE hrisportal.additional_info(
ai_id INT PRIMARY KEY IDENTITY(1,1),
user_id INT,
gender VARCHAR(100),
nationality VARCHAR(100),
address NVARCHAR(MAX),
state VARCHAR(100),
city VARCHAR(100),
pincode INT,
martial_status VARCHAR(100),
FOREIGN KEY(user_id) REFERENCES hrisportal.users(user_id)
);


CREATE TABLE hrisportal.applicants(
applicant_id INT PRIMARY KEY IDENTITY(1,1),
user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
j_id INT FOREIGN KEY REFERENCES hrisportal.job_vacancy(j_id),
applied_at DATETIME DEFAULT GETDATE(),
round_1 INT DEFAULT -1,
round_2 INT DEFAULT -1,
round_3 INT DEFAULT -1,
doc_verification INT DEFAULT -1,
offer_letter INT DEFAULT -1
);


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
	

	CREATE TABLE hrisportal.documents
	(
		document_id INT PRIMARY KEY,
		user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
		aadhar_card NVARCHAR(MAX),
		pancard NVARCHAR(MAX),
		voter_card NVARCHAR(MAX),
		account_no INT UNIQUE,
		ifsc_code INT UNIQUE,
		passport_no INT UNIQUE,
		name_of_acc_holder VARCHAR(100),
		photo NVARCHAR(MAX),
		updated_resume NVARCHAR(MAX),
		esign NVARCHAR(MAX)
	)


CREATE TABLE hrisportal.hr(
hr_id INT PRIMARY KEY IDENTITY(1,1),
employee_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
email NVARCHAR(100) UNIQUE NOT NULL,
password VARBINARY(MAX) NOT NULL,
active_yn VARCHAR(1)
);

ALTER TABLE hrisportal.hr ADD created_at DATETIME  
ALTER TABLE hrisportal.hr ADD CONSTRAINT df_create DEFAULT GETDATE() FOR created_at
CREATE TABLE hrisportal.department(
department_id INT PRIMARY KEY IDENTITY(1,1),
department_name VARCHAR(MAX) NOT NULL
);


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

CREATE TABLE hrisportal.skill(
skill_id INT PRIMARY KEY IDENTITY(1,1),
skill_name VARCHAR(MAX)
);


CREATE TABLE hrisportal.employee_skill(
id INT PRIMARY KEY IDENTITY(1,1),
emp_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
skill_id INT FOREIGN KEY REFERENCES hrisportal.skill(skill_id)
)

CREATE TABLE hrisportal.job_skill(
id INT PRIMARY KEY IDENTITY(1,1),
j_id INT FOREIGN KEY REFERENCES hrisportal.job_vacancy(j_id),
skill_id INT FOREIGN KEY REFERENCES hrisportal.skill(skill_id)
)


CREATE TABLE  hrisportal.userPhoto(
	id INT PRIMARY KEY IDENTITY(1,1),
	user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
	photo NVARCHAR(MAX)
)
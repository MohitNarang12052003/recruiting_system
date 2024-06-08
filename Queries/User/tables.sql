--Basic user info
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
ALTER TABLE hrisportal.users ADD token VARCHAR(MAX)
ALTER TABLE hrisportal.users ADD time_to_expire DATETIME

ALTER TABLE hrisportal.users ADD CONSTRAINT df_created_at DEFAULT GETDATE() FOR created_at
ALTER TABLE hrisportal.users ADD CONSTRAINT df_active_yn  DEFAULT 1 FOR active_yn

--Qualifications
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

--Job History
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

--Additional Info
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

--Photo
CREATE TABLE  hrisportal.userPhoto(
	id INT PRIMARY KEY IDENTITY(1,1),
	user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
	photo NVARCHAR(MAX)
)


--Documents
CREATE TABLE hrisportal.documents
	(
		document_id INT PRIMARY KEY IDENTITY(1,1),
		user_id INT FOREIGN KEY REFERENCES hrisportal.users(user_id),
		aadhar NVARCHAR(MAX),
		pan NVARCHAR(MAX),
		voter NVARCHAR(MAX),
		account_no INT UNIQUE,
		ifsc_code  NVARCHAR(MAX),
		passport_no  NVARCHAR(MAX),
		name_of_acc_holder VARCHAR(100),
		esign NVARCHAR(MAX)
	)



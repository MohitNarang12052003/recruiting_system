-- Inserting skills into the hrisportal.skill table
INSERT INTO hrisportal.skill (skill_name) VALUES ('Java');
INSERT INTO hrisportal.skill (skill_name) VALUES ('Python');
INSERT INTO hrisportal.skill (skill_name) VALUES ('SQL');
INSERT INTO hrisportal.skill (skill_name) VALUES ('JavaScript');
INSERT INTO hrisportal.skill (skill_name) VALUES ('C++');
INSERT INTO hrisportal.skill (skill_name) VALUES ('HTML');
INSERT INTO hrisportal.skill (skill_name) VALUES ('CSS');
INSERT INTO hrisportal.skill (skill_name) VALUES ('Data Analysis');
INSERT INTO hrisportal.skill (skill_name) VALUES ('Machine Learning');
INSERT INTO hrisportal.skill (skill_name) VALUES ('Project Management');


-- Inserting fintech-related departments into the hrisportal.department table
INSERT INTO hrisportal.department (department_name) VALUES ('Technology and Innovation');
INSERT INTO hrisportal.department (department_name) VALUES ('Data Science and Analytics');
INSERT INTO hrisportal.department (department_name) VALUES ('Risk Management');
INSERT INTO hrisportal.department (department_name) VALUES ('Compliance and Regulatory Affairs');
INSERT INTO hrisportal.department (department_name) VALUES ('Financial Operations');
INSERT INTO hrisportal.department (department_name) VALUES ('Product Development');
INSERT INTO hrisportal.department (department_name) VALUES ('Cybersecurity');
INSERT INTO hrisportal.department (department_name) VALUES ('Finance and Accounting');
INSERT INTO hrisportal.department (department_name) VALUES ('Customer Support');
INSERT INTO hrisportal.department (department_name) VALUES ('Marketing and Sales');

-- Inserting a record for a user into the hrisportal.users table
-- Inserting a record for a user with a sample resume into the hrisportal.users table
INSERT INTO hrisportal.users (username, email, password, full_name, date_of_birth, phone_number, work_experience, resume, expected_ctc, current_ctc)
VALUES (
    'jane_smith', 
    'jane.smith@email.com', 
    'strongpassword456', 
    'Jane Smith', 
    '1985-08-22', 
    '+9876543210', 
    10, -- 10 years of work experience
    0x5468697320697320612073656D706C6520726573756D65, -- Hexadecimal representation of "This is a sample resume"
    120000, -- Expected CTC
    100000  -- Current CTC
);



-- Inserting a record for an employee into the hrisportal.employee table
INSERT INTO hrisportal.employee (employee_id, user_id, job_title, salary, department, email, password, date_of_joining, date_of_departure, active_yn)
VALUES (
    101, -- Replace with a unique employee_id
   001,  -- Assuming user_id 101 exists in hrisportal.users table
    'Software Engineer',
    80000,
    'Technology and Innovation',
    'employee1@fintechcompany.com',
    'securepassword123',
    '2024-01-01',
    NULL, -- Assuming the employee has not yet departed
    1     -- 1 for active, 0 for inactive
);


INSERT INTO hrisportal.hr (employee_id, email, password, active_yn)
VALUES (
    101, -- Assuming employee_id 101 exists in hrisportal.employee table
    'hr_rep@fintechcompany.com', 
    'securepassword123', 
    'Y'
);

-- Inserting job vacancies for a fintech company into the hrisportal.job_vacancy table
INSERT INTO hrisportal.job_vacancy (
    job_title, 
    job_description, 
    minimum_qualifications, 
    employment_type, 
    key_role, 
    location, 
    department_id, 
    date_posted, 
    active_yn, 
    hr_id
) VALUES (
    'Software Engineer', 
    'Develop and maintain software solutions for financial applications.', 
    'Bachelor''s degree in Computer Science, 3+ years of experience in software development.', 
    'Full-Time', 
    'Software development for financial systems', 
    'New York', 
    1, 
    '2024-01-13', 
    'Y', 
    1
);

INSERT INTO hrisportal.job_vacancy (
    job_title, 
    job_description, 
    minimum_qualifications, 
    employment_type, 
    key_role, 
    location, 
    department_id, 
    date_posted, 
    active_yn, 
    hr_id
) VALUES (
    'Data Scientist', 
    'Analyze and interpret complex financial data sets.', 
    'Master''s degree in Data Science or related field, 5+ years of experience in data analysis.', 
    'Full-Time', 
    'Data analysis for financial insights', 
    'San Francisco', 
    2, 
    '2024-01-14', 
    'Y', 
    1
);

-- Inserting additional job vacancies for a fintech company into the hrisportal.job_vacancy table
INSERT INTO hrisportal.job_vacancy (
    job_title, 
    job_description, 
    minimum_qualifications, 
    employment_type, 
    key_role, 
    location, 
    department_id, 
    date_posted, 
    active_yn, 
    hr_id
) VALUES (
    'Financial Analyst', 
    'Conduct financial analysis and reporting for strategic decision-making.', 
    'Bachelor''s degree in Finance or Accounting, CPA certification preferred.', 
    'Full-Time', 
    'Financial analysis and reporting', 
    'Chicago', 
    8, 
    '2024-01-15', 
    'Y', 
    1
);

INSERT INTO hrisportal.job_vacancy (
    job_title, 
    job_description, 
    minimum_qualifications, 
    employment_type, 
    key_role, 
    location, 
    department_id, 
    date_posted, 
    active_yn, 
    hr_id
) VALUES (
    'Cybersecurity Analyst', 
    'Implement and manage cybersecurity measures to protect financial data.', 
    'Bachelor''s degree in Cybersecurity or related field, CISSP certification preferred.', 
    'Full-Time', 
    'Cybersecurity for financial systems', 
    'Washington, D.C.', 
    6, 
    '2024-01-16', 
    'Y', 
    1
);

-- Add more job vacancy records as needed...


-- Add more job vacancy records as needed...

select * from hrisportal.skill;

select * from hrisportal.department;

select * from hrisportal.job_vacancy;


insert into hrisportal.job_skill values(5,1);
insert into hrisportal.job_skill values(5,1);
insert into hrisportal.job_skill values(6,2);
insert into hrisportal.job_skill values(6,2);
insert into hrisportal.job_skill values(3,3);
insert into hrisportal.job_skill values(3,3);
insert into hrisportal.job_skill values(4,4);
insert into hrisportal.job_skill values(4,4);

CREATE TABLE hrisportal.[nationalHolidays](
	[date] [date] NULL,
	[occasion] [varchar](100) NULL,
	[description] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

CREATE PROCEDURE hrisportal.[sp_fetch_nationalHolidays]
@month int
AS
BEGIN
SELECT * from nationalHolidays where MONTH(date) = @month
END

INSERT INTO hrisportal.nationalHolidays ([date], occasion, description)
VALUES
    ('2024-01-01', 'New Year''s Day', 'Celebrates the beginning of the Gregorian calendar year'),
    ('2024-01-26', 'Republic Day', 'Celebrates the adoption of the Indian Constitution in 1950'),
    ('2024-05-01', 'Labour Day', 'International Workers'' Day, also known as May Day'),
    ('2024-08-15', 'Independence Day', 'Celebrates India''s independence from British rule in 1947'),
    ('2024-10-02', 'Gandhi Jayanti', 'Birth anniversary of Mahatma Gandhi, the Father of the Nation'),
    ('2024-10-08', 'Dussehra', 'Celebrates the victory of Lord Rama over the demon king Ravana'),
    ('2024-10-27', 'Diwali', 'Festival of lights, celebrated by Hindus, Sikhs, Jains, and Buddhists'),
    ('2024-12-25', 'Christmas Day', 'Celebrates the birth of Jesus Christ in Christian tradition'),
    ('2024-02-21', 'Maha Shivaratri', 'Festival dedicated to Lord Shiva, observed by Hindus'),
    ('2024-03-10', 'Holi', 'Festival of colors, celebrated to mark the arrival of spring'),
    ('2024-04-02', 'Good Friday', 'Commemorates the crucifixion of Jesus Christ in Christian tradition'),
    ('2024-04-14', 'Baisakhi', 'Harvest festival celebrated in Punjab and other parts of North India'),
    ('2024-06-05', 'Eid al-Fitr', 'Islamic festival marking the end of Ramadan fasting month'),
    ('2024-07-23', 'Guru Purnima', 'Celebrates and honors spiritual and academic teachers'),
    ('2024-08-30', 'Janmashtami', 'Birth anniversary of Lord Krishna, celebrated by Hindus'),
    ('2024-09-10', 'Muharram', 'Islamic New Year and mourning for the martyrdom of Husayn ibn Ali'),
    ('2024-11-01', 'Guru Nanak Jayanti', 'Birth anniversary of Guru Nanak, founder of Sikhism'),
    ('2024-12-31', 'New Year''s Eve', 'Celebrates the last day of the Gregorian calendar year');




	EXEC [hrisportal].[ApplyForLeave] 5,'Sick Leave','17-04-2024 21:17','abc'
SELECT * FROM hrisportal.emp_leave_count

EXEC hrisportal.total_count 5
SELECT * FROM hrisportal.announcement
EXEC hrisportal.category_count 5


CREATE OR ALTER   PROCEDURE [hrisportal].[ApplyForLeave]
@employee_id INT,
@category_name NVARCHAR(MAX),
@applied_at VARCHAR(MAX),
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



CREATE OR ALTER   PROCEDURE [hrisportal].[fetch_all_announcements]
AS
BEGIN
    SELECT announcement, created_at, edited_at
    FROM hrisportal.announcement
END;
GO





CREATE TABLE [hrisportal].[category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO





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





CREATE OR ALTER   PROCEDURE [hrisportal].[fetch_announcements]
AS
BEGIN
    SELECT announcement, edited_at
    FROM hrisportal.announcement
    WHERE active_yn = 1;
END;
GO




CREATE OR ALTER PROCEDURE [hrisportal].[insert_announcement]
    @hr_id INT,
    @announcement NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO hrisportal.announcement (hr_id, announcement)
    VALUES (@hr_id, @announcement);
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



INSERT INTO hrisportal.category (category_name)
VALUES 
    ( 'Annual Leave'),
    ( 'Sick Leave'),
    ( 'Maternity Leave'),
    ( 'Emergency Leave'),
	( 'Others');




	CREATE TABLE hrisportal.emp_leave_count (
    employee_id INT FOREIGN KEY REFERENCES hrisportal.employee(employee_id),
	category_id INT FOREIGN KEY REFERENCES hrisportal.category(category_id),
    total_leaves_taken INT DEFAULT 0
);

ALTER TABLE hrisportal.users
ADD fp_token VARCHAR(MAX)

ALTER TABLE hrisportal.users
ADD fp_time_to_expire DATETIME

ALTER TABLE hrisportal.employee
ADD fp_token VARCHAR(MAX)

ALTER TABLE hrisportal.employee
ADD fp_time_to_expire DATETIME

ALTER TABLE hrisportal.hr
ADD fp_token VARCHAR(MAX)

ALTER TABLE hrisportal.hr
ADD fp_time_to_expire DATETIME

CREATE OR ALTER     PROCEDURE [hrisportal].[sp_view_employees]
AS
BEGIN
SELECT e.email,u.full_name,u.phone_number,job_title, department,salary,date_of_joining,e.active_yn
FROM hrisportal.employee AS e
INNER JOIN hrisportal.users AS u
ON e.user_id=u.user_id
ORDER BY e.active_yn DESC
END

GO


CREATE OR ALTER PROCEDURE hrisportal.sp_validate_fp_token
@fp_token VARCHAR(100)
AS
BEGIN
	DECLARE @ucount INT = 0,
	 @ecount INT = 0,
	 @hcount INT = 0
	 
	 SELECT @ucount=count(*) 
	 FROM hrisportal.users
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()

	 SELECT @ecount=count(*) 
	 FROM hrisportal.employee
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()

	 SELECT @hcount=count(*) 
	 FROM hrisportal.hr
	 WHERE fp_token=@fp_token
	 AND fp_time_to_expire>GETDATE()


	 IF @ucount=1 AND @ecount=0 AND @hcount=0
	 BEGIN
		SELECT -1 AS validYN
	END
	ELSE IF @ucount=0 AND @ecount=1 AND @hcount=0
	 BEGIN
		SELECT 0 AS validYN
	END

	ELSE IF @ucount=0 AND @ecount=0 AND @hcount=1
	 BEGIN
		SELECT 1 AS validYN
	END

	ELSE 
	BEGIN
		SELECT -2 AS validYN
	END

END





CREATE OR ALTER PROCEDURE hrisportal.sp_reset_pwd
@token VARCHAR(100),
@pwd NVARCHAR(100),
@role INT
AS
BEGIN
	DECLARE @hashed_pwd VARBINARY(MAX)

	SELECT @hashed_pwd=HASHBYTES('SHA2_256',@pwd)
	IF @role=-1
	BEGIN
		UPDATE hrisportal.users
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END

	IF @role=0
	BEGIN
		UPDATE hrisportal.employee
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END

	IF @role=1
	BEGIN
		UPDATE hrisportal.hr
		SET password=@hashed_pwd
		WHERE fp_token=@token
		AND fp_time_to_expire>GETDATE()
	END
END





CREATE OR ALTER PROCEDURE hrisportal.sp_get_eid_from_email
@email VARCHAR(100)
AS
BEGIN
	SELECT employee_id
	FROM hrisportal.employee
	WHERE email=@email
END
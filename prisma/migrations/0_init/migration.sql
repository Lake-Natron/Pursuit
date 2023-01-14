-- CreateTable
CREATE TABLE "Seeker" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "session_id" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Seeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work_Experience" (
    "id" SERIAL NOT NULL,
    "seeker_id" INTEGER,
    "job_details" TEXT,
    "company_name" VARCHAR(255),
    "location" VARCHAR(255),
    "start_date" DATE,
    "end_date" DATE,
    "pdf" VARCHAR(255),

    CONSTRAINT "Work_Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "seeker_id" INTEGER,
    "school" VARCHAR(255),
    "location" VARCHAR(255),
    "degree" VARCHAR(255),
    "major" VARCHAR(255),
    "graduated" BOOLEAN,
    "graduation_date" DATE,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "session_id" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "company_id" INTEGER,
    "description" TEXT,
    "salary" INTEGER,
    "location" VARCHAR(255),
    "close_date" DATE,
    "experience_type" VARCHAR(255),
    "employment_type" VARCHAR(255),
    "jobsite" VARCHAR(255),

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "seeker_id" INTEGER,
    "skill" VARCHAR(255),

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "seeker_id" INTEGER,
    "seeker_notes" VARCHAR(255),
    "company_notes" VARCHAR(255),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "seeker_id" INTEGER,
    "company_id" INTEGER,
    "application_id" INTEGER,
    "date" DATE,
    "start_time" TIME(6),
    "end_time" TIME(6),
    "description" TEXT,
    "change_requested" BOOLEAN,
    "canceled" BOOLEAN,
    "seeker_accepted" BOOLEAN,
    "change_notes" VARCHAR(255),

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seeker_email_key" ON "Seeker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seeker_password_key" ON "Seeker"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_password_key" ON "Company"("password");

-- AddForeignKey
ALTER TABLE "Work_Experience" ADD CONSTRAINT "Work_Experience_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "Seeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "Seeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "Seeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "Seeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "Seeker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


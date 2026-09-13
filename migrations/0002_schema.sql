-- MEA Portal schema (Damascus University — Modelling & Economic Analysis)

create table if not exists members (
  user_id text primary key,
  role text not null default 'student',
  name_ar text not null,
  name_en text not null,
  year_level int,
  person_id text,
  student_no text,
  title_ar text,
  title_en text,
  office text,
  bio_ar text,
  bio_en text,
  created_at timestamptz not null default now()
);

create table if not exists people (
  id text primary key,
  kind text not null,
  name_ar text not null,
  name_en text not null,
  year_level int,
  student_no text,
  cohort text,
  title_ar text,
  title_en text,
  office text,
  email text,
  bio_ar text,
  bio_en text,
  research_ar text,
  research_en text,
  course_codes text not null default '',
  advisor_id text
);

create table if not exists courses (
  code text primary key,
  name_ar text not null,
  name_en text not null,
  year_level int not null,
  semester int not null,
  hours_theory int not null default 2,
  hours_lab int not null default 2,
  credits int not null default 4,
  desc_ar text not null,
  desc_en text not null,
  instructor_id text,
  prereq text
);

create table if not exists announcements (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  body_ar text not null,
  body_en text not null,
  category text not null,
  year_level int,
  pinned boolean not null default false,
  published_at date not null
);

create table if not exists projects (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  abstract_ar text not null,
  abstract_en text not null,
  year_level int not null,
  kind text not null,
  student_ids text not null,
  supervisor_id text,
  status text not null,
  year_label text not null
);

create table if not exists calendar_events (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  starts_on date not null,
  ends_on date,
  kind text not null,
  year_level int
);

create table if not exists regulations (
  id text primary key,
  chapter int not null,
  title_ar text not null,
  title_en text not null,
  body_ar text not null,
  body_en text not null
);

create table if not exists resources (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  kind text not null,
  url text,
  note_ar text not null,
  note_en text not null,
  year_level int
);

create table if not exists user_grades (
  id serial primary key,
  user_id text not null,
  course_code text not null,
  coursework numeric,
  midterm numeric,
  final numeric,
  total numeric,
  unique (user_id, course_code)
);
create index if not exists user_grades_user_id_idx on user_grades (user_id);

create table if not exists roster_grades (
  id serial primary key,
  person_id text not null,
  course_code text not null,
  coursework numeric,
  midterm numeric,
  final numeric,
  total numeric,
  unique (person_id, course_code)
);
create index if not exists roster_grades_person_id_idx on roster_grades (person_id);

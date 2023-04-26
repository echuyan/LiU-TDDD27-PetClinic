create table roles(
      id integer primary key NOT NULL,
      role varchar(320)
 );

INSERT INTO "roles" VALUES ('1','Admin');
INSERT INTO "roles" VALUES ('2','Owner');
INSERT INTO "roles" VALUES ('3','Doctor');

create table users(
      id integer primary key NOT NULL,
      firstname varchar(120) NOT NULL,
      familyname varchar(120) NOT NULL,
      email varchar(320) NOT NULL UNIQUE,
      password varchar(120) NOT NULL,
      role integer,
      specialization varchar(320),
      phone varchar(16),
      token varchar(120) UNIQUE,
      photo BLOB,
      foreign key(role) REFERENCES roles(id)
 );


create table pets(
      id integer primary key NOT NULL,
      name varchar(320) NOT NULL,
      ownerid integer,
      species varchar(120) NOT NULL,
      dateofbirth text,
      isarchived integer,
      photo BLOB,
      foreign key(ownerid) REFERENCES users(id)
);

create table appointments (
    id integer primary key NOT NULL,
    doctor_id integer,  
    owner_id integer,
    pet_id integer,
    startdate text,
    enddate text,
    foreign key(doctor_id) REFERENCES users(id),
    foreign key(owner_id) REFERENCES users(id),
    foreign key(pet_id) REFERENCES pets(id)
);

create table health_records (
    id integer primary key NOT NULL,
    doctor_id integer,  
    pet_id integer,
    date text,
    record text,
    foreign key(doctor_id) REFERENCES users(id),
    foreign key(pet_id) REFERENCES pets(id)
);
        
                                              
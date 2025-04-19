USE realEstate;

create table user(
id int auto_increment primary key,
name varchar(50) not null,
email varchar(100) unique,
MobNo varchar(100) not null,
password varchar(100) not null,
role  varchar(100) not null
);


create table wishlist(
wishlist_id int auto_increment primary key,
   user_id INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES user(id) ,
   prop_id varchar(100)
);


create table inquiry(
inq_id int not null primary key auto_increment,
inq_type varchar(100) not null,
name varchar(50) not null ,
email varchar(80) not null,
MobNo varchar(100) not null,
msg varchar(3000) not null,
sender_id int
);


create table property(
prop_id int auto_increment primary key, 
type varchar(50) not null,
location varchar(200) not null,
size varchar(50) not null,
area varchar(50) not null,
price int not null,
avl varchar(50) not null,
prop_img varchar(40) ,
gmap varchar(5000),
status varchar(100),
owner_id int
);

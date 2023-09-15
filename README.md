# ShortUrl

ShortUrl 

เป็น Web Application ที่ใช้ในการเเปลง URL ยาว ให้กลายเป็น ShortURL เเละมีการใช้ฐานข้อมูลเพื่อเพิ่มประสิทธิภาพในการทำงาน

![image](https://github.com/RapeePAAT/ShortUrl/assets/144792043/aeea055a-8702-43a7-95bc-cae93285b0c4)


อย่างเเรก เราจำเป็นต้องติดตั้ง NPM i ก่อน
โดย Client มี package ดั้งนี้

npm install  qrcode.react

npm install  bootstrap

...สามารถดูเพิ่มได้ที่ package.json

โดย Server มี package ดั้งนี้

npm install body-parser cors dotenv express nodemon pg shortid

...สามารถดูเพิ่มได้ที่ package.json

Postage SQL


CREATE DATABASE shortURL;


CREATE TABLE url {

	id serial PRIMARY KEY,
 
	original_url varchar(255),
 
	short_url varchar(255),
 
	clicks int
}

เรื่มโปรเจ็ต

npm start 


ENJOY KUB \|''|/


USE [BlueDat]
GO

IF OBJECT_ID (N'DEMANDE',N'U') IS NOT NULL
DROP TABLE DEMANDE
IF OBJECT_ID (N'UMESSAGE',N'U') IS NOT NULL
DROP TABLE UMESSAGE
IF OBJECT_ID (N'CHAT',N'U') IS NOT NULL
DROP TABLE CHAT
IF OBJECT_ID (N'USERS',N'U') IS NOT NULL
DROP TABLE USERS




CREATE TABLE USERS (
    Username varchar(20) NOT NULL,
    Passwd varchar(20) NOT NULL,
	AccountType varchar(1) NOT NULL
 PRIMARY KEY (Username)
);

CREATE TABLE CHAT (
    User1 varchar(20) NOT NULL,
	User2 varchar(20) NOT NULL,
	ChatId int NOT NULL IDENTITY(1,1)
	PRIMARY KEY (ChatId)
	FOREIGN KEY (User1) REFERENCES USERS(Username),
	FOREIGN KEY (User2) REFERENCES USERS(Username)
);

CREATE TABLE UMESSAGE (
    Sender varchar(20) NOT NULL,
    Content varchar(200),
	SendTime datetime,
	Receiver varchar(20) NOT NULL
	FOREIGN KEY (Sender) REFERENCES USERS(Username),
	FOREIGN KEY (Receiver) REFERENCES USERS(Username)
);

CREATE TABLE DEMANDE (
	Client varchar(20) NOT NULL,
    AskTime datetime
	FOREIGN KEY (Client) REFERENCES USERS(Username)
);


/*
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation Helper*/
VALUES(Nom, mdp, 'H')
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation User*/
VALUES(Nom, mdp, 'U')

INSERT INTO DEMANDE(DUser,AskTime)/* Creation Demande*/
VALUES(Nom, GETDATE())

INSERT INTO CHAT(User1,User2) /* Creation Chat*/
VALUES(Nom1,Nom2)
DELETE * from DEMANDE where Users.Username=Nom /*Destruction demande */

INSERT INTO UMESSAGE(Sender, Content,SendTime, Receiver) /* Creation Message*/
VALUES(Nom1, DATA, GETDATE(), Nom2)
*/

 
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation Helper*/
VALUES('Helper1', 'NicePasswordTM', 'H')
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation User*/
VALUES('User1', 'MomImGay', 'U')

INSERT INTO DEMANDE(Client,AskTime)/* Creation Demande*/
VALUES('User1', GETDATE())

INSERT INTO CHAT(User1,User2) /* Creation Chat*/
VALUES('Helper1','User1')

INSERT INTO UMESSAGE(Sender, Content,SendTime, Receiver) /* Creation Message*/
VALUES('Helper1', 'ALLO MOMAN!', GETDATE(), 'User1')


/* GET LINES
SELECT * from USERS
SELECT * from DEMANDE
SELECT * FROM CHAT where CHAT.User1=Nom or CHAT.User2=Nom
SELECT * from UMESSAGE where UMESSAGE.Sender=Nom or UMESSAGE.Receiver=Nom order by UMESSAGE.SendTime
*/



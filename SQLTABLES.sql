USE [BlueDat]
GO

IF OBJECT_ID (N'DEMANDE',N'U') IS NOT NULL
DROP TABLE DEMANDE
IF OBJECT_ID (N'U_MESSAGE',N'U') IS NOT NULL
DROP TABLE U_MESSAGE
IF OBJECT_ID (N'CHAT',N'U') IS NOT NULL
DROP TABLE CHAT
IF OBJECT_ID (N'USERS',N'U') IS NOT NULL
DROP TABLE USERS




CREATE TABLE USERS (
	U_ID INT IDENTITY(1,1) NOT NULL,
    Username varchar(20) NOT NULL,
    Passwd varchar(60) NOT NULL,
	AccountType char NOT NULL
 PRIMARY KEY (U_ID)
);

CREATE TABLE CHAT (
    U_ID1 INT NOT NULL,
	U_ID2 INT NOT NULL,
	ChatId INT NOT NULL IDENTITY(1,1)
	PRIMARY KEY (ChatId)
	FOREIGN KEY (U_ID1) REFERENCES USERS(U_ID),
	FOREIGN KEY (U_ID2) REFERENCES USERS(U_ID)
);

CREATE TABLE U_MESSAGE (
    Sender_ID INT NOT NULL,
    Content varchar(200),
	SendTime datetime,
	Receiver_ID INT NOT NULL
	FOREIGN KEY (Sender_ID) REFERENCES USERS(U_ID),
	FOREIGN KEY (Receiver_ID) REFERENCES USERS(U_ID)
);

CREATE TABLE DEMANDE (
	UD_ID INT NOT NULL,
    AskTime datetime
	FOREIGN KEY (UD_ID) REFERENCES USERS(U_ID)
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

 /*
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation Helper*/
VALUES('Helper1', PWDENCRYPT('NicePasswordTM'), 'H')
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation User*/
VALUES('User1', PWDENCRYPT('Test'), 'U')

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


*/

INSERT INTO USERS(Username,Passwd,AccountType)/*Creation Users*/
VALUES('UserTest','$2y$12$g3j2DjrZLF6GyfOebhoig.S1HGUqU2/dmv20RVPtzWzSF6kyMoUa.', 'U')
INSERT INTO USERS(Username,Passwd,AccountType)/*Creation Helper*/
VALUES('HelperTest','$2y$12$41pCkEHWonSzEU8je42XVuGVbP2roRNhFnm3qv.2slpkR7.TyXTE6', 'H')

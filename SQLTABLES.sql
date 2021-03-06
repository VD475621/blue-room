USE [BlueDat]
GO

IF OBJECT_ID (N'RATING',N'U') IS NOT NULL
DROP TABLE RATING
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
	IsHelper bit NOT NULL,
	Couriel varchar(50) NOT NULL
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
    Chat_ID INT NOT NULL,
	S_ID INT NOT NULL,
    Content varchar(1000),
	SendTime datetime
	FOREIGN KEY (Chat_Id) REFERENCES CHAT(ChatId),
	FOREIGN KEY (S_ID) REFERENCES USERS(U_ID)
);

CREATE TABLE DEMANDE (
	UD_ID INT NOT NULL,
	Active bit default '1',
    AskTime datetime
	FOREIGN KEY (UD_ID) REFERENCES USERS(U_ID)
);

CREATE TABLE RATING (
	H_ID INT IDENTITY(1,1) NOT NULL,
	Evaluation int,
	Feedback varchar(1000) 
 FOREIGN KEY (H_ID) REFERENCES USERS(U_ID)
);



INSERT INTO USERS(Username,Couriel,Passwd,IsHelper)/*Creation Users*/
VALUES('UserTest','ImAPony@gmail.com','$2y$12$g3j2DjrZLF6GyfOebhoig.S1HGUqU2/dmv20RVPtzWzSF6kyMoUa.', '0')
INSERT INTO USERS(Username,Couriel,Passwd,IsHelper)/*Creation Helper*/
VALUES('HelperTest','YouAreNotAPony@gmail.com','$2y$12$41pCkEHWonSzEU8je42XVuGVbP2roRNhFnm3qv.2slpkR7.TyXTE6', '1')


/*
/* INSERT */

i1:User
INSERT INTO USERS(Username,Couriel,Passwd,IsHelper)
VALUES("VAR USERNAME","VAR COURIEL","VAR MDP",'0')

i2:Helper
INSERT INTO USERS(Username,Couriel,Passwd,IsHelper)
VALUES("VAR USERNAME","VAR COURIEL","VAR MDP",'1')

i3:Demande
INSERT INTO DEMANDE(UD_ID,AskTime)
VALUES((SELECT U_ID from USERS WHERE USERS.Username="VARIABLE DE NOM"), GETDATE())

i4:Chat
INSERT INTO CHAT(U_ID1,U_ID2) /* Doit appeler D1 en meme temps */
VALUES("ID Helper" ,"ID User")

i5:Message
INSERT INTO U_MESSAGE(Chat_ID,S_ID,Content,SendTime)
VALUES( "VARIABLE DU ID DU CHAT","VARIABLE SENDER ID" ,"VARIABLE CONTENANT LE MESSAGE", GETDATE())

i6:Rating
INSERT INTO RATING()
VALUES

/*Get*/

g1: Connection
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM [USERS]
    WHERE Couriel = "Var Couriel" and Passwd = "Var Password"
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END

g2: Get Last 20 messages from chat classed reversed
SELECT *
FROM U_MESSAGE
WHERE
(
 SendTime IN
 (
  SELECT TOP (20) SendTime
  FROM U_MESSAGE
  WHERE Chat_ID ="Var Chat ID"
  ORDER BY SendTime DESC
 )
)
ORDER BY SendTime

g3:Get UserNames of all users with a chat with current user
SELECT U.Username 
FROM USERS as U INNER JOIN CHAT as C ON (C.U_ID1="VAR U_ID")
WHERE U.U_ID=C.U_ID2
UNION
SELECT U.Username 
FROM USERS as U INNER JOIN CHAT as C ON (C.U_ID2="VAR U_ID")
WHERE U.U_ID=C.U_ID1

g4:Get Ratings from user
SELECT Evaluation, Feedback
FROM RATING
WHERE H_ID = "VAR CURRENT USER"

g5: Get Demandes en cours
SELECT * 
FROM DEMANDE
WHERE Active='1'

g6: Get helper or not
SELECT USERS.IsHelper
FROM USERS
WHERE USERS.Couriel="Variable Couriel"

/* UPDATE*/

u1:Change active state for request
UPDATE DEMANDE
SET Active='0'
WHERE UD_ID="Variable UserId" and Active='1'
*/




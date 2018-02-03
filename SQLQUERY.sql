SELECT * from USERS
SELECT * from DEMANDE
SELECT * FROM CHAT where CHAT.User1='User1' or CHAT.User2='User1'
SELECT * from UMESSAGE where UMESSAGE.Sender='User1' or UMESSAGE.Receiver='User1' order by UMESSAGE.SendTime
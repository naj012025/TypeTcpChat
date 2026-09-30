Redoing my tcpclient from C# in typescript to learn the tcp way and setup differences in ts.

its working where you can register a new user and it stores the user atm in users.json
the password is not with \* symbol when register or inputing in console but it hashes it in the json after creation.

I learned ts is not ideal for doing tcp stuff when i did this in dotnet it was way less code to make it work on ts i needed to write alot
of the code in a lower language than dotnet but i learned alot more about tcp what is hidden in dotnet.

Fun projekt to learn syntax etc for typescript etc
adding in my study notes and a flowchart on how this works for future read.

Learned about cascading Error i thought i needed to write the method later but i was just a missplaced : i forgot wich cause 11 errors was a hard one to find.

OBS Was told small project Getall from userstore is not ideal if have a big database etc so not ideal for scaleability.
i have done this with Ef core in dotnet.

In Ts:
data-access/database concept.
The general terms you'll encounter are:

- Querying / filtered query — ask specifically for the data you need.
- Lookup — retrieve a particular record, e.g. findByUserName().
- Repository pattern — put data-access operations behind methods such as findByUserName(), findById(), create().
- Database indexing — lets the database locate values efficiently instead of scanning every row.
- Query filtering / server-side filtering — the filtering happens where the data lives rather than after loading everything into your application.

example: const user = await userRepository.findByUserName(userName);

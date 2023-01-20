##  Tour pela aplicação

***"/session"*** **Type: POST**
Rota para iniciar uma sessão dentro da aplicação com o username:  desafiosharenergy e o password: sh@r3n3rgy.
Caso o username ou o password estejam incorretos, retornará o seguinte erro:

    "Email or password incorrect"
    
Caso esteja tudo certo, retornará um token, juntamento com o username e o email do admin, exemplo:

	{	token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQxNzIxOTYsImV4cCI6MTY3NDE3Mzk5Niwic3ViIjoiNjNjNzYyMjYwNDY5OThlN2E3MWVmYWIwIn0.McZ9BJkK3d6el_-amTUM7jhO7-lqmBW66QVE7e9F26I",
	user:  {
		username: "desafiosharenergy",
		email: "desafiosharenergy@email.com"
	}}
***"/users/{number page}"*** **Type: GET**
Nesta rota você terá o retorno de 10 usuários por página, gerados pela API https://randomuser.me/, só é possível navegar até a página 3, caso o valor seja maior que 3 ou menor que 1, será retornado **Page not found!**, exemplo de retorno:

    {	
	    "full_name": "Miss Laura Woods",
		"email": "laura.woods@example.com",
		"username": "angryostrich988",	
		"age": 55,
		"picture": "https://randomuser.me/api/portraits/med/women/88.jpg"
	}

***"/users"*** **Type: POST**
Nesta rota é possível procurar um usuário pelo full_name, email ou username. Os dados de pesquisa serão recebidos pelo **req.body**, sendo assim retornando o usuário com o mesmo dado enviado, se não houver um usuário com o mesmo dado enviado será retornado **User does not exists!**, exemplo de retorno:

    {	
	    "full_name": "Miss Laura Woods",
		"email": "laura.woods@example.com",
		"username": "angryostrich988",	
		"age": 55,
		"picture": "https://randomuser.me/api/portraits/med/women/88.jpg"
	}

***"/clients"*** **Type: GET**
Esta rota retornará todas as contas de clientes, criadas pelo usuário administrador da aplicação, caso não haja nenhum cliente cadastrado, será retornado **There are no registered clients**, exemplo de retorno:

    {
		"_id": "63c9dccee835b47297e3a848",
		"name": "test",
		"email": "adasdasd@teste.com",
		"phone_number": 12457878,
		"address": "testando 123",
		"cpf": 124578,
	}

***"/client"*** **Type: POST**
Rota para criar uma conta para o cliente, recebendo os seguintes dados pelo **req.body**: 
       
	{
		"name": string,
		"email": string,
		"phone_number": number,
		"address": string,
		"cpf": number,
	}

***"/client/{id}"***  **Type: DELETE**
Rota que recebe o **id** da conta do cliente pelo **req.params**, logo em seguida, a conta com o id repassado na rota será deletada, caso não seja um **id** válido, será retornado **Client not found** e caso tudo funcione bem será retornado **Success**.

***"/client/{name}"*** **Type: GET**
Está rota recebe o nome do cliente pelo **req.params**, logo em seguida será feita a busca no banco de dados, caso não haja nenhuma conta com o memso nome será retornado **Client not found**, exemplo de retorno:

     {
		"_id": "63c9dccee835b47297e3a848",
		"name": "test",
		"email": "adasdasd@teste.com",
		"phone_number": 12457878,
		"address": "testando 123",
		"cpf": 124578,
	}
	
***"/client/{id}"*** **Type: PUT**
Rota para atualizações de dados da conta, recebendo o **id** da conta que será atualizado através do **req.params** e os dados pelo **req.body**, logo em seguindo a conta será atualizada, caso não haja uma conta com o **id** repassado, será retornado **Client not found**, exemplo de retorno:

    
     {
		"_id": "63c9dccee835b47297e3a848",
		"name": "new name",
		"email": "new@teste.com",
		"phone_number": 12457878,
		"address": "testando 123",
		"cpf": 124578,
	}

***"TESTES"*** 
Rodando o comando **yarn test** ou **npm test** serão rodados, todos os testes escritos na aplicação.
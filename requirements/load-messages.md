# Listar mensagens

> ## Caso de sucesso

1. ❌ Recebe uma requisição do tipo **GET** na rota **/api/messages**
2. ❌ Valida se a requisição foi feita por um **usuário**
3. ❌ Valida os query params da requisição
4. ❌ Retorna **204** se não tiver nenhuma mensagem
5. ❌ Retorna **200** com os dados das mensagens

> ## Exceções

1. ❌ Retorna erro **404** se a API não existir
2. ❌ Retorna erro **400** se algum parâmetro for fornecido de forma incorreta pelo client
3. ❌ Retorna erro **401** se não for um usuário
4. ❌ Retorna erro **500** se der erro ao tentar listar as mensagens
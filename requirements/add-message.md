# Salvar mensagem

> ## Caso de sucesso

1. ✔️ Recebe uma requisição do tipo **POST** na rota **/api/messages**
3. ✔️ Valida dados obrigatórios: **name** e **message**
4. ✔️ **Salva** mensagem com os dados fornecidos
5. ✔️ Retorna **204**, sem dados

> ## Exceções

1. ✔️ Retorna erro **404** se a API não existir
3. ✔️ Retorna erro **400** se o name e/ou message não forem fornecidos pelo client
4. ✔️ Retorna erro **500** se der erro ao tentar salvar a mensagem
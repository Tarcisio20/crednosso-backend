### PROJETO SISTEMA CREDNOSSO

## PAINEL ADM

-- CADASTRO ATM
-- CADASTRO TESOURARIA
-- EDITAR PEDIDO
--- TIPOS DE OPERACAO (RETIRADA DE LOJA, ENTRE TESOURARIAS)
--- TIPOS DE PEDIDO (EVENTUAL, FOLHA, DECIMO, FERIAS)
-- EDITAR ABASTECIMENTO
-- ACESSO LOGS
-- CADASTRAR USUARIOS

## SISTEMA DE USO

-- VISUALIZAR ATM
-- VISUALIZAR TESOURARIA
-- VISUALIZAR/ EFETUAR PEDIDO
-- VISUALIZAR / REALIZAR ABASTECIMENTO

### PLANEJANDO BANCO DE DADOS

--- CADASTRO ATM
--- CADASTRO TESOURARIA
--- PEDIDO
--- ABASTECIMENTO

users (USUARIOS) - id INT PK AUTO_INCREMENT - name_full STRING - email STRING - password STRING - last_access_date DATE TIME

logs (LOG) - id INT PK AUTO_INCREMENT - resposable_user STRING - log_date DATE TIME - ACTION STRING

atms (ATM) - id INT PK AUTO_INCREMENT - name_full STRING - shortened_name STRING - id_treasury INT (Relacionado a treasurys.id) - status BOOLEAN default=true

treasurys (TESOURARIA) - id INT PK AUTO_INCREMENT - name_full STRING - shortened_name STRING - config_cass_A INT - config_cass_B INT - config_cass_C INT - config_cass_D INT - balance_cass_A FLOAT - balance_cass_B FLOAT - balance_cass_C FLOAT - balance_cass_D FLOAT - status BOOLEAN default=true

operation_types (TIPO DE OPERAÇÃO) - id INT PK AUTO_INCREMENT - name_full STRING - status BOOLEAN default=true

order_types (TIPOS DE PEDIDO) - id INT PK AUTO_INCREMENT - name_full STRING - status BOOLEAN default=true

orders (PEDIDO) - id INT PK AUTO_INCREMENT - order_date DATE - batch INT - id_origin_treasury INT (Relacionado a treasurys.id) - id_destiny_treasury INT (Relacionado a treasurys.id) - id_operation_type INT (Relacionado a operation_types.id) - id_order_type INT (Relacionado a order_types.id) - batch_treasury - value_of_10 FLOAT - value_of_20 FLOAT - value_of_50 FLOAT - value_of_100 FLOAT - observation STRING - status BOOLEAN default=true

supply (ABASTECIMENTO) - id INT PK AUTO_INCREMENT - id_atm INT (Relacionado a atms.id) - supply_date DATE - value_of_A FLOAT - value_of_B FLOAT - value_of_C FLOAT - value_of_D FLOAT - status BOOLEAN default=true

---

PLANEJAMENTO DE ROTAS

--- GET - login
--- GET - logout

ROTAS DE ADMIN
(ADMIN)
--- GET - admin/usuarios
--- GET - admin/usuarios/:id
--- POST - admin/usuarios
--- POST - admin/usuarios/?search=pesquisa
--- PUT - admin/usuarios/:id
--- DEL - admin/usuarios/:id
(LOGS)
--- GET - admin/logs
--- GET - admin/logs/:id
--- POST - admin/logs/?search=pesquisa
--- POST - admin/logs
(ATMS)
--- GET - admin/atms
--- POST admin/atms
--- POST - admin/atms/?search=pesquisa
--- GET - admin/atms/:id
--- PUT - admin/atms/:id
--- DEL - admin/atms/:id
(TREASURYS)
--- GET - admin/tesourarias
--- GET - admin/tesourarias/:id
--- POST - admin/tesourarias
--- POST - admin/tesourarias/?search=pesquisa
--- PUT - admin/tesourarias/:id
--- DEL - admin/tesourarias/:id
(OPERATION TYPES)
--- GET - admin/tipos-operacao
--- GET - admin/tipos-operacao/:id
--- POST - admin/tipos-operacao
--- POST - admin/tipos-operacao/?search=pesquisa
--- PUT - admin/tipos-operacao/:id
--- DEL - admin/tipos-operacao/:id
(ORDER TYPES)
--- GET - admin/tipos-pedidos
--- GET - admin/tipos-pedidos/:id
--- POST - admin/tipos-pedidos
--- POST - admin/tipos-pedido/?search=pesquisa
--- PUT - admin/tipos-pedidos/:id
--- DEL - admin/tipos-pedidos/:id
(ORDERS)
--- GET - admin/pedidos
--- GET - admin/pedidos/:id
--- POST - admin/pedidos
--- POST - admin/pedidos/?search=pesquisa
--- PUT - admin/pedidos/:id
--- DEL - admin/pedidos/:id
(SUPPLY)
--- GET - admin/abastecimentos
--- GET - admin/abastecimentos/:id
--- POST - admin/abastecimentos
--- POST - admin/abastecimentos/?search=pesquisa
--- PUT - admin/abastecimentos/:id
--- DEL - admin/abastecimentos/:id

ROTAS DO SITE
(ATMS)
--- GET - atms
--- POST - atms
--- POST - atms/?search=pesquisa
--- GET - atms/:id
--- PUT - atms/:id
--- DEL - atms/:id
(TREASURYS)
--- GET - tesourarias
--- GET - tesourarias/:id
--- POST - tesourarias
--- POST - tesourarias/?search=pesquisa
--- PUT - tesourarias/:id
--- DEL - tesourarias/:id
(OPERATION TYPES)
--- GET - tipos-operacao
(ORDER TYPES)
--- GET - tipos-pedidos
(ORDERS)
--- GET - pedidos
--- GET - pedidos/:id
--- POST - pedidos
--- POST - pedidos/?search=pesquisa
--- PUT - pedidos/:id
--- DEL - pedidos/:id
(SUPPLY)
--- GET - abastecimentos
--- GET - abastecimentos/:id
--- POST - abastecimentos
--- POST - abastecimentos/?search=pesquisa
--- PUT - abastecimentos/:id
--- DEL - abastecimentos/:id

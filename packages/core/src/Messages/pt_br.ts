/* eslint-disable max-len */
export default {
	ALE_EXPIRED_SESSION: 'Sua sessão expirou.<br/>Você será redirecionado para efetuar login novamente.',
	ALE_EXPIRED_SESSION_SUPPORT_OPERATOR: 'Sua sessão como Operador de Suporte expirou. Para continuar, gere um novo acesso pelo Portal do Cliente.<br/>Você será redirecionado para efetuar o login novamente.',
	ALE_MIGRATION_IS_PENDENT: 'ATENÇÃO!<br/><br/>Esse produto foi atualizado recentemente, com necessidade de alterações na estrutura do banco de dados, sem que essas alterações tenham sido aplicadas.<br/>A utilização do produto nessa situação poderá acarretar erros.<br/><br/>Solicite ao administrador do sistema a regularização da alteração na estrutura do banco de dados.',
	ALE_EXPIRED_MENU: 'Esse item de menu encontra-se vinculado à um contrato vencido.<br/>Para mais informações, entre em contato com a Teknisa.',
	ALE_SESSION_WILL_BE_ENDED: 'Sua sessão foi bloqueada porque o mesmo usuário acessou este sistema em outro equipamento.',
	ALE_LOGOUT: 'Deseja realmente sair do sistema?',

	ERR_ATTEMPT_END: 'Tentativas esgotadas. Redirecionando...',
	ERR_ATTEMPT_PARTIAL: 'Senha incorreta.<br/>Tentativa {{attempts}}/3',
	ERR_EXPIRED_SESSION_LOGIN: 'Sessão expirada. Redirecionando...',
	ERR_REQUEST_USER_DATA: 'Ocorreu um erro na requisição dos dados do usuário.',
	ERR_UPDATE_PASSWORD_AD: 'Não foi possível atualizar a senha do Active Directory. Tente novamente. Caso o erro persista, contate o administrador do sistema.',
	ERR_CONNECT_AD: 'Não foi possível conectar ao servidor. Deseja manter o IP informado?',
	ERR_INVALID_AD_CREDENTIALS: 'Credenciais do Active Directory inválidas.',
	ERR_NOT_FOUND_USER_AD: 'Usuário não encontrado no Active Directory. Tente novamente. Caso o erro persista, contate o administrador do sistema.',
	ERR_NOT_FOUND_MENU_CONFIG: 'O arquivo que contém as configurações básicas do menu (menuConfig.json) não foi encontrado.',
	ERR_NOT_FOUND_MODULES_CONFIG: 'O arquivo que contém as configurações básicas dos módulos (modules.json) não foi encontrado.',
	ERR_NOT_FOUND_ACL_STRUCT: 'O arquivo gerado com os menus (aclStruct.json) não foi encontrado.',
	ERR_NOT_FOUND_CONTAINERS: 'O arquivo de configurações gerais do projeto (containers.json) não foi encontrado.',
	ERR_NOT_FOUND_BOWER_CONFIG: 'O arquivo que contém as informações sobre a versão (bower.json) não foi encontrado nos seguintes módulos:"__modules__"',
	ERR_NOT_FOUND_MODULES_PARAMETERS: 'Os parâmetros de versionamento "maxVersion" e/ou "devOpsId", localizados no arquivo modules.json, não foram encontrados nos seguintes módulos:<br/><u>"__modules__"</u>',
	ERR_NOT_FOUND_DATABASE_CONFIG: 'O arquivo de configuração do banco de dados ("db.xml") não foi encontrado.',

	LDAP_LOGON_NOT_PERMITED_TIME: 'Não é permitido iniciar sessão no Active Directory nesse momento.',
	LDAP_LOGON_NOT_PERMITED_MACHINE: 'Não é permitido iniciar sessão no Active Directory nessa máquina.',
	LDAP_PASSWORD_EXPIRED: 'Senha do Active Directory está expirada.',
	LDAP_ACCOUNT_DISABLED: 'Usuário desabilitado no Active Directory.',
	LDAP_ACCOUNT_EXPIRED: 'Usuário expirado no Active Directory.',
	LDAP_ACCOUNT_LOCKED: 'Usuário bloqueado no Active Directory.',
	LDAP_USER_MUST_RESET_PASSWORD: 'É necessário restaurar a senha deste usuário para realizar login no Active Directory.',

	UNEXPECTED_ERROR: 'Ocorreu um erro inesperado. Por favor, tente novamente. Caso o erro persista, entre em contato com o administrador do sistema.',
	INVALID_TOKEN: 'Token Inválido ("__token__").',
	EXPIRED_TOKEN: 'Token Expirado ("__token__").',

	AUTH_INVALID_UNIT: 'Operador não possui acesso à unidade informada.',

	GEN_INVALID_OPERGROUP: 'Operador não pertence ao grupo responsável pela autorização.',
	GEN_POPUP_BLOCKER: 'Bloqueador de Pop-up está ativado! Adicione este site à sua lista de exceções.',
	GEN_DELETE_REG: 'Deletar o(s) registro(s)?',
	GEN_DELETE_BLOCK: 'Exclusão não permitida! O registro possui registros filhos.',
	GEN_TIMEOUT: 'Timeout',
	GEN_NOT_FILTER: 'Você não pode adicionar sem filtrar',
	YES: 'Sim',
	NO: 'Não',
	LOAD: 'Aguarde...',
	ALE_WARNING: 'Atenção',
	ALE_ERROR: 'Erro',
	ALE_SUCCESS: 'Sucesso',
};

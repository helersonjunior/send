
// Objeto com as traduções para os códigos de erro do Firebase
const errorTranslations = {
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/invalid-email': 'E-mail inválido.',
    "FirebaseError": 'Erro do Firebase',
    "auth/invalid-email": 'E-mail inválido',
    "auth/user-disabled": 'Usuário desativado',
    "auth/user-not-found": 'Usuário não encontrado',
    "auth/wrong-password": 'Senha incorreta',
    "auth/email-already-in-use": 'E-mail já está em uso',
    "auth/weak-password": 'Senha fraca',
    "auth/operation-not-allowed": 'Operação não permitida',
    "auth/account-exists-with-different-credential": 'Conta já existe com outra credencial',
    "auth/network-request-failed": 'Falha na solicitação de rede',
    "auth/invalid-verification-code": 'Código de verificação inválido',
    "auth/missing-verification-code": 'Código de verificação ausente',
    "auth/quota-exceeded": 'Limite excedido',
    "auth/unauthorized-domain": 'Domínio não autorizado',
    "auth/invalid-user-token": 'Token de usuário inválido',
    // Adicione mais traduções aqui conforme necessário
};

// Função para obter a mensagem de erro traduzida
function getTranslatedErrorMessage(error) {
    // Verifica se há uma tradução para o código de erro
    const translatedMessage = errorTranslations[error.code];

    // Retorna a mensagem traduzida, ou a mensagem original se não houver tradução
    return translatedMessage || error.message;
}

// JWT related messages
export const AuthMessages = {
  TOKEN_MISSING: "Accès refusé : Token manquant",
  TOKEN_INVALID: "Accès refusé : Token invalide",
  TOKEN_EXPIRED: "Accès refusé : Token expiré",
  TOKEN_INVALID_USERID: "Accès refusé : Token invalide - userId manquant",
  AUTH_ERROR: "Accès refusé : Erreur d'authentification",
  USER_AUTHENTICATED: "Utilisateur authentifié. UserId: ",
};

// JWT constants
export const JWTConstants = {
  DEFAULT_SECRET: 'your-super-secret-key-here',
  TOKEN_HEADER: 'auth-user',
};

// Headers and Log messages
export const LogMessages = {
  AUTH_METHOD_PATH: '[AuthMiddleware] Method: ',
  AUTH_TOKEN_MISSING: '[AuthMiddleware] Token missing for ',
  AUTH_USING_SECRET: '[AuthMiddleware] Using JWT secret:',
  JWT_VERIFY_ERROR: 'Erreur de vérification JWT:',
};
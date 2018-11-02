package users

type OAuthProvider interface {
	TokenInfo(string) (string, string, string, error)
}

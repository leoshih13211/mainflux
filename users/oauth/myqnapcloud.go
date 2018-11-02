package oauth

import (
	"encoding/json"
	"fmt"
	"github.com/mainflux/mainflux/users"
	"net/http"
)

type tokenInfo struct {
	UserId           string `json:"user_id"`
	ClientId         string `json:"client_id"`
	Scope            string `json:"scope"`
	ExpiresIn        int    `json:"expires_in"`
	Error            string `json:"error"`
	ErrorDescription string `json:"error_description"`
	User             struct {
		DisplayName string `json:"display_name"`
		Language    string `json:"language"`
		Email       string `json:"email"`
		Id          string `json:"id"`
	} `json:"user"`
}

type oauthProvider struct {
	apiBase string
}

var _ users.OAuthProvider = (*oauthProvider)(nil)

func New(apiBase string) users.OAuthProvider {
	return &oauthProvider{apiBase}
}

func (myqnapcloud *oauthProvider) TokenInfo(accessToken string) (string, string, string, error) {
	var resp *http.Response
	resp, err := http.Get(fmt.Sprintf("%s/oauth/tokeninfo?access_token=%s", myqnapcloud.apiBase, accessToken))
	if err != nil {
		return "", "", "", users.ErrMyQnapCloudCannotAccess
	}
	defer resp.Body.Close()

	var tokenInfo tokenInfo
	json.NewDecoder(resp.Body).Decode(&tokenInfo)

	if tokenInfo.Error == "invalid_access_token" {
		return "", "", "", users.ErrMyQanpCloudInvalidAccessToken
	}

	if tokenInfo.Error == "server_error" {
		return "", "", "", users.ErrMyQnapCloudServerError
	}

	return tokenInfo.UserId, tokenInfo.User.Email, tokenInfo.ClientId, nil
}

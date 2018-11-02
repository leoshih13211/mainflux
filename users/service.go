//
// Copyright (c) 2018
// Mainflux
//
// SPDX-License-Identifier: Apache-2.0
//

package users

import (
	"errors"
)

var (
	// ErrConflict indicates usage of the existing email during account
	// registration.
	ErrConflict = errors.New("email already taken")

	// ErrMalformedEntity indicates malformed entity specification (e.g.
	// invalid username or password).
	ErrMalformedEntity = errors.New("malformed entity specification")

	// ErrUnauthorizedAccess indicates missing or invalid credentials provided
	// when accessing a protected resource.
	ErrUnauthorizedAccess = errors.New("missing or invalid credentials provided")

	// ErrNotFound indicates a non-existent entity request.
	ErrNotFound = errors.New("non-existent entity")

	ErrMyQanpCloudInvalidAccessToken = errors.New("Invalid access token")

	ErrMyQnapCloudCannotAccess = errors.New("MyQnapCloud can not access")

	ErrMyQnapCloudServerError = errors.New("MyQnapCloud internel server error")
)

// Service specifies an API that must be fullfiled by the domain service
// implementation, and all of its decorators (e.g. logging & metrics).
type Service interface {
	// Register creates new user account. In case of the failed registration, a
	// non-nil error value is returned.
	Register(User) error

	// Login authenticates the user given its credentials. Successful
	// authentication generates new access token. Failed invocations are
	// identified by the non-nil error values in the response.
	Login(User) (string, error)

	// Identify validates user's token. If token is valid, user's id
	// is returned. If token is invalid, or invocation failed for some
	// other reason, non-nil error values are returned in response.
	Identify(string) (string, error)
}

var _ Service = (*usersService)(nil)

type usersService struct {
	users       UserRepository
	hasher      Hasher
	idp         IdentityProvider
	myqnapcloud OAuthProvider
}

// New instantiates the users service implementation.
func New(users UserRepository, hasher Hasher, idp IdentityProvider, myqnapcloud OAuthProvider) Service {
	return &usersService{users: users, hasher: hasher, idp: idp, myqnapcloud: myqnapcloud}
}

func (svc usersService) Register(user User) error {
	hash, err := svc.hasher.Hash(user.UserId)
	if err != nil {
		return ErrMalformedEntity
	}

	user.HashId = hash
	return svc.users.Save(user)
}

func (svc usersService) Login(user User) (string, error) {
	userId, email, clientId, err := svc.myqnapcloud.TokenInfo(user.AccessToken)
	if err != nil {
		return "", err
	}

	hash, err := svc.hasher.Hash(user.UserId)
	if err != nil {
		return "", ErrMalformedEntity
	}

	user.HashId = hash
	user.UserId = userId
	user.Email = email
	user.ClientId = clientId

	err = svc.users.Save(user)
	if err != nil {
		return "", err
	}

	return svc.idp.TemporaryKey(user.Email)
}

func (svc usersService) Identify(token string) (string, error) {
	id, err := svc.idp.Identity(token)
	if err != nil {
		return "", ErrUnauthorizedAccess
	}
	return id, nil
}

#include "firebase/app.h"
#include "firebase/auth.h"
#include "firebase_auth.h"

// Callback and Helper Method Forward Declarations
void userCreateCallback(const firebase::Future<firebase::auth::User*>&, void*);
void userSigninCallback(const firebase::Future<firebase::auth::User*>&, void*);
void userLoggedIn(void*);

// Attach state listener
AuthStateList stateListener;
auth->AddAuthStateListener(&stateListener);

// Create User Method
void generateUser(char* email, char* password) {
  firebase::Future<firebase::auth::User*> result =
    auth->SignInWithEmailAndPassword(email, password);

  result.OnCompletion(userCreateCallback, /* data to pass in */ nullptr);
}

// Callback for user creation
void userCreateCallback(const firebase::Future<firebase::auth::User*>& result, void* user_data) {
  assert(result.status() == firebase::kFutureStatusComplete);

  if (result.error() == firebase::auth::kAuthErrorNone) {
    // Successful creation, interact with user here
    firebase::auth::User* user = *result.result();
    userLoggedIn(user_data);
    
  } else {
    // Failed to create
    printf("Creating User failed with error '%s'\n", result.error_message());
  }
}

// Sign-in (existing user) Method
void signinUser(char* email, char* password) {
  firebase::Future<firebase::auth::User*> result =
    auth->SignInWithEmailAndPassword(email, password);

  result.OnCompletion(signinCallback, /* data to pass in */ nullptr);
}

// Callback for user sign-in
void userSigninCallback(const firebase::Future<firebase::auth::User*>& result, void* user_data) {
  assert(result.status() == firebase::kFutureStatusComplete);

  if (result.error() == firebase::auth::kAuthErrorNone) {
    // Successful sign-in, interact with user here
    firease::auth::User* user = *result.result();
    userLoggedIn(user_data);
    
  } else {
    // Failed to sign-in
    printf("Sign-in failed with error '%s'\n", result.error_message());
  }
}

// User Log in Method
void userLoggedIn(void* user_data) {
  // Handle user here
  return;
}

// AuthStateChange Method
void AuthStateList::OnAuthStateChanged(firebase::auth::Auth* auth) {
  firebase::auth::User* user = auth->current_user();
  if (user != nullptr) {
    // User signed in
    /* user name */ user->DisplayName();
    /* email */ user->Email();
    /* user photo */ user->PhotoURL();
  } else {
    // User signed out
    return;
  }
}

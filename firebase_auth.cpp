// Authorization Gateway (globals)
firebase::App app = firebase::App::Create(firebase::AppOptions);
firebase::auth::Auth* auth = firebase::auth::Auth::GetAuth(app);

// Authorization State Listener. Handles when user signs out and in.
class AuthStateList : public firebase::auth::AuthStateListener {
public:
  void OnAuthStateChanged(firebase::auth::Auth* auth) override {
    firebase::auth::User* user = auth->current_user();
    if (user != nullptr) {
      // Signed in
      /* user name */ user->DisplayName();
      /* email address */ user->Email();
      /* user photo */ user->PhotoUrl();
    } else {
      // Signed out
      return;
    }
    return;
  }
};

// Attach state listener
AuthStateList stateListener;
auth->AddStateListener(stateListener);

// Callback and Helper Method Forward Declarations
void userCreateCallback(const firebase::Future<firebase::auth::User*>&, void*);
void userSigninCallback(const firebase::Future<firebase::auth::User*>&, void*);
void userLoggedIn(void*);


// Create User Method
void generateUser(std::string email, std::string password) {
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
void signinUser(std::email, std::password) {
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

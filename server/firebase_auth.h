#ifndef FB_AUTH
#define FB_AUTH

#include "firebase/app.h"
#include "firebase/auth.h"

// Authorization Gateway
firebase::App app = firebase::App::Create(firebase::AppOptions);
firebase::auth::Auth* auth = firebase::auth::Auth::GetAuth(app);

// Authorization State Listener. Handles when user signs out and in.
class AuthStateList : public firebase::auth::AuthStateListener {
public:
  void OnAuthStateChanged(firebase::auth::Auth* auth) override;
};

// Sign-in/up Methods
void generateUser(char* email, char* password);
void signinUser(char* email, char* password);

#endif

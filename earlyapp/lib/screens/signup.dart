import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../widgets/login_widgets/custom_input_field.dart';

class SignupScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'assets/background_signup.png', 
            fit: BoxFit.cover,
          ),
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 30.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 80), 
                  Image.asset(
                    'assets/earlyvet_logo.png',
                    height: 200,
                  ),
                  SizedBox(height: 60),
                  CustomInputField(
                    placeholder: 'Username',
                  ),
                  SizedBox(height: 20),
                  CustomInputField(
                    placeholder: 'Password',
                    obscureText: true,
                  ),
                  SizedBox(height: 20),
                  CustomInputField(
                    placeholder: 'Confirm Password',
                    obscureText: true,
                  ),
                  SizedBox(height: 40),
                  SizedBox(
                    width: 180,
                    height: 60,
                    child: ElevatedButton(
                      onPressed: () {
                        
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF20751B),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      child: Text(
                        'Sign Up',
                        style: GoogleFonts.kantumruyPro(
                          fontSize: 30,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  GestureDetector(
                    onTap: () {
                      Navigator.pop(context); 
                    },
                    child: Text(
                      "Back to Login",
                      style: GoogleFonts.kantumruyPro(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  SizedBox(height: 40), 
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

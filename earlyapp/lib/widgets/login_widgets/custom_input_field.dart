import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomInputField extends StatelessWidget {
  final String placeholder;
  final bool obscureText;

  const CustomInputField({
    Key? key,
    required this.placeholder,
    this.obscureText = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscureText,
      style: GoogleFonts.kantumruyPro(color: const Color.fromARGB(255, 0, 0, 0)),
      decoration: InputDecoration(
        hintText: placeholder,
        hintStyle: GoogleFonts.kantumruyPro(
          color: const Color.fromARGB(255, 88, 87, 87).withOpacity(0.40),
          fontSize: 20,

        ),
        filled: true,
        fillColor: Colors.white.withOpacity(0.62),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }
}

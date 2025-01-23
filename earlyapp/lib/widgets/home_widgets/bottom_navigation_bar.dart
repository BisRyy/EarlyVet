import 'package:flutter/material.dart';
import '../../screens/home_screen.dart'; 

class BottomNavigationBarCustom extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      padding: EdgeInsets.symmetric(horizontal: 30),
      decoration: BoxDecoration(
        color: Color(0xFFB3DA6C),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => HomeScreen(), 
                ),
              );
            },
            child: Image.asset('assets/home.png', width: 35, height: 35),
          ),
          GestureDetector(
            onTap: () {
              
            },
            child: Image.asset('assets/cattle.png', width: 35, height: 35),
          ),
          GestureDetector(
            onTap: () {

            },
            child: Image.asset('assets/help.png', width: 35, height: 35),
          ),
        ],
      ),
    );
  }
}

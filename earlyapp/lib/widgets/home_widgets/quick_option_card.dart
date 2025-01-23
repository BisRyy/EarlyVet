import 'package:flutter/material.dart';

class QuickOptionCard extends StatelessWidget {
  final String iconPath;
  final String label;
  final Color backgroundColor; 

  
  QuickOptionCard({
    required this.iconPath,
    required this.label,
    this.backgroundColor = Colors.blue, 
  });

  @override
  Widget build(BuildContext context) {
    return 
       Container(
        padding: EdgeInsets.all(15),
        decoration: BoxDecoration(
          color: backgroundColor, 
          borderRadius: BorderRadius.circular(15), 
        ),
        child: Column(
          children: [
            Image.asset(iconPath, height: 65),
            SizedBox(height: 10),
            Text(
              label,
              style: TextStyle(fontSize: 15, color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      
    );
  }
}

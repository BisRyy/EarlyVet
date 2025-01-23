import 'package:flutter/material.dart';

class AnimalListItem extends StatelessWidget {
  final String animalID;
  final String animalType;
  final Color indicatorColor;

  
  AnimalListItem({
    required this.animalID,
    required this.animalType,
    required this.indicatorColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400, 
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white, 
        borderRadius: BorderRadius.circular(30), 
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            blurRadius: 5,
            offset: Offset(0, 3), 
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween, 
        children: [
          
          Text(
            animalID,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          
          Text(
            animalType,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
              color: Colors.black,
            ),
          ),
          
          Container(
            width: 17,
            height: 17,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: indicatorColor, 
            ),
          ),
        ],
      ),
    );
  }
}

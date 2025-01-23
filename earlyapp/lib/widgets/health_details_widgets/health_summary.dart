import 'package:flutter/material.dart';

class AnimalHealthWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, 
      height: 300, 
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 2,
            blurRadius: 5,
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [

              RichText(
                text: TextSpan(
                  style: TextStyle(fontSize: 15, color: Colors.black),
                  children: [
                    TextSpan(
                      text: 'Animal ID: ',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    TextSpan(
                      text: 'oxt6789',
                      style: TextStyle(fontWeight: FontWeight.normal),
                    ),
                  ],
                ),
              ),

              Row(
                children: [
                 
                  Text( 'Status:',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,)),
                  
                   Container(
                    width: 17,
                    height: 17,
                    decoration: BoxDecoration(
                      color: Color(0xFFF20000),
                      shape: BoxShape.circle,
                    ),
                  ),
                  SizedBox(width: 2),
                  Text(
                    'Critical',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.black,
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                  
                ],
              ),
            ],
          ),
          
          Image.asset(
            'assets/criticalCow.png', 
            width: 170,
            height: 170,
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [

              _buildHealthParameter(
                title: 'Temperature',
                iconPath: 'assets/temperature.png', 
                value: '41°C',
                status: 'High',
                statusColor: Color(0xFFF20000),
              ),
              
              _buildHealthParameter(
                title: 'Heart Beat',
                iconPath: 'assets/heart.png', 
                value: '120 bpm',
                status: 'High',
                statusColor: Color(0xFFF20000),
              ),

              _buildHealthParameter(
                title: 'Blood Pressure',
                iconPath: 'assets/bp.png', 
                value: '140/90 mmHg',
                status: 'High',
                statusColor: Color(0xFFF20000),
              ),
            ],
          ),
        ],
      ),
    );
  }


  Widget _buildHealthParameter({
    required String title,
    required String iconPath,
    required String value,
    required String status,
    required Color statusColor,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 5),
        Row(
          children: [
            Container(
              height: 40,
              width: 40,
              child: Image.asset(iconPath, fit: BoxFit.contain),
            ),
            SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  value,
                  style: TextStyle(fontSize: 12),
                ),
                Text(
                  status,
                  style: TextStyle(
                    fontSize: 12,
                    color: statusColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}

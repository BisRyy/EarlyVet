import 'package:flutter/material.dart';

class TopNavigationBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 85,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(20),
          bottomRight: Radius.circular(20),
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Image.asset(
            'assets/earlyvet_logo.png',
            height: 90,
          ),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  CircleAvatar(
                    radius: 18.5,
                    backgroundImage: AssetImage('assets/user.png'),
                  ),
                  SizedBox(height: 5),
                  Text(
                    'Eshetu Debebe',
                    style: TextStyle(fontSize: 12, color: Colors.black),
                  ),
                ],
              ),
              SizedBox(width: 10),
              GestureDetector(
                onTap: () {
                  
                },
                child: Image.asset(
                  'assets/notification.png',
                  height: 20,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

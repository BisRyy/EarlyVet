import 'package:earlyvapp/widgets/health_details_widgets/potential_diseases.dart';
import 'package:flutter/material.dart';
import '../widgets/home_widgets/top_navigation_bar.dart';
import '../widgets/home_widgets/bottom_navigation_bar.dart';
import '../widgets/health_details_widgets/health_summary.dart';

class HealthDetails extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/background_signup.png', 
              fit: BoxFit.cover, 
            ),
          ),
          SingleChildScrollView(  // Make the content scrollable
            child: Column(
              children: [
                TopNavigationBar(),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Image.asset(
                            'assets/herd.png',
                            width: 50,
                            height: 50,
                          ),
                          SizedBox(width: 10),
                          Text(
                            "Herd health",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Spacer(),
                          Text(
                            "FarmID: #456pqr",
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF20751B),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 20), 
                      
                      AnimalHealthWidget(),
                       SizedBox(height: 20),
                      PotentialDiseasesWidget(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBarCustom(),
    );
  }
}

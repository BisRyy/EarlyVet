import 'package:earlyvapp/screens/health_details.dart';
import 'package:flutter/material.dart';
import '../widgets/home_widgets/top_navigation_bar.dart';
import '../widgets/home_widgets/bottom_navigation_bar.dart';
import '../widgets/animal_list_widgets/list_item.dart';
import '../screens/health_details.dart';

class AnimalListScreen extends StatelessWidget {
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

          
          Column(
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Animal ID",
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          "Type",
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          "Status",
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: ListView.builder(
                    itemCount: 10,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10.0),
                        child: GestureDetector( 
                          onTap: ()=>{
                            Navigator.pushNamed(context, "/healthDetails")
                          },
                          child: AnimalListItem(
                          animalID: 'oxt${6789 + index}',
                          animalType: index % 2 == 0 ? 'Cow' : 'Ox',
                          indicatorColor: index % 3 == 0
                              ? Color(0xFF4DE342)
                              : index % 3 == 1
                                  ? Color(0xFFF20000)
                                  : Color(0xFFFF793D),
                        ),) 
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBarCustom(),
    );
  }
}

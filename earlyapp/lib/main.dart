import 'package:earlyvapp/screens/health_details.dart';
import './screens/animals_list.dart';
import 'package:flutter/material.dart';
import 'screens/login.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Earlyvet App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
      '/login': (context) => LoginScreen(),
      '/animalList': (context) => AnimalListScreen(), 
      '/healthDetails': (context) => HealthDetails(), 
},

    );
  }
}

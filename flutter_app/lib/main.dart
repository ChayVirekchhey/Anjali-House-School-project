import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:device_preview/device_preview.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set status bar appearance
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );

  runApp(
    DevicePreview(
      enabled: !kReleaseMode,
      initialDevice: Devices.ios.iPhone13ProMax, // Default to iPhone Pro Max
      builder: (context) => const EduAttendApp(),
    ),
  );
}

class EduAttendApp extends StatelessWidget {
  const EduAttendApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EduAttend - Anjali House',
      debugShowCheckedModeBanner: false,
      useInheritedMediaQuery: true,
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF006B45),
          primary: const Color(0xFF006B45),
          secondary: const Color(0xFF004D35),
          surface: Colors.white,
        ),
        scaffoldBackgroundColor: const Color(0xFFF7F8F7),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}

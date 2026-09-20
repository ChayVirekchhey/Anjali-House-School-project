import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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

  runApp(const EduAttendApp());
}

class EduAttendApp extends StatelessWidget {
  const EduAttendApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EduAttend - Anjali House',
      debugShowCheckedModeBanner: false,
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
      builder: (context, child) {
        // When running on a PC / Web browser, frame inside a mobile phone wrapper
        return LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth > 520) {
              return Container(
                color: const Color(0xFF0F172A),
                alignment: Alignment.center,
                child: Container(
                  width: 420,
                  height: constraints.maxHeight > 920 ? 860 : constraints.maxHeight * 0.96,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(32),
                    border: Border.all(color: const Color(0xFF334155), width: 8),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black54,
                        blurRadius: 30,
                        offset: Offset(0, 15),
                      ),
                    ],
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: child ?? const SizedBox(),
                ),
              );
            }
            return child ?? const SizedBox();
          },
        );
      },
      home: const SplashScreen(),
    );
  }
}

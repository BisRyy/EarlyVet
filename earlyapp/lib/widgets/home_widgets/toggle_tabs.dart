import 'package:flutter/material.dart';

class ToggleTabs extends StatefulWidget {
  final Function(int) onTabChanged;

  ToggleTabs({required this.onTabChanged});

  @override
  _ToggleTabsState createState() => _ToggleTabsState();
}

class _ToggleTabsState extends State<ToggleTabs> {
  int _activeTabIndex = 0;

  void _selectTab(int index) {
    setState(() {
      _activeTabIndex = index;
    });
    widget.onTabChanged(index);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      height: 75,
      decoration: BoxDecoration(
        color: Color(0xFFB3DA6C),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildTab('Quick Options', 0),
          _buildTab('Register Animal', 1),
        ],
      ),
    );
  }

  Widget _buildTab(String text, int index) {
    bool isActive = _activeTabIndex == index;
    return GestureDetector(
      onTap: () => _selectTab(index),
      child: Container(
        width: 122,
        height: 41,
        decoration: isActive
            ? BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(30),
              )
            : null,
        alignment: Alignment.center,
        child: Text(
          text,
          style: TextStyle(
            color: isActive ? Colors.black : Colors.white,
            fontSize: 15,
            fontWeight: isActive ? FontWeight.w400 : FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

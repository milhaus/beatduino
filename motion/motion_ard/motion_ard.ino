//////////////////////////////////////////////////////////////////
//©2011 bildr
//Released under the MIT License - Please reuse change and share
//Simple code for the ADXL335, prints calculated orientation via serial
//////////////////////////////////////////////////////////////////


//Analog read pins
const int xPin = 0;
const int yPin = 1;
const int zPin = 2;

//to hold the caculated values
double x;
double y;
double z;

void setup(){
  Serial.begin(9600); 
}


void loop(){

  //read the analog values from the accelerometer
  int xRead = analogRead(xPin);
  int yRead = analogRead(yPin);
  int zRead = analogRead(zPin);
  
  String tinyData = "";
  tinyData += xRead;
  tinyData += "|";
  tinyData += yRead;
  tinyData += "|";
  tinyData += zRead;
  
  Serial.println(tinyData);

  delay(100);//just here to slow down the serial output - Easier to read
}

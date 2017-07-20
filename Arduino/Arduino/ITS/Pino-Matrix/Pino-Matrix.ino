// Adafruit_NeoMatrix example for single NeoPixel Shield.
// Scrolls 'Howdy' across the matrix in a portrait (vertical) orientation.

#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>
#include <FrequencyTimer2.h>
#ifndef PSTR
 #define PSTR // Make Arduino Due happy
#endif

#define PIN 7
#define NUM_MSG 5
// MATRIX DECLARATION:
// Parameter 1 = width of NeoPixel matrix
// Parameter 2 = height of matrix
// Parameter 3 = pin number (most are valid)
// Parameter 4 = matrix layout flags, add together as needed:
//   NEO_MATRIX_TOP, NEO_MATRIX_BOTTOM, NEO_MATRIX_LEFT, NEO_MATRIX_RIGHT:
//     Position of the FIRST LED in the matrix; pick two, e.g.
//     NEO_MATRIX_TOP + NEO_MATRIX_LEFT for the top-left corner.
//   NEO_MATRIX_ROWS, NEO_MATRIX_COLUMNS: LEDs are arranged in horizontal
//     rows or in vertical columns, respectively; pick one or the other.
//   NEO_MATRIX_PROGRESSIVE, NEO_MATRIX_ZIGZAG: all rows/columns proceed
//     in the same order, or alternate lines reverse direction; pick one.
//   See example below for these values in action.
// Parameter 5 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)


// Example for NeoPixel Shield.  In this application we'd like to use it
// as a 5x8 tall matrix, with the USB port positioned at the top of the
// Arduino.  When held that way, the first pixel is at the top right, and
// lines are arranged in columns, progressive order.  The shield uses
// 800 KHz (v2) pixels that expect GRB color data.
Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(48 , 8, PIN,
  NEO_MATRIX_TOP     + NEO_MATRIX_RIGHT +
  NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
  NEO_GRB            + NEO_KHZ800);


/*Adafruit_NeoMatrix matrix =   Adafruit_NeoMatrix(40, 8, PIN, NEO_MATRIX_BOTTOM + NEO_MATRIX_LEFT + NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG +
     NEO_TILE_BOTTOM + NEO_TILE_RIGHT + NEO_TILE_COLUMNS + NEO_TILE_ZIGZAG,
    NEO_GRB + NEO_KHZ800);
    */

uint16_t colors[NUM_MSG] = {matrix.Color(255, 255, 255), matrix.Color(255, 255, 255), matrix.Color(255, 255, 255), matrix.Color(255, 255, 255), matrix.Color(255, 255, 255)};

String messages[NUM_MSG] = {"", "", "", "", ""};
String msg[] = {"","0","0","0"};

int x;
int pass;
String c;

void add_message(String new_msg="Pino", uint16_t new_color=matrix.Color(255,255,255)) {
  for (int i = 0; i < 4 ; i++) {
    messages[i] = messages[i+1];
    colors[i] = colors[i+1];
  }
  messages[4] = new_msg;
  colors[4] = new_color;
  --pass;
}

void split (String message) {
  String sub = "";
  int y = 0;
  int n = message.length();
  for (int i = 0; i < n; i++) {
    // TODO: Delimiter aendern
    if (message.charAt(i) == ';') {
      msg[y] = sub;
      y++;
      sub = "";
    } else {
      sub += message[i];
    }
  }
  msg[y] = sub;
}

void setup() {
  Serial.begin(9600);              //Starting serial communication
  
  matrix.begin();
  matrix.setTextWrap(false);
  matrix.setBrightness(40);
  matrix.setTextColor(colors[0]);

  
  add_message("Willkommen", matrix.Color(165,165,255));
  add_message("Pino-Matrix", matrix.Color(255,0,0));
  add_message("Shayan & Jan", matrix.Color(0,255,0));
  add_message("Tamara & Natalia", matrix.Color(255,56,152));
  add_message("tiny.cc/Pino-Matrix");

  x = matrix.width();
  pass = 0;
  c = messages[0];
}

void loop() {
  matrix.fillScreen(0);
  matrix.setCursor(x, 0);
  matrix.print(c);
  if(--x < ((int)((-1)*(c.length())*6))) {
    if (Serial.available() > 0) {
      // TODO: Delimiter aendern
      split(Serial.readStringUntil(':'));
      add_message(msg[0], matrix.Color(msg[1].toInt(), msg[2].toInt(), msg[3].toInt()));
    }

    x = matrix.width();
    if(++pass >= NUM_MSG || pass < 0) {
      pass = 0;
    }
    c = messages[pass];
    matrix.setTextColor(colors[pass]);
  }
  matrix.show();
  delay(100);
}

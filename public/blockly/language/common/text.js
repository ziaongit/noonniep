/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.text_print = {
  // Print statement.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_PRINT_TITLE_PRINT);
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_PRINT_TOOLTIP_1);
  }
};

Blockly.Language.text = {
  // Text value.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TEXT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle('\u201C');
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.appendTitle('\u201D');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP_1);
  }
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_JOIN_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD0', null);
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD1', null);
    this.setOutput(true, String);
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP_1);
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      this.appendInput('', Blockly.INPUT_VALUE, 'ADD' + x, null);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.inputList[0];
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and destroy all inputs.
    for (var x = this.itemCount_ - 1; x >= 0; x--) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendInput('', Blockly.INPUT_VALUE,
                                   'ADD' + this.itemCount_, null);
      // Reconnect any child blocks.
      if (itemBlock.valueInput_) {
        input.connect(itemBlock.valueInput_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueInput_ = input && input.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.text_create_join_container = {
  // Container.
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_length = {
  // String length.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_LENGTH_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendInput(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH,
        Blockly.INPUT_VALUE, 'VALUE', [String, Array]);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_TEXT_LENGTH_TOOLTIP_1);
  }
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ISEMPTY_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendInput(Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY,
        Blockly.INPUT_VALUE, 'VALUE', [String, Array]);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_TEXT_ISEMPTY_TOOLTIP_1);
  }
};

Blockly.Language.text_endString = {
  // Return a leading or trailing substring.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ENDSTRING_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, String);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'END'], Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput(Blockly.LANG_TEXT_ENDSTRING_INPUT,
        Blockly.INPUT_VALUE, 'TEXT', String);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_ENDSTRING_TOOLTIP_1);
  }
};

Blockly.Language.text_endString.OPERATORS =
    [[Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_INDEXOF_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, Number);
    this.appendTitle(Blockly.LANG_TEXT_INDEXOF_TITLE_FIND);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(menu, 'END');
    this.appendInput(Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE,
        Blockly.INPUT_VALUE, 'FIND', String);
    this.appendInput(Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT,
        Blockly.INPUT_VALUE, 'VALUE', String);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_INDEXOF_TOOLTIP_1);
  }
};

Blockly.Language.text_indexOf.OPERATORS =
    [[Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_charAt = {
  // Get a character from the string.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHARAT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_CHARAT_TITLE_LETTER);
    this.setOutput(true, String);
    this.appendInput(Blockly.LANG_TEXT_CHARAT_INPUT_AT,
        Blockly.INPUT_VALUE, 'AT', Number);
    this.appendInput(Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT,
        Blockly.INPUT_VALUE, 'VALUE', String);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_CHARAT_TOOLTIP_1);
  }
};

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHANGECASE_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_CHANGECASE_TITLE_TO);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'CASE'], Blockly.INPUT_VALUE, 'TEXT', String);
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_1);
  }
};

Blockly.Language.text_changeCase.OPERATORS =
    [[Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']];

Blockly.Language.text_trim = {
  // Trim spaces.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TRIM_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SPACE);
    var menu = new Blockly.FieldDropdown(this.OPERATORS, function(text) {
      var newTitle = (text == Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH) ?
          Blockly.LANG_TEXT_TRIM_TITLE_SIDES :
          Blockly.LANG_TEXT_TRIM_TITLE_SIDE;
      this.sourceBlock_.setTitleText(newTitle, 'SIDES');
      this.setText(text);
    });
    this.appendTitle(menu, 'MODE');
    this.appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SIDES, 'SIDES');
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', String);
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TRIM_TOOLTIP_1);
  },
  mutationToDom: function() {
    // Save whether the 'sides' title should be plural or singular.
    var container = document.createElement('mutation');
    var plural = (this.getTitleValue('MODE') == 'BOTH');
    container.setAttribute('plural', plural);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'sides' title as plural or singular.
    var plural = (xmlElement.getAttribute('plural') == 'true');
    this.setTitleText(plural ? Blockly.LANG_TEXT_TRIM_TITLE_SIDES :
                      Blockly.LANG_TEXT_TRIM_TITLE_SIDE, 'SIDES');
  }
};

Blockly.Language.text_trim.OPERATORS =
    [[Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH, 'BOTH'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT, 'LEFT'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']];

// text test for CrowdBotBlock
Blockly.Language.text_strobe = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Blink");
    this.appendInput('LED', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Blink");
  }
};
Blockly.Language.text_on = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Turn on LED");
    this.appendInput('at', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Turn On");
  }
};
Blockly.Language.text_off = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Turn off LED");
    this.appendInput('at', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Turn off");
  }
};

Blockly.Language.selectled = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.leds = [
      [Blockly.LANG_ARDUINO_PURPLE, 'PURPLE'],
      [Blockly.LANG_ARDUINO_GREEN, 'GREEN'],
      [Blockly.LANG_ARDUINO_BLUE, 'BLUE'],
      [Blockly.LANG_ARDUINO_RED, 'RED']
    ];
    var menu = new Blockly.FieldDropdown(this.leds);
    this.appendTitle(menu, 'LED');
    this.appendTitle(" LED");
    this.setOutput(true, Number);
    this.setTooltip("Select LED");
  }
};
/*Blockly.Language.multimeter = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Multimeter");
    this.setOutput(true, Number);
    this.setTooltip("Multimeter");
  }
};*/

Blockly.Language.drive_init = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Set up Drive Motors");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set up Drive Motors");
  }
};
Blockly.Language.drive_fwd = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Drive forward");
    this.appendInput('for', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Drive forward");
  }
};
Blockly.Language.drive_rev = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Drive backward");
    this.appendInput('for', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Drive backward");
  }
};
Blockly.Language.drive_left = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Turn left");
    this.appendInput('for', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Turn left");
  }
};
Blockly.Language.drive_right = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Turn right");
    this.appendInput('for', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Turn right");
  }
};
Blockly.Language.drive_stop = {
  category: "Drive",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Stop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Stop");
  }
};

// Servo init, min, max, center, move, sweep
/*Blockly.Language.servo_init = {
  category: "Motor",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Set up Servo Motor");
    this.appendInput('at', Blockly.INPUT_VALUE, 'NUM', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set up Servo Motor");
  }
};
Blockly.Language.servo_move = {
  category: "Motor",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Turn Servo Motor");
    this.appendInput('at', Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput('to', Blockly.INPUT_VALUE, 'NUM2', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Move Servo");
  }
};
Blockly.Language.servopin = {
  category: "Motor",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("My Motor");
    this.setOutput(true, Number);
    this.setTooltip("My Motor");
  }
};*/
// wait function
Blockly.Language.wait = {
  category: "Arduino",
  helpUrl: Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL,
  init: function() {
    this.setColour(80);
    this.appendTitle("Wait");
    this.appendInput('for', Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput('then', Blockly.NEXT_STATEMENT, 'DO');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Wait");
  }
};
// button / bumper init and callback
/*Blockly.Language.button = {
  category: "Arduino",
  helpUrl: Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL,
  init: function() {
    this.setColour(80);
    this.appendTitle("Button");
    this.appendInput('at', Blockly.INPUT_VALUE, 'PIN', Number);
    this.appendInput('When hit:', Blockly.NEXT_STATEMENT, 'HIT');
    this.appendInput('When released:', Blockly.NEXT_STATEMENT, 'RELEASE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Button");
  }
};*/

// sensor init and val return
Blockly.Language.sensorinit = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Set up Sensor");
    this.appendInput('at', Blockly.INPUT_VALUE, 'PIN', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set up Sensor");
  }
};
Blockly.Language.sensorval = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Read Sensor");
    this.appendInput('at', Blockly.INPUT_VALUE, 'PIN', Number);
    this.setOutput(true, Number);
    this.setTooltip("Read Sensor");
  }
};

// wiring objects
Blockly.Language.lightsensor = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Light Sensor");
    this.setOutput(true, Number);
    this.setTooltip("Light Sensor");
  }
};
/*Blockly.Language.audioplug = {
  category: "Arduino",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Audio Plug");
    this.setOutput(true, Number);
    this.setTooltip("Audio Plug");
  }
};*/

/*
// piezo init and tone
Blockly.Language.piezo_init = {
  category: "Sound",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Init");
    this.appendInput('Piezo@', Blockly.INPUT_VALUE, 'PIN', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Init Piezo");
  }
};
Blockly.Language.piezo_tone = {
  category: "Sound",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Tone");
    this.appendInput('Piezo@', Blockly.INPUT_VALUE, 'PIN', Number);
    this.appendInput('Volume', Blockly.INPUT_VALUE, 'VOL', Number);
    this.appendInput('Time', Blockly.INPUT_VALUE, 'TIME', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Piezo Tone");
  }
};
Blockly.Language.piezo_fade = {
  category: "Sound",
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function(){
    this.setColour(250);
    this.appendTitle("Fade");
    this.appendInput('Piezo@', Blockly.INPUT_VALUE, 'PIN', Number);
    this.appendInput('Volume', Blockly.INPUT_VALUE, 'VOL', Number);
    this.appendInput('Time', Blockly.INPUT_VALUE, 'TIME', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Piezo Fade");
  }
}; */

Blockly.Language.text_prompt = {
  // Prompt function.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PROMPT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendTitle(Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR);
    var menu = new Blockly.FieldDropdown(this.TYPES);
    this.appendTitle(menu, 'TYPE');
    this.appendTitle(Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE);
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.setOutput(true, [Number, String]);
    this.setTooltip(Blockly.LANG_TEXT_PROMPT_TOOLTIP_1);
  }
};

Blockly.Language.text_prompt.TYPES =
    [[Blockly.LANG_TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
     [Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];

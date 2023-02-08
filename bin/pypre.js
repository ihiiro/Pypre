#!/usr/bin/env node

/*

  # this binary module generates pypre.py script in current working directory #

  # requires python3 to be installed globally #

  # author: hiro #
  # version: 1.0.1 #
  # creation date: 02/07/2023 #

 */

import Readline from 'readline';
import { writeFileSync, readFileSync } from 'fs';

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Pypre v1.0.0\n\n# note: make sure that the file contains\n# Pypre syntax and is in current directory\n');
readline.question('file to preconfigure(filename): ', filename_from_input => {
  if (!filename_from_input) {
    var filename = JSON.parse(readFileSync('./pypre.json', 'utf8')).filename;
  } else {
    var filename = filename_from_input;
  }
  readline.question('write in JSON format({"case":"static value"}): ', json => {
    if (!json) {
      var preconfig_vars = JSON.parse(readFileSync('./pypre.json', 'utf8')).vars;
    } else {
      var preconfig_vars = JSON.parse(json);
    }
    let logic_branches_string = '';
    for (let key in preconfig_vars) {
      logic_branches_string = logic_branches_string + `    if x.group() == '$preconfigure_${key}$':
      return '${preconfig_vars[key]}'\n`;
    };

    const python_code = `# this script preconfigures ${filename}

import re
import os

# preconfigure file name
preconfigure_file = os.path.abspath(os.path.dirname(__file__)) + '/${filename}'

# open then close automatically
with open(preconfigure_file, 'r') as file:
    non_valid_js_code = file.read()

def preconfigure(x):
${logic_branches_string}
# replaces each matching string with conditional static value
valid_js_code = re.sub('\\$preconfigure_[a-zA-Z]+\\$', lambda x: preconfigure(x), non_valid_js_code);

# rewrite ${filename}
with open(preconfigure_file, 'w') as file:
    file.write(valid_js_code)
    `

    writeFileSync(`./pypre.py`, python_code, err => {
      if (err) throw err;
      console.log('\n\n# pypre.py generated');
    });
    readline.close();
  });
});
